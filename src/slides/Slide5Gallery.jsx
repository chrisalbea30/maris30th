import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/*
  HOW TO ADD PHOTOS
  -----------------
  Replace `src: null` with a public-folder path.
  Example:  { src: '/photos/maris-1.jpg', label: 'Beach day!' }
  Place files in:  maris-birthday/public/photos/
  The caption shown over each photo is the `label` field.
*/
const SLOTS = [
  { src:'/pics/att.dEoZ4_yIDTc-othBpbLcSf-MdJ9RAhqFxgr2Eq874WY.jpg', label:'Maris 💛' },
  { src:'/pics/IMG_0411.jpg',  label:'Mga alaala na hindi malilimutan' },
  { src:'/pics/IMG_0535.jpg',  label:'So happy together' },
  { src:'/pics/IMG_0927.jpg',  label:'The best times' },
  { src:'/pics/IMG_0957.jpg',  label:'Hindi mapipigilan ang ngiti' },
  { src:'/pics/IMG_1048.jpg',  label:'Forever in our hearts' },
  { src:'/pics/IMG_1326.jpg',  label:'Grabe ang ganda ng araw na ito' },
  { src:'/pics/IMG_1402.jpg',  label:'Our favorite memories' },
  { src:'/pics/IMG_1696.jpg',  label:'Every moment was worth it' },
  { src:'/pics/IMG_2105.jpg',  label:'Ganyan talaga when you are with her' },
  { src:'/pics/IMG_2157.jpg',  label:'A beautiful day' },
  { src:'/pics/IMG_2211.JPG',  label:'Maris, ikaw talaga 💕' },
  { src:'/pics/IMG_4552.jpg',  label:'Mga sandaling minamahal ko' },
  { src:'/pics/IMG_4561.jpg',  label:'Look at her, so beautiful' },
  { src:'/pics/IMG_5046.jpg',  label:'God is good talaga' },
  { src:'/pics/IMG_5719.jpg',  label:'One of a kind' },
  { src:'/pics/IMG_5881.jpg',  label:'The kind of person you never forget' },
  { src:'/pics/IMG_6054.jpg',  label:'Sobrang bait, sobrang ganda' },
  { src:'/pics/IMG_6065.jpg',  label:'Treasured forever' },
  { src:'/pics/IMG_6249.jpg',  label:'Still the same Maris, still the best' },
  { src:'/pics/IMG_7258.jpg',  label:'Always so genuine' },
  { src:'/pics/IMG_7626.jpg',  label:'This one hits different' },
  { src:'/pics/IMG_7716.jpg',  label:'Nakakatuwa ka talaga' },
  { src:'/pics/IMG_7972.jpg',  label:'Happy days' },
  { src:'/pics/IMG_8902.jpg',  label:'Thirty years of moments like this' },
  { src:'/pics/IMG_8960.jpg',  label:'We are so blessed to know you' },
  { src:'/pics/IMG_9263.jpg',  label:'Hindi mabibilang ang blessings' },
  { src:'/pics/IMG_9459.jpg',  label:'Pure joy' },
  { src:'/pics/IMG_9762.jpg',  label:'This is what 30 looks like' },
  { src:'/pics/IMG_9883.jpg',  label:'Mahal ka namin, Maris' },
  { src:'/pics/IMG_9978.jpg',  label:'Happy 30th Birthday 🎉' },
]

const DURATION = 4500   // ms per photo

// SVG noise for film grain
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

function Sprockets() {
  return (
    <div style={{
      display:'flex', alignItems:'center',
      justifyContent:'space-around',
      width:'100%', height:'100%',
      padding:'0 6px',
    }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{
          width:'clamp(5px,1.1vw,9px)',
          height:'clamp(8px,1.6vw,13px)',
          borderRadius:2,
          background:'rgba(255,255,255,0.11)',
          flexShrink:0,
        }} />
      ))}
    </div>
  )
}

