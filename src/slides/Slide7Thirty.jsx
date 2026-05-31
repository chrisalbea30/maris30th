import { motion } from 'framer-motion'

const THINGS = [
  { n:'01', text:'Ang bait bait mo talaga, and it is not for show' },
  { n:'02', text:'You put God first in everything you do and it shows' },
  { n:'03', text:'You are obedient to your parents and they are so proud of you' },
  { n:'04', text:'You are kind even to people who cannot give you anything back' },
  { n:'05', text:'Your faith is real. Hindi panlabas lang, it comes from the heart' },
  { n:'06', text:'You do not talk badly about other people. Wala kang masamang sinasabi sa iba' },
  { n:'07', text:'You are patient in ways most people honestly cannot be' },
  { n:'08', text:'When you smile it is so genuine. Hindi plastik' },
  { n:'09', text:'You work hard without making a big deal out of it naman' },
  { n:'10', text:'People trust you because you have earned that trust' },
  { n:'11', text:'You are humble even though you have so much to be proud of' },
  { n:'12', text:'You take care of your family without being asked' },
  { n:'13', text:'You handle hard days with grace and with faith' },
  { n:'14', text:'You forgive people and you do not hold grudges. That is a gift' },
  { n:'15', text:'You make everyone feel welcome. Walang feeling na naiwan o nakalimutan' },
  { n:'16', text:'You are the same person whether someone is watching or not. That is integrity' },
  { n:'17', text:'You know how to have fun but you know your values too' },
  { n:'18', text:'You are easy to be around. Walang arte, walang drama' },
  { n:'19', text:'You pray and it shows in how you carry yourself every day' },
  { n:'20', text:'You are brave even when you are scared. Napakastrong mo' },
  { n:'21', text:'You are the kind of person people call when they really need someone' },
  { n:'22', text:'You care so deeply for the people you love. Halata talaga' },
  { n:'23', text:'You grew up so beautifully and God is honestly not done yet' },
  { n:'24', text:'You make people around you want to be better' },
  { n:'25', text:'You face challenges with faith not just with feelings' },
  { n:'26', text:'You are grateful. Thankful kang tao and that is so beautiful' },
  { n:'27', text:'Thirty years of God\'s grace on your life and it looks so good on you' },
  { n:'28', text:'You are so loved by your family, your friends, and most of all by God' },
  { n:'29', text:'You are a blessing to everyone around you, Maris. Totoo yan.' },
  { n:'30', text:'The best is still ahead. We cannot wait to see everything God has for you. 💛' },
]

// Accent color palette cycling through cards
const ACCENTS = ['#FFD700','#FF6B9D','#9B59B6','#FF7F50','#1ABC9C','#FF4081']

export default function Slide7Thirty() {
  return (
    <div className="slide" style={{
      background:'linear-gradient(135deg,#1a1600 0%,#0a0a1a 50%,#160a00 100%)',
      padding:'clamp(12px,2vw,20px) clamp(12px,3vw,20px) 64px',
      gap:'clamp(8px,1.5vh,14px)',
      justifyContent:'flex-start',
    }}>
      <motion.h2
        initial={{ opacity:0, y:-24 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.75 }}
        style={{
          textAlign:'center',
          fontSize:'clamp(18px,4vw,46px)',
          flexShrink:0,
          background:'linear-gradient(135deg,#FFD700,#FF7F50)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
        }}
      >
        30 Reasons You&apos;re Incredible ✨
      </motion.h2>

      <p style={{
        textAlign:'center',
        color:'rgba(255,255,255,0.3)',
        fontSize:'clamp(10px,1.3vw,12px)',
        letterSpacing:'2px',
        fontFamily:"'Inter',sans-serif",
        flexShrink:0,
      }}>
        Scroll to read all 30 ↓
      </p>

      {/* Scrollable grid */}
      <div className="scroll-fade" style={{
        width:'100%', flex:1,
        overflowY:'auto',
        WebkitOverflowScrolling:'touch',
        paddingBottom:8,
      }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,230px),1fr))',
          gap:'clamp(8px,1.8vw,14px)',
          maxWidth:1100,
          margin:'0 auto',
          padding:'8px 4px',
        }}>
          {THINGS.map((item, i) => {
            const accent = ACCENTS[i % ACCENTS.length]
            return (
              <motion.div
                key={i}
                initial={{ opacity:0, y:18 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay: Math.min(i * 0.025, 0.5), type:'spring', stiffness:240, damping:22 }}
                whileHover={{
                  y:-4,
                  borderColor: accent + '66',
                  boxShadow:`0 8px 26px ${accent}18`,
                }}
                style={{
                  background:'rgba(255,255,255,0.025)',
                  border:`1px solid rgba(255,255,255,0.07)`,
                  borderRadius:12,
                  padding:'clamp(12px,2vw,17px)',
                  transition:'border-color 0.25s, box-shadow 0.25s',
                  cursor:'default',
                }}
              >
                <span style={{
                  display:'block',
                  fontSize:'clamp(28px,5vw,40px)',
                  fontWeight:900,
                  background:`linear-gradient(135deg,${accent},${ACCENTS[(i+1)%ACCENTS.length]})`,
                  WebkitBackgroundClip:'text',
                  WebkitTextFillColor:'transparent',
                  lineHeight:1,
                  marginBottom:6,
                }}>
                  {item.n}
                </span>
                <span style={{
                  color:'rgba(255,255,255,0.78)',
                  fontSize:'clamp(12px,1.6vw,14px)',
                  lineHeight:1.65,
                  fontFamily:"'Inter',sans-serif",
                  fontWeight:300,
                }}>
                  {item.text}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
