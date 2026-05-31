import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const NOTES = {
  G4:392.00, A4:440.00, B4:493.88, C5:523.25,
  D5:587.33, E5:659.25, F5:698.46, G5:783.99,
}

// Happy Birthday to You
const MELODY = [
  ['G4',.30],['G4',.30],['A4',.60],['G4',.60],['C5',.60],['B4',1.20],
  ['G4',.30],['G4',.30],['A4',.60],['G4',.60],['D5',.60],['C5',1.20],
  ['G4',.30],['G4',.30],['G5',.60],['E5',.60],['C5',.60],['B4',.60],['A4',1.20],
  ['F5',.30],['F5',.30],['E5',.60],['C5',.60],['D5',.60],['C5',1.80],
]

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef  = useRef(null)
  const nodesRef  = useRef([])   // active oscillator + gain pairs
  const timerRef  = useRef(null)

  const stop = () => {
    nodesRef.current.forEach(({ osc, gain, ctx }) => {
      try {
        gain.gain.cancelScheduledValues(ctx.currentTime)
        gain.gain.setValueAtTime(0, ctx.currentTime)
        osc.stop(ctx.currentTime + 0.02)
      } catch (_) {}
    })
    nodesRef.current = []
    clearTimeout(timerRef.current)
    setPlaying(false)
  }

  const play = () => {
    if (playing) { stop(); return }

    if (!audioRef.current)
      audioRef.current = new (window.AudioContext || window.webkitAudioContext)()
    const ctx = audioRef.current
    nodesRef.current = []
    let t = ctx.currentTime + 0.05

    MELODY.forEach(([note, dur]) => {
      const freq = NOTES[note]
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, t)
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.22, t + 0.05)
      gain.gain.linearRampToValueAtTime(0.14, t + dur * 0.65)
      gain.gain.linearRampToValueAtTime(0, t + dur * 0.92)
      osc.start(t)
      osc.stop(t + dur)
      nodesRef.current.push({ osc, gain, ctx })
      t += dur
    })

    setPlaying(true)
    const total = MELODY.reduce((s, [,d]) => s + d, 0)
    timerRef.current = setTimeout(() => {
      nodesRef.current = []
      setPlaying(false)
    }, (total + 0.6) * 1000)
    window.dispatchEvent(new CustomEvent('fireworks:launch', { detail: { count: 6 } }))
  }

  return (
    <motion.button
      onClick={play}
      whileHover={{ scale: 1.18 }}
      whileTap={{ scale: 0.88 }}
      animate={playing
        ? { boxShadow: ['0 0 20px rgba(155,89,182,0.5)','0 0 55px rgba(255,107,157,0.9)','0 0 20px rgba(155,89,182,0.5)'] }
        : { boxShadow: '0 0 20px rgba(155,89,182,0.5)' }
      }
      transition={playing ? { duration: 0.5, repeat: Infinity } : {}}
      title={playing ? 'Stop music' : 'Play Happy Birthday! 🎵'}
      style={{
        position: 'fixed', bottom: 30, right: 30,
        width: 62, height: 62, borderRadius: '50%',
        background: 'linear-gradient(135deg,#9B59B6,#FF6B9D)',
        border: 'none', cursor: 'pointer',
        fontSize: 26, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {playing ? '🎶' : '🎵'}
    </motion.button>
  )
}
