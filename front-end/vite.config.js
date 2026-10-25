import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site under /netflix-kul/; Vercel and the dev server use the root.
export default defineConfig(({ command }) => ({
  base: command === 'build' && !process.env.VERCEL ? '/netflix-kul/' : '/',
  plugins: [react()],
}))

//im a comment 