/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#C4600A',          // Amber — warm, distinctive, not AI
        'accent-soft': '#FEF2E4',   // Pale amber tint
        'warm-bg': '#FAFAF8',       // Near-white warm parchment
        surface: '#FFFFFF',
        ink: '#100F0C',             // Rich warm near-black
        'ink-muted': '#6A6662',     // Warm mid-gray
        'border-soft': '#E8E3DB',   // Warm beige border
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
