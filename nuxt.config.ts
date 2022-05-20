import { defineNuxtConfig } from 'nuxt'
import glsl from 'vite-plugin-glsl'

export default defineNuxtConfig({
  meta: {},
  build: {
    postcss: {
      postcssOptions: require('./postcss.config'),
    },
    transpile: ['three', 'gsap'],
  },
  vite: {
    plugins: [glsl()],
  },
})
