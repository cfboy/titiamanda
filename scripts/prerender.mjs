/**
 * Post-build prerender: emits fully rendered, SEO-tagged HTML per locale.
 *   /            → Spanish (default, x-default)
 *   /en/         → English
 * Also generates dist/sitemap.xml and dist/404.html, then removes the SSR bundle.
 * Runs after `vite build` (client) + `vite build --ssr` (server bundle).
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

const es = JSON.parse(
  readFileSync(path.join(root, 'src/locales/es.json'), 'utf8')
)
const en = JSON.parse(
  readFileSync(path.join(root, 'src/locales/en.json'), 'utf8')
)

// --- Guard: locale files must have identical key sets -----------------------
function flattenKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? flattenKeys(v, `${prefix}${k}.`)
      : [`${prefix}${k}`]
  )
}
const esKeys = new Set(flattenKeys(es))
const enKeys = new Set(flattenKeys(en))
const missing = [
  ...[...esKeys].filter(k => !enKeys.has(k)).map(k => `en missing: ${k}`),
  ...[...enKeys].filter(k => !esKeys.has(k)).map(k => `es missing: ${k}`),
]
if (missing.length) {
  console.error('Locale key mismatch:\n  ' + missing.join('\n  '))
  process.exit(1)
}

// --- Locale definitions -----------------------------------------------------
const LOCALES = [
  {
    lng: 'es',
    ogLocale: 'es_PR',
    ogLocaleAlt: 'en_US',
    url: `${SITE}/`,
    outFile: 'index.html',
    meta: es.meta,
  },
  {
    lng: 'en',
    ogLocale: 'en_US',
    ogLocaleAlt: 'es_PR',
    url: `${SITE}/en/`,
    outFile: 'en/index.html',
    meta: en.meta,
  },
]

const HREFLANG_LINKS = [
  `<link rel="alternate" hreflang="es" href="${SITE}/" />`,
  `<link rel="alternate" hreflang="en" href="${SITE}/en/" />`,
  `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
].join('\n  ')

// First-visit language redirect (Spanish root only). Skips crawlers so
// Googlebot's en-US renderer never gets bounced off the Spanish page, and
// skips anyone with a stored preference (set by the switcher or a prior visit).
const REDIRECT_SNIPPET = `<script>(function(){try{if(/bot|crawl|spider|slurp|bing|duckduck|baidu|yandex|facebookexternalhit|whatsapp|telegram|preview|lighthouse/i.test(navigator.userAgent))return;if(localStorage.getItem('i18nextLng'))return;if((navigator.language||'').toLowerCase().indexOf('en')===0){localStorage.setItem('i18nextLng','en');location.replace('/en/'+location.hash)}}catch(e){}})();</script>`

function jsonLd({ lng, url, meta }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ChildCare',
    name: 'Titi Amanda Babysitter Services',
    url,
    description: meta.description,
    image: OG_IMAGE,
    logo: `${SITE}/assets/images/logo/logo-icon.svg`,
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
    inLanguage: lng,
  }
}

function headTags(locale) {
  const { meta, url, ogLocale, ogLocaleAlt } = locale
  return [
    `<link rel="canonical" href="${url}" />`,
    HREFLANG_LINKS,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${meta.title}" />`,
    `<meta property="og:description" content="${meta.description}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${meta.ogImageAlt}" />`,
    `<meta property="og:site_name" content="Titi Amanda" />`,
    `<meta property="og:locale" content="${ogLocale}" />`,
    `<meta property="og:locale:alternate" content="${ogLocaleAlt}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${meta.title}" />`,
    `<meta name="twitter:description" content="${meta.description}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(locale))}</script>`,
  ].join('\n  ')
}

// --- Render -----------------------------------------------------------------
const { render } = await import(
  pathToFileURL(path.join(dist, 'server/entry-server.js')).href
)
const template = readFileSync(path.join(dist, 'index.html'), 'utf8')

for (const locale of LOCALES) {
  const appHtml = render(locale.lng)
  let html = template
    .replace('<html lang="es">', `<html lang="${locale.lng}">`)
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${locale.meta.title}</title>`)
    .replace(
      /<meta name="description"[^>]*\/>/,
      () => `<meta name="description" content="${locale.meta.description}" />`
    )
    .replace('<!--head-seo-->', () => headTags(locale))
    .replace('<!--app-html-->', () => appHtml)

  if (locale.lng === 'es') {
    html = html.replace('</head>', `${REDIRECT_SNIPPET}\n</head>`)
  }

  const outPath = path.join(dist, locale.outFile)
  mkdirSync(path.dirname(outPath), { recursive: true })
  writeFileSync(outPath, html)
  console.log(`prerendered ${locale.outFile} (${locale.lng})`)
}

// --- Sitemap ----------------------------------------------------------------
const lastmod = new Date().toISOString().slice(0, 10)
const sitemapEntry = url => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="es" href="${SITE}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/en/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/" />
  </url>`

writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LOCALES.map(l => sitemapEntry(l.url)).join('\n')}
</urlset>
`
)
console.log('generated sitemap.xml')

// GitHub Pages serves 404.html for unknown paths — fall back to the Spanish home.
copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'))

// Don't ship the SSR bundle.
rmSync(path.join(dist, 'server'), { recursive: true, force: true })
console.log('done')
