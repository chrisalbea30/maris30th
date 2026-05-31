import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const CANDLES = [
  { color:'#FF6B9D', delay:0   },
  { color:'#FFD700', delay:240 },
  { color:'#9B59B6', delay:120 },
  { color:'#1ABC9C', delay:360 },
  { color:'#FF7F50', delay:180 },
]

function Flame({ blown, delay }) {
  if (blown) return null
  return (
    <motion.div
      animate={{
        scaleX:[1,.87,1.13,.93,1],
        scaleY:[1,1.1,.88,1.07,1],
        rotate: [-2.5,3,-1.5,2.5,-2.5],
      }}
      transition={{ duration:0.38, repeat:Infinity, ease:'linear', delay: delay/1000 }}
      style={{
        position:'absolute', top:-22, left:'50%', translateX:'-50%',
        width:13, height:21,
        background:'radial-gradient(ellipse at 50% 80%, #fff 0%, #FFD700 26%, #FF6B00 65%, transparent 100%)',
        borderRadius:'50% 50% 30% 30%',
        boxShadow:'0 0 9px #FF6B00, 0 0 22px #FFD700, 0 0 40px rgba(255,160,0,0.3)',
        filter:'blur(0.4px)',
        pointerEvents:'none',
      }}
    />
  )
}

function SmokePuff({ x, y }) {
  return (
    <motion.div
      initial={{ x, y, opacity:0.7, scale:0.5 }}
      animate={{ y: y-58, x: x+(Math.random()-.5)*16, opacity:0, scale:2.5 }}
      transition={{ duration:1.5, ease:'easeOut' }}
      style={{
        position:'fixed',
        width:8, height:8, borderRadius:'50%',
        background:'rgba(210,210,220,0.55)',
        pointerEvents:'none', zIndex:200,
      }}
    />
  )
}

const Tier = ({ w, h, gradient, shadow, label, labelSize = 14 }) => (
  <div style={{ display:'flex', justifyContent:'center', marginTop:-4 }}>
    <div style={{
      width:w, height:h,
      background:gradient,
      borderRadius:9,
      boxShadow:shadow,
      position:'relative',
      display:'flex', alignItems:'center', justifyContent:'center',
    }}>
      {/* frosting */}
      <div style={{
        position:'absolute', top:-11, left:0, right:0,
        height:21,
        background:'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
        borderRadius:'50% 50% 0 0',
        boxShadow:'0 0 6px rgba(255,255,255,0.35)',
      }}/>
      {label && (
        <span style={{
          fontSize:labelSize, color:'rgba(255,255,255,0.88)',
          fontStyle:'italic', position:'relative', zIndex:1,
          textShadow:'0 1px 4px rgba(0,0,0,0.3)',
        }}>
          {label}
        </span>
      )}
    </div>
  </div>
)

