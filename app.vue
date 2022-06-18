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
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/tailwind.css'
import '@/assets/sass/styles.scss'

import DIFFICULTY from '@/constants/DIFFICULTY'
import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'

const url = 'https://si-dieu-le-veut.vercel.app'
const title = 'Si Dieu le veut'
const description = ref('Aide un malheureux cuisinier survivre à l’ordalie à laquelle il a été condamné après avoir été injustement accusé en tapant le plus vite possible !')

// Handle URL Query
const route = useRoute()

const { isDebug, isDebugType, isSkippingIntro, debugType } = useStore()
const { difficulty } = useHUD()

const queryDebug = route.query.debug
const queryDifficulty = route.query.d as string
const queryType = route.query.t as OTHERS | ORDALIES | TRANSITIONS
const queryDead = route.query.m
const querySkip = route.query.skip as string

isDebug.value = queryDebug !== undefined && queryDebug !== 'false'
difficulty.value = queryDifficulty <= '4' ? Object.keys(DIFFICULTY)[queryDifficulty] : DIFFICULTY.EASY
isDebugType.value = queryType?.length > 0
isSkippingIntro.value = querySkip !== undefined && queryDebug !== 'false'
OrdalieManager.setIsDead(queryDead !== undefined && queryDead !== 'false')

if (isDebugType.value) {
  debugType.value = queryType
  debugType.value = debugType.value.toUpperCase() as OTHERS | ORDALIES | TRANSITIONS
}
</script>

<style lang="scss">
body {
  @apply font-secondary;
}
</style>
