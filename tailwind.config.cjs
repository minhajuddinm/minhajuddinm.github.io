/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#4F46E5', // Premium Indigo-600
        'accent-secondary': '#7C3AED', // Violet-600
        'accent-soft': '#E0E7FF', // Indigo-100
        'warm-bg': '#FAFAFA', // Soft off-white
        surface: '#FFFFFF', // Pure White Glass
        ink: '#0F172A', // Slate-900
        'ink-muted': '#475569', // Slate-600
        'border-soft': 'rgba(15, 23, 42, 0.08)', // Very soft slate border
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'glow-gradient': 'linear-gradient(135deg, #4F46E5, #7C3AED)',
      }
    },
  },
  plugins: [],
}
