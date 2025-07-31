/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html,pcss}'
  ],
  theme: {
    extend: {
      colors: {
        'dash-brand': 'var(--color-dash-brand)',
        'dash-brand-dim': 'var(--color-dash-brand-dim)',
        'dash-brand-dark': 'var(--color-dash-brand-dark)',
        'dash-brand-darkness': 'var(--color-dash-brand-darkness)',
        'dash-mint': 'var(--color-dash-mint)',
        'dash-mint-hover': 'var(--color-dash-mint-hover)',
        'dash-yellow-light': 'var(--color-dash-yellow-light)',
        'dash-yellow': 'var(--color-dash-yellow)',
        'dash-primary-die-subdued': 'var(--color-dash-primary-die-subdued)',
        'dash-primary-dark-blue': 'var(--color-dash-primary-dark-blue)',
      },
      fontFamily: {
        'dash-main': 'var(--font-dash-main)',
        'dash-grotesque': 'var(--font-dash-grotesque)',
      }
    },
  },
  plugins: [],
}