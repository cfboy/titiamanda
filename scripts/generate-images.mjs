/**
 * Regenerates the responsive .webp variants under public/assets/images.
 *
 * Not part of `npm run build` — run it by hand (`npm run images`) after adding
 * or replacing a source photo, and commit the output. Sources are the
 * full-resolution originals that sit next to the variants.
 *
 * Widths are derived from how large each image can ever render (CSS px x2 for
 * retina), and are clamped to the source so nothing is upscaled — two of the
 * committed webp files had been enlarged past their own originals, which cost
 * bytes for no detail.
 */
import { readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.error('sharp is required: npm install')
  process.exit(1)
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'public/assets/images')

/** Largest rendered size, in CSS px, doubled for 2x displays. */
const TARGETS = [
  {
    source: 'hero-picture.png',
    base: 'hero-picture',
    // Hero: 288px on mobile, 500px from lg up.
    widths: [600, 1000],
  },
  {
    source: 'children-coloring.png',
    base: 'children-coloring',
    // Service photo: 448px in the home carousel, 736px on the service page.
    widths: [480, 900, 1472],
  },
  {
    source: 'children-playing.png',
    base: 'children-playing',
    widths: [480, 900, 1472],
  },
  {
    source: 'full-shot-girl-playing-home.jpg',
    base: 'full-shot-girl-playing-home',
    widths: [480, 900, 1472],
  },
  {
    source: 'close-up-child-enjoying-didactic-game.jpg',
    base: 'close-up-child-enjoying-didactic-game',
    widths: [480, 900, 1472],
  },
  {
    // No original for this crop; the 700px webp is the best source there is.
    source: 'titiamanda-profile.webp',
    base: 'titiamanda-profile',
    // Portrait: 224px mobile, 288px md, 320px lg.
    widths: [450, 700],
  },
]

const QUALITY = 80

const kb = file => Math.round(statSync(file).size / 1024)

const manifest = {}

for (const { source, base, widths } of TARGETS) {
  const src = path.join(dir, source)
  const input = readFileSync(src)
  const meta = await sharp(input).metadata()

  // Never upscale: a variant wider than the source only adds bytes.
  const usable = widths.filter(w => w <= meta.width)
  if (!usable.includes(meta.width) && usable.length < widths.length) {
    usable.push(meta.width)
  }

  const variants = []
  for (const width of usable) {
    const height = Math.round((width / meta.width) * meta.height)
    const out = path.join(dir, `${base}-${width}.webp`)
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(out)
    variants.push({ width, height, file: `${base}-${width}.webp` })
    console.log(`  ${base}-${width}.webp`.padEnd(52), `${width}x${height}`.padEnd(11), `${kb(out)} KB`)
  }

  const largest = variants[variants.length - 1]
  manifest[base] = {
    src: `/assets/images/${largest.file}`,
    srcSet: variants
      .map(v => `/assets/images/${v.file} ${v.width}w`)
      .join(', '),
    width: largest.width,
    height: largest.height,
  }
}

writeFileSync(
  path.join(root, 'src/data/images.json'),
  JSON.stringify(manifest, null, 2) + '\n'
)
console.log('\nwrote src/data/images.json')
