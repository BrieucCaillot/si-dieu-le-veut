<template>
  <div>
    <Head lang="en> 50 ? 'en-GB' : 'en-US'">
      <Title>Si Dieu le veut</Title>
      <Meta name="description" content="Si Dieu le veut" />
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
