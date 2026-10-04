import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Keep the development cache separate from the existing OneDrive-locked cache.
  cacheDir: '.vite-cache',
})
