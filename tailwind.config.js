/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        4: '1rem',
        6: '1.5rem',
      },
    },
  },
  plugins: [],
};
