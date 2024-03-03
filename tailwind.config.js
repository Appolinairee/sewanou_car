/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1b1b1b",
        light: "#ffffff",
        primary: "rgb(85, 85, 212)",
        primaryDark: "#58E6D9",
        secondary: "#fdd88e",
      },
      screens: {
        'xs': {max: '400px'},
        'sm': {max: '640px'},  
        'md': {max: '768px'},
        'lg': {max: '1024px'},
        'xl': {max: '1280px'},
      },
      padding: {
        section: '2rem'
      },
      boxShadow: {
        boxShadow1: '0 0 28px 0 rgba(0,0,0,.1)',
      },
    },

  plugins: [],
  }
}