import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
//import { resolve } from 'path'
import react from '@vitejs/plugin-react'

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  root: '.',
  base: './',
  server: {
    port: 5002,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
