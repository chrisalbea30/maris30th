import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/*
  HOW TO ADD / CHANGE VIDEOS
  --------------------------
  Replace `src` with a public-folder path.
  Example:  { src: '/vids/myfile.mp4', label: 'Caption here' }
  Place files in:  maris-birthday/public/vids/
*/
const SLOTS = [
  { src:'/vids/IMG_1636.mp4', label:'Ang saya saya 🎬' },
  { src:'/vids/IMG_1637.mp4', label:'Kita mo naman siya' },
  { src:'/vids/IMG_1987.mp4', label:'Hindi mo siya mapalitan' },
  { src:'/vids/IMG_2169.mp4', label:'Grabe, look at her go' },
  { src:'/vids/IMG_2852.mp4', label:'Pure happiness' },
  { src:'/vids/IMG_4655.mp4', label:'Our girl, Maris' },
  { src:'/vids/IMG_5813.mp4', label:'Thirty years of moments like this' },
  { src:'/vids/IMG_5814.mp4', label:'She never changes talaga' },
  { src:'/vids/IMG_7884.mp4', label:'Happy 30th Birthday, Maris 💛' },
]

const PLACEHOLDER_DURATION = 3200

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

export default function Slide6Videos() {
  const [idx,    setIdx]    = useState(0)
  const [paused, setPaused] = useState(false)
  const vidRef  = useRef(null)
  const total   = SLOTS.length

  const goTo = useCallback(n => setIdx(((n % total) + total) % total), [total])

  // Placeholder auto-advance
  useEffect(() => {
    if (SLOTS[idx].src) return
    if (paused) return
    const t = setTimeout(() => setIdx(i => (i + 1) % total), PLACEHOLDER_DURATION)
    return () => clearTimeout(t)
  }, [idx, paused, total])

  // Auto-play video when idx changes
  useEffect(() => {
    const el = vidRef.current
    if (!el || !SLOTS[idx].src) return
    el.currentTime = 0
    if (!paused) el.play().catch(() => {})
    else el.pause()
  }, [idx])

  // Pause / resume on flag change
  useEffect(() => {
    const el = vidRef.current
    if (!el || !SLOTS[idx].src) return
    paused ? el.pause() : el.play().catch(() => {})
  }, [paused])

  const onEnded = () => setIdx(i => (i + 1) % total)
  const isLive  = SLOTS[idx].src && !paused

  return (
    <div style={{
      width:'100%', height:'100%',
      background:'#000',
      overflow:'hidden',
      position:'relative',
    }}>

      {/* ── VIDEO — fills the entire screen ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={idx}
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          exit={{ opacity:0 }}
          transition={{ duration:0.6, ease:'easeInOut' }}
          style={{ position:'absolute', inset:0 }}
        >
          {SLOTS[idx].src ? (
            <video
              ref={vidRef}
              src={SLOTS[idx].src}
              playsInline
              onEnded={onEnded}
              style={{
                width:'100%',
                height:'100%',
                objectFit:'cover',
                display:'block',
              }}
            />
          ) : (
            <div style={{
              width:'100%', height:'100%',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'rgba(255,255,255,0.18)',
            }}>
              <motion.div
                animate={{ opacity:[0.2,0.5,0.2] }}
                transition={{ duration:2.4, repeat:Infinity, ease:'easeInOut' }}
                style={{ textAlign:'center' }}
              >
                <div style={{ fontSize:'clamp(44px,9vw,80px)', marginBottom:14 }}>🎬</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:'clamp(11px,1.8vw,14px)', letterSpacing:2 }}>
                  {SLOTS[idx].label}
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Film grain */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:4,
        backgroundImage:GRAIN, backgroundRepeat:'repeat', backgroundSize:'200px 200px',
        opacity:0.05, mixBlendMode:'overlay',
      }} />

      {/* CRT scanlines */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:4,
        background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)',
      }} />

      {/* Top gradient */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, zIndex:5, pointerEvents:'none',
        height:'clamp(70px,14vh,110px)',
        background:'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)',
      }} />

      {/* Bottom gradient */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, zIndex:5, pointerEvents:'none',
        height:'clamp(110px,22vh,170px)',
        background:'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
      }} />

      {/* ── TOP BAR — overlaid ── */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, zIndex:8,
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'clamp(10px,2vh,18px) 16px 0',
        pointerEvents:'none',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {isLive && (
            <motion.div
              animate={{ opacity:[1,0,1] }}
              transition={{ duration:1.2, repeat:Infinity }}
              style={{ width:7, height:7, borderRadius:'50%', background:'#ff2929' }}
            />
          )}
          <span style={{
            color:'rgba(255,255,255,0.5)',
            fontFamily:"'Inter',sans-serif",
            fontSize:'clamp(8px,1.1vw,10px)',
            letterSpacing:'5px',
            textTransform:'uppercase',
          }}>Screening Room</span>
        </div>
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
        gap:'clamp(6px,1.2vh,10px)',
        padding:'0 clamp(16px,5vw,60px) clamp(16px,3vh,28px)',
      }}>
        {/* Placeholder progress bar */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:2,
          background:'rgba(255,255,255,0.12)',
        }}>
          {!SLOTS[idx].src && !paused && (
            <motion.div
              key={`bar-${idx}`}
              initial={{ width:'0%' }}
              animate={{ width:'100%' }}
              transition={{ duration:PLACEHOLDER_DURATION / 1000, ease:'linear' }}
              style={{ height:'100%', background:'#9B59B6' }}
            />
          )}
        </div>

        <FilmCaption text={SLOTS[idx].label} idx={idx} />

        {/* Dot strip */}
        <div style={{ display:'flex', gap:5, alignItems:'center' }}>
          {SLOTS.map((_, i) => (
            <button key={i} onClick={e => { e.stopPropagation(); goTo(i) }} style={{
              width: i === idx ? 20 : 5, height:5, borderRadius:3,
              background: i === idx ? '#9B59B6' : 'rgba(255,255,255,0.25)',
              border:'none', cursor:'pointer', padding:0,
              transition:'all 0.3s ease', flexShrink:0,
            }} />
          ))}
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
