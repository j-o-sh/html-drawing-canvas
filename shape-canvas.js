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
        }
        xx:host > * { background: pink; }
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
  
    for (const shape of this.querySelectorAll('shape-circle')) {
      const [x, y, radius] = [
        shape.getAttribute('x'),
        shape.getAttribute('y'),
        shape.getAttribute('radius')
      ]
      ctx.moveTo(x, y)
      ctx.arc(x, y, radius, 0, 360)
      ctx.fill()
    }
  }

  connectedCallback() {
    this.render()
  }
}

customElements.define('shape-circle', TheCircle)
customElements.define('shape-canvas', TheCanvas)

console.log('👻')

