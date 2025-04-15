// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <-- esto es lo importante
  ],
  theme: {
    extend: {
      colors: {
        'celeste': '#A3D8F4',
        'gris': '#B0BEC5',
        'blanco': '#FFFFFF',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
