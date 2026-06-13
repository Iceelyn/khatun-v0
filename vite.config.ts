import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev proxy: the browser only ever calls /api/* (same origin), and Vite
// forwards those to the Express server. The Anthropic key stays server-side.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
