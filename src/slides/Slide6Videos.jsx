import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/*
  HOW TO ADD VIDEOS
  -----------------
  Replace `src: null` with a public-folder path.
  Example:  { src: '/videos/birthday.mp4', label: 'The Party!' }
  Place files in:  maris-birthday/public/videos/
  Each video plays automatically then advances to the next.
  The `label` field is the caption shown in the bottom bar.
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

const PLACEHOLDER_DURATION = 3200  // ms for placeholder slots

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
  const vidRef = useRef(null)
  const total  = SLOTS.length

  const goTo = useCallback(n => setIdx(((n % total) + total) % total), [total])

  // Auto-advance placeholder slots
  useEffect(() => {
    if (SLOTS[idx].src) return
    if (paused) return
    const t = setTimeout(() => setIdx(i => (i + 1) % total), PLACEHOLDER_DURATION)
    return () => clearTimeout(t)
  }, [idx, paused, total])

  // Auto-play video when slot changes
  useEffect(() => {
    const el = vidRef.current
    if (!el || !SLOTS[idx].src) return
    el.currentTime = 0
    if (!paused) el.play().catch(() => {})
    else         el.pause()
  }, [idx])

  // Pause / resume on paused flag change
  useEffect(() => {
    const el = vidRef.current
    if (!el || !SLOTS[idx].src) return
    paused ? el.pause() : el.play().catch(() => {})
  }, [paused])

  const onEnded = () => setIdx(i => (i + 1) % total)

  const isLive = SLOTS[idx].src && !paused

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

      {/* ── TOP LETTERBOX ── */}
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
          display:'flex', alignItems:'center', gap:8,
        }}>
          {/* REC indicator */}
          {isLive && (
            <motion.div
              animate={{ opacity:[1,0,1] }}
              transition={{ duration:1.2, repeat:Infinity }}
              style={{
                width:7, height:7, borderRadius:'50%',
                background:'#ff2929',
              }}
            />
          )}
          <span style={{
            color:'rgba(255,255,255,0.38)',
            fontFamily:"'Inter',sans-serif",
            fontSize:'clamp(7px,1.1vw,10px)',
            letterSpacing:'5px',
            textTransform:'uppercase',
          }}>Screening Room</span>
        </div>
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

      {/* ── VIDEO / PLACEHOLDER AREA ── */}
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
            transition={{ duration:0.6, ease:'easeInOut' }}
            style={{ position:'absolute', inset:0,
                     display:'flex', alignItems:'center', justifyContent:'center' }}
          >
            {SLOTS[idx].src ? (
              <video
                ref={vidRef}
                src={SLOTS[idx].src}
                playsInline
                onEnded={onEnded}
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
              />
            ) : (
              <div style={{ textAlign:'center', color:'rgba(255,255,255,0.18)' }}>
                <motion.div
                  animate={{ opacity:[0.2,0.5,0.2] }}
                  transition={{ duration:2.4, repeat:Infinity, ease:'easeInOut' }}
                  style={{ fontSize:'clamp(44px,9vw,80px)', marginBottom:14 }}
                >
                  {SLOTS[idx].icon}
                </motion.div>
                <div style={{
                  fontFamily:"'Inter',sans-serif",
                  fontSize:'clamp(11px,1.8vw,14px)',
                  letterSpacing:2,
                }}>{SLOTS[idx].label}</div>
                <div style={{
                  fontFamily:"'Inter',sans-serif",
                  fontSize:'clamp(9px,1.2vw,11px)',
                  opacity:0.35, marginTop:7,
                }}>Add in Slide6Videos.jsx</div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CRT scanlines */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none', zIndex:3,
          background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.05) 2px,rgba(0,0,0,0.05) 4px)',
        }} />

        {/* Vignette */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none', zIndex:2,
          background:'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.68) 100%)',
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

        {/* Tap zones */}
        <div
          onClick={e => { e.stopPropagation(); goTo(idx - 1) }}
          style={{ position:'absolute', left:0, top:0, width:'22%', height:'100%', cursor:'w-resize', zIndex:5 }}
        />
        <div
          onClick={e => { e.stopPropagation(); goTo(idx + 1) }}
          style={{ position:'absolute', right:0, top:0, width:'22%', height:'100%', cursor:'e-resize', zIndex:5 }}
        />
      </div>

      {/* ── BOTTOM LETTERBOX (caption + dots) ── */}
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
        {/* Progress bar — for placeholder slots */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:2,
          background:'rgba(255,255,255,0.07)',
        }}>
          {!SLOTS[idx].src && !paused && (
            <motion.div
              key={`bar-${idx}`}
              initial={{ width:'0%' }}
              animate={{ width:'100%' }}
              transition={{ duration: PLACEHOLDER_DURATION / 1000, ease:'linear' }}
              style={{ height:'100%', background:'#9B59B6' }}
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
                background: i === idx ? '#9B59B6' : 'rgba(255,255,255,0.18)',
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
