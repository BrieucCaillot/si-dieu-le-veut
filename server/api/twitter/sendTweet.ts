import { API_URL } from '@/constants/TWITTER'

export default defineEventHandler(async (event) => {
	const { username, insult, accused, death } = useQuery(event)
	const res = await $fetch(`${API_URL}/tweet`, {
		body: JSON.stringify({
			username,
			insult,
			accused,
			death,
		}),
	})
	return res
})
