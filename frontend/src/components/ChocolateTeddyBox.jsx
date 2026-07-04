import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

// Custom Cute SVGs for Chocolates
const ChocolateSVG = ({ type }) => {
  switch (type) {
    case 'milk':
      return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="milkChoc" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#A1887F" />
              <stop offset="60%" stopColor="#5D4037" />
              <stop offset="100%" stopColor="#3E2723" />
            </radialGradient>
            <linearGradient id="cupGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="100%" stopColor="#FFA000" />
            </linearGradient>
          </defs>
          {/* Pleated paper cup wrapper */}
          <path d="M12 40 L16 48 L44 48 L48 40" fill="url(#cupGrad)" stroke="#E65100" strokeWidth="1" />
          <path d="M10 40 Q30 43 50 40" stroke="#E65100" strokeWidth="1.5" fill="none" />
          {/* Truffle ball with 3D gradient */}
          <circle cx="30" cy="28" r="18" fill="url(#milkChoc)" />
          {/* Creamy white drizzle with drop-shadow effect */}
          <path d="M16 22 Q30 18 44 26" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
          <path d="M18 29 Q30 25 42 33" stroke="#FFFDD0" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
        </svg>
      )
    case 'dark':
      return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="darkChoc" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#4E342E" />
              <stop offset="70%" stopColor="#2E1C1A" />
              <stop offset="100%" stopColor="#150A09" />
            </radialGradient>
            <linearGradient id="cupGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cfab7a" />
              <stop offset="100%" stopColor="#8d6e63" />
            </linearGradient>
          </defs>
          {/* Cup */}
          <path d="M12 40 L16 48 L44 48 L48 40" fill="url(#cupGradDark)" stroke="#5d4037" strokeWidth="1" />
          <path d="M10 40 Q30 43 50 40" stroke="#5d4037" strokeWidth="1.5" fill="none" />
          <circle cx="30" cy="28" r="18" fill="url(#darkChoc)" />
          {/* Sparkles / Gold Leaf details */}
          <path d="M26 19 L28 21 L26 23 L24 21 Z" fill="#FFD700" />
          <path d="M35 25 L37 27 L35 29 L33 27 Z" fill="#FFD700" />
          <circle cx="28" cy="32" r="1.5" fill="#FFE57F" />
          <circle cx="32" cy="16" r="1" fill="#FFE57F" />
        </svg>
      )
    case 'strawberry':
      return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="strawberryChoc" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFB74D" />
              <stop offset="40%" stopColor="#FF8A80" />
              <stop offset="85%" stopColor="#FF4081" />
              <stop offset="100%" stopColor="#C2185B" />
            </radialGradient>
            <linearGradient id="cupGradPink" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8BBD0" />
              <stop offset="100%" stopColor="#C2185B" />
            </linearGradient>
          </defs>
          {/* Cup */}
          <path d="M12 40 L16 48 L44 48 L48 40" fill="url(#cupGradPink)" stroke="#880E4F" strokeWidth="1" />
          <path d="M10 40 Q30 43 50 40" stroke="#880E4F" strokeWidth="1.5" fill="none" />
          <circle cx="30" cy="28" r="18" fill="url(#strawberryChoc)" />
          {/* White Strawberry swirl */}
          <path d="M22 20 C22 20, 30 12, 36 20 C42 28, 22 28, 28 36 C34 44, 40 40, 40 40" stroke="#FFFDD0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'caramel':
      return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="caramelChoc" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFF9C4" />
              <stop offset="50%" stopColor="#FFB300" />
              <stop offset="100%" stopColor="#E65100" />
            </radialGradient>
            <linearGradient id="cupGradGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffe082" />
              <stop offset="100%" stopColor="#ffb300" />
            </linearGradient>
          </defs>
          {/* Cup */}
          <path d="M12 40 L16 48 L44 48 L48 40" fill="url(#cupGradGold)" stroke="#b8860b" strokeWidth="1" />
          <path d="M10 40 Q30 43 50 40" stroke="#b8860b" strokeWidth="1.5" fill="none" />
          {/* Sunflower outer swirl of golden caramel */}
          {Array.from({ length: 8 }).map((_, idx) => {
            const angle = (idx * 360) / 8
            return (
              <g key={idx} transform={`rotate(${angle} 30 28)`}>
                <path d="M30 13 C26 21, 34 21, 30 13Z" fill="#FFA000" stroke="#E65100" strokeWidth="1" />
              </g>
            )
          })}
          {/* Shiny Caramel center dome */}
          <circle cx="30" cy="28" r="9" fill="url(#caramelChoc)" />
          <circle cx="30" cy="28" r="6" fill="#5D4037" opacity="0.35" />
          <circle cx="28" cy="26" r="1.5" fill="#FFFFFF" opacity="0.8" />
        </svg>
      )
    case 'raspberry':
      return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="raspberryGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FF4081" />
              <stop offset="60%" stopColor="#C2185B" />
              <stop offset="100%" stopColor="#5C002B" />
            </radialGradient>
            <linearGradient id="cupGradRed" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffcdd2" />
              <stop offset="100%" stopColor="#d32f2f" />
            </linearGradient>
          </defs>
          {/* Cup */}
          <path d="M12 40 L16 48 L44 48 L48 40" fill="url(#cupGradRed)" stroke="#880E4F" strokeWidth="1" />
          <path d="M10 40 Q30 43 50 40" stroke="#880E4F" strokeWidth="1.5" fill="none" />
          {/* Heart shaped chocolate */}
          <path d="M30 36 C30 36, 14 26, 20 18 C26 10, 30 20, 30 20 C30 20, 34 10, 40 18 C46 26, 30 36, 30 36Z" fill="url(#raspberryGrad)" stroke="#880E4F" strokeWidth="1.5" />
          <circle cx="25" cy="20" r="1.5" fill="#FF80AB" />
          <circle cx="35" cy="20" r="1.5" fill="#FF80AB" />
        </svg>
      )
    case 'fudge':
      return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fudgeGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6D4C41" />
              <stop offset="100%" stopColor="#4E342E" />
            </linearGradient>
            <linearGradient id="fudgeGradSide" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4E342E" />
              <stop offset="100%" stopColor="#271512" />
            </linearGradient>
          </defs>
          {/* Cup */}
          <path d="M12 40 L16 48 L44 48 L48 40" fill="#cfab7a" stroke="#a07d4c" strokeWidth="1" />
          <path d="M10 40 Q30 43 50 40" stroke="#a07d4c" strokeWidth="1.5" fill="none" />
          {/* Isometric Square fudge block */}
          <g transform="rotate(4 30 28)">
            {/* Left/Bottom Side */}
            <rect x="17" y="18" width="26" height="20" rx="3" fill="url(#fudgeGradSide)" />
            {/* Top Side for 3D look */}
            <rect x="17" y="15" width="26" height="18" rx="2" fill="url(#fudgeGradTop)" />
          </g>
          {/* Warm Caramel golden drizzle lines */}
          <path d="M20 18 Q26 23 32 17 Q38 27 42 22" stroke="#FFB300" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

