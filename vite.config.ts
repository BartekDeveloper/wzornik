import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// Wzornik Maturalny — offline-first PWA
// Cache-first strategy: app shell (HTML/JS/CSS) + fonts are precached on
// first visit so every calculator works with zero network access.
export default defineConfig({
  // Base './' (Pages) vs '/' (local): build for GitHub Pages with
  // PAGES_BASE=/wzornik/ so router, manifest and precache all carry the subpath.
  base: process.env.PAGES_BASE ?? "/",
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png", "icons/*.png"],
      manifest: {
        name: "Wzornik Maturalny",
        short_name: "Wzornik",
        description: "Wzory i kalkulatory maturalne — działa offline.",
        theme_color: "#0D1117",
        background_color: "#0D1117",
        display: "standalone",
        start_url: "./",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Precache the whole app shell so navigation works with no network at all.
        // woff are KaTeX fonts bundled from its CSS (ttf skipped: legacy only);
        // app fonts live in public/fonts as woff2.
        globPatterns: ["**/*.{js,css,html,svg,woff2,woff,xml,txt}"],
        navigateFallbackDenylist: [/sitemap\.xml$/, /robots\.txt$/, /\/[^/?]+\.[^/?]+($|\?)/],
        runtimeCaching: [],
        // Bump this (or rely on precache manifest hashing) on every release so
        // clients on an old cached shell pick up the update instead of getting stuck.
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
