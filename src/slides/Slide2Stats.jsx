import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function StatCard({ value, label, icon, delay }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (typeof value !== 'number') { setCount(value); return }
    let raf
    const t0   = performance.now()
    const dur  = 2100

    const tick = now => {
      const p     = Math.min((now - t0) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    const id = setTimeout(() => { raf = requestAnimationFrame(tick) }, delay)
    return () => { clearTimeout(id); cancelAnimationFrame(raf) }
  }, [value, delay])

  return (
    <motion.div
      initial={{ opacity:0, scale:0.7, y:40 }}
      animate={{ opacity:1, scale:1,   y:0  }}
      transition={{ delay: delay/1000, type:'spring', stiffness:220, damping:18 }}
      className="glass"
      style={{ padding:'clamp(18px,4vw,34px)', textAlign:'center', position:'relative', overflow:'hidden' }}
    >
      {/* Background number watermark */}
      <div style={{
        position:'absolute', inset:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'clamp(80px,14vw,130px)',
        fontWeight:900,
        color:'rgba(255,255,255,0.025)',
        pointerEvents:'none',
        userSelect:'none',
        lineHeight:1,
      }}>
        {icon}
      </div>

      <div style={{ fontSize:'clamp(36px,7vw,64px)', marginBottom:6, position:'relative' }}>{icon}</div>

      <div className="grad-gold" style={{
        fontSize:'clamp(38px,7vw,68px)',
        fontWeight:900,
        lineHeight:1,
        position:'relative',
      }}>
        {typeof value === 'number' ? count.toLocaleString() : value}
      </div>

      <div style={{
        marginTop:10,
        fontSize:'clamp(10px,1.6vw,13px)',
        color:'rgba(255,255,255,0.45)',
        letterSpacing:'3px',
        textTransform:'uppercase',
        fontFamily:"'Inter',sans-serif",
        fontWeight:400,
      }}>
        {label}
      </div>
    </motion.div>
  )
}

export default function Slide2Stats() {
  return (
    <div className="slide" style={{
      background:'radial-gradient(ellipse at 25% 75%, #1e0808 0%, #0a0a1a 60%)',
      gap:'clamp(24px,4vh,40px)',
      padding:'clamp(16px,4vw,32px) clamp(16px,4vw,32px) 64px',
    }}>
      <motion.h2
        initial={{ opacity:0, y:-30 }}
        animate={{ opacity:1, y:0   }}
        transition={{ duration:0.8 }}
        style={{
          textAlign:'center',
          fontSize:'clamp(24px,5vw,52px)',
          lineHeight:1.2,
        }}
      >
        <span className="grad-gold">30 Years of Maris 🎉</span>
      </motion.h2>

      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(2,1fr)',
        gap:'clamp(10px,2.5vw,22px)',
        width:'100%',
        maxWidth:680,
      }}>
        <StatCard value={30}    label="Years Alive"  icon="🎂" delay={0}   />
        <StatCard value={360}   label="Months"       icon="📅" delay={150} />
        <StatCard value={10950} label="Days of Joy"  icon="☀️" delay={300} />
        <StatCard value="∞"     label="Smiles Shared"icon="😊" delay={450} />
      </div>

      <motion.p
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:1.2 }}
        style={{
          textAlign:'center',
          color:'rgba(255,255,255,0.38)',
          fontSize:'clamp(12px,1.8vw,15px)',
          letterSpacing:'3px',
          fontFamily:"'Inter',sans-serif",
          fontStyle:'italic',
        }}
      >
        …and counting 💛
      </motion.p>
    </div>
  )
}
