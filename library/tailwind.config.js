const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(255, 900, 900, 0.8)"
      },
      colors: {
        primary: colors.blue[300],
        lCd: "",
        lBg: "#f0f8ff",
        dBg: "#141d26",
        dCd: "#092241"

      }
    }
  },
  plugins: []
};

