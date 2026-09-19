/** @type {import('tailwindcss').Config} */
const v = name => `rgb(var(--${name}) / <alpha-value>)`

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: v('accent'),
        'accent-soft': v('accent-soft'),
        'warm-bg': v('bg'),
        surface: v('surface'),
        ink: v('ink'),
        'ink-muted': v('ink-muted'),
        'border-soft': v('border'),
        glow: v('glow'),
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
