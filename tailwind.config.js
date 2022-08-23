/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mcc-blue': '#2494D0',
        'mcc-light-gray': '#D3DEE5',
        'mcc-red': '#C92125',
        'mcc-dark-gray': '#887C7C',
        'mcc-text': '#2c3e50',
        'mcc-anchor': '#42b983'
        // 'normal-black': '#2D3139',
        // 'normal-green': '#128A5F',
        // 'dark-green': '#0F734E',
        // 'light-green': '#E4F8F1',
        // 'tick-green': '#27AE60',
        // 'normal-gray': '#F5F5F5',
        // 'dark-gray-1': '#F1F2F6',
        // 'dark-gray-2': '#CACACA',
        // 'dark-gray-3': '#F0F2F5',
        // 'normal-purple': '#A20CBA',
        // 'light-purple': '#B07C9B',
        // 'chat-left': '#f2f2f2',
        // 'chat-right': '#e2f7cb',
      },
      backgroundImage: {
        'whatsapp-bg': "url('/src/assets/img/whatsapp-bg.jpg')",
        'login-bg': "url('/src/assets/img/login-bg.png')",
      },
      boxShadow: {
        's1': "0px 146px 88px rgba(31, 41, 62, 0.01), 0px 65px 65px rgba(31, 41, 62, 0.01), 0px 16px 36px rgba(31, 41, 62, 0.01), 0px 0px 0px rgba(31, 41, 62, 0.01);",
        's2': "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      },
      zIndex: {
        'spinner': '900',
        'modal': '800',
        'chatlist': '750',
        'navbar': '700',
        'popUp': '600'
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif']
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [
  ],
}