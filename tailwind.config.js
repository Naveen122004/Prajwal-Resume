/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#07111F',
        navy2: '#0B1728',
        accent: '#2677FF',
        cyan: '#00D4FF',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #2677FF, #00D4FF)',
      },
    },
  },
  plugins: [],
}
