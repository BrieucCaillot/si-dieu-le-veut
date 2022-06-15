import * as THREE from 'three'
import gsap from 'gsap'
import debounce from 'lodash.debounce'

import useHUD from '@/composables/useHUD'

interface SocialInterface {
  text: string
  hashtags: string
  url: string
}

class Social {
  clicked = false
  clickEvent: void

  twitter: SocialInterface
  facebook: SocialInterface

  objectHovered: {
    name: string
    object: THREE.Object3D
  }
  debounceMoveObject: (object: THREE.Object3D, value: boolean) => void
  debounceOnHoverEnd: (object: THREE.Object3D) => void

  constructor() {
    this.objectHovered = {
      name: '',
      object: new THREE.Object3D(),
    }

    this.debounceMoveObject = debounce(function (object, value) {
      this.moveObject(object, value)
    }, 500)

    this.debounceOnHoverEnd = debounce(function (object: THREE.Object3D) {
      this.onHoverEnd(object)
    }, 100)
  }

  setup() {
    // this.url = document.URL
    this.twitter = {
      text: `You are dead bro, ton score est de ${useHUD().score.value}. Si tu veux essayer à ton tour, ça se passe ici`,
      hashtags: 'sidieuleveut',
      url: 'https://si-dieu-le-veut.vercel.app/',
    }
    this.facebook = {
      text: `You are dead bro, ton score est de ${useHUD().score.value}. Si tu veux essayer à ton tour, ça se passe ici`,
      hashtags: 'sidieuleveut',
      url: 'https://si-dieu-le-veut.vercel.app/',
    }
    this.clickEvent = document.addEventListener('click', () => this.onClick())
  }

  share(name: 'twitter' | 'facebook') {
    switch (name) {
      case 'twitter':
        this.openTwitterLink()
        break
      case 'facebook':
        this.openFacebookLink()
        break
    }
  }

  openTwitterLink() {
    if (!this.clicked) return
    const { text, hashtags, url } = this.twitter
    window.open(`https://twitter.com/share?text=${text}&hashtags=${hashtags}&url=${url}`)
  }

  openFacebookLink() {
    if (!this.clicked) return

    const { text, hashtags, url } = this.facebook

    const queryString = 'cup=blue&bowl=red&spoon=green'
    const shareURL = encodeURIComponent(url + queryString)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareURL}&quote=You_are_amazing&picture=http://fbrell.com/f8.jpg`, 'facebook-share-dialog', 'width=626,height=436,top=100,left=400')
  }

  onClick() {
    this.clicked = true
    setTimeout(() => (this.clicked = false), 100)
  }

  onHover(object) {
    // Share
    this.share(object.name)
    // Move back previous object hovered
    this.debounceMoveObject(this.objectHovered.object, false)

    this.objectHovered = {
      name: object.name,
      object,
    }
    this.moveObject(this.objectHovered.object, true)
    this.debounceOnHoverEnd(object)
  }

  onHoverEnd(object) {
    this.moveObject(object, false)
  }

  moveObject(object: THREE.Object3D, hover: boolean) {
    gsap.to(object.position, {
      duration: 0.5,
      z: hover ? 0.5 : 0,
    })
  }
}

export default new Social()
