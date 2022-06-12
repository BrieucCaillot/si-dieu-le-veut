<template>
  <div>
    <Head lang="fr">
      <Title>Si Dieu le veut</Title>
      <Meta name="keywords" content="si dieu le veut, project, threejs, nuxt3, vue, gobelins, 2022, brieuc caillot, karl justiniano, ouri levin, daria duvernois, emma rimbert" />
      <Meta name="description" content="Si Dieu le veut" />
      <Meta name="og:title" content="Si Dieu le veut" />
      <Meta name="og:description" content="Si Dieu le veut description" />
      <Meta name="og:type" content="website" />
      <Meta name="og:url" content="https://si-dieu-le-veut.vercel.app/" />
      <Meta name="og:image" content="https://si-dieu-le-veut.vercel.app/images/preview.png" />
      <Meta name="og:image:width" content="1200" />
      <Meta name="og:image:height" content="630" />
      <Meta name="og:image:type" content="image/png" />
      <Meta name="og:image:alt" content="Si Dieu le veut" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content="Si Dieu le veut" />
      <Meta name="twitter:description" content="Si Dieu le veut description" />
      <Meta name="twitter:image" content="https://si-dieu-le-veut.vercel.app/images/preview.png" />
      <Meta name="twitter:image:alt" content="Si Dieu le veut - Preview" />
    </Head>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/tailwind.css'
import '@/assets/sass/styles.scss'
</script>

<style lang="scss">
body {
  @apply font-secondary;
}
</style>
