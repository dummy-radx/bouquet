import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Navigation, BookOpen } from 'lucide-react'
import { CoverPage } from './components/CoverPage'
import { PolaroidBoard } from './components/PolaroidBoard'
import { BouquetBuilder } from './components/BouquetBuilder'
import { ChocolateTeddyBox } from './components/ChocolateTeddyBox'
import { LoveQuiz } from './components/LoveQuiz'
import { MusicBox } from './components/MusicBox'
import { FlipBook } from './components/FlipBook'

// Custom Cursor Trail Component for Cute Vibes (spawns hearts, sunflowers, and hand-drawn stars!)
const CuteCursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [bubbles, setBubbles] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Randomly spawn cursor bubbles
      if (Math.random() < 0.15) {
        const types = ['heart', 'sunflower', 'star']
        const type = types[Math.floor(Math.random() * types.length)]
        setBubbles((prev) => [
          ...prev.slice(-20),
          {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            scale: Math.random() * 0.6 + 0.5,
            type,
            color: ['text-pink-400', 'text-amber-400', 'text-yellow-500', 'text-rose-400'][Math.floor(Math.random() * 4)]
          }
        ])
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Follower sunflower */}
      <motion.div
        className="hidden md:block fixed pointer-events-none z-50 text-amber-500"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: [1, 1.15, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          x: { type: 'spring', stiffness: 250, damping: 20, mass: 0.2 },
          y: { type: 'spring', stiffness: 250, damping: 20, mass: 0.2 },
          scale: { repeat: Infinity, duration: 1.5 },
          rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
      >
        <span className="text-lg">🌻</span>
      </motion.div>

      {/* Bubble trail */}
      <AnimatePresence>
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            className={`fixed pointer-events-none z-50 select-none ${b.color} font-bold`}
            initial={{ x: b.x, y: b.y, scale: b.scale, opacity: 1, rotate: Math.random() * 360 }}
            animate={{
              y: b.y - 60,
              x: b.x + (Math.random() * 40 - 20),
              opacity: 0,
              scale: 0.1,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
          >
            {b.type === 'heart' && '❤️'}
            {b.type === 'sunflower' && '🌻'}
            {b.type === 'star' && '✨'}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}

// Floating Sunflower background decoration
const FloatingSunflower = ({ className, style }) => (
  <motion.div className={className} style={style}>
    <svg width="85" height="85" viewBox="0 0 100 100" fill="none" className="animate-spin-slow opacity-[0.25] pointer-events-none select-none">
      {/* Petals */}
      {Array.from({ length: 12 }).map((_, idx) => {
        const angle = (idx * 360) / 12
        return (
          <g key={idx} transform={`rotate(${angle} 50 50)`}>
            <path d="M50 15 C45 30, 55 30, 50 15Z" fill="#FFB300" stroke="#FFA000" strokeWidth="1.5" />
            <path d="M50 10 C42 28, 58 28, 50 10Z" fill="#FFC107" />
          </g>
        )
      })}
      {/* Center */}
      <circle cx="50" cy="50" r="20" fill="#5D4037" stroke="#3E2723" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="14" fill="#4E342E" strokeDasharray="2,2" stroke="#8D6E63" strokeWidth="1.5" />
    </svg>
  </motion.div>
)

function App() {
  const [isBookOpened, setIsBookOpened] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Create parallax values for background shapes
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -180])
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, 250])
  const rParallax = useTransform(scrollYProgress, [0, 1], [0, 90])

  const sections = [
    { id: 'cover', name: 'Welcome 💌', component: <CoverPage onOpenComplete={() => setIsBookOpened(true)} /> },
    { id: 'polaroids', name: 'Memories 📌', component: <PolaroidBoard /> },
    { id: 'story', name: 'Our Story 📖', component: <FlipBook /> },
    { id: 'flowers', name: 'Bouquet 🌸', component: <BouquetBuilder /> },
    { id: 'sweets', name: 'Sweets 🍫', component: <ChocolateTeddyBox /> },
    { id: 'quiz', name: 'Love Quiz 🎮', component: <LoveQuiz /> },
    { id: 'letter', name: 'Letter 🎵', component: <MusicBox /> }
  ]

  const handleScrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen bg-grid-paper selection:bg-pink-100 selection:text-pink-500">
      
      {/* Cute Cursor Follower for Desktop */}
      <CuteCursorTrail />
 
      {/* PARALLAX FLOATING DECORATIONS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft pastel blobs floating around */}
        <motion.div 
          style={{ y: yParallax1, rotate: rParallax }}
          className="absolute top-1/4 left-[-100px] w-[350px] h-[350px] rounded-full bg-pink-100/40 filter blur-3xl"
        />
        <motion.div 
          style={{ y: yParallax2 }}
          className="absolute top-[60%] right-[-80px] w-[400px] h-[400px] rounded-full bg-amber-100/40 filter blur-3xl"
        />
        <motion.div 
          style={{ y: yParallax1 }}
          className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-purple-100/30 filter blur-3xl"
        />

        {/* Floating parallax sunflowers */}
        <FloatingSunflower
          style={{ y: yParallax1 }}
          className="absolute top-[18%] left-[8%]"
        />
        <FloatingSunflower
          style={{ y: yParallax2 }}
          className="absolute top-[52%] right-[12%]"
        />
        <FloatingSunflower
          style={{ y: yParallax1 }}
          className="absolute bottom-[22%] left-[12%]"
        />

        {/* Hand drawn SVG decorations floating */}
        <motion.div 
          style={{ y: yParallax1, rotate: 15 }} 
          className="absolute top-[12%] right-[8%] opacity-30 text-pink-400"
        >
          <Heart size={48} />
        </motion.div>
        <motion.div 
          style={{ y: yParallax2, rotate: -25 }} 
          className="absolute top-[35%] left-[6%] opacity-20 text-purple-400"
        >
          <Sparkles size={52} />
        </motion.div>
        <motion.div 
          style={{ y: yParallax1, rotate: 45 }} 
          className="absolute top-[75%] right-[10%] opacity-20 text-amber-400"
        >
          <Heart size={44} />
        </motion.div>
      </div>

      {/* CUTE FLOATING SCRAPBOOK NAVIGATION */}
      <AnimatePresence>
        {isBookOpened && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border-stitch shadow-lg"
          >
            <div className="font-pacifico text-pink-500 text-sm text-center border-b border-pink-100 pb-2 select-none">
              Scrapbook
            </div>
            {sections.map((sect) => (
              <button
                key={sect.id}
                onClick={() => handleScrollTo(sect.id)}
                className="w-full px-3 py-1.5 rounded-lg text-left font-cute text-xs font-semibold text-stone-600 hover:bg-pink-50 hover:text-pink-500 transition-all flex items-center gap-1.5 cursor-pointer hover:translate-x-1"
              >
                <Heart size={10} className="fill-current text-pink-400" />
                {sect.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOOKMARK TAB ON THE SIDE FOR MOBILE */}
      <AnimatePresence>
        {isBookOpened && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden flex gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-pink-200 shadow-lg"
          >
            {sections.slice(1).map((sect) => (
              <button
                key={sect.id}
                onClick={() => handleScrollTo(sect.id)}
                className="px-2.5 py-1.5 rounded-full font-cute text-[10px] font-bold text-stone-600 hover:bg-pink-50 hover:text-pink-500 transition-colors cursor-pointer select-none"
              >
                {sect.name.split(' ')[0]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN SECTIONS CONTAINER */}
      <div className="relative z-10 w-full flex flex-col">
        {sections.map((sect, index) => (
          <div key={sect.id} id={sect.id} className="relative w-full">
            {/* Scroll reveal triggered animation */}
            <motion.div
              initial={index === 0 ? {} : { opacity: 0, y: 80 }}
              whileInView={index === 0 ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {sect.component}
            </motion.div>

            {/* Notebook Separator Line (except final section) */}
            {index < sections.length - 1 && (
              <div className="w-full flex items-center justify-center pointer-events-none opacity-40 py-2">
                <div className="h-[2px] w-4/5 border-t-2 border-dashed border-[#b8860b]/30" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sweet Footer */}
      <footer className="w-full bg-[#f6f2ea] border-t border-stone-200 py-8 text-center font-handwritten text-xl text-stone-500 z-20 relative">
        <div className="max-w-xl mx-auto px-4 flex flex-col items-center gap-1.5 select-none">
          <p className="flex items-center gap-1">
            Made with <Heart className="text-rose-500 fill-rose-500 animate-pulse" size={16} /> by Ishan for Sreeparna
          </p>
          <p className="text-sm text-stone-400 font-cute">
            © 2026. Forever & Always.
          </p>
        </div>
      </footer>

    </div>
  )
}

export default App