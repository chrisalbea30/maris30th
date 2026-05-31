import { motion } from 'framer-motion'

const FLOATERS = ['❤️','💛','💜','💖','✨','⭐','🌟','💫','🎉','🥂']

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '65px 20px 50px',
        background: 'linear-gradient(180deg,#0a0a1a,#04040e)',
        position: 'relative', zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {/* Glowing orb behind text */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 400, height: 200,
        background: 'radial-gradient(ellipse,rgba(155,89,182,0.15) 0%,transparent 70%)',
        pointerEvents: 'none',
      }}/>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
        style={{
          fontSize: 'clamp(32px,6.5vw,72px)',
          fontWeight: 900,
          background: 'linear-gradient(135deg,#FFD700,#FF6B9D,#9B59B6)',
          backgroundSize: '300% 300%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'gradientShift 3s ease infinite',
          marginBottom: 24,
          position: 'relative',
        }}
      >
        Happy Birthday, Maris!
      </motion.div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
        flexWrap: 'wrap',
        marginBottom: 26,
      }}>
        {FLOATERS.map((emoji, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -9, 0], scale: [1, 1.22, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
            style={{ fontSize: 28, userSelect: 'none' }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      <p style={{
        color: 'rgba(255,255,255,0.28)',
        fontSize: 12,
        letterSpacing: '4px',
        textTransform: 'uppercase',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
      }}>
        30 &amp; Forever Fabulous
      </p>
    </footer>
  )
}