// Cute Teddy Bear SVG with happy wiggles and bounce
const TeddyBearSVG = ({ isWaving }) => {
  return (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back ears (wiggle when happy) */}
      <motion.g
        animate={isWaving ? { rotate: [0, -12, 12, -8, 0] } : { rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 45px" }}
      >
        <circle cx="50" cy="45" r="16" fill="#A1887F" stroke="#8D6E63" strokeWidth="2" />
        <circle cx="50" cy="45" r="10" fill="#FFCDD2" />
      </motion.g>

      <motion.g
        animate={isWaving ? { rotate: [0, 12, -12, 8, 0] } : { rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 45px" }}
      >
        <circle cx="100" cy="45" r="16" fill="#A1887F" stroke="#8D6E63" strokeWidth="2" />
        <circle cx="100" cy="45" r="10" fill="#FFCDD2" />
      </motion.g>

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

      {/* Sunflower Crown on Head (Cute Handmade Detail) */}
      <g transform="translate(51.5, 21.5) scale(0.25)">
        {Array.from({ length: 8 }).map((_, idx) => {
          const angle = (idx * 360) / 8
          return (
            <path key={idx} d="M50 15 C40 30, 60 30, 50 15Z" fill="#FFD54F" stroke="#FFA000" strokeWidth="2" transform={`rotate(${angle} 50 50)`} />
          )
        })}
        <circle cx="50" cy="50" r="12" fill="#5D4037" stroke="#3E2723" strokeWidth="1" />
      </g>
      <g transform="translate(60, 14) scale(0.3)">
        {Array.from({ length: 8 }).map((_, idx) => {
          const angle = (idx * 360) / 8
          return (
            <path key={idx} d="M50 15 C40 30, 60 30, 50 15Z" fill="#FFD54F" stroke="#FFA000" strokeWidth="2" transform={`rotate(${angle} 50 50)`} />
          )
        })}
        <circle cx="50" cy="50" r="12" fill="#5D4037" stroke="#3E2723" strokeWidth="1" />
      </g>
      <g transform="translate(73.5, 21.5) scale(0.25)">
        {Array.from({ length: 8 }).map((_, idx) => {
          const angle = (idx * 360) / 8
          return (
            <path key={idx} d="M50 15 C40 30, 60 30, 50 15Z" fill="#FFD54F" stroke="#FFA000" strokeWidth="2" transform={`rotate(${angle} 50 50)`} />
          )
        })}
        <circle cx="50" cy="50" r="12" fill="#5D4037" stroke="#3E2723" strokeWidth="1" />
      </g>
      {/* Snout */}
      <ellipse cx="75" cy="68" rx="14" ry="10" fill="#FFE0B2" stroke="#8D6E63" strokeWidth="1" />
      
      {/* Eyes (Happy ^ ^ crescent squeeze when activated) */}
      {!isWaving ? (
        <>
          <circle cx="64" cy="54" r="3.5" fill="#3E2723" />
          <circle cx="63" cy="53" r="1" fill="#FFF" />
          <circle cx="86" cy="54" r="3.5" fill="#3E2723" />
          <circle cx="85" cy="53" r="1" fill="#FFF" />
        </>
      ) : (
        <>
          <path d="M60 56 Q64 50 68 56" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M82 56 Q86 50 90 56" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* Nose & Mouth */}
      <polygon points="72,64 78,64 75,68" fill="#3E2723" />
      <path d="M75 68 Q72 73 70 71" stroke="#3E2723" strokeWidth="1.5" fill="none" />
      <path d="M75 68 Q78 73 80 71" stroke="#3E2723" strokeWidth="1.5" fill="none" />
      
      {/* Blush (Grows and glows when happy) */}
      <motion.circle 
        cx="58" 
        cy="64" 
        r="4" 
        fill="#FF8A80" 
        opacity="0.6" 
        animate={isWaving ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.6, repeat: 1 }}
      />
      <motion.circle 
        cx="92" 
        cy="64" 
        r="4" 
        fill="#FF8A80" 
        opacity="0.6" 
        animate={isWaving ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.6, repeat: 1 }}
      />

      {/* Static Cuddly Arms holding the chest/heart */}
      <path d="M35 85 C35 85, 20 95, 25 105 C30 115, 45 100, 45 100" stroke="#8D6E63" strokeWidth="10" strokeLinecap="round" />
      <path d="M115 85 C115 85, 130 95, 125 105 C120 115, 105 100, 105 100" stroke="#8D6E63" strokeWidth="10" strokeLinecap="round" />

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
    { id: 'caramel', name: 'Sun-kissed Honey Caramel', msg: 'You make life so warm, bright, and sweet! You are the sunshine and honey caramel of my life! 🌻🍯' },
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
              animate={teddyWaving ? {
                scale: [1, 1.12, 0.96, 1.05, 1],
                y: [0, -18, 6, -3, 0],
                rotate: [0, -4, 4, -2, 0]
              } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
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
          <div 
            onClick={() => setActiveChoc(null)}
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs z-50 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-lined-paper border-stitch p-6 sm:p-8 shadow-2xl cursor-default"
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
