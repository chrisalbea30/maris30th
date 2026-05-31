import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const TRAIL = [
  { color: '#FFD700', stiff: 420, damp: 26 },
  { color: '#FF6B9D', stiff: 340, damp: 24 },
  { color: '#9B59B6', stiff: 270, damp: 22 },
  { color: '#FF7F50', stiff: 200, damp: 20 },
  { color: '#1ABC9C', stiff: 140, damp: 18 },
]

function TrailDot({ mouseX, mouseY, stiff, damp, color, size, opacity }) {
  const x = useSpring(mouseX, { stiffness: stiff, damping: damp })
  const y = useSpring(mouseY, { stiffness: stiff, damping: damp })
  return (
    <motion.div
      style={{
        position: 'fixed',
        width: size, height: size,
        borderRadius: '50%',
        background: color,
        pointerEvents: 'none',
        zIndex: 9997,
        translateX: '-50%',
        translateY: '-50%',
        x, y,
        opacity,
        mixBlendMode: 'screen',
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
    />
  )
}

export default function Cursor() {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
  const cx = useSpring(mouseX, { stiffness: 600, damping: 30 })
  const cy = useSpring(mouseY, { stiffness: 600, damping: 30 })

  useEffect(() => {
    const move = e => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        style={{
          position: 'fixed',
          width: 12, height: 12,
          borderRadius: '50%',
          background: '#FFD700',
          pointerEvents: 'none',
          zIndex: 9999,
          translateX: '-50%', translateY: '-50%',
          x: cx, y: cy,
          mixBlendMode: 'screen',
          boxShadow: '0 0 8px #FFD700, 0 0 20px #FFD700',
        }}
      />
      {/* Lagging trail dots */}
      {TRAIL.map((t, i) => (
        <TrailDot
          key={i}
          mouseX={mouseX}
          mouseY={mouseY}
          stiff={t.stiff}
          damp={t.damp}
          color={t.color}
          size={7 - i * 0.8}
          opacity={0.55 - i * 0.08}
        />
      ))}
    </>
  )
}
