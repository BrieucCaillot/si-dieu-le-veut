<template>
	<div id="home" class="absolute bottom-[5%]">
		<h2 class="text-2xl pb-5 text-white">Welcome 👋</h2>
		<h2 class="text-xl text-white">Bouc & Misères</h2>
		<p class="text-white">
			{{ insultes }}
		</p>
	</div>
</template>

<script setup lang="ts">
const insultes = useState('insultes')
</script>
