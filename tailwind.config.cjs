/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#2A5E40',          // Forest green — rich, distinctive, not AI
        'accent-soft': '#EBF4EE',   // Pale sage tint
        'warm-bg': '#F8F6F2',       // Warm parchment
        surface: '#FFFFFF',
        ink: '#111710',             // Warm near-black (slight green undertone)
        'ink-muted': '#5C6B5E',     // Warm sage-gray
        'border-soft': '#DDE5DE',   // Soft sage-green border
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
