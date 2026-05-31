import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// June 1 2026 00:01 Philippine Time (UTC+8)
const UNLOCK_AT = new Date('2026-06-01T00:01:00+08:00')

function getTimeLeft() {
  const diff = UNLOCK_AT - Date.now()
  if (diff <= 0) return null
  const total = Math.floor(diff / 1000)
  return {
    days:    Math.floor(total / 86400),
    hours:   Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

function Pad({ value, label }) {
  const str = String(value).padStart(2, '0')
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
      <div style={{
        fontFamily:"'Playfair Display',serif",
        fontWeight:900,
        fontSize:'clamp(44px,12vw,100px)',
        lineHeight:1,
        color:'white',
        textShadow:'0 0 40px rgba(255,215,0,0.5), 0 0 80px rgba(155,89,182,0.3)',
        minWidth:'1.6ch',
        textAlign:'center',
      }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={str}
            initial={{ y:-20, opacity:0 }}
            animate={{ y:0,   opacity:1 }}
            exit={{   y: 20,  opacity:0 }}
            transition={{ duration:0.2, ease:'easeOut' }}
            style={{ display:'block' }}
          >
            {str}
          </motion.span>
        </AnimatePresence>
      </div>
      <div style={{
        fontFamily:"'Inter',sans-serif",
        fontSize:'clamp(8px,1.6vw,11px)',
        letterSpacing:'4px',
        textTransform:'uppercase',
        color:'rgba(255,255,255,0.35)',
      }}>
        {label}
      </div>
    </div>
  )
}

function Colon() {
  return (
    <div style={{
      fontFamily:"'Playfair Display',serif",
      fontWeight:900,
      fontSize:'clamp(36px,9vw,80px)',
      lineHeight:1,
      color:'rgba(255,215,0,0.4)',
      alignSelf:'flex-start',
      paddingTop:'clamp(6px,1vw,10px)',
      userSelect:'none',
    }}>:</div>
  )
}

export default function CountdownGate({ children }) {
  const [left, setLeft] = useState(getTimeLeft)

  useEffect(() => {
    if (!left) return
    const id = setInterval(() => {
      const t = getTimeLeft()
      setLeft(t)
      if (!t) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [!!left])

  if (!left) return children

  return (
    <div style={{
      width:'100vw', height:'100dvh',
      background:'radial-gradient(ellipse at 55% 45%, #1a0535 0%, #0d0d1f 55%, #050510 100%)',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      gap:'clamp(18px,3.5vh,32px)',
      overflow:'hidden',
      position:'relative',
    }}>
      {/* Ambient glow */}
      <div style={{
        position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)',
        width:'min(600px,90vw)', height:'min(600px,90vw)',
        borderRadius:'50%',
        background:'radial-gradient(circle, rgba(155,89,182,0.13) 0%, transparent 70%)',
        pointerEvents:'none',
      }} />

      {/* Top label */}
      <motion.div
        initial={{ opacity:0, y:-20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.8, delay:0.2 }}
        style={{
          fontFamily:"'Inter',sans-serif",
          fontSize:'clamp(9px,1.8vw,12px)',
          letterSpacing:'6px',
          textTransform:'uppercase',
          color:'rgba(255,255,255,0.3)',
          textAlign:'center',
        }}
      >
        ✨ Something special is coming ✨
      </motion.div>

      {/* Name */}
      <motion.div
        initial={{ opacity:0, scale:0.85 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ duration:0.9, delay:0.35, type:'spring', stiffness:180, damping:16 }}
        style={{
          fontFamily:"'Playfair Display',serif",
          fontStyle:'italic',
          fontWeight:700,
          fontSize:'clamp(36px,9vw,88px)',
          background:'linear-gradient(135deg,#FFD700 0%,#FF6B9D 60%,#9B59B6 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          textAlign:'center',
          lineHeight:1.1,
        }}
      >
        Happy 30th Birthday<br/>Maris
      </motion.div>

      {/* Countdown row */}
      <motion.div
        initial={{ opacity:0, y:30 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.8, delay:0.55 }}
        style={{ display:'flex', alignItems:'flex-start', gap:'clamp(10px,2.5vw,22px)' }}
      >
        <Pad value={left.days}    label="Days"    />
        <Colon />
        <Pad value={left.hours}   label="Hours"   />
        <Colon />
        <Pad value={left.minutes} label="Minutes" />
        <Colon />
        <Pad value={left.seconds} label="Seconds" />
      </motion.div>

      {/* Sub-label */}
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ duration:0.8, delay:0.9 }}
        style={{
          fontFamily:"'Inter',sans-serif",
          fontSize:'clamp(10px,1.8vw,13px)',
          letterSpacing:'3px',
          textTransform:'uppercase',
          color:'rgba(255,255,255,0.22)',
          textAlign:'center',
        }}
      >
        June 1, 2026 · 12:01 AM · Philippine Time
      </motion.div>
    </div>
  )
}
