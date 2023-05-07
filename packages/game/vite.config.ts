import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1024,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "masked-icon.svg",
        "pwa-192x192.png",
        "pwa-256x256.png",
      ],
      manifest: {
        short_name: "maxjongg",
        name: "maxjongg",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
        ],
        start_url: ".",
        display: "fullscreen",
        theme_color: "#2b223a",
        background_color: "#2b223a",
        orientation: "any",
      },
    }),
  ],
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    watch: {
      ignored: ["!**/node_modules/shared/**"],
    },
  },
  optimizeDeps: {
    exclude: ["shared"],
  },
});
