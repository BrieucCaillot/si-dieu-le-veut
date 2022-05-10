<template>
	<div>
		<div class="flex items-center">
			<button @click="fetchData" class="text-white bg-black rounded-lg p-3 whitespace-nowrap">Fetch Data</button>

			<p class="text-white block ml-3">
				{{ data }}
			</p>
		</div>
		<div class="flex items-center">
			<button class="text-white bg-black rounded-lg p-3 mt-6 whitespace-nowrap">
				<span class="block">Check User is valid </span>
				<input :value="username" @input="(event) => (username = event.target.value.trim())" @keyup.enter="getIsUsernameValid" placeholder="username" type="text" class="text-black mt-3" />
			</button>

			<p class="text-white block ml-3">
				{{ username }}
			</p>
			<p class="text-white block ml-3" v-if="isUsernameValid">: {{ isUsernameValid ? 'username valid' : 'username is not valid' }}</p>
		</div>
		<button @click="sendTweet" class="text-white bg-black rounded-lg p-3 mt-6">
			<span class="block"> Send Tweet</span>
		</button>

		<span class="block">
			{{ isTweetSent ? 'Tweet sent' : 'Tweet not sent' }}
		</span>
	</div>
</template>

<script setup lang="ts">
const data = ref(null)
const username = ref(null)
const isUsernameValid = ref(null)
const isTweetSent = ref(null)

const fetchData = async () => {
	const res = await useFetch(() => '/api/fetchData')
	useState('data', () => res.data.value)
	data.value = res.data.value
}

const getIsUsernameValid = async () => {
	console.log(username.value)
	const res = await useFetch(() => '/api/twitter/isUsernameValid', { params: { username: username.value.trim() } })
	console.log(res.data)
	// const isValid = res.data.value !== null
	// console.log(res.data.value)
	// isUsernameValid.value = isValid
	// useState('username', () => res.data)
}

const sendTweet = async () => {
	const data = useState('data')

	const { insults } = data.value
	console.log(insults)
	// const res = await useFetch(() => '/api/twitter/sendTweet', { params: { username: 'thecockpiper' } })
	// isUsernameValid.value = res.data
	// isTweetSent.value =
}
</script>
