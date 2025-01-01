/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // مسارات ملفات المشروع
  ],

  theme: {
    screens: {
      xs: "320px",
      sm: "375px",
      sml: "500px",
      md: "635px",
      mdl: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      boxShadow: {
        custom: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        firstname: ['"Playfair Display"', 'serif'],
        secondname: ['"Raleway"', 'sans-serif'],
      },
      colors:{
        maincolor:'rgb(17,17,17)',
        touch:'rgb(184,142,47)'
      }
    },
  },
  plugins: [  require('daisyui'),],
}






