import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2, Sparkles, Wand2 } from 'lucide-react'

// Cute SVG Icons for Flowers (custom designed geometries)
const FlowerSVG = ({ type, size = 48 }) => {
  switch (type) {
    case 'Daisy':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Petals */}
          {Array.from({ length: 8 }).map((_, idx) => {
            const angle = (idx * 360) / 8
            return (
              <g key={idx} transform={`rotate(${angle} 50 50)`}>
                <ellipse cx="50" cy="22" rx="10" ry="20" fill="#FFFFFF" stroke="#E5D3B3" strokeWidth="2" />
              </g>
            )
          })}
          {/* Flower Center */}
          <circle cx="50" cy="50" r="16" fill="#FCD12A" stroke="#E5B20D" strokeWidth="2" />
          <circle cx="46" cy="46" r="3" fill="#FFE57F" />
        </svg>
      )
    case 'Tulip':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Leaves/Stem */}
          <path d="M50 60 V90" stroke="#7CB342" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 80 Q25 70 35 55" stroke="#7CB342" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Tulip Cup */}
          <path d="M30 45 C30 65, 70 65, 70 45 C70 30, 60 20, 50 40 C40 20, 30 30, 30 45Z" fill="#F48FB1" stroke="#F06292" strokeWidth="2" />
          <path d="M42 40 C45 25, 55 25, 58 40" fill="#F06292" opacity="0.8" />
          <path d="M50 40 C48 20, 52 20, 50 40Z" fill="#EC407A" />
        </svg>
      )
    case 'Sunflower':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Petals */}
          {Array.from({ length: 12 }).map((_, idx) => {
            const angle = (idx * 360) / 12
            return (
              <g key={idx} transform={`rotate(${angle} 50 50)`}>
                <path d="M50 15 C45 30, 55 30, 50 15Z" fill="#FFB300" stroke="#FFA000" strokeWidth="2" />
                <path d="M50 10 C42 28, 58 28, 50 10Z" fill="#FFC107" />
              </g>
            )
          })}
          {/* Center */}
          <circle cx="50" cy="50" r="22" fill="#5D4037" stroke="#3E2723" strokeWidth="2" />
          <circle cx="50" cy="50" r="16" fill="#4E342E" strokeDasharray="3,3" stroke="#8D6E63" strokeWidth="2" />
        </svg>
      )
    case 'Lavender':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stem */}
          <path d="M50 30 V90" stroke="#81C784" strokeWidth="3" strokeLinecap="round" />
          {/* Buds */}
          <circle cx="50" cy="25" r="5" fill="#B39DDB" />
          <circle cx="45" cy="35" r="6" fill="#9575CD" />
          <circle cx="55" cy="38" r="5" fill="#7E57C2" />
          <circle cx="48" cy="48" r="6" fill="#9575CD" />
          <circle cx="53" cy="54" r="6" fill="#7E57C2" />
          <circle cx="46" cy="62" r="5" fill="#B39DDB" />
          <circle cx="54" cy="67" r="5" fill="#9575CD" />
        </svg>
      )
    case 'Blue Hydrangea':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 65 V85" stroke="#7CB342" strokeWidth="3" />
          {/* Cluster of mini blossoms */}
          <g transform="translate(10, 10)">
            {/* Bl1 */}
            <path d="M30 30 C20 30, 20 40, 30 40 C40 40, 40 30, 30 30Z" fill="#90CAF9" />
            <circle cx="30" cy="35" r="2" fill="#FFF" />
            {/* Bl2 */}
            <path d="M48 25 C38 25, 38 35, 48 35 C58 35, 58 25, 48 25Z" fill="#64B5F6" />
            <circle cx="48" cy="30" r="2" fill="#FFF" />
            {/* Bl3 */}
            <path d="M35 48 C25 48, 25 58, 35 58 C45 58, 45 48, 35 48Z" fill="#42A5F5" />
            <circle cx="35" cy="53" r="2" fill="#FFF" />
            {/* Bl4 */}
            <path d="M55 45 C45 45, 45 55, 55 55 C65 55, 65 45, 55 45Z" fill="#90CAF9" />
            <circle cx="55" cy="50" r="2" fill="#FFF" />
            {/* Bl5 */}
            <path d="M42 38 C32 38, 32 48, 42 48 C52 48, 52 38, 42 38Z" fill="#80DEEA" />
            <circle cx="42" cy="43" r="2" fill="#FFF" />
          </g>
        </svg>
      )
    case 'Lily':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 60 V90" stroke="#81C784" strokeWidth="3" />
          {/* Lily petals flaring out */}
          <path d="M50 60 C30 50, 20 25, 35 25 C45 25, 48 45, 50 60Z" fill="#FFFDF0" stroke="#E0DDB8" strokeWidth="1.5" />
          <path d="M50 60 C70 50, 80 25, 65 25 C55 25, 52 45, 50 60Z" fill="#FFFDF0" stroke="#E0DDB8" strokeWidth="1.5" />
          <path d="M50 60 C40 45, 50 15, 50 15 C50 15, 60 45, 50 60Z" fill="#FFFFFA" stroke="#E0DDB8" strokeWidth="1.5" />
          {/* Pistils */}
          <path d="M50 45 Q47 30 45 28" stroke="#D4C443" strokeWidth="2" fill="none" />
          <path d="M50 45 Q53 30 55 28" stroke="#D4C443" strokeWidth="2" fill="none" />
          <circle cx="45" cy="28" r="1.5" fill="#A1887F" />
          <circle cx="55" cy="28" r="1.5" fill="#A1887F" />
        </svg>
      )
    default:
      return null
  }
}

