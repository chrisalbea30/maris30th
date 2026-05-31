import { motion } from 'framer-motion'

const THINGS = [
  { n:'01', text:"Your laugh is completely contagious — it fills every room" },
  { n:'02', text:"You make everyone around you feel seen and valued" },
  { n:'03', text:"Your strength and resilience are awe-inspiring" },
  { n:'04', text:"You have the most beautiful heart" },
  { n:'05', text:"You're effortlessly cool and don't even know it" },
  { n:'06', text:"Your creativity and imagination know no limits" },
  { n:'07', text:"You love people deeply and with your whole self" },
  { n:'08', text:"You are unapologetically, brilliantly YOU" },
  { n:'09', text:"You make hard things look easy" },
  { n:'10', text:"Your kindness ripples out further than you know" },
  { n:'11', text:"You have incredible taste in everything" },
  { n:'12', text:"You're hilarious — genuinely, gut-achingly funny" },
  { n:'13', text:"You show up for the people you love, always" },
  { n:'14', text:"You're braver than you believe" },
  { n:'15', text:"You radiate warmth and make everyone feel at home" },
  { n:'16', text:"You are a force of nature wrapped in grace" },
  { n:'17', text:"Your smile could light up an entire city" },
  { n:'18', text:"You inspire people without even trying" },
  { n:'19', text:"You embrace life's adventures with open arms" },
  { n:'20', text:"You turn ordinary moments into extraordinary memories" },
  { n:'21', text:"You are magic wrapped in a human being" },
  { n:'22', text:"Your empathy and compassion are your superpowers" },
  { n:'23', text:"You always know exactly the right thing to say" },
  { n:'24', text:"You make the world infinitely better just by being in it" },
  { n:'25', text:"You face every challenge with fire and grace" },
  { n:'26', text:"Your passion for life is absolutely electric" },
  { n:'27', text:"You are loved more than words can ever express" },
  { n:'28', text:"You've only just begun your most incredible chapter" },
  { n:'29', text:"Everything you touch turns golden" },
  { n:'30', text:"The best is absolutely yet to come — and we can't wait 💛" },
]

export default function ThirtyThings() {
  return (
    <section
      style={{
        padding: '80px 20px',
        background: 'linear-gradient(180deg,#0a0a1a,#1a180a 50%,#0a0a1a)',
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
          marginBottom: 54,
          background: 'linear-gradient(135deg,#FFD700,#FF7F50)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        30 Reasons You&apos;re Incredible ✨
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(255px,1fr))',
        gap: 16,
        maxWidth: 1120,
        margin: '0 auto',
      }}>
        {THINGS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.025, type: 'spring', stiffness: 220, damping: 22 }}
            whileHover={{
              y: -5,
              borderColor: 'rgba(255,215,0,0.55)',
              boxShadow: '0 12px 32px rgba(255,215,0,0.12)',
            }}
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,215,0,0.12)',
              borderRadius: 14,
              padding: '18px 20px',
              cursor: 'default',
              transition: 'border-color 0.25s, box-shadow 0.25s',
            }}
          >
            <span style={{
              display: 'block',
              fontSize: 40,
              fontWeight: 900,
              background: 'linear-gradient(135deg,#FFD700,#FF6B9D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: 7,
            }}>
              {item.n}
            </span>
            <span style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: 14,
              lineHeight: 1.65,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
            }}>
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
