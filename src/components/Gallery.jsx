import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/*
  HOW TO ADD PHOTOS
  -----------------
  Replace `src: null` with a path relative to the public/ folder or an import.
  Example: src: '/photos/maris-1.jpg'   (place the file in public/photos/)
  Or:      import photo1 from '../assets/maris-1.jpg'  then  src: photo1

  You can also add a `caption` string to each entry.
*/
const SLOTS = [
  { src: null, icon: '📷', label: 'Memory 1' },
  { src: null, icon: '🎉', label: 'Memory 2' },
  { src: null, icon: '🌟', label: 'Memory 3' },
  { src: null, icon: '💫', label: 'Memory 4' },
  { src: null, icon: '🥂', label: 'Memory 5' },
  { src: null, icon: '🎂', label: 'Memory 6' },
  { src: null, icon: '🌸', label: 'Memory 7' },
  { src: null, icon: '✨', label: 'Memory 8' },
  { src: null, icon: '💕', label: 'Memory 9' },
]

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section
      style={{
        padding: '80px 20px',
        background: 'linear-gradient(180deg,#0a0a1a,#1a0f2e 50%,#0a0a1a)',
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
          marginBottom: 12,
          background: 'linear-gradient(135deg,#9B59B6,#FF6B9D)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Memory Lane 📸
      </motion.h2>

      <p style={{
        textAlign: 'center',
        color: 'rgba(255,255,255,0.28)',
        marginBottom: 44,
        fontSize: 11,
        letterSpacing: '3px',
        textTransform: 'uppercase',
        fontFamily: "'Inter', sans-serif",
      }}>
        Add your photos — see Gallery.jsx for instructions
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(255px,1fr))',
        gap: 20,
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {SLOTS.map((slot, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 220, damping: 22 }}
            whileHover={{ scale: 1.04, y: -5 }}
            onClick={() => slot.src && setActive(slot)}
            style={{
              position: 'relative',
              borderRadius: 16,
              overflow: 'hidden',
              aspectRatio: '4/3',
              cursor: slot.src ? 'pointer' : 'default',
              background: 'rgba(255,255,255,0.025)',
              border: slot.src
                ? '2px solid rgba(255,215,0,0.45)'
                : '2px dashed rgba(255,215,0,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {slot.src ? (
              <>
                <img
                  src={slot.src}
                  alt={slot.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(transparent,rgba(0,0,0,0.72))',
                    display: 'flex', alignItems: 'flex-end',
                    padding: 16,
                  }}
                >
                  <span style={{ color: 'white', fontSize: 13 }}>{slot.label}</span>
                </motion.div>
              </>
            ) : (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.28)' }}>
                <div style={{ fontSize: 44, marginBottom: 8, opacity: 0.5 }}>{slot.icon}</div>
                <div style={{ fontSize: 13 }}>{slot.label}</div>
                <div style={{ fontSize: 11, opacity: 0.45, marginTop: 4 }}>Replace src in Gallery.jsx</div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.96)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.img
              src={active.src}
              alt={active.label}
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '92vw', maxHeight: '88vh',
                borderRadius: 14,
                boxShadow: '0 0 60px rgba(255,215,0,0.3)',
              }}
            />
            <button
              onClick={() => setActive(null)}
              style={{
                position: 'absolute', top: 20, right: 28,
                background: 'none', border: 'none',
                color: 'white', fontSize: 42, cursor: 'pointer',
                lineHeight: 1,
              }}
            >×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
