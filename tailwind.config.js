/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981',
          dark: '#059669'
        },
        secondary: 'var(--secondary)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  darkMode: 'class',
} 