import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// Inlined here to avoid CJS/ESM conflict with postcss-load-config
const tailwindConfig = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent:          '#2A5E40',   // Forest green
        'accent-soft':   '#EBF4EE',   // Pale sage
        'warm-bg':       '#F8F6F2',   // Warm parchment
        surface:         '#FFFFFF',
        ink:             '#111710',   // Warm near-black
        'ink-muted':     '#5C6B5E',   // Warm sage-gray
        'border-soft':   '#DDE5DE',   // Soft sage border
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"DM Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
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
