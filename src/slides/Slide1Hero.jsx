import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import FloatingBalloons from '../components/FloatingBalloons'

const COLORS = ['#FFD700','#FF6B9D','#9B59B6','rgba(255,255,255,0.6)','#FF7F50']

function useParticles(ref) {
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    let raf

    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const pts = Array.from({ length: 35 }, () => ({
      x:  Math.random() * (c.width  || 400),
      y:  Math.random() * (c.height || 800),
      r:  Math.random() * 2.2 + 0.5,
      vy: -(Math.random() * 0.55 + 0.15),
      vx: (Math.random() - 0.5) * 0.18,
      a:  Math.random() * 0.45 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.y < -6) { p.y = c.height + 6; p.x = Math.random() * c.width }
        ctx.globalAlpha = p.a
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
}

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 1.0 } },
}
const letter = {
  hidden:  { opacity: 0, y: 55, rotate: 18 },
  show:    { opacity: 1, y: 0,  rotate: 0,
             transition: { type: 'spring', stiffness: 260, damping: 18 } },
}

export default function Slide1Hero({ goNext }) {
  const canvasRef = useRef(null)
  useParticles(canvasRef)

  return (
    <div
      className="slide"
      style={{
        background: 'radial-gradient(ellipse at 62% 48%, #2c0a5a 0%, #120420 40%, #0a0a1a 72%)',
        padding: '20px 20px 64px',
      }}
    >
      {/* Ambient particles */}
      <canvas ref={canvasRef}
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}
      />

      <FloatingBalloons />

      {/* Glowing orb behind text */}
      <div style={{
        position:'absolute', top:'42%', left:'50%',
        transform:'translate(-50%,-50%)',
        width:'min(500px, 90vw)', height:'min(500px, 90vw)',
        borderRadius:'50%',
        background:'radial-gradient(circle, rgba(155,89,182,0.18) 0%, transparent 70%)',
        pointerEvents:'none',
      }}/>

      {/* Content */}
      <div style={{ position:'relative', zIndex:3, textAlign:'center', pointerEvents:'none' }}>

        <motion.p
          initial={{ opacity:0, y:24 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.25, duration:0.9 }}
          style={{
            fontSize:'clamp(11px,2.5vw,18px)',
            color:'#F7E7CE',
            letterSpacing:'8px',
            textTransform:'uppercase',
            marginBottom:14,
            fontFamily:"'Inter',sans-serif",
            fontWeight:300,
          }}
        >
          ✨ It&apos;s Your Day, Gorgeous ✨
        </motion.p>

        {/* Big 30 */}
        <motion.div
          initial={{ scale:0, rotate:-22, opacity:0 }}
          animate={{ scale:1, rotate:0,  opacity:1 }}
          transition={{ delay:0.35, type:'spring', stiffness:190, damping:13 }}
        >
          <motion.span
            animate={{ y:[0,-14,0], rotate:[-0.6,0.6,-0.6] }}
            transition={{ duration:5.5, repeat:Infinity, ease:'easeInOut' }}
            className="grad-anim"
            style={{
              display:'block',
              fontSize:'clamp(110px,26vw,260px)',
              fontWeight:900,
              lineHeight:1,
              filter:'drop-shadow(0 0 44px rgba(255,215,0,0.62)) drop-shadow(0 10px 20px rgba(155,89,182,0.45))',
            }}
          >
            30
          </motion.span>
        </motion.div>

        {/* Animated name */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:2, marginTop:4 }}
        >
          {[...'Maris'].map((ch, i) => (
            <motion.span key={i} variants={letter} style={{
              display:'inline-block',
              fontSize:'clamp(50px,11vw,112px)',
              fontWeight:700,
              fontStyle:'italic',
              color:'white',
              letterSpacing:'2px',
              lineHeight:1.1,
              textShadow:'0 0 40px rgba(255,107,157,0.75), 0 0 80px rgba(155,89,182,0.45)',
              filter:'drop-shadow(0 4px 22px rgba(255,107,157,0.5))',
            }}>
              {ch}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:2.4, duration:1.2 }}
          style={{
            marginTop:18,
            fontSize:'clamp(11px,1.8vw,16px)',
            color:'rgba(255,255,255,0.45)',
            letterSpacing:'5px',
            textTransform:'uppercase',
            fontFamily:"'Inter',sans-serif",
            fontWeight:300,
          }}
        >
          Three decades of pure magic
        </motion.p>
      </div>

      {/* Begin button */}
      <motion.button
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:2.8, duration:0.8 }}
        onClick={goNext}
        whileHover={{ scale:1.07, boxShadow:'0 0 30px rgba(255,215,0,0.3)' }}
        whileTap={{ scale:0.93 }}
        style={{
          position:'absolute',
          bottom:50,
          left:'50%',
          transform:'translateX(-50%)',
          background:'rgba(255,255,255,0.07)',
          border:'1px solid rgba(255,255,255,0.2)',
          borderRadius:50,
          padding:'13px 34px',
          color:'white',
          fontSize:'clamp(12px,1.8vw,15px)',
          letterSpacing:'4px',
          textTransform:'uppercase',
          cursor:'pointer',
          backdropFilter:'blur(12px)',
          fontFamily:"'Inter',sans-serif",
          zIndex:5,
        }}
      >
        Begin →
      </motion.button>
    </div>
  )
}
