import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2, Sparkles, Wand2 } from 'lucide-react'

// Beautiful dynamic green stems that converge under the ribbon
const StemsBundle = () => {
  return (
    <svg className="absolute bottom-[28px] left-1/2 -translate-x-1/2 w-[160px] h-[190px] pointer-events-none z-15" viewBox="0 0 100 120" fill="none">
      {/* Stems crossing and gathering */}
      <path d="M30 10 Q48 70 50 90" stroke="#558B2F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 10 Q49 70 48 90" stroke="#689F38" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 10 Q50 70 51 90" stroke="#7CB342" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 10 Q51 70 53 90" stroke="#689F38" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M70 10 Q52 70 55 90" stroke="#558B2F" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Under tie point, stems flare out */}
      <path d="M50 90 L42 115" stroke="#558B2F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M48 90 L47 118" stroke="#689F38" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M51 90 L50 117" stroke="#7CB342" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M53 90 L54 116" stroke="#689F38" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M55 90 L60 114" stroke="#558B2F" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// Gorgeous SVG ribbon bow
const RibbonBow = ({ type, size = 95 }) => {
  let mainColor, strokeColor, darkColor
  switch (type) {
    case 'pink':
      mainColor = '#F48FB1'
      strokeColor = '#F06292'
      darkColor = '#C2185B'
      break
    case 'string':
      mainColor = '#A1887F'
      strokeColor = '#8D6E63'
      darkColor = '#4E342E'
      break
    case 'yellow':
    default:
      mainColor = '#FFD54F'
      strokeColor = '#FFB300'
      darkColor = '#E65100'
      break
  }

  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left Tail */}
      <path d="M45 35 L20 62 L32 63 L48 45 Z" fill={mainColor} stroke={strokeColor} strokeWidth="1.5" />
      {/* Right Tail */}
      <path d="M55 35 L80 62 L68 63 L52 45 Z" fill={mainColor} stroke={strokeColor} strokeWidth="1.5" />
      
      {/* Left Loop */}
      <path d="M50 35 C28 12, 8 22, 18 38 C28 48, 45 38, 50 35Z" fill={mainColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
      <path d="M44 34 C34 24, 20 28, 24 36" fill="none" stroke={darkColor} strokeWidth="1.5" opacity="0.6" />

      {/* Right Loop */}
      <path d="M50 35 C72 12, 92 22, 82 38 C72 48, 55 38, 50 35Z" fill={mainColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
      <path d="M56 34 C66 24, 80 28, 76 36" fill="none" stroke={darkColor} strokeWidth="1.5" opacity="0.6" />

      {/* Center Knot */}
      <circle cx="50" cy="35" r="9" fill={darkColor} stroke={strokeColor} strokeWidth="1.5" />
      <circle cx="50" cy="35" r="7" fill={mainColor} />
      <path d="M48 32 Q50 29 52 32 Q54 35 50 38 Q46 35 48 32 Z" fill="#FFF" opacity="0.8" />
    </svg>
  )
}

// Helper to compute beautiful layered fan layout (unwrapped) vs compact bundle (wrapped)
const getFlowerCoords = (index, isWrapped) => {
  let x, y, rotate
  if (isWrapped) {
    // Tight clustered bouquet dome shape
    if (index < 5) {
      const pct = index / 4
      x = (pct - 0.5) * 110
      y = -90 + Math.abs(x) * 0.15
      rotate = (pct - 0.5) * 35
    } else if (index < 10) {
      const pct = (index - 5) / 4
      x = (pct - 0.5) * 85
      y = -60 + Math.abs(x) * 0.15
      rotate = (pct - 0.5) * 25
    } else {
      const pct = (index - 10) / 4
      x = (pct - 0.5) * 60
      y = -30 + Math.abs(x) * 0.15
      rotate = (pct - 0.5) * 15
    }
  } else {
    // Loose fan layout spread on paper
    if (index < 5) {
      const pct = index / 4
      x = (pct - 0.5) * 160
      y = -105 + Math.abs(x) * 0.12
      rotate = (pct - 0.5) * 30
    } else if (index < 10) {
      const pct = (index - 5) / 4
      x = (pct - 0.5) * 120
      y = -70 + Math.abs(x) * 0.12
      rotate = (pct - 0.5) * 20
    } else {
      const pct = (index - 10) / 4
      x = (pct - 0.5) * 80
      y = -35 + Math.abs(x) * 0.12
      rotate = (pct - 0.5) * 10
    }
  }

  return { x, y, rotate }
}

// Cute SVG Icons for Flowers (custom designed geometries with stems)
const FlowerSVG = ({ type, size = 48 }) => {
  switch (type) {
    case 'Daisy':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 50 V95" stroke="#7CB342" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 75 Q32 68 40 58" stroke="#7CB342" strokeWidth="3" fill="none" strokeLinecap="round" />
          {Array.from({ length: 8 }).map((_, idx) => {
            const angle = (idx * 360) / 8
            return (
              <g key={idx} transform={`rotate(${angle} 50 50)`}>
                <ellipse cx="50" cy="22" rx="10" ry="20" fill="#FFFFFF" stroke="#E5D3B3" strokeWidth="2" />
              </g>
            )
          })}
          <circle cx="50" cy="50" r="16" fill="#FCD12A" stroke="#E5B20D" strokeWidth="2" />
        </svg>
      )
    case 'Sunflower':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 50 V95" stroke="#7CB342" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 78 Q68 70 60 60" stroke="#7CB342" strokeWidth="3" fill="none" strokeLinecap="round" />
          {Array.from({ length: 12 }).map((_, idx) => {
            const angle = (idx * 360) / 12
            return (
              <g key={idx} transform={`rotate(${angle} 50 50)`}>
                <path d="M50 15 C45 30, 55 30, 50 15Z" fill="#FFB300" stroke="#FFA000" strokeWidth="2" />
                <path d="M50 10 C42 28, 58 28, 50 10Z" fill="#FFC107" />
              </g>
            )
          })}
          <circle cx="50" cy="50" r="22" fill="#5D4037" stroke="#3E2723" strokeWidth="2" />
          <circle cx="50" cy="50" r="16" fill="#4E342E" strokeDasharray="3,3" stroke="#8D6E63" strokeWidth="2" />
        </svg>
      )
    case 'Tulip':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 50 V95" stroke="#7CB342" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 45 C30 65, 70 65, 70 45 C70 30, 60 20, 50 40 C40 20, 30 30, 30 45Z" fill="#F48FB1" stroke="#F06292" strokeWidth="2" />
        </svg>
      )
    case 'Lavender':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 50 V95" stroke="#7CB342" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="25" r="5" fill="#B39DDB" />
          <circle cx="45" cy="35" r="6" fill="#9575CD" />
          <circle cx="55" cy="38" r="5" fill="#7E57C2" />
        </svg>
      )
    case 'Blue Hydrangea':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 65 V95" stroke="#7CB342" strokeWidth="3" />
          <circle cx="50" cy="35" r="30" fill="#90CAF9" />
        </svg>
      )
    case 'Lily':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 60 V95" stroke="#81C784" strokeWidth="3" />
          <path d="M50 60 C30 50, 20 25, 35 25 C45 25, 48 45, 50 60Z" fill="#FFFDF0" stroke="#E0DDB8" strokeWidth="1.5" />
          <path d="M50 60 C70 50, 80 25, 65 25 C55 25, 52 45, 50 60Z" fill="#FFFDF0" stroke="#E0DDB8" strokeWidth="1.5" />
        </svg>
      )
    default:
      return null
  }
}

