import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const MESSAGES = [
  '✨ Your wish is soaring to the stars!',
  '🌟 The universe heard you, Maris!',
  '💫 May every single dream come true!',
  "⭐ This one's shooting straight to your heart!",
  '🌠 30 years of wishes — this is the most magical!',
]

class ShootingStar {
  constructor(w, h) {
    this.w = w; this.h = h
    this.x = Math.random() * w
    this.y = Math.random() * h * 0.45
    this.len   = Math.random() * 85 + 45
    this.speed = Math.random() * 12 + 5
    this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.45
    this.alpha = 1
    this.color = ['#FFD700','#FF6B9D','#9B59B6','#ffffff','#1ABC9C'][Math.floor(Math.random()*5)]
    this.size  = Math.random() * 2 + 1
    this.alive = true
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed
    this.y += Math.sin(this.angle) * this.speed
    this.alpha -= 0.026
    if (this.alpha <= 0) this.alive = false
  }
  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.alpha
    const tx = this.x - Math.cos(this.angle) * this.len
    const ty = this.y - Math.sin(this.angle) * this.len
    const g = ctx.createLinearGradient(tx, ty, this.x, this.y)
    g.addColorStop(0, 'transparent')
    g.addColorStop(1, this.color)
    ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(this.x, this.y)
    ctx.strokeStyle = g; ctx.lineWidth = this.size; ctx.stroke()
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 1.6, 0, Math.PI * 2)
    ctx.fillStyle = this.color; ctx.fill()
    ctx.restore()
  }
}

export default function WishSection() {
  const canvasRef  = useRef(null)
  const sectionRef = useRef(null)
  const starsRef   = useRef([])
  const animRef    = useRef(null)
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    const canvas  = canvasRef.current
    const section = sectionRef.current
    const resize  = () => {
      canvas.width  = section.offsetWidth
      canvas.height = section.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(section)
    return () => { ro.disconnect(); cancelAnimationFrame(animRef.current) }
  }, [])

  const runAnimation = () => {
    cancelAnimationFrame(animRef.current)
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      starsRef.current.forEach(s => { s.update(); s.draw(ctx) })
      starsRef.current = starsRef.current.filter(s => s.alive)
      if (starsRef.current.length > 0) animRef.current = requestAnimationFrame(tick)
      else ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    tick()
  }

  const makeWish = () => {
    const { width, height } = canvasRef.current
    for (let i = 0; i < 38; i++)
      starsRef.current.push(new ShootingStar(width, height))
    runAnimation()

    confetti({
      particleCount: 180,
      spread: 110,
      origin: { x: 0.5, y: 0.58 },
      colors: ['#FFD700','#FF6B9D','#9B59B6','#FF7F50','#1ABC9C'],
      scalar: 1.1,
    })
    window.dispatchEvent(new CustomEvent('fireworks:launch', { detail: { count: 7 } }))

    const picked = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
    setMsg(picked); setShow(true)
    setTimeout(() => setShow(false), 4200)
  }

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: 420,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(180deg,#0a0a1a,#08001a 50%,#0a0a1a)',
        padding: '80px 20px',
        position: 'relative', overflow: 'hidden', zIndex: 2,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: 'clamp(26px,5vw,52px)', color: 'white', marginBottom: 50 }}
      >
        Make a Wish! ⭐
      </motion.h2>

      <p style={{
        color: 'rgba(255,255,255,0.48)',
        marginBottom: 34,
        textAlign: 'center',
        maxWidth: 480,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300,
        lineHeight: 1.7,
        position: 'relative', zIndex: 1,
      }}>
        Close your eyes, think of something wonderful,<br />and press the button 💫
      </p>

      <motion.button
        whileHover={{ scale: 1.08, boxShadow: '0 0 65px rgba(155,89,182,0.75)' }}
        whileTap={{ scale: 0.93 }}
        onClick={makeWish}
        style={{
          background: 'linear-gradient(135deg,#6C3483,#9B59B6)',
          color: 'white', border: 'none',
          padding: '18px 50px', fontSize: 20,
          borderRadius: 50, cursor: 'pointer',
          boxShadow: '0 0 30px rgba(155,89,182,0.42)',
          position: 'relative', zIndex: 1,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        🌟 Make a Wish 🌟
      </motion.button>

      <AnimatePresence>
        {show && (
          <motion.p
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              marginTop: 32,
              fontSize: 22,
              color: '#FFD700',
              textShadow: '0 0 22px #FFD700',
              position: 'relative', zIndex: 1,
              textAlign: 'center',
            }}
          >
            {msg}
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  )
}
