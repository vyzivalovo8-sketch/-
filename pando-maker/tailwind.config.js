/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        aceBlue: '#1dcfff',
        aceDark: '#070b17',
      },
      boxShadow: {
        glass: '0 0 30px rgba(29, 207, 255, 0.22)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
