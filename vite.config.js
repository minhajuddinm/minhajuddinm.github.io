import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// Tailwind config inlined here to avoid CJS/ESM conflict with postcss-load-config
const tailwindConfig = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#3D3B8E',
        'accent-soft': '#EEEDF8',
        'warm-bg': '#F9F7F4',
        ink: '#1a1a2e',
        'ink-muted': '#5a5a7a',
        'border-soft': '#e8e6e0',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(tailwindConfig), autoprefixer()],
    },
  },
})
