<template>
	<div>
		<Head lang="en> 50 ? 'en-GB' : 'en-US'">
			<Title>Nuxt3 ThreeJS Starter</Title>
			<Meta name="description" content="Nuxt3 ThreeJS Starter" />
		</Head>
		<NuxtLayout name="default">
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import '@/assets/css/tailwind.css'
import '@/assets/sass/styles.scss'

const { data } = await useFetch(() => '/api/data')
</script>

<style lang="scss">
body {
	@apply font-sans;
}
</style>
