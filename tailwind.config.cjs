/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#B5451B',              // Terracotta — warm, distinctive
        'accent-secondary': '#3D6B52',  // Forest sage
        'accent-soft': '#FEF0E8',       // Warm peach tint
        'warm-bg': '#F9F7F4',           // Warm parchment
        surface: '#FFFFFF',
        ink: '#1C1812',                 // Warm near-black
        'ink-muted': '#7A6D63',         // Warm brownish-gray
        'border-soft': '#EAE2D8',       // Warm beige border
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