export const BouquetBuilder = () => {
  const DEFAULT_NOTE = "A special bunch of wildflowers for Sreeparna. Made with all my love! 🌸✨"
  const SUNFLOWER_NOTE = "You are my absolute sunshine, Sreeparna! 🌻 You make my world so much brighter. I love you! 💛✨"

  const [selectedFlowers, setSelectedFlowers] = useState([])
  const [wrapper, setWrapper] = useState('kraft')
  const [ribbon, setRibbon] = useState('yellow')
  const [isWrapped, setIsWrapped] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [noteText, setNoteText] = useState(DEFAULT_NOTE)
  const [isSpecialSunflower, setIsSpecialSunflower] = useState(false)
  const canvasRef = useRef(null)

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
    if (selectedFlowers.length >= 15) return

    const idx = selectedFlowers.length
    const coords = getFlowerCoords(idx, false)

    const newFlower = {
      id: Date.now() + Math.random(),
      name: flowerName,
      x: coords.x,
      y: coords.y,
      rotate: coords.rotate,
      scale: Math.random() * 0.08 + 0.95
    }

    setSelectedFlowers([...selectedFlowers, newFlower])

    if (isSpecialSunflower) {
      setIsSpecialSunflower(false)
      if (noteText === SUNFLOWER_NOTE) {
        setNoteText(DEFAULT_NOTE)
      }
    }
  }

  const handleRemoveFlower = (id) => {
    if (isWrapped) return
    setSelectedFlowers((prev) => prev.filter((flower) => flower.id !== id))
    
    if (isSpecialSunflower) {
      setIsSpecialSunflower(false)
      if (noteText === SUNFLOWER_NOTE) {
        setNoteText(DEFAULT_NOTE)
      }
    }
  }

  const handleClear = () => {
    setSelectedFlowers([])
    setIsWrapped(false)
    setShowSparkles(false)
    setIsSpecialSunflower(false)
    setNoteText(DEFAULT_NOTE)
  }

  const handleWrap = () => {
    if (selectedFlowers.length === 0) return
    setIsWrapped(true)
    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 2500)
  }

  const handlePresetSunflower = () => {
    if (isWrapped) return
    const preset = [
      { id: 1, name: 'Sunflower', x: 0, y: -45, rotate: 0, scale: 1.1 },
      { id: 2, name: 'Sunflower', x: -35, y: -25, rotate: -15, scale: 1.0 },
      { id: 3, name: 'Sunflower', x: 35, y: -25, rotate: 15, scale: 1.0 },
      { id: 4, name: 'Sunflower', x: -65, y: -5, rotate: -25, scale: 0.95 },
      { id: 5, name: 'Sunflower', x: 65, y: -5, rotate: 25, scale: 0.95 },
      { id: 6, name: 'Sunflower', x: -20, y: -70, rotate: -10, scale: 1.0 },
      { id: 7, name: 'Sunflower', x: 20, y: -70, rotate: 10, scale: 1.0 },
      { id: 8, name: 'Sunflower', x: -50, y: -55, rotate: -20, scale: 0.9 },
      { id: 9, name: 'Sunflower', x: 50, y: -55, rotate: 20, scale: 0.9 },
      { id: 10, name: 'Sunflower', x: 0, y: -100, rotate: 0, scale: 1.0 }
    ]
    setSelectedFlowers(preset)
    setWrapper('kraft')
    setRibbon('yellow')
    setIsSpecialSunflower(true)
    setNoteText(SUNFLOWER_NOTE)
  }

  const getBackWrapStyle = () => {
    switch (wrapper) {
      case 'pink':
        return 'bg-pink-100 border border-pink-200 rounded-t-[30px] shadow-sm'
      case 'checkered':
        return 'border border-purple-200 rounded-t-[30px] shadow-sm'
      case 'kraft':
      default:
        return 'bg-[#d5c3a6] border border-[#c3b194] rounded-t-[30px] shadow-sm'
    }
  }

  const getBackWrapPattern = () => {
    if (wrapper !== 'checkered') return {}
    return {
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(147, 51, 234, 0.08) 15px, rgba(147, 51, 234, 0.08) 16px), 
                        repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(147, 51, 234, 0.08) 15px, rgba(147, 51, 234, 0.08) 16px)`,
      backgroundColor: '#faf5ff'
    }
  }

  const getFrontWrapPattern = (isLeft) => {
    if (wrapper !== 'checkered') return {}
    return {
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(147, 51, 234, 0.12) 12px, rgba(147, 51, 234, 0.12) 13px), 
                        repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(147, 51, 234, 0.12) 12px, rgba(147, 51, 234, 0.12) 13px)`,
      backgroundColor: isLeft ? '#e9d5ff' : '#f3e8ff'
    }
  }

  const getFrontWrapLeftStyle = () => {
    switch (wrapper) {
      case 'pink':
        return 'bg-pink-300 border-r border-pink-400 shadow-md'
      case 'checkered':
        return 'bg-purple-200 border-r border-purple-300 shadow-md'
      case 'kraft':
      default:
        return 'bg-[#c1af93] border-r border-[#b3a186] shadow-md'
    }
  }

  const getFrontWrapRightStyle = () => {
    switch (wrapper) {
      case 'pink':
        return 'bg-pink-200 border-l border-pink-300 shadow-lg'
      case 'checkered':
        return 'bg-purple-100 border-l border-purple-200 shadow-lg'
      case 'kraft':
      default:
        return 'bg-[#b3a186] border-l border-[#a19077] shadow-lg'
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-grid-paper py-16 px-4 flex flex-col items-center justify-start overflow-hidden">
      
      <div className="washi-tape washi-tape-pink w-28 -rotate-6 -left-4 top-10 z-10" />

      <div className="text-center max-w-xl mb-10 z-10 text-stone-800">
        <span className="inline-block px-3 py-1 mb-2 rounded-full bg-pink-100 text-pink-600 font-cute text-xs border border-pink-200 shadow-sm">
          Flower Shop 🌸
        </span>
        <h2 className="font-pacifico text-3xl sm:text-4xl text-pink-500 drop-shadow-sm select-none">
          Build Sreeparna's Bouquet
        </h2>
        <p className="font-handwritten text-xl sm:text-2xl text-stone-600 mt-2">
          Pick her favorite wildflowers (no roses here!), wrap them up nicely, and seal them with a ribbon!
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start z-10">
        
        <div className="bg-white border-stitch p-6 sm:p-8 shadow-md space-y-6 relative">
          <div className="absolute washi-tape washi-tape-blue w-24 -top-3 left-12" />
          
          <div className="space-y-3">
            <h3 className="font-cute text-lg font-bold text-stone-700 flex items-center gap-1.5 select-none">
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

          <div className="space-y-3">
            <h3 className="font-cute text-lg font-bold text-stone-700 flex items-center gap-1.5 select-none">
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-xs">2</span>
              Choose Wrap Paper
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {wrapperOptions.map((opt) => (
                <button
                  key={opt.id}
                  disabled={isWrapped}
                  onClick={() => setWrapper(opt.id)}
                  className={`px-4 py-2.5 rounded-lg font-cute text-xs font-bold border transition-all cursor-pointer select-none ${
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

          <div className="space-y-3">
            <h3 className="font-cute text-lg font-bold text-stone-700 flex items-center gap-1.5 select-none">
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-xs">3</span>
              Select Ribbon
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {ribbonOptions.map((opt) => (
                <button
                  key={opt.id}
                  disabled={isWrapped}
                  onClick={() => setRibbon(opt.id)}
                  className={`px-4 py-2.5 rounded-lg font-cute text-xs font-bold border transition-all cursor-pointer select-none ${
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

          <div className="space-y-3">
            <h3 className="font-cute text-lg font-bold text-stone-700 flex items-center gap-1.5 select-none">
              <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-xs">4</span>
              Write Sreeparna a Note
            </h3>
            <textarea
              disabled={isWrapped}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write a cute message..."
              maxLength={120}
              className="w-full p-3 font-handwritten text-lg rounded-xl border border-stone-200 bg-amber-50/20 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none h-20 placeholder:text-stone-400 shadow-sm"
            />
            <div className="text-right text-[10px] text-stone-400 font-cute select-none">
              {noteText.length}/120 characters
            </div>
          </div>

          {/* Preset Button */}
          <div className="pt-2 border-t border-stone-100">
            <button
              disabled={isWrapped}
              onClick={handlePresetSunflower}
              className={`w-full px-4 py-3 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50/50 text-amber-700 font-cute text-xs font-bold hover:bg-amber-100 hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                isWrapped && 'opacity-50 cursor-not-allowed'
              }`}
            >
              🌻 Ishan's Signature Sunflower Bouquet
            </button>
          </div>

          <div className="flex gap-4 pt-4 border-t border-stone-100">
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-3 rounded-xl border border-stone-200 text-stone-600 font-cute text-sm hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer select-none"
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

        <div 
          ref={canvasRef} 
          className="relative aspect-4/5 bg-stone-50/50 border-stitch flex items-center justify-center overflow-hidden h-[500px] select-none"
        >
          
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-[#f1ebd9] border-t border-[#dfd8c2] z-0 flex items-center justify-center shadow-inner pointer-events-none">
            <span className="font-handwritten text-stone-400 text-sm">Workshop Table</span>
          </div>

          {!isWrapped && selectedFlowers.length === 0 && (
            <motion.div 
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute text-center z-10 pointer-events-none px-4"
            >
              <div className="text-pink-400 flex justify-center mb-2"><Heart size={36} className="animate-pulse" /></div>
              <p className="font-handwritten text-2xl text-stone-400">Click flowers on the left to start building your bouquet!</p>
              <p className="font-cute text-xs text-stone-400/80 mt-1">(You can drag the flowers to arrange them!)</p>
            </motion.div>
          )}

          <div className="relative w-full h-full flex flex-col items-center justify-end pb-4 z-10 pointer-events-none">
            
            {/* Unified Bouquet Unit to prevent sizing/placement misalignment */}
            <div className="relative w-[320px] h-[450px] flex flex-col items-center justify-end pointer-events-none">
              
              {/* 1. BACK WRAPPING PAPER (z-10, fanning out properly) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[280px] h-[320px] z-10 pointer-events-none">
                <motion.div
                  className={`absolute inset-0 ${getBackWrapStyle()}`}
                  style={{
                    clipPath: "polygon(0% 0%, 100% 0%, 70% 100%, 30% 100%)",
                    ...getBackWrapPattern()
                  }}
                  animate={{
                    scale: isWrapped ? 1.02 : 1.0,
                    opacity: isWrapped ? 1 : 0.75
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                />
              </div>

              {/* 2. STEMS BUNDLE (z-15, converges stems under ribbon) */}
              {selectedFlowers.length > 0 && <StemsBundle />}

              {/* 3. RENDERED FLOWERS (z-20, draggable/interactive) */}
              <div className="absolute left-1/2 bottom-[200px] w-0 h-0 z-20 flex items-center justify-center pointer-events-auto">
                <AnimatePresence>
                  {selectedFlowers.map((flower, idx) => (
                    <motion.div
                      key={flower.id}
                      drag={!isWrapped}
                      dragConstraints={canvasRef}
                      dragElastic={0.1}
                      dragMomentum={false}
                      initial={{ scale: 0, opacity: 0, x: flower.x, y: flower.y, rotate: flower.rotate }}
                      animate={{ 
                        scale: flower.scale, 
                        opacity: 1, 
                        ...(isWrapped ? { x: getFlowerCoords(idx, true).x, y: getFlowerCoords(idx, true).y, rotate: getFlowerCoords(idx, true).rotate } : {}) 
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 150, damping: 15 }}
                      className="absolute cursor-grab active:cursor-grabbing group"
                      whileHover={!isWrapped ? { scale: flower.scale * 1.08, zIndex: 100 } : {}}
                      whileDrag={{ scale: flower.scale * 1.1, zIndex: 100 }}
                    >
                      <FlowerSVG type={flower.name} size={85} />
                      
                      {!isWrapped && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFlower(flower.id);
                          }}
                          className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full p-1 shadow-md hover:bg-rose-600 transition-all opacity-0 group-hover:opacity-100 active:scale-90 flex items-center justify-center cursor-pointer border border-white"
                          style={{ zIndex: 110 }}
                        >
                          <Trash2 size={10} className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* 4. FLOWER WRAPPER OVERLAY (z-30, front flaps fold in forming a cone) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[280px] h-[200px] z-30 pointer-events-none">
                {/* Left Flap */}
                <motion.div
                  className={`absolute inset-0 origin-bottom-left ${getFrontWrapLeftStyle()}`}
                  style={{
                    clipPath: "polygon(30% 100%, 0% 15%, 85% 0%, 50% 100%)",
                    ...getFrontWrapPattern(true)
                  }}
                  animate={{
                    rotate: isWrapped ? 0 : -32,
                    x: isWrapped ? 0 : -45,
                    opacity: isWrapped ? 1 : 0.35,
                    scale: isWrapped ? 1 : 0.95
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                />

                {/* Right Flap (overlaps Left Flap) */}
                <motion.div
                  className={`absolute inset-0 origin-bottom-right ${getFrontWrapRightStyle()}`}
                  style={{
                    clipPath: "polygon(15% 0%, 100% 15%, 70% 100%, 50% 100%)",
                    ...getFrontWrapPattern(false)
                  }}
                  animate={{
                    rotate: isWrapped ? 0 : 32,
                    x: isWrapped ? 0 : 45,
                    opacity: isWrapped ? 1 : 0.35,
                    scale: isWrapped ? 1 : 0.95
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                />
              </div>

              {/* 5. RIBBON BOW OVERLAY (z-40, centered properly) */}
              <AnimatePresence>
                {isWrapped && (
                  <motion.div
                    key="ribbon"
                    initial={{ scale: 0, y: 30, rotate: -30 }}
                    animate={{ scale: 1, y: 0, rotate: 0 }}
                    exit={{ scale: 0, y: 30 }}
                    transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.3 }}
                    className="absolute bottom-[55px] left-1/2 -translate-x-1/2 z-40 cursor-pointer pointer-events-auto"
                  >
                    <RibbonBow type={ribbon} size={95} />
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
                      initial={{ x: 0, y: -100, scale: 0.2, opacity: 1 }}
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

              {/* 6. INTERACTIVE NOTE CARD (z-50, tucked neatly on the side) */}
              <AnimatePresence>
                {isWrapped && (
                  <motion.div
                    key="note-card"
                    initial={{ opacity: 0, scale: 0.5, y: 50, rotate: 15 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: [0, -6, 0], 
                      rotate: -4 
                    }}
                    whileHover={{ scale: 1.06, rotate: -2, y: -8 }}
                    exit={{ opacity: 0, scale: 0.5, y: 50 }}
                    transition={{ 
                      delay: 0.6, 
                      type: "spring", 
                      stiffness: 120,
                      y: {
                        repeat: Infinity,
                        duration: 3.5,
                        ease: "easeInOut"
                      }
                    }}
                    className={`absolute bottom-[35px] left-[-45px] z-50 w-[200px] p-5 shadow-2xl origin-bottom-left cursor-pointer pointer-events-auto border-2 border-dashed transition-all duration-500 ${
                      isSpecialSunflower 
                        ? 'bg-gradient-to-br from-[#fffdf0] to-[#fffde0] border-amber-300/80 rounded-2xl shadow-amber-100/50' 
                        : 'bg-gradient-to-br from-[#fffafc] to-[#ffeef4] border-pink-200 rounded-2xl shadow-pink-100/50'
                    }`}
                  >
                    {/* Dynamic Washi Tape */}
                    <div className={`w-14 h-4 absolute -top-2 left-1/2 -translate-x-1/2 washi-tape opacity-90 -rotate-2 ${
                      isSpecialSunflower ? 'washi-tape-sunflower' : 'washi-tape-pink'
                    }`} />
                    
                    {/* Cute Corner Sticker */}
                    <div className="absolute -top-1.5 -right-1.5 text-xl select-none filter drop-shadow">
                      {isSpecialSunflower ? '🌻' : '💝'}
                    </div>

                    {/* Cute Lined Paper Lines Background */}
                    <div className="absolute inset-0 bg-lined-paper opacity-5 pointer-events-none rounded-2xl" />

                    <div className="relative z-10">
                      <p className="font-handwritten text-xl text-stone-800 leading-snug break-words pointer-events-auto select-none">
                        "{noteText}"
                      </p>
                      
                      {/* Bouncing tiny heart or spark */}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm select-none animate-pulse">
                          {isSpecialSunflower ? '✨💛✨' : '💖✨💖'}
                        </span>
                        <p className="font-handwritten text-sm text-pink-500 font-bold select-none">
                          {isSpecialSunflower ? '- Your Ishan 🌻' : '- Your Ishan 🌸'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
