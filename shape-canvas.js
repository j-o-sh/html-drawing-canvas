class TheCircle extends HTMLElement {}
class TheCanvas extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
    this.shadow.innerHTML = this.template()
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

