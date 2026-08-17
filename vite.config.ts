import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Cross-origin isolation headers. The FSRS optimizer (fsrs-browser) needs
// SharedArrayBuffer, which requires a cross-origin-isolated context. The dev
// and preview servers set these headers directly; in production the service
// worker injects them (GitHub Pages cannot set response headers).
const coiHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
}

// https://vite.dev/config/
export default defineConfig({
  base: '/arabica/',
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    headers: coiHeaders,
  },
  preview: {
    headers: coiHeaders,
  },
  worker: {
    format: 'es',
  },
  build: {
    // Top-level await in main.tsx and the wasm worker need a modern target.
    target: 'esnext',
  },
  optimizeDeps: {
    // fsrs-browser ships wasm + nested workers; pre-bundling breaks their URLs.
    exclude: ['fsrs-browser'],
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'arabica',
        short_name: 'arabica',
        description: 'Personal Arabic study: flashcards and grammar reference',
        lang: 'en',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#e9e7e2',
        background_color: '#e9e7e2',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          // A maskable icon is full-bleed art the platform crops itself. The
          // rounded tile cannot serve here: Android would inscribe it in a
          // circle and leave the four transparent corners as notches.
          {
            src: 'icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      injectManifest: {
        // Precache the wasm too, so optimization works fully offline.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,wasm}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
    }),
  ],
})
