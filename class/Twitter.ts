import TWITTER from '@/constants/TWITTER'

class Twitter {
	tweet: {
		username: string
		insult: string
		accused: string
		death: string
	}
	data: {
		insults: {
			insult: string
			coef: number
		}[]
		accused: {
			name: string
			description: string
		}[]
		deaths: string[]
	}
	usernameValid: boolean
	username: string
	constructor() {}

	setup() {
		this.usernameValid = false
		this.username = 'ThePiperCock'
		this.attachEvent()

		this.getData()

		// this.tweet = {
		//   username: 'tweet sent from nodejs',
		// }
	}

	attachEvent = () => {
		console.log('attach event')

		const usernameInput = <HTMLInputElement>document.getElementById('username-input')

		document.getElementById('btn').addEventListener('click', () => this.sendTweet({ insult: 1, accused: 1, death: 1 }))
		usernameInput.addEventListener('keyup', (e: any) => {
			if (e.code === 'Enter') this.isUsernameValid(e.target.value)
		})
	}

	getData = async () => {
		const res = await fetch(`${TWITTER.API}/data`)
		const data = await res.json()
		console.log(data)

		this.data = data
	}

	sendTweet = async ({ insult, accused, death }: { insult: number; accused: number; death: number }) => {
		console.log('tweet!')

		console.log(insult, accused, death)

		const res = await fetch(`${TWITTER.API}/tweet`, {
			method: 'POST',
			body: JSON.stringify({
				username: this.username,
				insult,
				accused,
				death,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		console.log(res)
	}

	isUsernameValid = async (username: string) => {
		console.log('request sent to', TWITTER.API)

		const res = await fetch(`${TWITTER.API}/isUsernameValid`, {
			method: 'POST',
			body: JSON.stringify({ username }),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const result: {
			error?: string
			isValid: boolean
		} = await res.json()

		// result.error ? (this.usernameValid = false) : (this.usernameValid = true)

		if (result.error) {
			this.usernameValid = true
			this.username = username
			console.log('ok! username saved')
		} else {
			this.appendError(result.error)
			this.usernameValid = false
			this.username = ''
		}
	}

	appendError(error: string) {
		console.log('append error')

		const p = document.createElement('p')
		p.setAttribute('class', 'error')
		p.innerHTML = error
		document.body.appendChild(p)
	}
}

export default new Twitter()
