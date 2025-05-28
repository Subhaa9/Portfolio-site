/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          800: '#1E3A8A', // Primary
        },
        teal: {
          600: '#0D9488', // Secondary
        },
        amber: {
          600: '#D97706', // Accent
        },
        success: '#059669',
        warning: '#F59E0B',
        error: '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.animation-delay-0': { 'animation-delay': '0ms' },
        '.animation-delay-200': { 'animation-delay': '200ms' },
        '.animation-delay-400': { 'animation-delay': '400ms' },
        '.animation-delay-600': { 'animation-delay': '600ms' },
        '.animation-delay-800': { 'animation-delay': '800ms' },
      });
    },
  ],
};
