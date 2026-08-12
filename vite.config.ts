import path from 'path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Long-lived vendor code, split out of the app chunk so editing a component
 * doesn't invalidate ~350 kB of unchanged library code in visitors' caches, and
 * so the browser can fetch the pieces in parallel.
 *
 * Only libraries that hydration genuinely needs are listed. Everything else is
 * left to Rollup, which already gives code reached solely through a dynamic
 * import (the contact drawer) its own chunk — carving those up by hand only
 * risks pulling deferred code back into the critical path.
 */
const VENDOR_CHUNKS: Record<string, RegExp> = {
  'vendor-react': /node_modules\/(react|react-dom|scheduler)\//,
  'vendor-motion': /node_modules\/(framer-motion|motion-dom|motion-utils)\//,
  'vendor-i18n':
    /node_modules\/(i18next|react-i18next|html-parse-stringify|void-elements)\//,
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          for (const [chunk, pattern] of Object.entries(VENDOR_CHUNKS)) {
            if (pattern.test(id)) return chunk
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
