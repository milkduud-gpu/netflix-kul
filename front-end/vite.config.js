import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site under /netflix-kul/; dev server stays at the root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/netflix-kul/' : '/',
  plugins: [react()],
}))
