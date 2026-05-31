import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Gold  = ({ children }) => <span style={{ color: '#FFD700', fontStyle: 'italic' }}>{children}</span>

export default function MessageSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      style={{
        padding: '80px 20px',
        background: 'linear-gradient(180deg,#0a0a1a,#0a0d1a 50%,#0a0a1a)',
        position: 'relative', zIndex: 2,
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          fontSize: 'clamp(26px,5vw,52px)',
          color: '#FF6B9D',
          marginBottom: 50,
        }}
      >
        A Note From the Heart 💌
      </motion.h2>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.95, ease: 'easeOut' }}
        style={{
          maxWidth: 820,
          margin: '0 auto',
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,215,0,0.18)',
          borderRadius: 24,
          padding: 'clamp(28px,5vw,55px) clamp(20px,5vw,50px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Slow rotating background glow */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', top: '-50%', left: '-50%',
            width: '200%', height: '200%',
            background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.045) 0%, transparent 68%)',
            pointerEvents: 'none',
          }}
        />

        <p
          style={{
            fontSize: 'clamp(15px,2.2vw,20px)',
            lineHeight: 1.95,
            color: 'rgba(255,255,255,0.88)',
            position: 'relative', zIndex: 1,
          }}
        >
          <Gold>Maris,</Gold> thirty looks absolutely stunning on you — but honestly, everything looks stunning on you.
          <br/><br/>
          These three decades have shaped someone truly extraordinary. Someone who lights up every room she walks into,
          who loves fiercely and laughs loudly, and who makes the world a richer, warmer, more beautiful place just by
          being in it.
          <br/><br/>
          <Gold>30 isn't just a number — it's the start of your most brilliant chapter yet.</Gold> The best is still ahead,
          and we can't wait to watch you live every magnificent moment of it.
          <br/><br/>
          Today we celebrate YOU — every laugh, every tear, every adventure, every dream. All the moments that made
          you who you are, and all the incredible moments still to come.
          <br/><br/>
          Here's to you, Maris. <Gold>Happy, happy birthday. We love you endlessly. 💛</Gold>
        </p>

        <p style={{
          marginTop: 32,
          fontSize: 18,
          color: '#FF6B9D',
          fontStyle: 'italic',
          textAlign: 'right',
          position: 'relative', zIndex: 1,
        }}>
          — With all the love in the world 🥂
        </p>
      </motion.div>
    </section>
  )
}
