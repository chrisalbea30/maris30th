import { motion } from 'framer-motion'

const PARAS = [
  { delay:0.4,
    text: 'God has been so good to you and it shows in the way you live. You grew up to be someone with a genuinely good heart. Someone who loves her family, who respects her parents, who always tries to do what is right. That is God working in your life and you letting Him.' },
  { delay:0.8, gold:true,
    text: "It is an achievement alone to get where you are right now. Being around you is a blessing. I am lucky to be with you on this milestone. Enjoy your day and make it the best. Reaching 30 years is not easy and I know your young self is so proud of where you are right now." },
  { delay:1.2,
    text: 'Today we celebrate everything you are and everything God is still going to do in your life. Thirty is not the end of something. It is the beginning of so much more. Marami pang darating na blessings para sayo.' },
  { delay:1.6, gold:true,
    text: 'This is a day to celebrate 30 years of living! Happy 30th Birthday, Maris. Mahal na mahal kita. 💛' },
]

export default function Slide4Message() {
  return (
    <div className="slide" style={{
      background:'linear-gradient(135deg,#050a1a 0%,#0a0a1a 50%,#050d08 100%)',
      padding:'clamp(16px,3vw,28px) clamp(16px,4vw,32px) 64px',
    }}>
      <motion.h2
        initial={{ opacity:0, y:-28 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.7 }}
        style={{
          fontSize:'clamp(22px,4.5vw,48px)',
          color:'#FF6B9D',
          textAlign:'center',
          marginBottom:'clamp(16px,3vh,28px)',
          flexShrink:0,
        }}
      >
        Happy Birthday Love 💌
      </motion.h2>

      <motion.p
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:0.15, duration:0.7 }}
        style={{
          fontSize:'clamp(11px,1.5vw,14px)',
          color:'rgba(255,215,0,0.55)',
          textAlign:'center',
          letterSpacing:'4px',
          textTransform:'uppercase',
          fontFamily:"'Inter',sans-serif",
          marginTop:'-clamp(10px,1.5vh,16px)',
          marginBottom:'clamp(12px,2vh,20px)',
          flexShrink:0,
        }}
      >
        3 Decades &amp; 30 Years
      </motion.p>

      <motion.div
        initial={{ opacity:0, y:50 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.9, ease:'easeOut', delay:0.15 }}
        className="glass"
        style={{
          maxWidth:780,
          width:'100%',
          padding:'clamp(22px,4vw,46px) clamp(18px,4vw,44px)',
          position:'relative',
          overflow:'hidden',
          maxHeight:'calc(100dvh - 200px)',
          overflowY:'auto',
        }}
      >
        {/* Rotating glow */}
        <motion.div
          animate={{ rotate:360 }}
          transition={{ duration:24, repeat:Infinity, ease:'linear' }}
          style={{
            position:'absolute', top:'-50%', left:'-50%',
            width:'200%', height:'200%',
            background:'radial-gradient(ellipse at center, rgba(255,215,0,0.04) 0%, transparent 68%)',
            pointerEvents:'none',
          }}
        />

        {/* Decorative quote marks */}
        <div style={{
          fontSize:'clamp(60px,10vw,100px)',
          color:'rgba(255,107,157,0.12)',
          lineHeight:0.8,
          fontFamily:'Georgia,serif',
          marginBottom:8,
          userSelect:'none',
        }}>"</div>

        <motion.p
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.25 }}
          style={{
            fontSize:'clamp(14px,1.5vw,17px)',
            color:'rgba(255,255,255,0.6)',
            fontStyle:'italic',
            marginBottom:20,
            letterSpacing:'1px',
            fontFamily:"'Inter',sans-serif",
          }}
        >
          Maris,
        </motion.p>

        {PARAS.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity:0, y:18 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:p.delay, duration:0.7 }}
            style={{
              fontSize:'clamp(14px,1.8vw,19px)',
              lineHeight:1.9,
              color: p.gold ? '#FFD700' : 'rgba(255,255,255,0.88)',
              fontStyle: p.gold ? 'italic' : 'normal',
              marginBottom: i < PARAS.length - 1 ? 'clamp(12px,2vh,20px)' : 0,
              position:'relative', zIndex:1,
            }}
          >
            {p.text}
          </motion.p>
        ))}

        <motion.p
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:2.5 }}
          style={{
            marginTop:'clamp(18px,3vh,28px)',
            fontSize:'clamp(14px,1.8vw,18px)',
            color:'#FF6B9D',
            fontStyle:'italic',
            textAlign:'right',
            position:'relative', zIndex:1,
          }}
        >
          With all of our love 🥂
        </motion.p>
      </motion.div>
    </div>
  )
}
