import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import confetti from 'canvas-confetti'

const CANDLE_COLORS = ['#FF6B9D','#FFD700','#9B59B6','#1ABC9C','#FF7F50']

function Flame({ blown }) {
  if (blown) return null
  return (
    <motion.div
      animate={{
        scaleX: [1,.88,1.12,.94,1],
        scaleY: [1,1.1,.88,1.06,1],
        rotate:  [-2,2.5,-1.5,2,-2],
      }}
      transition={{ duration: 0.38, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute',
        top: -22, left: '50%', translateX: '-50%',
        width: 13, height: 20,
        background: 'radial-gradient(ellipse at 50% 80%, #fff 0%, #FFD700 28%, #FF6B00 68%, transparent 100%)',
        borderRadius: '50% 50% 30% 30%',
        boxShadow: '0 0 10px #FF6B00, 0 0 22px #FFD700',
        filter: 'blur(0.4px)',
        pointerEvents: 'none',
      }}
    />
  )
}

function SmokeParticle({ x, y }) {
  return (
    <motion.div
      initial={{ x, y, scale: 0.6, opacity: 0.7 }}
      animate={{ y: y - 55, x: x + (Math.random() - 0.5) * 18, scale: 2.4, opacity: 0 }}
      transition={{ duration: 1.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        width: 7, height: 7,
        borderRadius: '50%',
        background: 'rgba(200,200,200,0.55)',
        pointerEvents: 'none',
        zIndex: 200,
      }}
    />
  )
}

const Tier = ({ w, h, bg, shadow, children, style }) => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: -4 }}>
    <div style={{
      width: w, height: h,
      background: bg,
      borderRadius: 8,
      boxShadow: shadow,
      position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      {/* frosting */}
      <div style={{
        position: 'absolute', top: -10, left: 0, right: 0,
        height: 20, background: 'white',
        borderRadius: '50% 50% 0 0',
        boxShadow: '0 0 8px rgba(255,255,255,0.4)',
      }} />
      {children}
    </div>
  </div>
)

export default function CakeSection() {
  const [blown,      setBlown]      = useState(new Array(5).fill(false))
  const [smokes,     setSmokes]     = useState([])
  const [celebrated, setCelebrated] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true })

  const blowOut = useCallback(() => {
    if (blown.every(Boolean)) return

    CANDLE_COLORS.forEach((_, i) => {
      setTimeout(() => {
        setBlown(prev => { const n=[...prev]; n[i]=true; return n })

        const el = document.getElementById(`candle-${i}`)
        if (el) {
          const rect = el.getBoundingClientRect()
          const key  = `s-${Date.now()}-${i}`
          setSmokes(p => [...p, { key, x: rect.left + 4, y: rect.top }])
          setTimeout(() => setSmokes(p => p.filter(s => s.key !== key)), 2000)
        }
      }, i * 260)
    })

    if (!celebrated) {
      setCelebrated(true)
      setTimeout(() => {
        confetti({ particleCount: 220, spread: 130, origin: { x: 0.5, y: 0.5 } })
        window.dispatchEvent(new CustomEvent('fireworks:launch', { detail: { count: 10 } }))
      }, 1400)
    }
  }, [blown, celebrated])

  const allBlown = blown.every(Boolean)

  return (
    <section
      style={{
        background: 'linear-gradient(180deg,#0a0a1a,#1a0533 50%,#0a0a1a)',
        padding: '80px 20px',
        textAlign: 'center',
        position: 'relative', zIndex: 2,
      }}
    >
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ fontSize: 'clamp(26px,5vw,52px)', color: '#FFD700', marginBottom: 50 }}
      >
        Make a Wish! 🎂
      </motion.h2>

      {/* Smoke effects */}
      <AnimatePresence>
        {smokes.map(s => <SmokeParticle key={s.key} x={s.x} y={s.y} />)}
      </AnimatePresence>

      {/* Cake */}
      <motion.div
        initial={{ scale: 0.75, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.3, type: 'spring', stiffness: 160, damping: 14 }}
        onClick={blowOut}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        style={{ display: 'inline-block', cursor: 'pointer', userSelect: 'none' }}
      >
        {/* Top tier (gold) */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 135, height: 68,
            background: 'linear-gradient(135deg,#FFD700,#FFA000)',
            borderRadius: 8,
            boxShadow: '0 0 30px rgba(255,215,0,0.45)',
            position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              position: 'absolute', top: -10, left: 0, right: 0,
              height: 20, background: 'white',
              borderRadius: '50% 50% 0 0',
            }}/>
            {/* Candles */}
            <div style={{
              position: 'absolute', top: -54,
              display: 'flex', gap: 10,
              justifyContent: 'center', width: '100%',
            }}>
              {CANDLE_COLORS.map((c, i) => (
                <div
                  key={i}
                  id={`candle-${i}`}
                  style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <div style={{
                    width: 8, height: 30, borderRadius: 3,
                    background: `linear-gradient(to bottom,${c},${c}77)`,
                  }}/>
                  <Flame blown={blown[i]} />
                </div>
              ))}
            </div>
            <span style={{
              fontSize: 24, fontWeight: 900,
              color: 'rgba(255,255,255,0.92)',
              textShadow: '0 0 12px gold',
              position: 'relative',
            }}>30</span>
          </div>
        </div>

        {/* Middle tier (purple) */}
        <Tier w={175} h={74}
          bg="linear-gradient(135deg,#9B59B6,#6C3483)"
          shadow="0 0 28px rgba(155,89,182,0.45)"
        >
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', position: 'relative' }}>
            Happy Birthday
          </span>
        </Tier>

        {/* Bottom tier (pink) */}
        <Tier w={215} h={84}
          bg="linear-gradient(135deg,#FF6B9D,#FF4081)"
          shadow="0 0 28px rgba(255,107,157,0.45)"
        >
          <span style={{ fontSize: 19, color: 'rgba(255,255,255,0.92)', fontStyle: 'italic', position: 'relative' }}>
            Maris ✨
          </span>
        </Tier>

        {/* Plate */}
        <div style={{
          width: 235, height: 20, margin: '0 auto',
          background: 'linear-gradient(135deg,#c8c8c8,#a0a0a0)',
          borderRadius: '50%',
          boxShadow: '0 5px 15px rgba(0,0,0,0.35)',
        }}/>
      </motion.div>

      {/* Instruction */}
      <AnimatePresence mode="wait">
        <motion.p
          key={allBlown ? 'done' : 'hint'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          style={{
            marginTop: 28, fontSize: 18,
            color: allBlown ? '#FFD700' : '#F7E7CE',
          }}
        >
          {allBlown
            ? '🎉 Your wish will come true, Maris! 🌟'
            : '🌬️ Click the cake to blow out the candles!'}
        </motion.p>
      </AnimatePresence>
    </section>
  )
}