export const BouquetBuilder = () => {
  const [selectedFlowers, setSelectedFlowers] = useState([])
  const [wrapper, setWrapper] = useState('kraft')
  const [ribbon, setRibbon] = useState('yellow')
  const [isWrapped, setIsWrapped] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)

  const flowerOptions = [
    { name: 'Daisy', color: 'text-amber-500 bg-white border-amber-100' },
    { name: 'Tulip', color: 'text-pink-500 bg-pink-50 border-pink-100' },
    { name: 'Sunflower', color: 'text-yellow-600 bg-yellow-50 border-yellow-100' },
    { name: 'Lavender', color: 'text-purple-500 bg-purple-50 border-purple-100' },
    { name: 'Blue Hydrangea', color: 'text-blue-500 bg-blue-50 border-blue-100' },
    { name: 'Lily', color: 'text-stone-500 bg-amber-50/20 border-stone-200' }
  ]

  const wrapperOptions = [
    { id: 'kraft', name: 'Rustic Kraft Paper', bg: 'bg-[#d8c3a5] text-stone-800' },
    { id: 'pink', name: 'Blushing Pink Wrap', bg: 'bg-pink-200 text-pink-800' },
    { id: 'checkered', name: 'Checkered Lavender', bg: 'bg-purple-100 border-dashed border-purple-300 text-purple-800' }
  ]

  const ribbonOptions = [
    { id: 'yellow', name: 'Golden Silk Bow', bg: 'bg-amber-400' },
    { id: 'pink', name: 'Satin Pink Bow', bg: 'bg-pink-400' },
    { id: 'string', name: 'Natural Hemp String', bg: 'bg-stone-500' }
  ]

  const handleAddFlower = (flowerName) => {
    if (isWrapped) return
    if (selectedFlowers.length >= 15) return // Cap at 15

    // Add with randomized coordinates inside the vase area
    const newFlower = {
      id: Date.now() + Math.random(),
      name: flowerName,
      x: Math.random() * 80 - 40, // offset left-right
      y: Math.random() * 60 - 55, // offset up-down (focused on top half)
      rotate: Math.random() * 40 - 20, // rotation
      scale: Math.random() * 0.2 + 0.9 // scale variation
    }

    setSelectedFlowers([...selectedFlowers, newFlower])
  }

  const handleClear = () => {
    setSelectedFlowers([])
    setIsWrapped(false)
    setShowSparkles(false)
  }

  const handleWrap = () => {
    if (selectedFlowers.length === 0) return
    setIsWrapped(true)
    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 2500)
  }

  // Get wrap visual styles
  const getWrapperStyle = () => {
    switch (wrapper) {
      case 'pink':
        return 'bg-pink-300/90 border border-pink-400 rounded-b-[40%] rounded-t-[10%]'
      case 'checkered':
        return 'bg-purple-200/90 border-2 border-dashed border-purple-400 rounded-b-[40%] rounded-t-[10%]'
      case 'kraft':
      default:
        return 'bg-[#cbbb9e]/90 border border-[#bfae91] rounded-b-[45%] rounded-t-[10%]'
    }
  }

  // Get ribbon color classes
  const getRibbonStyle = () => {
    switch (ribbon) {
      case 'pink':
        return 'bg-pink-400 border-pink-500'
      case 'string':
        return 'bg-[#8d7c68] border-[#756451]'
      case 'yellow':
      default:
        return 'bg-amber-400 border-amber-500'
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-grid-paper py-16 px-4 flex flex-col items-center justify-start overflow-hidden">
      
      {/* Tape decoration */}
      <div className="washi-tape washi-tape-pink w-28 -rotate-6 -left-4 top-10 z-10" />

      {/* Header */}
      <div className="text-center max-w-xl mb-10 z-10">
        <span className="inline-block px-3 py-1 mb-2 rounded-full bg-pink-100 text-pink-600 font-cute text-xs border border-pink-200 shadow-sm">
          Flower Shop 🌸
        </span>
        <h2 className="font-pacifico text-3xl sm:text-4xl text-pink-500 drop-shadow-sm">
          Build Sreeparna's Bouquet
        </h2>
        <p className="font-handwritten text-xl sm:text-2xl text-stone-600 mt-2">
          Pick her favorite wildflowers (no roses here!), wrap them up nicely, and seal them with a ribbon!
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start z-10">
        
        {/* CONTROL SIDE (Left) */}
        <div className="bg-white border-stitch p-6 sm:p-8 shadow-md space-y-6">
          <div className="absolute washi-tape washi-tape-blue w-24 -top-3 left-12" />
          
          {/* Step 1: Pick Flowers */}
          <div className="space-y-3">
            <h3 className="font-cute text-lg font-bold text-stone-700 flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-xs">1</span>
              Add Flowers ({selectedFlowers.length}/15)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {flowerOptions.map((flower) => (
                <button
                  key={flower.name}
                  disabled={isWrapped || selectedFlowers.length >= 15}
                  onClick={() => handleAddFlower(flower.name)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all select-none ${
                    isWrapped 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:scale-105 active:scale-95 cursor-pointer shadow-sm hover:shadow'
                  } ${flower.color}`}
                >
                  <FlowerSVG type={flower.name} size={48} />
                  <span className="font-cute text-xs font-semibold mt-1">{flower.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Choose Wrapping */}
          <div className="space-y-3">
            <h3 className="font-cute text-lg font-bold text-stone-700 flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-xs">2</span>
              Choose Wrap Paper
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {wrapperOptions.map((opt) => (
                <button
                  key={opt.id}
                  disabled={isWrapped}
                  onClick={() => setWrapper(opt.id)}
                  className={`px-4 py-2.5 rounded-lg font-cute text-xs font-bold border transition-all cursor-pointer ${
                    wrapper === opt.id 
                      ? 'ring-2 ring-pink-400 border-transparent shadow' 
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  } ${isWrapped && 'opacity-50 cursor-not-allowed'}`}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Choose Ribbon */}
          <div className="space-y-3">
            <h3 className="font-cute text-lg font-bold text-stone-700 flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-xs">3</span>
              Select Ribbon
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {ribbonOptions.map((opt) => (
                <button
                  key={opt.id}
                  disabled={isWrapped}
                  onClick={() => setRibbon(opt.id)}
                  className={`px-4 py-2.5 rounded-lg font-cute text-xs font-bold border transition-all cursor-pointer ${
                    ribbon === opt.id 
                      ? 'ring-2 ring-pink-400 border-transparent shadow' 
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  } ${isWrapped && 'opacity-50 cursor-not-allowed'}`}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-stone-100">
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-3 rounded-xl border border-stone-200 text-stone-600 font-cute text-sm hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 size={16} /> Reset
            </button>
            <button
              disabled={selectedFlowers.length === 0 || isWrapped}
              onClick={handleWrap}
              className={`flex-2 px-6 py-3 rounded-xl text-white font-cute text-sm font-bold shadow transition-all flex items-center justify-center gap-2 select-none ${
                selectedFlowers.length === 0 || isWrapped
                  ? 'bg-stone-300 cursor-not-allowed shadow-none'
                  : 'bg-pink-500 hover:bg-pink-600 hover:scale-[1.02] active:scale-95 cursor-pointer'
              }`}
            >
              <Wand2 size={16} /> Wrap with Love!
            </button>
          </div>

        </div>

        {/* WORKSPACE CANVAS SIDE (Right) */}
        <div className="relative aspect-4/5 bg-stone-50/50 border-stitch flex items-center justify-center overflow-hidden h-[500px]">
          
          {/* Visual Canvas background - drawing table surface */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-[#f1ebd9] border-t border-[#dfd8c2] z-0 flex items-center justify-center shadow-inner">
            <span className="font-handwritten text-stone-400 text-sm">Workshop Table</span>
          </div>

          {/* Drag instructions */}
          {!isWrapped && selectedFlowers.length === 0 && (
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute text-center z-10 pointer-events-none px-4"
            >
              <div className="text-pink-400 flex justify-center mb-2"><Heart size={36} className="animate-pulse" /></div>
              <p className="font-handwritten text-2xl text-stone-400">Click flowers on the left to start building your bouquet!</p>
            </motion.div>
          )}

          {/* Bouquet Assembly Area */}
          <div className="relative w-full h-full flex flex-col items-center justify-end pb-12 z-10">
            
            {/* RENDERED FLOWERS */}
            <div className="relative w-12 h-12 mb-36 flex items-center justify-center">
              <AnimatePresence>
                {selectedFlowers.map((flower) => (
                  <motion.div
                    key={flower.id}
                    initial={{ scale: 0, opacity: 0, y: 50 }}
                    animate={{ 
                      scale: flower.scale, 
                      opacity: 1, 
                      x: flower.x, 
                      y: isWrapped ? flower.y + 10 : flower.y, // pull slightly into the bundle when wrapped
                      rotate: flower.rotate 
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="absolute cursor-pointer"
                    whileHover={{ scale: flower.scale * 1.1, zIndex: 100 }}
                  >
                    <FlowerSVG type={flower.name} size={70} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* FLOWER WRAPPER OVERLAY */}
            <AnimatePresence>
              {isWrapped && (
                <motion.div
                  initial={{ opacity: 0, y: 100, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 100, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className={`absolute bottom-8 w-[240px] h-[260px] z-30 ${getWrapperStyle()} shadow-md flex items-end justify-center`}
                >
                  {/* Wrap folding effect elements */}
                  <div className="absolute inset-x-0 top-0 h-16 bg-white/20 rounded-t-[10%] border-b border-white/10" />
                  
                  {/* Visual bouquet handle helper */}
                  <div className="w-8 h-12 bg-black/5 rounded-b-md absolute bottom-[-10px] left-1/2 -translate-x-1/2" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* RIBBON BOW OVERLAY */}
            <AnimatePresence>
              {isWrapped && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
                  className={`absolute bottom-28 z-40 px-5 py-2 rounded-full border shadow-md flex items-center justify-center ${getRibbonStyle()}`}
                >
                  <div className="relative">
                    {/* Ribbon loops */}
                    <div className="absolute -left-6 -top-3 w-6 h-6 border-2 border-inherit rounded-full rotate-30 opacity-90" />
                    <div className="absolute -right-6 -top-3 w-6 h-6 border-2 border-inherit rounded-full -rotate-30 opacity-90" />
                    <Heart className="text-white fill-white" size={14} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sparkles on wrapping */}
            {showSparkles && (
              <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-400"
                    initial={{ 
                      x: 0, 
                      y: -100,
                      scale: 0.2, 
                      opacity: 1 
                    }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 300, 
                      y: (Math.random() - 0.5) * 300 - 100,
                      scale: Math.random() * 1 + 0.5,
                      opacity: 0 
                    }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                  >
                    <Sparkles fill="currentColor" size={24} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Interactive Note Card that appears after wrapped */}
            <AnimatePresence>
              {isWrapped && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 50, rotate: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: -3 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="absolute bottom-4 left-6 z-50 w-[200px] bg-amber-50 border border-amber-200 p-4 rounded shadow-lg origin-bottom-left -rotate-3"
                >
                  <div className="w-10 h-3 absolute -top-1.5 left-1/2 -translate-x-1/2 washi-tape washi-tape-pink opacity-80" />
                  <p className="font-handwritten text-sm text-stone-700 leading-tight">
                    "A special bunch of wildflowers for the sweetest girl. Made with all my love! 🌸✨"
                  </p>
                  <p className="font-handwritten text-xs text-pink-500 text-right mt-2 font-bold">- Ishan</p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  )
}
