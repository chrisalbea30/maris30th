import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NavDots from './NavDots'

import Slide1Hero        from '../slides/Slide1Hero'
import Slide2Stats       from '../slides/Slide2Stats'
import Slide3Cake        from '../slides/Slide3Cake'
import Slide4Message     from '../slides/Slide4Message'
import Slide5Gallery     from '../slides/Slide5Gallery'
import Slide6Videos      from '../slides/Slide6Videos'
import Slide7Thirty      from '../slides/Slide7Thirty'
import Slide8Wish        from '../slides/Slide8Wish'
import Slide9Finale      from '../slides/Slide9Finale'
import Slide10Monthsary  from '../slides/Slide10Monthsary'

const SLIDES = [
  Slide1Hero, Slide2Stats, Slide3Cake, Slide4Message, Slide5Gallery,
  Slide6Videos, Slide7Thirty, Slide8Wish, Slide9Finale, Slide10Monthsary,
]

const variants = {
  enter: dir => ({
    x: dir >= 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
    filter: 'blur(6px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 290, damping: 30, mass: 0.85, filter: { duration: 0.25 } },
  },
  exit: dir => ({
    x: dir >= 0 ? '-55%' : '55%',
    opacity: 0,
    scale: 0.92,
    filter: 'blur(6px)',
    transition: { type: 'spring', stiffness: 290, damping: 30, mass: 0.85, filter: { duration: 0.2 } },
  }),
}

export default function SlideShow() {
  const [[idx, dir], setSlide] = useState([0, 1])
  const cooldown   = useRef(false)
  const touchX     = useRef(null)
  const touchY     = useRef(null)

  const go = useCallback((next) => {
    if (cooldown.current) return
    if (next < 0 || next >= SLIDES.length) return
    cooldown.current = true
    setSlide(prev => [next, next >= prev[0] ? 1 : -1])
    setTimeout(() => { cooldown.current = false }, 650)
  }, [])

  const next = useCallback(() => go(idx + 1), [go, idx])
  const prev = useCallback(() => go(idx - 1), [go, idx])

  // Keyboard
  useEffect(() => {
    const fn = e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  next()
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    prev()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [next, prev])

  // Wheel (throttled)
  useEffect(() => {
    let last = 0
    const fn = e => {
      const now = Date.now()
      if (now - last < 900) return
      last = now
      if (e.deltaY >  25) next()
      if (e.deltaY < -25) prev()
    }
    window.addEventListener('wheel', fn, { passive: true })
    return () => window.removeEventListener('wheel', fn)
  }, [next, prev])

  // Touch swipe
  const onTouchStart = e => {
    touchX.current = e.touches[0].clientX
    touchY.current = e.touches[0].clientY
  }
  const onTouchEnd = e => {
    if (touchX.current === null) return
    const dx = touchX.current - e.changedTouches[0].clientX
    const dy = touchY.current - e.changedTouches[0].clientY
    // Only change slide if clearly horizontal (horizontal > 2x vertical)
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 2) {
      dx > 0 ? next() : prev()
    }
    touchX.current = null
    touchY.current = null
  }

  const Slide = SLIDES[idx]

  return (
    <div
      style={{ position: 'relative', width: '100vw', height: '100dvh', overflow: 'hidden' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={idx}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ position: 'absolute', inset: 0, willChange: 'transform,opacity' }}
        >
          <Slide goNext={next} goPrev={prev} goTo={go} slideIndex={idx} total={SLIDES.length} />
        </motion.div>
      </AnimatePresence>

      <NavDots total={SLIDES.length} current={idx} onDotClick={go} />

      {/* Side arrows — desktop only */}
      {idx > 0 && (
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          whileHover={{ scale: 1.15, background: 'rgba(255,255,255,0.16)' }}
          whileTap={{ scale: 0.88 }}
          onClick={prev}
          style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.13)',
            color: 'white', fontSize: 18, cursor: 'pointer', zIndex: 55,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}
        >←</motion.button>
      )}
      {idx < SLIDES.length - 1 && (
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          whileHover={{ scale: 1.15, background: 'rgba(255,255,255,0.16)' }}
          whileTap={{ scale: 0.88 }}
          onClick={next}
          style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.13)',
            color: 'white', fontSize: 18, cursor: 'pointer', zIndex: 55,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}
        >→</motion.button>
      )}
    </div>
  )
}
