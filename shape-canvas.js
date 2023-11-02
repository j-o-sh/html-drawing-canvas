import { onDOMChange} from './lib/components'

class TheCircle extends HTMLElement {

  // static observedAttributes = ['radius', 'x', 'y']

  /**
   * @param {{ radius?: number, x?: number, y?: number }} [attrs={}] 
   */
  constructor(attrs = {}) {
    super()
    for (const [k, v] of Object.entries(attrs)) {
      this.setAttribute(k, v)
    }
  }
}

class TheCanvas extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
    this.shadow.innerHTML = this.template()
    this.shadow.addEventListener('click', event => {
      this.append(new TheCircle({ radius: 30, x: event.offsetX, y: event.offsetY }))
    })
    onDOMChange(this, this.render)
  }

  template() {
    return `
      <style>
        :host {
          display: flex;
          cursor: crosshair;
        }
      </style>
      <canvas></canvas>
    `
  }

  render() {
    const canvas = this.shadow.querySelector('canvas')
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = this.computedStyleMap().get('color')
    ctx.strokeStyle = this.computedStyleMap().get('color')
    ctx.lineWidth = 5
  
    for (const shape of this.querySelectorAll('shape-circle')) {
      const [x, y, radius] = [
        shape.getAttribute('x'),
        shape.getAttribute('y'),
        shape.getAttribute('radius')
      ]

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
      ctx.closePath()
      ctx.stroke()
    }
  }

  connectedCallback() {
    this.render()
  }
}

customElements.define('shape-circle', TheCircle)
customElements.define('shape-canvas', TheCanvas)

console.log('👻')

