import './App.css'
import StarField    from './components/StarField'
import Fireworks   from './components/Fireworks'
import Cursor      from './components/Cursor'
import MusicPlayer from './components/MusicPlayer'
import SlideShow   from './components/SlideShow'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100dvh', background: '#0a0a1a', overflow: 'hidden' }}>
      <StarField />
      <Fireworks />
      <Cursor />
      <MusicPlayer />
      <SlideShow />
    </div>
  )
}
