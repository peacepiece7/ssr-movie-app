/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'c-bg': '#f5f5f4', // * background
      'c-tt': '#1e293b', // * title
      'c-d': '#374151', // * description
      'c-h': '#06b6d4', // * highlight
    },
  },
  plugins: [],
}
