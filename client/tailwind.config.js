/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FFA500', // Orange
        secondary: '#000000', // Black
        accent: '#ffffff', // White
        dark: '#1D1616',
        light: 'orange-50',
      },
    },
  },
  plugins: [],
}

