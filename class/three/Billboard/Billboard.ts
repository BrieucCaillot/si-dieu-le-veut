import Tapisserie from '@/class/three/World/Tapisserie'
import Character from '@/class/three/World/Character'

class Billboard {
	tapisserie: Tapisserie
	character: Character

	constructor() {
		this.tapisserie = new Tapisserie()
		this.character = new Character()
	}

	update() {
		this.character.update()
	}
}

export default Billboard
