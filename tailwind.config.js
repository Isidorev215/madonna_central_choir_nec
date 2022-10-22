/** @type {import('tailwindcss').Config} */
const formKitTailwind = require('@formkit/themes/tailwindcss');

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mcc-blue": "#2494D0",
        "mcc-dark-blue": "#254d62",
        "mcc-light-gray": "#D3DEE5",
        "mcc-red": "#C92125",
        "mcc-dark-gray": "#887C7C",
        "mcc-text": "#2c3e50",
        "mcc-anchor": "#42b983",
      },
      backgroundImage: {
        "whatsapp-bg": "url('/src/assets/img/whatsapp-bg.jpg')",
        "login-bg": "url('/src/assets/img/login-bg.webp')",
      },
      boxShadow: {
        s1: "0px 146px 88px rgba(31, 41, 62, 0.01), 0px 65px 65px rgba(31, 41, 62, 0.01), 0px 16px 36px rgba(31, 41, 62, 0.01), 0px 0px 0px rgba(31, 41, 62, 0.01);",
        s2: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      zIndex: {
        spinner: "900",
        modal: "800",
        chatlist: "750",
        navbar: "700",
        popUp: "600",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [formKitTailwind],
};
