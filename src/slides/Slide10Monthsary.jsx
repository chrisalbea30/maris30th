import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const HEARTS = ['💕','❤️','💗','💖','🌸','💕','❤️','💗']

function FloatingHeart({ emoji, delay }) {
  const [p] = useState(() => ({
    x:        Math.random() * 86 + 7,
    duration: Math.random() * 10 + 9,
    wobble:   (Math.random() - 0.5) * 36,
    size:     Math.random() * 10 + 11,
  }))
  return (
    <motion.div
      initial={{ y:'110vh', x:`${p.x}vw`, opacity:0 }}
      animate={{
        y:'-10vh',
        opacity:[0, 0.55, 0.55, 0],
        x:[`${p.x}vw`,`${p.x + p.wobble * 0.4}vw`,`${p.x - p.wobble * 0.3}vw`,`${p.x}vw`],
      }}
      transition={{
        y:       { duration:p.duration, delay, repeat:Infinity, ease:'linear' },
        x:       { duration:5, delay, repeat:Infinity, ease:'easeInOut' },
        opacity: { duration:p.duration, delay, repeat:Infinity, times:[0,0.08,0.88,1] },
      }}
      style={{ position:'absolute', fontSize:p.size, pointerEvents:'none', userSelect:'none' }}
    >
      {emoji}
    </motion.div>
  )
}

export default function Slide10Monthsary({ goTo }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(true)
      confetti({
        particleCount:80, spread:100,
        origin:{ x:0.5, y:0.5 },
        colors:['#FF69B4','#FFD700','#FF6B9D','#FFB6C1'],
      })
    }, 350)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="slide" style={{
      background:'radial-gradient(ellipse at 50% 40%, #220515 0%, #100010 45%, #0a0a1a 100%)',
      overflow:'hidden',
      gap:'clamp(10px,2.5vh,20px)',
      padding:'20px 28px 64px',
      justifyContent:'center',
      alignItems:'center',
    }}>
      {/* Soft floating hearts */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
        {HEARTS.map((e, i) => (
          <FloatingHeart key={i} emoji={e} delay={i * 0.7} />
        ))}
      </div>

      <AnimatePresence>
        {show && (
          <>
            {/* P.S. label */}
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.1, duration:0.6 }}
              style={{
                color:'rgba(255,255,255,0.3)',
                fontFamily:"'Inter',sans-serif",
                fontSize:'clamp(9px,1.4vw,12px)',
                letterSpacing:'5px',
                textTransform:'uppercase',
                position:'relative', zIndex:2,
              }}
            >
              One more thing
            </motion.div>

            {/* Main greeting */}
            <motion.div
              initial={{ opacity:0, scale:0.9 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ delay:0.3, type:'spring', stiffness:200, damping:18 }}
              style={{ position:'relative', zIndex:2, textAlign:'center' }}
            >
              <div style={{
                fontSize:'clamp(26px,6vw,60px)',
                fontWeight:900,
                fontStyle:'italic',
                color:'white',
                fontFamily:"'Playfair Display',serif",
                lineHeight:1.2,
                marginBottom:'clamp(4px,1vh,10px)',
                textShadow:'0 0 40px rgba(255,105,180,0.4)',
              }}>
                Happy 35th Monthsary
              </div>
              <div style={{
                fontSize:'clamp(20px,4.5vw,46px)',
                fontWeight:900,
                fontStyle:'italic',
                background:'linear-gradient(135deg,#FFD700,#FF69B4)',
                WebkitBackgroundClip:'text',
                WebkitTextFillColor:'transparent',
                fontFamily:"'Playfair Display',serif",
              }}>
                Maris! 💕
              </div>
            </motion.div>

            {/* Short message */}
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:0.7 }}
              style={{
                position:'relative', zIndex:2,
                maxWidth:380,
                textAlign:'center',
                color:'rgba(255,255,255,0.5)',
                fontFamily:"'Playfair Display',serif",
                fontStyle:'italic',
                fontSize:'clamp(13px,2vw,16px)',
                lineHeight:1.9,
              }}
            >
              35 months na tayo.<br/>
              Di ba it feels like kahapon lang?<br/>
              So thankful for every single one. ❤️
            </motion.div>

            {/* Start over */}
            <motion.button
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:1.2 }}
              whileHover={{ scale:1.07 }}
              whileTap={{ scale:0.93 }}
              onClick={() => goTo(0)}
              style={{
                background:'rgba(255,105,180,0.08)',
                border:'1px solid rgba(255,105,180,0.22)',
                borderRadius:50,
                padding:'11px 26px',
                color:'rgba(255,255,255,0.55)',
                fontSize:'clamp(10px,1.4vw,12px)',
                letterSpacing:'3px',
                textTransform:'uppercase',
                cursor:'pointer',
                backdropFilter:'blur(10px)',
                fontFamily:"'Inter',sans-serif",
                position:'relative', zIndex:2,
                marginTop:'clamp(4px,1vh,10px)',
              }}
            >
              ↩ Start Over
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
