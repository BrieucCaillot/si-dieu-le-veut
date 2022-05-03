import { API_URL } from '@/constants/TWITTER'

export default async (req, res) => {
	const data = await fetch(`https://pipoback.karljustiniano.fr/data`)

	return data.json()
}
