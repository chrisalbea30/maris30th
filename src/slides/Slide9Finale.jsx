import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const FLOATERS = ['❤️','💛','💜','💖','✨','⭐','🌟','💫','🎉','🥂','🎊','🌸']

function FloatingEmoji({ emoji, delay }) {
  const [props] = useState(() => ({
    x: Math.random() * 90 + 5,  // vw %
    duration: Math.random() * 8 + 9,
    wobble: (Math.random() - 0.5) * 30,
    size: Math.random() * 18 + 16,
  }))
  return (
    <motion.div
      initial={{ y:'110vh', x:`${props.x}vw`, opacity:0 }}
      animate={{ y:'-10vh', opacity:[0,0.9,0.9,0],
                 x:[`${props.x}vw`,`${props.x+props.wobble*0.3}vw`,`${props.x-props.wobble*0.3}vw`,`${props.x}vw`] }}
      transition={{
        y:{ duration:props.duration, delay, repeat:Infinity, ease:'linear' },
        x:{ duration:4, delay, repeat:Infinity, ease:'easeInOut' },
        opacity:{ duration:props.duration, delay, repeat:Infinity, times:[0,0.08,0.88,1] },
      }}
      style={{
        position:'absolute',
        fontSize:props.size,
        pointerEvents:'none',
        userSelect:'none',
      }}
    >
      {emoji}
    </motion.div>
  )
}

export default function Slide9Finale({ goTo }) {
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setBurst(true)
      confetti({ particleCount:280, spread:160, origin:{x:0.5,y:0.4} })
      confetti({ particleCount:120, spread:80,  origin:{x:0.2,y:0.6}, angle:60 })
      confetti({ particleCount:120, spread:80,  origin:{x:0.8,y:0.6}, angle:120 })
      window.dispatchEvent(new CustomEvent('fireworks:launch',{ detail:{ count:12 } }))
      window.dispatchEvent(new CustomEvent('fireworks:launch',{ detail:{ count:8  } }))
    }, 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="slide" style={{
      background:'radial-gradient(ellipse at 50% 50%, #1e0540 0%, #0a0515 50%, #0a0a1a 100%)',
      overflow:'hidden',
      gap:'clamp(12px,2.5vh,22px)',
      padding:'20px 20px 64px',
    }}>
      {/* Floating emoji layer */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
        {FLOATERS.map((e, i) => (
          <FloatingEmoji key={i} emoji={e} delay={i * 0.4} />
        ))}
      </div>

      {/* Glowing background orb */}
      <motion.div
        animate={{ scale:[1,1.15,1], opacity:[0.6,1,0.6] }}
        transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
        style={{
          position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
          width:'min(600px,100vw)', height:'min(600px,100vh)',
          borderRadius:'50%',
          background:'radial-gradient(circle, rgba(155,89,182,0.22) 0%, transparent 70%)',
          pointerEvents:'none',
        }}
      />

      {/* Main title */}
      <AnimatePresence>
        {burst && (
          <>
            <motion.div
              initial={{ scale:0, rotate:-12, opacity:0 }}
              animate={{ scale:1, rotate:0,   opacity:1 }}
              transition={{ type:'spring', stiffness:200, damping:12 }}
              style={{ position:'relative', zIndex:2, textAlign:'center' }}
            >
              <motion.div
                animate={{ y:[0,-10,0] }}
                transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
                className="grad-anim"
                style={{
                  fontSize:'clamp(18px,4vw,42px)',
                  fontWeight:900,
                  letterSpacing:'4px',
                  textTransform:'uppercase',
                  marginBottom:6,
                }}
              >
                Happy Birthday
              </motion.div>

              <motion.div
                animate={{
                  textShadow:[
                    '0 0 30px rgba(255,107,157,0.8), 0 0 60px rgba(155,89,182,0.5)',
                    '0 0 60px rgba(255,215,0,0.9), 0 0 120px rgba(255,107,157,0.7)',
                    '0 0 30px rgba(255,107,157,0.8), 0 0 60px rgba(155,89,182,0.5)',
                  ]
                }}
                transition={{ duration:2.5, repeat:Infinity }}
                style={{
                  fontSize:'clamp(52px,13vw,130px)',
                  fontWeight:900,
                  fontStyle:'italic',
                  color:'white',
                  lineHeight:1.1,
                }}
              >
                Maris!
              </motion.div>
            </motion.div>

            {/* 30 */}
            <motion.div
              initial={{ scale:0 }}
              animate={{ scale:1 }}
              transition={{ delay:0.3, type:'spring', stiffness:260, damping:14 }}
              className="grad-anim"
              style={{
                fontSize:'clamp(60px,16vw,160px)',
                fontWeight:900,
                lineHeight:1,
                filter:'drop-shadow(0 0 40px rgba(255,215,0,0.6))',
                position:'relative', zIndex:2,
              }}
            >
              🎉 30 🎉
            </motion.div>

            {/* Floating emoji row */}
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:0.5 }}
              style={{
                display:'flex', gap:'clamp(6px,2vw,12px)',
                justifyContent:'center', flexWrap:'wrap',
                position:'relative', zIndex:2,
              }}
            >
              {['❤️','💛','💜','💖','✨','⭐','🌟'].map((e,i) => (
                <motion.span
                  key={i}
                  animate={{ y:[0,-8,0], scale:[1,1.2,1] }}
                  transition={{ duration:2, repeat:Infinity, delay:i*0.2, ease:'easeInOut' }}
                  style={{ fontSize:'clamp(20px,4vw,32px)', userSelect:'none' }}
                >
                  {e}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:0.9 }}
              style={{
                color:'rgba(255,255,255,0.5)',
                fontFamily:"'Inter',sans-serif",
                fontSize:'clamp(11px,1.8vw,15px)',
                letterSpacing:'4px',
                textTransform:'uppercase',
                position:'relative', zIndex:2,
                textAlign:'center',
              }}
            >
              Thirty, blessed, and so loved 🙏
            </motion.p>

            {/* Restart */}
            <motion.button
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:1.4 }}
              whileHover={{ scale:1.07 }}
              whileTap={{ scale:0.93 }}
              onClick={() => goTo(0)}
              style={{
                background:'rgba(255,255,255,0.07)',
                border:'1px solid rgba(255,255,255,0.18)',
                borderRadius:50,
                padding:'12px 30px',
                color:'white',
                fontSize:'clamp(12px,1.8vw,14px)',
                letterSpacing:'3px',
                textTransform:'uppercase',
                cursor:'pointer',
                backdropFilter:'blur(12px)',
                fontFamily:"'Inter',sans-serif",
                position:'relative', zIndex:2,
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
