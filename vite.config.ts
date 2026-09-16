import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// Wzornik Maturalny — offline-first PWA
// Cache-first strategy: app shell (HTML/JS/CSS) + fonts are precached on
// first visit so every calculator works with zero network access.
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.svg'],
      manifest: {
        name: 'Wzornik Maturalny',
        short_name: 'Wzornik',
        description: 'Wzory i kalkulatory maturalne — działa offline.',
        theme_color: '#F6F7F3',
        background_color: '#F6F7F3',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: 'icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
          { src: 'icons/icon-maskable.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' }
        ]
      },
      workbox: {
        // Precache the whole app shell so navigation works with no network at all.
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        runtimeCaching: [
          {
            // Google Fonts fallback cache, in case fonts are ever loaded remotely
            // during development. Production build should self-host fonts.
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-cache',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          }
        ],
        // Bump this (or rely on precache manifest hashing) on every release so
        // clients on an old cached shell pick up the update instead of getting stuck.
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      },
      devOptions: {
        enabled: true
      }
    })
  ]
})
