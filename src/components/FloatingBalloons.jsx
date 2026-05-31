import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const BALLOON_COLORS = ['#FF6B9D','#FFD700','#9B59B6','#FF7F50','#1ABC9C','#FF4081','#00BCD4']
let uid = 0

function mkBalloon() {
  return {
    id:       uid++,
    xPct:     Math.random() * 85 + 5,        // left % within container
    color:    BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    size:     Math.random() * 28 + 44,        // px
    duration: Math.random() * 9 + 11,         // s to float to top
    swayAmp:  (Math.random() - 0.5) * 50,     // px sway
  }
}

function Balloon({ data, onRemove }) {
  // Self-destruct when animation would be done
  useEffect(() => {
    const t = setTimeout(onRemove, (data.duration + 1) * 1000)
    return () => clearTimeout(t)
  }, [data.duration, onRemove])

  const pop = useCallback(e => {
    e.stopPropagation()
    confetti({
      particleCount: 35,
      spread: 65,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      colors: BALLOON_COLORS,
      scalar: 0.9,
    })
    window.dispatchEvent(new CustomEvent('fireworks:launch', { detail: { count: 2 } }))
    onRemove()
  }, [onRemove])

  const h = data.size * 1.2

  return (
    <motion.div
      className="balloon-el"
      initial={{ y: '110vh' }}
      animate={{
        y: '-15vh',
        x: [0, data.swayAmp * 0.4, -data.swayAmp * 0.4, data.swayAmp * 0.3, 0],
        rotate: [0, 4, -4, 3, 0],
      }}
      exit={{ scale: 1.6, opacity: 0, transition: { duration: 0.18 } }}
      transition={{
        y:      { duration: data.duration, ease: 'linear' },
        x:      { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
      onClick={pop}
      whileHover={{ scale: 1.15 }}
      style={{
        position: 'absolute',
        left: `${data.xPct}%`,
        width:  data.size,
        height: h,
        borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
        background: `radial-gradient(circle at 35% 35%, ${data.color}ee, ${data.color}77)`,
        boxShadow: `0 0 20px ${data.color}55, inset 0 0 12px rgba(255,255,255,0.15)`,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* string */}
      <div style={{
        position: 'absolute', bottom: -28, left: '50%',
        width: 1, height: 28,
        background: 'rgba(255,255,255,0.35)',
        transform: 'translateX(-50%)',
      }} />
    </motion.div>
  )
}

export default function FloatingBalloons() {
  const [balloons, setBalloons] = useState(() => Array.from({ length: 9 }, mkBalloon))

  const remove = useCallback(id => {
    setBalloons(prev => {
      const next = prev.filter(b => b.id !== id)
      return [...next, mkBalloon()]
    })
  }, [])

  useEffect(() => {
    const iv = setInterval(() => setBalloons(prev => [...prev, mkBalloon()]), 2800)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <AnimatePresence>
        {balloons.map(b => (
          <Balloon key={b.id} data={b} onRemove={() => remove(b.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}
