import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "Mi Rutina",
        short_name: "Rutinas",
        description: "App para registrar rutinas de entrenamiento",
        theme_color: "#f97316",
        background_color: "#f97316",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/favicon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/icons/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],

        screenshots: [
          {
            src: "/screenshots/mobile.png",
            sizes: "540x720",
            type: "image/png"
          },
          {
            src: "/screenshots/desktop.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide"
          }
        ]
        
      }
    })
  ]
})