/** @type {import('tailwindcss').Config} */
module.exports = {
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
