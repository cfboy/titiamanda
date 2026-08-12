/**
 * Post-build prerender: emits rendered, SEO-complete HTML for every route × language.
 *   /                              → home (es, x-default)
 *   /servicios/{slug}/             → service pages (es)
 *   /preguntas-frecuentes/         → FAQ (es)
 *   /en/ + /en/services/{slug}/    → the same in English
 *
 * Also generates dist/sitemap.xml and dist/404.html, and removes the SSR bundle.
 * Runs after `vite build` (client) + `vite build --ssr` (server).
 */
import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const SITE = 'https://titiamandababysitter.com'
const OG_IMAGE = `${SITE}/assets/images/og-image.png`

const locales = {
  es: JSON.parse(readFileSync(path.join(root, 'src/locales/es.json'), 'utf8')),
  en: JSON.parse(readFileSync(path.join(root, 'src/locales/en.json'), 'utf8')),
}

const OG_LOCALE = { es: 'es_PR', en: 'en_US' }

// Keep in sync with the <img> in src/components/sections/HeroSection.tsx.
const HERO_SIZES = '(min-width: 1024px) 500px, 288px'

const images = JSON.parse(
  readFileSync(path.join(root, 'src/data/images.json'), 'utf8')
)

/** <head> preload for the home page's LCP image. */
function heroPreload() {
  const hero = images['hero-picture']
  return (
    `<link rel="preload" as="image" type="image/webp" href="${hero.src}"` +
    ` imagesrcset="${hero.srcSet}" imagesizes="${HERO_SIZES}" fetchpriority="high" />`
  )
}

// --- Guard: locale files must have the same keys ----------------------------
function flattenKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? flattenKeys(v, `${prefix}${k}.`)
      : [`${prefix}${k}`]
  )
}
const esKeys = new Set(flattenKeys(locales.es))
const enKeys = new Set(flattenKeys(locales.en))
const missing = [
  ...[...esKeys].filter(k => !enKeys.has(k)).map(k => `en missing: ${k}`),
  ...[...enKeys].filter(k => !esKeys.has(k)).map(k => `es missing: ${k}`),
]
if (missing.length) {
  console.error('Locale key mismatch:\n  ' + missing.join('\n  '))
  process.exit(1)
}

// First-visit language redirect (Spanish root only). Excludes crawlers so
// Googlebot's en-US renderer never leaves the Spanish page, and respects a
// previously stored preference.
const REDIRECT_SNIPPET = `<script>(function(){try{if(/bot|crawl|spider|slurp|bing|duckduck|baidu|yandex|facebookexternalhit|whatsapp|telegram|preview|lighthouse/i.test(navigator.userAgent))return;if(localStorage.getItem('i18nextLng'))return;if((navigator.language||'').toLowerCase().indexOf('en')===0){localStorage.setItem('i18nextLng','en');location.replace('/en/'+location.hash)}}catch(e){}})();</script>`

const BUSINESS = {
  '@type': 'ChildCare',
  '@id': `${SITE}/#business`,
  name: 'Titi Amanda Babysitter Services',
  url: `${SITE}/`,
  image: OG_IMAGE,
  logo: `${SITE}/favicon.svg`,
  telephone: '+1-787-585-7123',
  email: 'titiamandababysitter@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Juan',
    addressRegion: 'PR',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'San Juan' },
    { '@type': 'AdministrativeArea', name: 'Puerto Rico' },
  ],
  sameAs: ['https://www.instagram.com/titiamandababysitter/'],
}

/** JSON-LD per page type. */
function jsonLd(route, meta, dict) {
  const url = SITE + route.path

  if (route.kind === 'service') {
    const page = dict.pages.services[route.serviceId]
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: dict.services.items[route.serviceId].title,
          description: page.description,
          url,
          serviceType: dict.services.items[route.serviceId].title,
          provider: { '@id': `${SITE}/#business` },
          areaServed: BUSINESS.areaServed,
          inLanguage: route.lng,
        },
        {
          '@type': 'FAQPage',
          '@id': `${url}#faq`,
          mainEntity: page.faq.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        { ...BUSINESS, description: dict.meta.description },
      ],
    }
  }

  if (route.kind === 'faq') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'FAQPage',
          url,
          inLanguage: route.lng,
          mainEntity: dict.pages.faq.items.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        { ...BUSINESS, description: dict.meta.description },
      ],
    }
  }

  return {
    '@context': 'https://schema.org',
    ...BUSINESS,
    url,
    description: meta.description,
    inLanguage: route.lng,
  }
}

/** Resolves a dot-path key ('pages.faq.title') inside a locale dict, loudly. */
function tKey(dict, key) {
  const value = key.split('.').reduce((obj, part) => obj?.[part], dict)
  if (typeof value !== 'string' || !value) {
    throw new Error(`Missing locale value for key "${key}"`)
  }
  return value
}

