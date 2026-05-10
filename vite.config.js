import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const tailwindConfig = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent:          '#2A5E40',
        'accent-soft':   '#EBF4EE',
        'warm-bg':       '#F8F6F2',
        surface:         '#FFFFFF',
        ink:             '#111710',
        'ink-muted':     '#5C6B5E',
        'border-soft':   '#DDE5DE',
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
      plugins: [
        (await import('tailwindcss')).default(tailwindConfig),
        (await import('autoprefixer')).default(),
      ],
    },
  },
})
