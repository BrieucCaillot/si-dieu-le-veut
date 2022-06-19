module.exports = {
  mode: 'jit',
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    // './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffeebf',
        green: '#00FF00',
        red: '#FF0000',
        typingDoneColor: '#2D2923',
        food: {
          base: '#9F9789',
          error: '#A3411F',
          valid: '#2D2923',
        },
        bbq: {
          valid: '#2D2923',
        },
        croix: {
          base: '#9F9789',
          error: '#A3411F',
          valid: '#2D2923',
        },
        black: {
          full: '#000000',
          primary: '#2D2923',
        },
      },
    },
    fontFamily: {
      primary: ['Mordova', 'sans-serif'],
      secondary: ['PirataOne', 'sans-serif'],
    },
  },
  plugins: [],
}
