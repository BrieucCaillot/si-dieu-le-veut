<template>
  <div>
    <Head lang="fr">
      <Title>{{ title }}</Title>
      <Meta name="keywords" content="si dieu le veut, project, threejs, nuxt3, vue, gobelins, 2022, brieuc caillot, karl justiniano, ouri levin, daria duvernois, emma rimbert" />
      <Meta name="description" :content="title" />
      <Meta name="og:title" :content="title" />
      <Meta name="og:description" :content="description" />
      <Meta name="og:type" content="website" />
      <Meta name="og:url" :content="url" />
      <Meta name="og:image" :content="`${url}/preview.png`" />
      <Meta name="og:image:width" content="1200" />
      <Meta name="og:image:height" content="630" />
      <Meta name="og:image:type" content="image/png" />
      <Meta name="og:image:alt" :content="title" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" :content="description" />
      <Meta name="twitter:description" :content="description" />
      <Meta name="twitter:image" :content="`${url}/preview.png`" />
      <Meta name="twitter:image:alt" :content="`${title} - Preview`" />
    </Head>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/tailwind.css'
import '@/assets/sass/styles.scss'

const url = 'https://si-dieu-le-veut.vercel.app'
const title = 'Si Dieu le veut'
const description = ref('Aide un malheureux cuisinier survivre à l’ordalie à laquelle il a été condamné après avoir été injustement accusé en tapant le plus vite possible !')
</script>

<style lang="scss">
body {
  @apply font-secondary;
}
</style>
