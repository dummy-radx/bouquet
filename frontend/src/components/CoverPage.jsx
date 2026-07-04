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
  const hearts = Array.from({ length: 15 })

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-grid-paper px-4 overflow-hidden py-16">
      
      {/* Decorative Washi Tapes in Corners */}
      <div className="washi-tape washi-tape-pink w-32 -rotate-12 -left-6 top-8 z-10" />
      <div className="washi-tape washi-tape-blue w-28 rotate-6 -right-4 top-10 z-10" />

      {/* Floating Background Elements */}
      <AnimatePresence>
        {!isRevealed && (
          <div className="absolute inset-0 pointer-events-none z-0">
            {hearts.map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-300"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 100,
                  scale: Math.random() * 0.6 + 0.4,
                  opacity: 0.8
                }}
                animate={{
                  y: -100,
                  x: `calc(${Math.random() * 100}vw)`,
                  rotate: Math.random() * 360,
                  opacity: [0.8, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 8 + 6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
              >
                <Heart fill="currentColor" size={Math.random() * 20 + 12} />
              </motion.div>
            ))}
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
        <div className="relative w-full max-w-md aspect-4/3 flex items-center justify-center">
          
          <AnimatePresence>
            {!isRevealed ? (
              // The Interactive Envelope
              <motion.div
                className="relative w-full h-full cursor-pointer group"
                onClick={handleOpen}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                exit={{ 
                  scale: 0.9, 
                  opacity: 0, 
                  y: 100,
                  transition: { duration: 0.8, ease: "easeInOut" }
                }}
              >
                {/* Envelope Back & Shadows */}
                <div className="absolute inset-0 bg-[#e0d6c8] rounded-xl border border-[#d2c5b3] shadow-lg overflow-hidden flex items-center justify-center">
                  
                  {/* Hearts inside waiting */}
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-pink-400 opacity-60"
                  >
                    <Heart fill="currentColor" size={48} />
                  </motion.div>
                </div>

                {/* Envelope Flap (Top) */}
                <motion.div
                  className="absolute left-0 right-0 top-0 h-1/2 bg-[#d7ccbe] origin-top border-t border-x border-[#c6bcae]"
                  style={{ 
                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                    zIndex: 4 
                  }}
                  animate={isOpen ? { rotateX: 180, zIndex: 1 } : { rotateX: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />

                {/* Envelope Sides & Bottom */}
                <div 
                  className="absolute inset-0 bg-[#ebe1d3] border-b border-x border-[#dcd1c2]"
                  style={{ 
                    clipPath: "polygon(0 100%, 0 30%, 50% 70%, 100% 30%, 100% 100%)",
                    zIndex: 3 
                  }}
                />

                {/* Decorative Heart Seal */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full border border-pink-200 shadow-md flex items-center justify-center"
                  style={{ zIndex: 5 }}
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
                initial={{ opacity: 0, y: 150, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="w-full bg-lined-paper border-stitch p-8 shadow-xl flex flex-col justify-between"
              >
                {/* Tape holding the letter */}
                <div className="absolute washi-tape washi-tape-pink w-24 -top-3 left-1/2 -translate-x-1/2" />

                <div className="font-handwritten text-stone-700 text-2xl sm:text-3xl leading-relaxed space-y-4">
                  <p>My Dearest Sreeparna,</p>
                  <p>
                    I made this little space just for you, filled with things that make me think of you every single day. 🌸✨
                  </p>
                  <p>
                    You'll find sweet bouquets, chocolates, cuddly teddies, and reminders of the beautiful journey we are sharing.
                  </p>
                  <p className="text-right font-pacifico text-pink-500 mt-6">
                    With all my love, <br/>
                    Ishan ❤️
                  </p>
                </div>

                <div className="flex flex-col items-center mt-8">
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

        </div>
      </div>
    </div>
  )
}