export default function Slide3Cake() {
  const [blown,     setBlown]     = useState([false,false,false,false,false])
  const [smokes,    setSmokes]    = useState([])
  const [done,      setDone]      = useState(false)
  const allBlown = blown.every(Boolean)

  const blowOut = useCallback(() => {
    if (allBlown) return
    CANDLES.forEach((_, i) => {
      setTimeout(() => {
        setBlown(p => { const n=[...p]; n[i]=true; return n })
        const el = document.getElementById(`cake-c-${i}`)
        if (el) {
          const r = el.getBoundingClientRect()
          const key = `sk-${Date.now()}-${i}`
          setSmokes(p => [...p, { key, x:r.left+4, y:r.top }])
          setTimeout(() => setSmokes(p => p.filter(s => s.key!==key)), 2000)
        }
      }, CANDLES[i].delay + i * 260)
    })
    if (!done) {
      setDone(true)
      setTimeout(() => {
        confetti({ particleCount:240, spread:140, origin:{x:0.5,y:0.5} })
        window.dispatchEvent(new CustomEvent('fireworks:launch',{detail:{count:10}}))
      }, 1600)
    }
  }, [allBlown, done])

  return (
    <div className="slide" style={{
      background:'radial-gradient(ellipse at 42% 58%, #180535 0%, #0a0a1a 65%)',
      gap:'clamp(12px,2.5vh,24px)',
      padding:'clamp(12px,3vw,24px) 20px 64px',
    }}>
      <motion.h2
        initial={{ opacity:0, y:-28 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.8 }}
        style={{ fontSize:'clamp(22px,5vw,50px)', color:'#FFD700', textAlign:'center' }}
      >
        Make a Wish! 🎂
      </motion.h2>

      <AnimatePresence>
        {smokes.map(s => <SmokePuff key={s.key} x={s.x} y={s.y} />)}
      </AnimatePresence>

      {/* Cake */}
      <motion.div
        initial={{ scale:0.7, opacity:0, y:30 }}
        animate={{ scale:1,   opacity:1, y:0 }}
        transition={{ delay:0.3, type:'spring', stiffness:180, damping:14 }}
        onClick={blowOut}
        whileHover={{ scale:1.04 }}
        whileTap={{ scale:0.96 }}
        style={{ display:'inline-block', cursor:'pointer', userSelect:'none' }}
      >
        {/* Top tier + candles */}
        <div style={{ display:'flex', justifyContent:'center' }}>
          <div style={{
            width:'clamp(110px,24vw,140px)',
            height:'clamp(55px,11vw,70px)',
            background:'linear-gradient(135deg,#FFD700,#FFA000)',
            borderRadius:9,
            boxShadow:'0 0 30px rgba(255,215,0,0.5), 0 0 60px rgba(255,215,0,0.2)',
            position:'relative',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <div style={{
              position:'absolute', top:-11, left:0, right:0,
              height:21, borderRadius:'50% 50% 0 0',
              background:'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.7))',
            }}/>
            {/* Candles */}
            <div style={{
              position:'absolute', top:-54,
              display:'flex', gap:'clamp(7px,1.5vw,11px)',
              justifyContent:'center', width:'100%',
            }}>
              {CANDLES.map((c,i) => (
                <div key={i} id={`cake-c-${i}`} style={{
                  position:'relative', display:'flex',
                  flexDirection:'column', alignItems:'center',
                }}>
                  <div style={{
                    width:8, height:'clamp(22px,4vw,30px)',
                    borderRadius:3,
                    background:`linear-gradient(to bottom, ${c.color}, ${c.color}77)`,
                    boxShadow: blown[i] ? 'none' : `0 0 8px ${c.color}88`,
                  }}/>
                  <Flame blown={blown[i]} delay={c.delay} />
                </div>
              ))}
            </div>
            <span style={{
              fontSize:'clamp(18px,4vw,26px)',
              fontWeight:900, color:'rgba(255,255,255,0.92)',
              textShadow:'0 0 12px gold',
              position:'relative', zIndex:1,
            }}>
              30
            </span>
          </div>
        </div>

        <Tier
          w="clamp(145px,30vw,178px)" h="clamp(58px,12vw,74px)"
          gradient="linear-gradient(135deg,#9B59B6,#6C3483)"
          shadow="0 0 28px rgba(155,89,182,0.5)"
          label="Happy Birthday" labelSize="clamp(11px,2vw,14px)"
        />
        <Tier
          w="clamp(180px,37vw,218px)" h="clamp(65px,14vw,86px)"
          gradient="linear-gradient(135deg,#FF6B9D,#FF4081)"
          shadow="0 0 28px rgba(255,107,157,0.5)"
          label="Maris ✨" labelSize="clamp(13px,2.5vw,19px)"
        />

        {/* Plate */}
        <div style={{
          width:'clamp(195px,40vw,236px)', height:20,
          margin:'0 auto',
          background:'linear-gradient(135deg,#ccc,#a0a0a0)',
          borderRadius:'50%',
          boxShadow:'0 5px 16px rgba(0,0,0,0.4)',
        }}/>
      </motion.div>

      {/* Instruction */}
      <AnimatePresence mode="wait">
        <motion.p
          key={allBlown ? 'done' : 'hint'}
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:-10 }}
          transition={{ duration:0.4 }}
          style={{
            fontSize:'clamp(13px,2vw,18px)',
            color: allBlown ? '#FFD700' : '#F7E7CE',
            textAlign:'center',
            maxWidth:320,
          }}
        >
          {allBlown
            ? '🎉 Your wish will come true, Maris! 🌟'
            : '🌬️ Tap the cake to blow out the candles!'}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
