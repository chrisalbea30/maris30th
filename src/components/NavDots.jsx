import { motion, LayoutGroup } from 'framer-motion'

const LABELS = ['✨','🎂','🕯️','💌','📸','🎬','💛','⭐','🎉']

export default function NavDots({ total, current, onDotClick }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 18,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 7,
      zIndex: 60,
      alignItems: 'center',
      padding: '8px 16px',
      background: 'rgba(0,0,0,0.35)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: 40,
      border: '1px solid rgba(255,255,255,0.07)',
    }}>
      <LayoutGroup>
        {Array.from({ length: total }, (_, i) => (
          <motion.button
            key={i}
            layout
            onClick={() => onDotClick(i)}
            title={LABELS[i]}
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.75 }}
            animate={{
              width: i === current ? 28 : 8,
              background: i === current
                ? 'linear-gradient(90deg,#FFD700,#FF6B9D)'
                : 'rgba(255,255,255,0.28)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            style={{
              height: 8,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          />
        ))}
      </LayoutGroup>
    </div>
  )
}
