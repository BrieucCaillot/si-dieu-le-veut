import { defineNuxtConfig } from 'nuxt'
import glsl from 'vite-plugin-glsl'

export default defineNuxtConfig({
  meta: {
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },
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
