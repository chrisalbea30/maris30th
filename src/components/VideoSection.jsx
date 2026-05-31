import { useRef } from 'react'
import { motion } from 'framer-motion'

/*
  HOW TO ADD VIDEOS
  -----------------
  Replace `src: null` with a path in public/ or an import.
  Example: src: '/videos/birthday-clip.mp4'  (place in public/videos/)
  You can add as many entries as you like.
*/
const SLOTS = [
  { src: null, label: 'Video Memory 1', icon: '🎬' },
  { src: null, label: 'Video Memory 2', icon: '🎥' },
  { src: null, label: 'Video Memory 3', icon: '📹' },
]

function VideoCard({ slot, index }) {
  const videoRef = useRef(null)

  const handleClick = () => {
    if (!slot.src || !videoRef.current) return
    videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.14, type: 'spring', stiffness: 160, damping: 18 }}
      whileHover={{ scale: 1.025, y: -4 }}
      onClick={handleClick}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        aspectRatio: '16/9',
        background: 'rgba(0,0,0,0.45)',
        border: slot.src
          ? '2px solid rgba(155,89,182,0.45)'
          : '2px dashed rgba(155,89,182,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: slot.src ? 'pointer' : 'default',
      }}
    >
      {slot.src ? (
        <video
          ref={videoRef}
          src={slot.src}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loop
          playsInline
        />
      ) : (
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(155,89,182,0.18)',
              border: '3px solid rgba(155,89,182,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, margin: '0 auto 14px',
            }}
          >
            ▶
          </motion.div>
          <div style={{ fontSize: 14 }}>{slot.label}</div>
          <div style={{ fontSize: 11, opacity: 0.45, marginTop: 4 }}>Replace src in VideoSection.jsx</div>
        </div>
      )}
    </motion.div>
  )
}

export default function VideoSection() {
  return (
    <section
      style={{
        padding: '80px 20px',
        background: 'linear-gradient(180deg,#0a0a1a,#0a1a0d 50%,#0a0a1a)',
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
          color: '#1ABC9C',
          marginBottom: 12,
        }}
      >
        Video Memories 🎬
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
        Add your video clips — see VideoSection.jsx for instructions
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
        gap: 26,
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        {SLOTS.map((slot, i) => <VideoCard key={i} slot={slot} index={i} />)}
      </div>
    </section>
  )
}
