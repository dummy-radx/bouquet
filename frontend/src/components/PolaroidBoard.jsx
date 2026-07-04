import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Pin } from 'lucide-react'

export const PolaroidBoard = () => {
  const constraintsRef = useRef(null)

  const scrapbookItems = [
    {
      id: 1,
      type: 'polaroid',
      image: '/IMG_0035.png',
      caption: 'You make my heart smile 🥰',
      rotate: -3,
      tapeColor: 'washi-tape-pink',
      tapeLeft: '35%'
    },
    {
      id: 2,
      type: 'note',
      text: '❤️ You + Me = Happy ❤️',
      rotate: 4,
      bg: 'bg-amber-100/90 border border-amber-200 text-stone-800'
    },
    {
      id: 3,
      type: 'polaroid',
      image: '/IMG_923.jpeg',
      caption: 'My beautiful Sreeparna 🌻',
      rotate: 2,
      tapeColor: 'washi-tape-blue',
      tapeLeft: '40%'
    },
    {
      id: 4,
      type: 'note',
      text: 'Sreeparna is the cutest! 🥰',
      rotate: -5,
      bg: 'bg-rose-100/90 border border-rose-200 text-rose-700'
    },
    {
      id: 5,
      type: 'polaroid',
      image: '/IMG_934.jpeg',
      caption: 'Our cozy little moments ✨',
      rotate: 3,
      tapeColor: 'washi-tape-sunflower',
      tapeLeft: '30%'
    },
    {
      id: 6,
      type: 'polaroid',
      image: '/IMG_940.jpeg',
      caption: 'Stolen glances & sweet smiles 💛',
      rotate: -4,
      tapeColor: 'washi-tape-green',
      tapeLeft: '42%'
    },
    {
      id: 7,
      type: 'polaroid',
      image: '/2fedc120-cc43-4c94-ab0a-7bb2b63a3a51.JPG',
      caption: 'Forever & Always with you 💖',
      rotate: 5,
      tapeColor: 'washi-tape-pink',
      tapeLeft: '38%'
    },
    {
      id: 8,
      type: 'polaroid',
      image: '/illustration_sunflower.png',
      caption: 'Watercolor sunflowers for you 🌻',
      rotate: -2,
      tapeColor: 'washi-tape-sunflower',
      tapeLeft: '36%'
    }
  ]

  const stickers = [
    { id: 's1', emoji: '🌻', x: '72%', y: '12%', rotate: 15, label: 'Pressed Flower' },
    { id: 's2', emoji: '⭐', x: '18%', y: '75%', rotate: -20, label: 'Handmade Star' },
    { id: 's3', emoji: '❤️', x: '50%', y: '10%', rotate: -5, label: 'Stitched Heart' },
    { id: 's4', emoji: '🧸', x: '78%', y: '65%', rotate: 12, label: 'Warm Hug' }
  ]

  return (
    <div className="relative w-full min-h-screen bg-dotted-paper py-16 px-4 flex flex-col items-center justify-start overflow-hidden">
      
      {/* Decorative Washi Tapes */}
      <div className="washi-tape washi-tape-yellow w-36 rotate-2 -right-8 top-16 z-10 opacity-70" />
      
      {/* Section Header */}
      <div className="text-center max-w-xl mb-12 z-10">
        <span className="inline-block px-3 py-1 mb-2 rounded-full bg-amber-100 text-amber-700 font-cute text-xs border border-amber-200 shadow-sm animate-wiggle">
          Interactive Scrapbook 📌
        </span>
        <h2 className="font-pacifico text-3xl sm:text-4xl text-amber-600 drop-shadow-sm flex items-center justify-center gap-2">
          Our Sweet Memories <span className="animate-wiggle inline-block">🌻</span>
        </h2>
        <p className="font-handwritten text-xl sm:text-2xl text-stone-600 mt-2">
          (Psst! Try dragging the photos and notes around to organize them on the board!)
        </p>
      </div>

      {/* Board Container */}
      <div 
        ref={constraintsRef}
        className="relative w-full max-w-5xl border-stitch bg-[#fcfaf7] shadow-inner p-6 sm:p-8 md:p-12 overflow-visible"
      >
        {/* Corkboard texture details (little dots and scratches) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#b8860b_1px,transparent_1px)] bg-size-[16px_16px] rounded-xl" />

        {/* Staggered Responsive Collage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 relative z-10 w-full">
          {scrapbookItems.map((item) => {
            if (item.type === 'polaroid') {
              return (
                <motion.div
                  key={item.id}
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.2}
                  whileDrag={{ scale: 1.05, zIndex: 50, rotate: item.rotate * 1.5 }}
                  style={{ rotate: item.rotate }}
                  className="relative cursor-grab active:cursor-grabbing w-full max-w-[280px] mx-auto select-none"
                >
                  {/* Washi Tape Accent */}
                  <div 
                    className={`washi-tape ${item.tapeColor} w-24 sm:w-28 -top-3 z-30`}
                    style={{ left: item.tapeLeft }}
                  />
                  
                  {/* Polaroid Box */}
                  <div className="polaroid-frame bg-white flex flex-col transition-shadow hover:shadow-md">
                    <div className="w-full aspect-square overflow-hidden bg-stone-100 border border-stone-200/50 rounded-sm">
                      <img 
                        src={item.image} 
                        alt={item.caption} 
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </div>
                    <div className="font-handwritten text-stone-700 text-lg sm:text-xl text-center mt-4 leading-snug px-1">
                      {item.caption}
                    </div>
                  </div>
                </motion.div>
              )
            } else {
              return (
                <motion.div
                  key={item.id}
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.2}
                  whileDrag={{ scale: 1.08, zIndex: 50 }}
                  style={{ rotate: item.rotate }}
                  className={`relative cursor-grab active:cursor-grabbing px-6 py-8 rounded shadow-md border ${item.bg} flex items-center justify-center min-h-[160px] sm:min-h-[200px] w-full max-w-[280px] mx-auto select-none`}
                >
                  {/* Mini Pin head */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-rose-500 pointer-events-none drop-shadow-sm">
                    <Pin size={20} fill="currentColor" className="rotate-45" />
                  </div>

                  <p className="font-handwritten text-xl sm:text-2xl font-bold text-center leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              )
            }
          })}
        </div>

        {/* DRAGGABLE PRESSED FLOWERS / STICKERS */}
        {stickers.map((sticker) => (
          <motion.div
            key={sticker.id}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.15}
            whileDrag={{ scale: 1.2, zIndex: 50, rotate: sticker.rotate * 1.5 }}
            style={{ 
              left: sticker.x, 
              top: sticker.y,
              rotate: sticker.rotate 
            }}
            className="absolute cursor-grab active:cursor-grabbing z-30 select-none bg-white/70 backdrop-blur-[1px] px-3 py-1.5 rounded-full border border-stone-200/50 shadow-sm flex items-center justify-center gap-1.5"
            title={sticker.label}
          >
            <span className="text-xl filter drop-shadow-sm">{sticker.emoji}</span>
            <span className="font-handwritten text-xs text-stone-500/80 font-bold select-none">{sticker.label}</span>
          </motion.div>
        ))}

        {/* Small decorative drawings */}
        <div className="mt-8 text-right font-handwritten text-stone-400/80 text-xl pointer-events-none select-none pr-4">
          Ishan ❤️ Sreeparna 🌻
        </div>

      </div>
    </div>
  )
}
