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
        green: '#00FF00',
        red: '#FF0000',
        typingDoneColor: '#2D2923',
        typingActiveLetter: '#A3411F',
        typingBaseColor: '#ffffff',
      },
    },
    fontFamily: {
      primary: ['Mordova', 'sans-serif'],
      secondary: ['PirataOne', 'sans-serif'],
    },
  },
  plugins: [],
}
