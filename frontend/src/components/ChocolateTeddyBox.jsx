import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

// Custom Cute SVGs for Chocolates
const ChocolateSVG = ({ type }) => {
  switch (type) {
    case 'milk':
      return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base paper cup */}
          <path d="M12 40 L16 48 L44 48 L48 40" fill="#cfab7a" stroke="#a07d4c" strokeWidth="1" />
          <path d="M10 40 Q30 43 50 40" stroke="#a07d4c" strokeWidth="2" fill="none" />
          {/* Truffle ball */}
          <circle cx="30" cy="28" r="18" fill="#5D4037" />
          {/* White drizzle */}
          <path d="M16 22 Q30 18 44 26" stroke="#FFFDD0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M18 29 Q30 25 42 33" stroke="#FFFDD0" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'dark':
      return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cup */}
          <path d="M12 40 L16 48 L44 48 L48 40" fill="#a1887f" stroke="#5d4037" strokeWidth="1" />
          <circle cx="30" cy="28" r="18" fill="#3E2723" />
          {/* Gold speckles */}
          <circle cx="24" cy="20" r="1.5" fill="#FFD700" />
          <circle cx="36" cy="24" r="1.5" fill="#FFD700" />
          <circle cx="28" cy="32" r="2" fill="#FFD700" />
          <circle cx="32" cy="16" r="1" fill="#FFD700" />
        </svg>
      )
    case 'strawberry':
      return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cup */}
          <path d="M12 40 L16 48 L44 48 L48 40" fill="#e1bee7" stroke="#ab47bc" strokeWidth="1" />
          <circle cx="30" cy="28" r="18" fill="#F48FB1" />
          {/* Swirl */}
          <path d="M22 20 C22 20, 30 12, 36 20 C42 28, 22 28, 28 36 C34 44, 40 40, 40 40" stroke="#AD1457" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'caramel':
      return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cup */}
          <path d="M12 40 L16 48 L44 48 L48 40" fill="#ffe082" stroke="#ffb300" strokeWidth="1" />
          {/* Octagonal/square candy shape */}
          <rect x="14" y="14" width="32" height="28" rx="8" fill="#D84315" stroke="#BF360C" strokeWidth="1.5" />
          <rect x="18" y="18" width="24" height="20" rx="4" fill="#FF8A65" />
          {/* Nut on top */}
          <ellipse cx="30" cy="28" rx="6" ry="4" fill="#A1887F" stroke="#8D6E63" strokeWidth="1" />
        </svg>
      )
    case 'raspberry':
      return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cup */}
          <path d="M12 40 L16 48 L44 48 L48 40" fill="#ffcdd2" stroke="#e53935" strokeWidth="1" />
          {/* Heart shaped chocolate */}
          <path d="M30 36 C30 36, 14 26, 20 18 C26 10, 30 20, 30 20 C30 20, 34 10, 40 18 C46 26, 30 36, 30 36Z" fill="#C2185B" stroke="#880E4F" strokeWidth="1.5" />
          <circle cx="24" cy="20" r="1" fill="#FF80AB" />
        </svg>
      )
    case 'fudge':
      return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cup */}
          <path d="M12 40 L16 48 L44 48 L48 40" fill="#cfab7a" stroke="#a07d4c" strokeWidth="1" />
          {/* Square fudge block */}
          <rect x="16" y="14" width="28" height="28" rx="3" fill="#4E342E" stroke="#3E2723" strokeWidth="1.5" transform="rotate(5 30 28)" />
          {/* Caramel lines */}
          <path d="M20 18 L40 38" stroke="#FFA000" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

