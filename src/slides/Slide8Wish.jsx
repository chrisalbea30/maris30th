import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const MSGS = [
  '✨ Your wish is soaring to the stars!',
  '🌟 The universe heard you, Maris!',
  '💫 May every single dream come true!',
  "⭐ This one's shooting straight to your heart!",
  '🌠 The most magical wish of 30 years!',
]

class Star {
  constructor(w, h) {
    this.w = w; this.h = h; this.reset()
  }
  reset() {
    this.x     = Math.random() * this.w
    this.y     = Math.random() * this.h * 0.45
    this.len   = Math.random() * 90 + 50
    this.speed = Math.random() * 13 + 5
    this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.42
    this.alpha = 1
    this.color = ['#FFD700','#FF6B9D','#9B59B6','#ffffff','#1ABC9C'][Math.floor(Math.random()*5)]
    this.size  = Math.random() * 2 + 0.8
    this.alive = true
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed
    this.y += Math.sin(this.angle) * this.speed
    this.alpha -= 0.024
    if (this.alpha <= 0) this.alive = false
  }
  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.alpha
    const tx = this.x - Math.cos(this.angle) * this.len
    const ty = this.y - Math.sin(this.angle) * this.len
    const g  = ctx.createLinearGradient(tx, ty, this.x, this.y)
    g.addColorStop(0, 'transparent')
    g.addColorStop(1, this.color)
    ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(this.x, this.y)
    ctx.strokeStyle = g; ctx.lineWidth = this.size; ctx.stroke()
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 1.6, 0, Math.PI * 2)
    ctx.fillStyle = this.color; ctx.fill()
    ctx.restore()
  }
}

export default function Slide8Wish() {
  const canvasRef  = useRef(null)
  const secRef     = useRef(null)
  const starsRef   = useRef([])
  const animRef    = useRef(null)
  const [msg,    setMsg]    = useState('')
  const [showMsg,setShowMsg]= useState(false)

  useEffect(() => {
    const sec    = secRef.current
    const canvas = canvasRef.current
    const resize = () => {
      canvas.width  = sec.offsetWidth
      canvas.height = sec.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(sec)
    return () => { ro.disconnect(); cancelAnimationFrame(animRef.current) }
  }, [])

  // Background drift stars
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const drift  = Array.from({ length:12 }, () => {
      const s = new Star(canvas.width || 400, canvas.height || 800)
      s.alpha = 0.3
      s.speed = Math.random() * 1.5 + 0.5
      return s
    })
    let raf
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drift.forEach(s => {
        s.update()
        s.draw(ctx)
        if (!s.alive) { s.reset(); s.alpha=0.3; s.speed=Math.random()*1.5+0.5 }
      })
      starsRef.current.forEach(s => { s.update(); s.draw(ctx) })
      starsRef.current = starsRef.current.filter(s => s.alive)
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [])

  const makeWish = () => {
    const { width, height } = canvasRef.current
    for (let i = 0; i < 42; i++)
      starsRef.current.push(new Star(width, height))

    confetti({
      particleCount:200, spread:120,
      origin:{ x:0.5, y:0.6 },
      colors:['#FFD700','#FF6B9D','#9B59B6','#FF7F50','#1ABC9C'],
      scalar:1.1,
    })
    window.dispatchEvent(new CustomEvent('fireworks:launch',{ detail:{ count:8 } }))

    setMsg(MSGS[Math.floor(Math.random() * MSGS.length)])
    setShowMsg(true)
    setTimeout(() => setShowMsg(false), 4500)
  }

  return (
    <div ref={secRef} className="slide" style={{
      background:'radial-gradient(ellipse at 50% 30%, #06001a 0%, #0a0a1a 70%)',
      padding:'20px 20px 64px',
    }}>
      <canvas ref={canvasRef}
        style={{ position:'absolute', inset:0, pointerEvents:'none' }}
      />

      <motion.h2
        initial={{ opacity:0, y:-28 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.8 }}
        style={{
          fontSize:'clamp(22px,5vw,52px)',
          color:'white', textAlign:'center',
          marginBottom:'clamp(14px,3vh,24px)',
          position:'relative', zIndex:1,
        }}
      >
        Make a Wish! ⭐
      </motion.h2>

      <motion.p
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:0.5 }}
        style={{
          color:'rgba(255,255,255,0.45)',
          textAlign:'center', maxWidth:440,
          fontFamily:"'Inter',sans-serif",
          fontWeight:300,
          lineHeight:1.7,
          fontSize:'clamp(13px,2vw,16px)',
          position:'relative', zIndex:1,
          marginBottom:'clamp(20px,4vh,34px)',
        }}
      >
        Close your eyes, think of something wonderful,<br/>
        and press the button 💫
      </motion.p>

      <motion.button
        initial={{ opacity:0, scale:0.8 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ delay:0.7, type:'spring', stiffness:200, damping:16 }}
        whileHover={{ scale:1.09, boxShadow:'0 0 70px rgba(155,89,182,0.8)' }}
        whileTap={{ scale:0.91 }}
        onClick={makeWish}
        style={{
          background:'linear-gradient(135deg,#6C3483,#9B59B6)',
          color:'white', border:'none',
          padding:'clamp(14px,3vw,20px) clamp(30px,6vw,52px)',
          fontSize:'clamp(16px,3vw,20px)',
          borderRadius:50, cursor:'pointer',
          boxShadow:'0 0 35px rgba(155,89,182,0.45)',
          position:'relative', zIndex:1,
          fontFamily:"'Playfair Display',serif",
          minHeight:56,
        }}
      >
        🌟 Make a Wish 🌟
      </motion.button>

      <AnimatePresence>
        {showMsg && (
          <motion.p
            initial={{ opacity:0, y:24, scale:0.8 }}
            animate={{ opacity:1, y:0,  scale:1 }}
            exit={{ opacity:0, y:-20, scale:0.85 }}
            transition={{ type:'spring', stiffness:300, damping:20 }}
            style={{
              marginTop:'clamp(18px,3vh,28px)',
              fontSize:'clamp(16px,3vw,22px)',
              color:'#FFD700',
              textShadow:'0 0 22px #FFD700',
              position:'relative', zIndex:1,
              textAlign:'center',
            }}
          >
            {msg}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
