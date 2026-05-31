import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function Counter({ end, label, delay }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView || typeof end !== 'number') return
    let raf
    const startTime = performance.now()
    const duration  = 2200

    const tick = now => {
      const progress = Math.min((now - startTime) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    const timeoutId = setTimeout(() => { raf = requestAnimationFrame(tick) }, delay)
    return () => { clearTimeout(timeoutId); cancelAnimationFrame(raf) }
  }, [inView, end, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.4, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: delay / 1000, type: 'spring', stiffness: 220, damping: 16 }}
      style={{ textAlign: 'center', minWidth: 140 }}
    >
      <span
        style={{
          display: 'block',
          fontSize: 'clamp(48px, 8vw, 82px)',
          fontWeight: 900,
          background: 'linear-gradient(135deg,#FFD700,#FF6B9D)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
        }}
      >
        {typeof end === 'number' ? count.toLocaleString() : end}
      </span>
      <div
        style={{
          marginTop: 8,
          fontSize: 11,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <section
      style={{
        background: 'linear-gradient(180deg,#0a0a1a,#150a0a 50%,#0a0a1a)',
        padding: '80px 20px',
        position: 'relative', zIndex: 2,
      }}
    >
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          fontSize: 'clamp(26px, 5vw, 52px)',
          marginBottom: 60,
          background: 'linear-gradient(135deg,#FFD700,#FF6B9D)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        30 Years of You
      </motion.h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(20px, 5vw, 70px)',
          flexWrap: 'wrap',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <Counter end={30}     label="Years Alive"  delay={0}   />
        <Counter end={360}    label="Months"        delay={200} />
        <Counter end={10950}  label="Days of Joy"   delay={400} />
        <Counter end="∞"      label="Smiles Shared" delay={600} />
      </div>
    </section>
  )
}
