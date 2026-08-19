/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#09090B',
        neon: '#FF2A6D',
        'neon-dark': '#E1175A',
        bone: '#F5F3EC',
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'Geist', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px rgba(9, 9, 11, 1)',
        'brutal-sm': '3px 3px 0px 0px rgba(9, 9, 11, 1)',
        'brutal-neon': '4px 4px 0px 0px #FF2A6D',
        'brutal-neon-sm': '3px 3px 0px 0px #FF2A6D',
        'brutal-white': '4px 4px 0px 0px rgba(245, 243, 236, 1)',
      },
      borderRadius: {
        brutal: '0',
      },
    },
  },
  plugins: [],
}
