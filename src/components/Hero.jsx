import { motion } from 'framer-motion'
import FloatingBalloons from './FloatingBalloons'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 1.1 } },
}
const letter = {
  hidden: { opacity: 0, y: 50, rotate: (Math.random() - 0.5) * 30 },
  visible: {
    opacity: 1, y: 0, rotate: 0,
    transition: { type: 'spring', stiffness: 240, damping: 16 },
  },
}

function SplitText({ text, style }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', ...style }}
    >
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          variants={letter}
          style={{ display: 'inline-block' }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'radial-gradient(ellipse at center, #1a0533 0%, #0a0a1a 70%)',
        overflow: 'hidden',
        zIndex: 2,
        padding: '20px',
      }}
    >
      <FloatingBalloons />

      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            fontSize: 'clamp(13px, 2vw, 20px)',
            color: '#F7E7CE',
            letterSpacing: '8px',
            textTransform: 'uppercase',
            marginBottom: '12px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
          }}
        >
          ✨ It&apos;s Your Day, Gorgeous ✨
        </motion.p>

        {/* Big 30 */}
        <motion.div
          initial={{ scale: 0, rotate: -18 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.45, type: 'spring', stiffness: 180, damping: 13 }}
          style={{
            fontSize: 'clamp(110px, 22vw, 230px)',
            fontWeight: 900,
            background: 'linear-gradient(135deg,#FFD700,#FF6B9D,#9B59B6,#FFD700)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            display: 'block',
            filter: 'drop-shadow(0 0 40px rgba(255,215,0,0.55))',
            animation: 'gradientShift 3s ease infinite',
          }}
        >
          30
        </motion.div>

        {/* Animated name */}
        <SplitText
          text="Maris"
          style={{
            fontSize: 'clamp(50px, 10vw, 105px)',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 0 40px rgba(255,107,157,0.8), 0 0 80px rgba(155,89,182,0.5)',
            fontStyle: 'italic',
            lineHeight: 1.1,
            letterSpacing: '4px',
          }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1.2 }}
          style={{
            marginTop: '18px',
            fontSize: 'clamp(13px, 2vw, 17px)',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
          }}
        >
          Three decades of pure magic
        </motion.p>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: 28,
          color: 'rgba(255,255,255,0.35)',
          fontSize: 12, letterSpacing: '3px',
          textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        ↓ scroll to celebrate ↓
      </motion.div>
    </section>
  )
}