// Cute Teddy Bear SVG with waving arm animation
const TeddyBearSVG = ({ isWaving }) => {
  return (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back ears */}
      <circle cx="50" cy="45" r="16" fill="#A1887F" stroke="#8D6E63" strokeWidth="2" />
      <circle cx="50" cy="45" r="10" fill="#FFCDD2" />
      <circle cx="100" cy="45" r="16" fill="#A1887F" stroke="#8D6E63" strokeWidth="2" />
      <circle cx="100" cy="45" r="10" fill="#FFCDD2" />

      {/* Feet/Paws */}
      <circle cx="45" cy="115" r="16" fill="#A1887F" stroke="#8D6E63" strokeWidth="2" />
      <circle cx="45" cy="115" r="10" fill="#FFE0B2" />
      <circle cx="105" cy="115" r="16" fill="#A1887F" stroke="#8D6E63" strokeWidth="2" />
      <circle cx="105" cy="115" r="10" fill="#FFE0B2" />

      {/* Body */}
      <ellipse cx="75" cy="95" rx="35" ry="30" fill="#BCAAA4" stroke="#8D6E63" strokeWidth="2" />
      {/* Belly patch */}
      <ellipse cx="75" cy="98" rx="22" ry="18" fill="#FFE0B2" opacity="0.9" />

      {/* Head */}
      <circle cx="75" cy="60" r="30" fill="#A1887F" stroke="#8D6E63" strokeWidth="2" />
      {/* Snout */}
      <ellipse cx="75" cy="68" rx="14" ry="10" fill="#FFE0B2" stroke="#8D6E63" strokeWidth="1" />
      {/* Eyes */}
      <circle cx="64" cy="54" r="3.5" fill="#3E2723" />
      <circle cx="63" cy="53" r="1" fill="#FFF" />
      <circle cx="86" cy="54" r="3.5" fill="#3E2723" />
      <circle cx="85" cy="53" r="1" fill="#FFF" />
      {/* Nose & Mouth */}
      <polygon points="72,64 78,64 75,68" fill="#3E2723" />
      <path d="M75 68 Q72 73 70 71" stroke="#3E2723" strokeWidth="1.5" fill="none" />
      <path d="M75 68 Q78 73 80 71" stroke="#3E2723" strokeWidth="1.5" fill="none" />
      {/* Blush */}
      <circle cx="58" cy="64" r="4" fill="#FF8A80" opacity="0.6" />
      <circle cx="92" cy="64" r="4" fill="#FF8A80" opacity="0.6" />

      {/* Left arm holding the body */}
      <path d="M35 85 C35 85, 20 95, 25 105 C30 115, 45 100, 45 100" stroke="#8D6E63" strokeWidth="10" strokeLinecap="round" />

      {/* Right arm waving! */}
      <motion.g
        animate={isWaving ? { rotate: [0, 40, -10, 40, 0] } : { rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ originX: '110px', originY: '85px' }}
      >
        <path d="M110 85 C110 85, 128 80, 132 92 C135 102, 118 108, 118 108" stroke="#8D6E63" strokeWidth="10" strokeLinecap="round" />
      </motion.g>

      {/* Red heart held on the chest */}
      <path d="M75 100 C75 100, 62 90, 67 82 C72 74, 75 84, 75 84 C75 84, 78 74, 83 82 C88 90, 75 100, 75 100Z" fill="#E53935" stroke="#C2185B" strokeWidth="1" />
    </svg>
  )
}

