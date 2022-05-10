import { API_URL } from '@/constants/TWITTER'

export default defineEventHandler(async (event) => {
	const res = await $fetch(`${API_URL}/data`)
	return res
})