function FilmCaption({ text, idx }) {
  const words = text ? text.split(' ') : []
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={idx}
        initial={{ opacity:0, y:10 }}
        animate={{ opacity:1, y:0 }}
        exit={{ opacity:0, y:-6 }}
        transition={{ duration:0.4 }}
        style={{
          color:'rgba(255,255,255,0.9)',
          fontFamily:"'Playfair Display',serif",
          fontStyle:'italic',
          fontSize:'clamp(12px,2.4vw,20px)',
          textAlign:'center',
          textShadow:'0 1px 6px rgba(0,0,0,0.9)',
          lineHeight:1.4,
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay: 0.35 + i * 0.08, duration:0.25 }}
          >
            {word}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

export default function Slide5Gallery() {
  const [idx,    setIdx]    = useState(0)
  const [paused, setPaused] = useState(false)
  const total = SLOTS.length

  const goTo = useCallback(n => setIdx(((n % total) + total) % total), [total])

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setIdx(i => (i + 1) % total), DURATION)
    return () => clearTimeout(t)
  }, [idx, paused, total])

  return (
    <div style={{
      width:'100%', height:'100%',
      background:'#000',
      display:'flex', flexDirection:'column',
      overflow:'hidden', position:'relative',
    }}>
      {/* Film grain overlay */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage: GRAIN,
        backgroundRepeat:'repeat',
        backgroundSize:'200px 200px',
        opacity:0.055,
        pointerEvents:'none',
        zIndex:10,
        mixBlendMode:'overlay',
      }} />

      {/* ── TOP LETTERBOX (film strip) ── */}
      <div style={{
        height:'clamp(42px,7.5vh,66px)',
        background:'#000',
        flexShrink:0,
        position:'relative', zIndex:5,
        borderBottom:'1px solid rgba(255,255,255,0.05)',
        display:'flex', alignItems:'center',
      }}>
        <Sprockets />
        <div style={{
          position:'absolute', left:'50%', transform:'translateX(-50%)',
          color:'rgba(255,255,255,0.38)',
          fontFamily:"'Inter',sans-serif",
          fontSize:'clamp(7px,1.1vw,10px)',
          letterSpacing:'5px',
          textTransform:'uppercase',
          whiteSpace:'nowrap',
        }}>Memory Lane</div>
        <div style={{
          position:'absolute', right:14,
          color:'rgba(255,255,255,0.25)',
          fontFamily:"'Inter',sans-serif",
          fontSize:'clamp(8px,1.1vw,10px)',
          letterSpacing:'2px',
        }}>
          {String(idx + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}
        </div>
      </div>

      {/* ── PHOTO AREA ── */}
      <div
        style={{ flex:1, position:'relative', overflow:'hidden', cursor:'pointer' }}
        onClick={() => setPaused(p => !p)}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={idx}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            transition={{ duration:0.75, ease:'easeInOut' }}
            style={{ position:'absolute', inset:0,
                     display:'flex', alignItems:'center', justifyContent:'center' }}
          >
            {SLOTS[idx].src ? (
              <img
                src={SLOTS[idx].src}
                alt={SLOTS[idx].label}
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
              />
            ) : (
              <div style={{ textAlign:'center', color:'rgba(255,255,255,0.18)' }}>
                <div style={{ fontSize:'clamp(42px,9vw,76px)', marginBottom:14 }}>
                  {SLOTS[idx].icon}
                </div>
                <div style={{
                  fontFamily:"'Inter',sans-serif",
                  fontSize:'clamp(11px,1.8vw,14px)',
                  letterSpacing:2,
                }}>{SLOTS[idx].label}</div>
                <div style={{
                  fontFamily:"'Inter',sans-serif",
                  fontSize:'clamp(9px,1.2vw,11px)',
                  opacity:0.35, marginTop:7,
                }}>Add in Slide5Gallery.jsx</div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Vignette */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none', zIndex:2,
          background:'radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(0,0,0,0.72) 100%)',
        }} />

        {/* Pause icon */}
        <AnimatePresence>
          {paused && (
            <motion.div
              initial={{ opacity:0, scale:0.75 }}
              animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0, scale:0.75 }}
              style={{
                position:'absolute', top:'50%', left:'50%',
                transform:'translate(-50%,-50%)',
                width:60, height:60, borderRadius:'50%',
                background:'rgba(0,0,0,0.65)',
                backdropFilter:'blur(10px)',
                border:'2px solid rgba(255,255,255,0.28)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:22, color:'white',
                zIndex:6, pointerEvents:'none',
              }}
            >⏸</motion.div>
          )}
        </AnimatePresence>

        {/* Tap zones: left = prev, right = next */}
        <div
          onClick={e => { e.stopPropagation(); goTo(idx - 1) }}
          style={{
            position:'absolute', left:0, top:0,
            width:'22%', height:'100%',
            cursor:'w-resize', zIndex:5,
          }}
        />
        <div
          onClick={e => { e.stopPropagation(); goTo(idx + 1) }}
          style={{
            position:'absolute', right:0, top:0,
            width:'22%', height:'100%',
            cursor:'e-resize', zIndex:5,
          }}
        />
      </div>

      {/* ── BOTTOM LETTERBOX (caption + progress) ── */}
      <div style={{
        height:'clamp(56px,11vh,88px)',
        background:'#000',
        flexShrink:0,
        position:'relative', zIndex:5,
        borderTop:'1px solid rgba(255,255,255,0.05)',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        gap:'clamp(5px,1vh,9px)',
        padding:'0 clamp(16px,5vw,60px)',
      }}>
        {/* Gold progress bar */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:2,
          background:'rgba(255,255,255,0.07)',
        }}>
          {!paused && (
            <motion.div
              key={`bar-${idx}`}
              initial={{ width:'0%' }}
              animate={{ width:'100%' }}
              transition={{ duration: DURATION / 1000, ease:'linear' }}
              style={{ height:'100%', background:'#FFD700' }}
            />
          )}
        </div>

        <FilmCaption text={SLOTS[idx].label} idx={idx} />

        {/* Dot strip */}
        <div style={{ display:'flex', gap:5, alignItems:'center' }}>
          {SLOTS.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); goTo(i) }}
              style={{
                width: i === idx ? 20 : 5,
                height:5, borderRadius:3,
                background: i === idx ? '#FFD700' : 'rgba(255,255,255,0.18)',
                border:'none', cursor:'pointer', padding:0,
                transition:'all 0.3s ease',
                flexShrink:0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
