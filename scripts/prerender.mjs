/**
 * Post-build prerender: emite HTML renderizado y con SEO por cada ruta × idioma.
 *   /                              → home (es, x-default)
 *   /servicios/{slug}/             → páginas de servicio (es)
 *   /preguntas-frecuentes/         → FAQ (es)
 *   /en/ + /en/services/{slug}/    → lo mismo en inglés
 *
 * Genera además dist/sitemap.xml y dist/404.html, y borra el bundle SSR.
 * Corre después de `vite build` (cliente) + `vite build --ssr` (servidor).
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

// --- Guard: los archivos de idioma deben tener las mismas claves ------------
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

// Redirección de idioma en la primera visita (solo raíz española). Excluye
// crawlers para que el renderizador en-US de Googlebot no salga de la página
// en español, y respeta una preferencia ya guardada.
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

/** JSON-LD según el tipo de página. */
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

/** title/description según el tipo de página (espeja metaKeysFor del cliente). */
function metaFor(route, dict) {
  if (route.kind === 'service') {
    const p = dict.pages.services[route.serviceId]
    return { ...dict.meta, title: p.title, description: p.description }
  }
  if (route.kind === 'faq') {
    return {
      ...dict.meta,
      title: dict.pages.faq.title,
      description: dict.pages.faq.description,
    }
  }
  return dict.meta
}

function swapMetaContent(html, attr, name, value) {
  return html.replace(
    new RegExp(`(<meta ${attr}="${name}" content=")[^"]*(")`),
    (_, pre, post) => pre + value + post
  )
}

function swapLink(html, rel, extra, value) {
  return html.replace(
    new RegExp(`(<link rel="${rel}"${extra} href=")[^"]*(")`),
    (_, pre, post) => pre + value + post
  )
}

// --- Render ------------------------------------------------------------------
const { render, routes } = await import(
  pathToFileURL(path.join(dist, 'server/entry-server.js')).href
)
const template = readFileSync(path.join(dist, 'index.html'), 'utf8')
const allRoutes = routes()

/** La misma página en el otro idioma, para hreflang. */
function alternates(route) {
  return allRoutes.filter(
    r =>
      r.kind === route.kind &&
      (r.serviceId ?? null) === (route.serviceId ?? null)
  )
}

for (const route of allRoutes) {
  const dict = locales[route.lng]
  const meta = metaFor(route, dict)
  const url = SITE + route.path
  const alts = alternates(route)
  const esAlt = alts.find(r => r.lng === 'es')
  const enAlt = alts.find(r => r.lng === 'en')

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

  // Solo la raíz española redirige por idioma del navegador.
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
  const alts = alternates(route)
  const esAlt = alts.find(r => r.lng === 'es')
  const enAlt = alts.find(r => r.lng === 'en')
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

// GitHub Pages sirve 404.html en rutas desconocidas: cae al home en español.
copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'))

// No publicar el bundle SSR.
rmSync(path.join(dist, 'server'), { recursive: true, force: true })
console.log('done')