function swapMetaContent(html, attr, name, value) {
  const re = new RegExp(`(<meta ${attr}="${name}" content=")[^"]*(")`)
  if (!re.test(html)) {
    throw new Error(`Template has no <meta ${attr}="${name}"> to swap`)
  }
  return html.replace(re, (_, pre, post) => pre + value + post)
}

function swapLink(html, rel, extra, value) {
  const re = new RegExp(`(<link rel="${rel}"${extra} href=")[^"]*(")`)
  if (!re.test(html)) {
    throw new Error(`Template has no <link rel="${rel}"${extra}> to swap`)
  }
  return html.replace(re, (_, pre, post) => pre + value + post)
}

// --- Render ------------------------------------------------------------------
const { render, routes, metaKeysFor } = await import(
  pathToFileURL(path.join(dist, 'server/entry-server.js')).href
)
const template = readFileSync(path.join(dist, 'index.html'), 'utf8')
const allRoutes = routes()

/** title/description per page type — same key source as the client hook. */
function metaFor(route, dict) {
  const keys = metaKeysFor(route)
  return {
    ...dict.meta,
    title: tKey(dict, keys.title),
    description: tKey(dict, keys.description),
  }
}

/** The same page in each language, for hreflang. Throws if one is missing. */
function alternates(route) {
  const alts = allRoutes.filter(
    r =>
      r.kind === route.kind &&
      (r.serviceId ?? null) === (route.serviceId ?? null)
  )
  const es = alts.find(r => r.lng === 'es')
  const en = alts.find(r => r.lng === 'en')
  if (!es || !en) {
    throw new Error(`Missing language alternate for ${route.path}`)
  }
  return { es, en }
}

for (const route of allRoutes) {
  const dict = locales[route.lng]
  const meta = metaFor(route, dict)
  const url = SITE + route.path
  const { es: esAlt, en: enAlt } = alternates(route)

  let html = template
    .replace('<html lang="es">', `<html lang="${route.lng}">`)
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${meta.title}</title>`)
    .replace(
      /<meta name="description"[^>]*\/>/,
      () => `<meta name="description" content="${meta.description}" />`
    )
    .replace(
      '<!--head-seo-->',
      () =>
        [
          `<meta property="og:locale:alternate" content="${OG_LOCALE[route.lng === 'es' ? 'en' : 'es']}" />`,
          `<script type="application/ld+json">${JSON.stringify(jsonLd(route, meta, dict))}</script>`,
          // Only the home page renders the hero, so only it preloads the LCP
          // image — elsewhere the preload would be an unused download. The
          // srcset/sizes must match HeroSection's <img> exactly, or the browser
          // preloads one file and then fetches a different one.
          ...(route.kind === 'home' ? [heroPreload()] : []),
        ].join('\n  ')
    )
    .replace('<!--app-html-->', () => render(route.path))

  html = swapLink(html, 'canonical', '', url)
  html = swapLink(html, 'alternate', ' hreflang="es"', SITE + esAlt.path)
  html = swapLink(html, 'alternate', ' hreflang="en"', SITE + enAlt.path)
  html = swapLink(html, 'alternate', ' hreflang="x-default"', SITE + esAlt.path)
  html = swapMetaContent(html, 'name', 'keywords', meta.keywords)
  html = swapMetaContent(html, 'property', 'og:url', url)
  html = swapMetaContent(html, 'property', 'og:title', meta.title)
  html = swapMetaContent(html, 'property', 'og:description', meta.description)
  html = swapMetaContent(html, 'property', 'og:image:alt', meta.ogImageAlt)
  html = swapMetaContent(html, 'property', 'og:locale', OG_LOCALE[route.lng])
  html = swapMetaContent(html, 'name', 'twitter:title', meta.title)
  html = swapMetaContent(html, 'name', 'twitter:description', meta.description)

  // Only the Spanish root redirects by browser language.
  if (route.kind === 'home' && route.lng === 'es') {
    html = html.replace('</head>', `${REDIRECT_SNIPPET}\n</head>`)
  }

  const outPath = path.join(dist, route.path.replace(/^\//, ''), 'index.html')
  mkdirSync(path.dirname(outPath), { recursive: true })
  writeFileSync(outPath, html)
  console.log(`prerendered ${route.path} (${route.lng})`)
}

// --- Sitemap -----------------------------------------------------------------
const lastmod = new Date().toISOString().slice(0, 10)
const entries = allRoutes.map(route => {
  const { es: esAlt, en: enAlt } = alternates(route)
  return `  <url>
    <loc>${SITE}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="es" href="${SITE}${esAlt.path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${enAlt.path}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${esAlt.path}" />
  </url>`
})

writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
)
console.log(`generated sitemap.xml (${entries.length} urls)`)

// GitHub Pages serves 404.html for unknown routes: fall back to the Spanish home.
copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'))

// Don't publish the SSR bundle.
rmSync(path.join(dist, 'server'), { recursive: true, force: true })
console.log('done')
