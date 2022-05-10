import { API_URL } from '@/constants/TWITTER'

export default defineEventHandler(async (event) => {
	const { username }: { username: string } = useQuery(event)
	const res = await $fetch(`${API_URL}/isUsernameValid`, {
		method: 'POST',
		body: {
			username,
		},
		headers: {
			'Content-Type': 'application/json',
		},
	})

	// const result: {
	// 	error?: string
	// 	isValid: boolean
	// } = await res

	return await res
})
