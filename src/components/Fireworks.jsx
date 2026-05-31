import { useEffect, useRef } from 'react'

const COLORS = ['#FFD700','#FF6B9D','#9B59B6','#FF7F50','#1ABC9C','#FF4081','#00BCD4','#CDDC39']

function hexRgb(hex) {
  return [1,3,5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(',')
}

class Particle {
  constructor(x, y, color) {
    this.x = x; this.y = y; this.color = color
    const a = Math.random() * Math.PI * 2
    const s = Math.random() * 7 + 2
    this.vx = Math.cos(a) * s
    this.vy = Math.sin(a) * s
    this.alpha = 1
    this.decay = Math.random() * 0.014 + 0.009
    this.r = Math.random() * 3 + 1
    this.trail = []
  }
  update() {
    this.trail.push({ x: this.x, y: this.y })
    if (this.trail.length > 6) this.trail.shift()
    this.vy += 0.09
    this.x += this.vx; this.y += this.vy
    this.alpha -= this.decay
  }
  draw(ctx) {
    this.trail.forEach((pt, i) => {
      ctx.beginPath()
      ctx.arc(pt.x, pt.y, this.r * (i / this.trail.length) * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${hexRgb(this.color)},${(i / this.trail.length) * this.alpha * 0.3})`
      ctx.fill()
    })
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${hexRgb(this.color)},${this.alpha})`
    ctx.fill()
  }
  get done() { return this.alpha <= 0 }
}

class Shell {
  constructor(canvas, tx, ty) {
    this.canvas   = canvas
    this.x        = tx ?? Math.random() * canvas.width
    this.y        = canvas.height
    this.targetY  = ty ?? Math.random() * canvas.height * 0.5
    this.color    = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.speed    = Math.random() * 6 + 8
    this.particles= []
    this.exploded = false
  }
  update() {
    if (!this.exploded) {
      this.y -= this.speed
      if (this.y <= this.targetY) this.explode()
    } else {
      this.particles.forEach(p => p.update())
      this.particles = this.particles.filter(p => !p.done)
    }
  }
  explode() {
    this.exploded = true
    const n = 80 + Math.floor(Math.random() * 50)
    for (let i = 0; i < n;  i++) this.particles.push(new Particle(this.x, this.y, this.color))
    for (let i = 0; i < 25; i++) this.particles.push(new Particle(this.x, this.y, '#FFD700'))
  }
  draw(ctx) {
    if (!this.exploded) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(this.x, this.y + 12)
      ctx.strokeStyle = `rgba(${hexRgb(this.color)},0.4)`
      ctx.lineWidth = 2
      ctx.stroke()
    } else {
      this.particles.forEach(p => p.draw(ctx))
    }
  }
  get done() { return this.exploded && this.particles.length === 0 }
}

export default function Fireworks() {
  const canvasRef = useRef(null)
  const shellsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      shellsRef.current.forEach(s => { s.update(); s.draw(ctx) })
      shellsRef.current = shellsRef.current.filter(s => !s.done)
      animId = requestAnimationFrame(animate)
    }
    animate()

    // Listen for manual launches from other components
    const onLaunch = e => {
      const { x, y, count = 3 } = e?.detail || {}
      for (let i = 0; i < count; i++) {
        const dx = x ? (Math.random() - 0.5) * 180 : undefined
        shellsRef.current.push(
          new Shell(canvas, x ? x + dx : undefined, y ? y - Math.random() * 200 : undefined)
        )
      }
    }
    window.addEventListener('fireworks:launch', onLaunch)

    // Auto-launch
    const auto = setInterval(() => {
      if (Math.random() < 0.7) shellsRef.current.push(new Shell(canvas))
    }, 2200)

    // Opening burst
    setTimeout(() => {
      for (let i = 0; i < 6; i++)
        setTimeout(() => shellsRef.current.push(new Shell(canvas)), i * 280)
    }, 600)

    // Click-to-launch (excluding buttons/balloons)
    const onClick = e => {
      const t = e.target
      if (t.tagName === 'BUTTON' || t.closest('button') || t.closest('.balloon-el')) return
      for (let i = 0; i < 3; i++)
        setTimeout(
          () => shellsRef.current.push(new Shell(canvas, e.clientX + (Math.random()-0.5)*120, e.clientY - Math.random()*200)),
          i * 110
        )
    }
    window.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(auto)
      window.removeEventListener('resize', resize)
      window.removeEventListener('fireworks:launch', onLaunch)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
      }}
    />
  )
}
