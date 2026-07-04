import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, ChevronDown } from 'lucide-react'

export const CoverPage = ({ onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    setTimeout(() => {
      setIsRevealed(true)
      if (onOpenComplete) onOpenComplete()
    }, 1200) // matches the slide-out animation time
  }

  // Create an array of random positions for background sparkles/hearts
  const particles = React.useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      scale: Math.random() * 0.6 + 0.4,
      drift: (Math.random() - 0.5) * 60,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      rotateEnd: Math.random() * 360,
      isSunflower: i % 2 === 0,
      heartSize: Math.random() * 20 + 12
    }))
  }, [])

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-grid-paper px-4 overflow-hidden py-16">
      
      {/* Decorative Washi Tapes in Corners */}
      <div className="washi-tape washi-tape-sunflower w-32 -rotate-12 -left-6 top-8 z-10" />
      <div className="washi-tape washi-tape-blue w-28 rotate-6 -right-4 top-10 z-10" />

      {/* Floating Background Elements */}
      <AnimatePresence>
        {!isRevealed && (
          <div className="absolute inset-0 pointer-events-none z-0">
            {particles.map((p) => {
              return (
                <motion.div
                  key={p.id}
                  className={`absolute ${p.isSunflower ? 'text-yellow-400' : 'text-pink-300'}`}
                  style={{ left: `${p.left}%` }}
                  initial={{
                    y: "100vh",
                    scale: p.scale,
                    opacity: 0.8
                  }}
                  animate={{
                    y: "-20vh",
                    x: [0, p.drift],
                    rotate: p.rotateEnd,
                    opacity: [0.8, 1, 0]
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: p.delay
                  }}
                >
                  {p.isSunflower ? (
                    <span className="text-2xl filter drop-shadow">🌻</span>
                  ) : (
                    <Heart fill="currentColor" size={p.heartSize} />
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-xl w-full flex flex-col items-center z-10">
        
        {/* Scrapbook Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1.5 mb-3 rounded-full bg-pink-100 text-pink-500 font-cute text-sm border border-pink-200 shadow-sm rotate-2">
            Made just for you 💖
          </span>
          <h1 className="font-pacifico text-4xl sm:text-5xl md:text-6xl text-pink-500 drop-shadow-sm select-none">
            Hello, Sreeparna!
          </h1>
          <p className="font-handwritten text-2xl sm:text-3xl text-stone-600 mt-2">
            Open this envelope to enter our little world...
          </p>
        </motion.div>

        {/* Envelope Area */}
        <motion.div 
          animate={{ height: !isRevealed ? 300 : 460 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative w-full max-w-md flex items-center justify-center overflow-visible"
        >
          
          <AnimatePresence>
            {!isRevealed ? (
              // The Interactive Envelope
              <motion.div
                key="envelope"
                className="absolute inset-0 w-full h-full cursor-pointer group"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                onClick={handleOpen}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                exit={{ 
                  scale: 0.9, 
                  opacity: 0, 
                  y: 50,
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
              >
                {/* Envelope Back & Shadows */}
                <div className="absolute inset-0 bg-[#e0d6c8] rounded-xl border border-[#d2c5b3] shadow-lg flex items-center justify-center z-10">
                  
                  {/* Hearts inside waiting */}
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-pink-400 opacity-60"
                  >
                    <Heart fill="currentColor" size={48} />
                  </motion.div>
                </div>

                {/* The Letter that Slides Up (TACTILE PREVIEW) */}
                <motion.div
                  className="absolute left-6 right-6 top-6 bottom-6 bg-[#fffdf9] border-stitch p-4 z-20 flex flex-col justify-between shadow-md"
                  initial={{ y: 20, scale: 0.9, opacity: 0 }}
                  animate={isOpen ? { y: -70, scale: 0.95, opacity: 1 } : { y: 20, scale: 0.9, opacity: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 80 }}
                >
                  <div className="font-handwritten text-stone-600 text-sm space-y-1">
                    <p className="font-bold text-amber-600 flex items-center gap-1">Dearest Sreeparna... 🌻</p>
                    <p className="line-clamp-3 text-xs leading-normal">
                      I made this little space just for you, filled with things that make me think of you every single day. 🌸✨
                    </p>
                  </div>
                </motion.div>

                {/* Envelope Flap (Top) */}
                <motion.div
                  className="absolute left-0 right-0 top-0 h-1/2 bg-[#d7ccbe] origin-top border-t border-x border-[#c6bcae]"
                  style={{ 
                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                    zIndex: 40 
                  }}
                  animate={isOpen ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 40 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />

                {/* Envelope Sides & Bottom */}
                <div 
                  className="absolute inset-0 bg-[#ebe1d3] border-b border-x border-[#dcd1c2]"
                  style={{ 
                    clipPath: "polygon(0 100%, 0 30%, 50% 70%, 100% 30%, 100% 100%)",
                    zIndex: 30 
                  }}
                />

                {/* Decorative Heart Seal */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full border border-pink-200 shadow-md flex items-center justify-center"
                  style={{ zIndex: 50 }}
                  animate={isOpen ? { scale: 0, rotate: 90 } : { scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={24} />
                </motion.div>

                {/* Sparkling hints */}
                <Sparkles className="absolute right-8 top-12 text-yellow-400 animate-sparkle opacity-80" size={24} />
                <Sparkles className="absolute left-8 bottom-12 text-yellow-400 animate-sparkle opacity-80" size={24} />

              </motion.div>
            ) : (
              // The Revealed Letter that Slides Out
              <motion.div
                key="revealed-letter"
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="absolute inset-0 w-full h-full bg-lined-paper border-stitch p-6 sm:p-8 shadow-xl flex flex-col justify-between"
              >
                {/* Tape holding the letter */}
                <div className="absolute washi-tape washi-tape-pink w-24 -top-3 left-1/2 -translate-x-1/2" />

                <div className="font-handwritten text-stone-700 text-2xl sm:text-3xl leading-relaxed space-y-4 overflow-y-auto flex-1 pr-1 scrollbar-thin">
                  <p>My Dearest Sreeparna,</p>
                  <p>
                    I made this little space just for you, filled with things that make me think of you every single day. 🌻✨
                  </p>
                  <p>
                    You'll find sweet bouquets, chocolates, cuddly teddies, and reminders of the beautiful journey we are sharing.
                  </p>
                  <p className="text-right font-pacifico text-amber-500 mt-6">
                    With all my love, <br/>
                    Ishan ❤️
                  </p>
                </div>

                <div className="flex flex-col items-center mt-4">
                  <motion.p
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="font-cute text-sm text-stone-500 flex items-center gap-1.5"
                  >
                    Scroll down to explore <ChevronDown size={16} />
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </div>
  )
}
