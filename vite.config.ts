import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173,
    watch: {
      ignored: ['**/server/**', '**/shortlinks.json', '**/.system_generated/**']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/r': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
