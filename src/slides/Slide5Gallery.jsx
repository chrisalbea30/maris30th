import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/*
  HOW TO ADD / CHANGE PHOTOS
  --------------------------
  Replace `src` with a public-folder path.
  Example:  { src: '/pics/myfile.jpg', label: 'Caption here' }
  Place files in:  maris-birthday/public/pics/
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

const DURATION = 4500

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

function FilmCaption({ text, idx }) {
  const words = text ? text.split(' ') : []
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={idx}
        initial={{ opacity:0, y:8 }}
        animate={{ opacity:1, y:0 }}
        exit={{ opacity:0 }}
        transition={{ duration:0.4 }}
        style={{
          color:'rgba(255,255,255,0.92)',
          fontFamily:"'Playfair Display',serif",
          fontStyle:'italic',
          fontSize:'clamp(13px,2.6vw,22px)',
          textAlign:'center',
          textShadow:'0 1px 8px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9)',
          lineHeight:1.4,
        }}
      >
        {words.map((word, i) => (
          <motion.span key={i} initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay: 0.3 + i * 0.07, duration:0.25 }}
          >
            {word}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

export default function Slide5Gallery({ goNext }) {
  const [idx,    setIdx]    = useState(0)
  const [paused, setPaused] = useState(false)
  const total = SLOTS.length

  const goTo = useCallback(n => setIdx(((n % total) + total) % total), [total])

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setIdx(i => (i + 1) % total), DURATION)
    return () => clearTimeout(t)
  }, [idx, paused, total])

  return (
    <div style={{
      width:'100%', height:'100%',
      background:'#000',
      overflow:'hidden',
      position:'relative',
    }}>

      {/* ── PHOTO — fills the entire screen ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={idx}
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          exit={{ opacity:0 }}
          transition={{ duration:0.8, ease:'easeInOut' }}
          style={{ position:'absolute', inset:0 }}
        >
          <img
            src={SLOTS[idx].src}
            alt={SLOTS[idx].label}
            style={{
              width:'100%',
              height:'100%',
              objectFit:'contain',
              objectPosition:'center',
              display:'block',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Film grain */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:4,
        backgroundImage:GRAIN, backgroundRepeat:'repeat', backgroundSize:'200px 200px',
        opacity:0.05, mixBlendMode:'overlay',
      }} />

      {/* Top gradient fade */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, zIndex:5, pointerEvents:'none',
        height:'clamp(70px,14vh,110px)',
        background:'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, transparent 100%)',
      }} />

      {/* Bottom gradient fade */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, zIndex:5, pointerEvents:'none',
        height:'clamp(110px,22vh,170px)',
        background:'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)',
      }} />

      {/* ── TOP BAR — overlaid ── */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, zIndex:8,
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'clamp(10px,2vh,18px) 16px 0',
        pointerEvents:'none',
      }}>
        <span style={{
          color:'rgba(255,255,255,0.5)',
          fontFamily:"'Inter',sans-serif",
          fontSize:'clamp(8px,1.1vw,10px)',
          letterSpacing:'5px',
          textTransform:'uppercase',
        }}>Memory Lane</span>

        <span style={{
          position:'absolute', right:16,
          color:'rgba(255,255,255,0.3)',
          fontFamily:"'Inter',sans-serif",
          fontSize:'clamp(8px,1.1vw,10px)',
          letterSpacing:'2px',
        }}>
          {String(idx + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}
        </span>
      </div>

      {/* ── BOTTOM BAR — overlaid ── */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, zIndex:8,
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'flex-end',
        gap:6,
        padding:'0 clamp(16px,5vw,48px) clamp(14px,2.5vh,22px)',
      }}>
        {/* Progress bar */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:2,
          background:'rgba(255,255,255,0.12)',
        }}>
          {!paused && (
            <motion.div
              key={`bar-${idx}`}
              initial={{ width:'0%' }}
              animate={{ width:'100%' }}
              transition={{ duration:DURATION / 1000, ease:'linear' }}
              style={{ height:'100%', background:'#FFD700' }}
            />
          )}
        </div>

        {/* Caption sits clearly above the dots */}
        <div style={{ paddingBottom:4 }}>
          <FilmCaption text={SLOTS[idx].label} idx={idx} />
        </div>

        {/* Dot strip + next-slide button on same row */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ display:'flex', gap:4, alignItems:'center', flexWrap:'nowrap', overflow:'hidden', maxWidth:'70vw' }}>
            {SLOTS.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); goTo(i) }} style={{
                width: i === idx ? 18 : 4, height:4, borderRadius:3,
                background: i === idx ? '#FFD700' : 'rgba(255,255,255,0.25)',
                border:'none', cursor:'pointer', padding:0,
                transition:'all 0.3s ease', flexShrink:0,
              }} />
            ))}
          </div>
          {goNext && (
            <button
              onClick={e => { e.stopPropagation(); goNext() }}
              style={{
                flexShrink:0,
                background:'rgba(255,255,255,0.1)',
                border:'1px solid rgba(255,255,255,0.22)',
                borderRadius:20,
                padding:'4px 10px',
                color:'rgba(255,255,255,0.7)',
                fontSize:10,
                letterSpacing:'2px',
                textTransform:'uppercase',
                cursor:'pointer',
                fontFamily:"'Inter',sans-serif",
                whiteSpace:'nowrap',
              }}
            >
              Next →
            </button>
          )}
        </div>
      </div>

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
              background:'rgba(0,0,0,0.6)', backdropFilter:'blur(10px)',
              border:'2px solid rgba(255,255,255,0.28)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:22, color:'white', zIndex:9, pointerEvents:'none',
            }}
          >⏸</motion.div>
        )}
      </AnimatePresence>

      {/* Tap zones */}
      <div onClick={e => { e.stopPropagation(); goTo(idx - 1) }}
        style={{ position:'absolute', left:0, top:0, width:'22%', height:'100%',
                 cursor:'w-resize', zIndex:7 }} />
      <div onClick={() => setPaused(p => !p)}
        style={{ position:'absolute', left:'22%', top:0, width:'56%', height:'100%',
                 cursor:'pointer', zIndex:7 }} />
      <div onClick={e => { e.stopPropagation(); goTo(idx + 1) }}
        style={{ position:'absolute', right:0, top:0, width:'22%', height:'100%',
                 cursor:'e-resize', zIndex:7 }} />
    </div>
  )
}