export const ChocolateTeddyBox = () => {
  const [activeChoc, setActiveChoc] = useState(null)
  const [teddyWaving, setTeddyWaving] = useState(false)
  const [teddyHearts, setTeddyHearts] = useState([])

  const chocolates = [
    { id: 'milk', name: 'Creamy Milk Truffle', msg: 'You make my heart melt just like rich milk chocolate! 🍫❤' },
    { id: 'dark', name: 'Dark Gold Nugget', msg: 'My love for you is deep and pure, and you are my absolute treasure! ✨💎' },
    { id: 'strawberry', name: 'Strawberry Swirl', msg: 'Every single second spent talking with you is sweet, fresh, and berry delightful! 🍓😍' },
    { id: 'caramel', name: 'Rich Caramel Cup', msg: 'You make life so smooth, rich, and delicious! You are the sweet caramel to my days! 🍯🍯' },
    { id: 'raspberry', name: 'Crimson Berry Heart', msg: 'My heart beats only for you, Sreeparna. You are my one and only! ❤️🌸' },
    { id: 'fudge', name: 'Honey Cocoa Fudge', msg: 'We stick together through thick and thin! You are my forever favorite person! 🧸💕' }
  ]

  const triggerTeddyHug = () => {
    if (teddyWaving) return
    setTeddyWaving(true)
    
    // Add new hearts
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 - 100,
      y: Math.random() * -150 - 50,
      scale: Math.random() * 0.5 + 0.6,
      rotate: Math.random() * 360
    }))
    
    setTeddyHearts(newHearts)

    setTimeout(() => {
      setTeddyWaving(false)
      setTeddyHearts([])
    }, 2000)
  }

  return (
    <div className="relative w-full min-h-screen bg-dotted-paper py-16 px-4 flex flex-col items-center justify-start overflow-hidden">
      
      {/* Tape decoration */}
      <div className="washi-tape washi-tape-purple w-32 rotate-6 -right-6 top-8 z-10" />

      {/* Header */}
      <div className="text-center max-w-xl mb-12 z-10">
        <span className="inline-block px-3 py-1 mb-2 rounded-full bg-purple-100 text-purple-700 font-cute text-xs border border-purple-200 shadow-sm">
          Sweets & Cuddles 🍫🧸
        </span>
        <h2 className="font-pacifico text-3xl sm:text-4xl text-purple-600 drop-shadow-sm">
          Chocolates & Teddy Hugs
        </h2>
        <p className="font-handwritten text-xl sm:text-2xl text-stone-600 mt-2">
          Click each chocolate truffle to reveal a sweet message, or tap the teddy bear for a cozy virtual hug!
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
        
        {/* CHOCOLATE BOX (Left 7 cols) */}
        <div className="md:col-span-7 flex flex-col items-center">
          
          {/* The visual box */}
          <div className="relative w-full max-w-md bg-[#e3dcd3] border-stitch p-6 sm:p-8 shadow-xl rounded-2xl flex flex-col items-center">
            
            {/* Box Ribbon */}
            <div className="absolute top-0 bottom-0 w-8 bg-pink-400 opacity-60 z-0 pointer-events-none" />
            <div className="absolute left-0 right-0 h-8 top-1/2 -translate-y-1/2 bg-pink-400 opacity-60 z-0 pointer-events-none" />
            
            <h3 className="font-pacifico text-xl text-stone-700 mb-6 bg-[#f7f3ed] px-4 py-1.5 rounded-full border border-stone-300 shadow-sm z-10">
              Assorted Sweet Box
            </h3>

            {/* Grid of Chocolates */}
            <div className="grid grid-cols-3 gap-6 w-full relative z-10">
              {chocolates.map((choc) => (
                <motion.button
                  key={choc.id}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveChoc(choc)}
                  className="aspect-square bg-[#f4ece1] rounded-xl border border-stone-300/60 flex items-center justify-center cursor-pointer shadow-sm hover:shadow transition-shadow relative overflow-hidden group"
                >
                  {/* Subtle hover background highlight */}
                  <div className="absolute inset-0 bg-pink-100/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <ChocolateSVG type={choc.id} />
                </motion.button>
              ))}
            </div>

            <p className="font-handwritten text-lg text-stone-500 mt-6 text-center z-10 leading-none">
              Click a chocolate to pick your flavor!
            </p>
          </div>
        </div>

        {/* TEDDY BEAR GARDEN (Right 5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center relative py-6">
          <div className="absolute washi-tape washi-tape-yellow w-24 -top-3 left-1/3" />
          
          <div className="relative bg-[#fffdfa] border-stitch p-6 shadow-md flex flex-col items-center w-full max-w-xs text-center">
            
            {/* Clickable Teddy container */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerTeddyHug}
              className="cursor-pointer select-none relative"
            >
              <TeddyBearSVG isWaving={teddyWaving} />

              {/* HEARTS FLOATING FROM TEDDY */}
              <AnimatePresence>
                {teddyHearts.map((heart) => (
                  <motion.div
                    key={heart.id}
                    className="absolute top-1/2 left-1/2 text-rose-500 pointer-events-none"
                    initial={{ x: 0, y: 0, scale: 0.2, opacity: 1, rotate: heart.rotate }}
                    animate={{ 
                      x: heart.x, 
                      y: heart.y, 
                      scale: heart.scale,
                      opacity: [1, 1, 0.8, 0] 
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                  >
                    <Heart fill="currentColor" size={24} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <h3 className="font-cute text-lg font-bold text-stone-700 mt-3 select-none">
              Cuddly Teddy Bear
            </h3>
            <p className="font-handwritten text-lg text-stone-500 mt-1 select-none">
              Tap him for a warm hug!
            </p>

            <AnimatePresence>
              {teddyWaving && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute bottom-[-16px] bg-rose-500 text-white font-cute px-4 py-1.5 rounded-full border border-rose-600 shadow-md text-xs z-20"
                >
                  Sending Warm Hugs! 🧸💖
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* CHOCOLATE MODAL POP-UP */}
      <AnimatePresence>
        {activeChoc && (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative w-full max-w-sm bg-lined-paper border-stitch p-6 sm:p-8 shadow-2xl"
            >
              {/* Paper clip or tape detail */}
              <div className="w-20 h-5 absolute -top-2 left-1/2 -translate-x-1/2 washi-tape washi-tape-pink" />

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-pink-50 rounded-full border border-pink-100 shadow-inner">
                  <ChocolateSVG type={activeChoc.id} />
                </div>
                
                <h4 className="font-pacifico text-xl text-pink-500 select-none">
                  {activeChoc.name}
                </h4>
                
                <p className="font-handwritten text-2xl text-stone-700 leading-relaxed font-semibold">
                  {activeChoc.msg}
                </p>

                <button
                  onClick={() => setActiveChoc(null)}
                  className="mt-4 px-6 py-2 rounded-xl bg-pink-500 text-white font-cute text-xs font-bold shadow hover:bg-pink-600 active:scale-95 transition-all cursor-pointer"
                >
                  Close & Eat 😋
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
