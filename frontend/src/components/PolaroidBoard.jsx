import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Pin } from 'lucide-react'

export const PolaroidBoard = () => {
  const constraintsRef = useRef(null)

  const items = [
    {
      id: 1,
      image: '/illustration_walk.png',
      caption: 'Our sweet walks holding hands 🌸',
      x: '5%',
      y: '10%',
      rotate: -4,
      tapeColor: 'washi-tape-pink',
      tapeLeft: '35%'
    },
    {
      id: 2,
      image: '/illustration_stars.png',
      caption: 'Cozy nights counting stars ✨',
      x: '55%',
      y: '5%',
      rotate: 3,
      tapeColor: 'washi-tape-blue',
      tapeLeft: '40%'
    },
    {
      id: 3,
      image: '/illustration_flowers.png',
      caption: 'Wildflowers for my favorite girl 🌼',
      x: '10%',
      y: '50%',
      rotate: 5,
      tapeColor: 'washi-tape-yellow',
      tapeLeft: '30%'
    },
    {
      id: 4,
      image: '/illustration_teddy.png',
      caption: 'Chocolates & warm teddy hugs 🍫🧸',
      x: '50%',
      y: '55%',
      rotate: -6,
      tapeColor: 'washi-tape-green',
      tapeLeft: '42%'
    }
  ]

  const notes = [
    {
      id: 'n1',
      text: '❤️ You + Me = Happy ❤️',
      x: '42%',
      y: '42%',
      rotate: 12,
      bg: 'bg-amber-100 border border-amber-200'
    },
    {
      id: 'n2',
      text: 'Sreeparna is the cutest! 🥰',
      x: '8%',
      y: '40%',
      rotate: -15,
      bg: 'bg-rose-100 border border-rose-200 text-rose-700'
    }
  ]

  return (
    <div className="relative w-full min-h-screen bg-dotted-paper py-16 px-4 flex flex-col items-center justify-start overflow-hidden">
      
      {/* Decorative Washi Tapes */}
      <div className="washi-tape washi-tape-yellow w-36 rotate-2 -right-8 top-16 z-10 opacity-70" />
      
      {/* Section Header */}
      <div className="text-center max-w-xl mb-12 z-10">
        <span className="inline-block px-3 py-1 mb-2 rounded-full bg-amber-100 text-amber-700 font-cute text-xs border border-amber-200 shadow-sm">
          Interactive Scrapbook 📌
        </span>
        <h2 className="font-pacifico text-3xl sm:text-4xl text-[#795548] drop-shadow-sm">
          Our Sweet Memories
        </h2>
        <p className="font-handwritten text-xl sm:text-2xl text-stone-600 mt-2">
          (Psst! Try dragging the photos and notes around to organize them on the board!)
        </p>
      </div>

      {/* Board Container */}
      <div 
        ref={constraintsRef}
        className="relative w-full max-w-5xl h-[85vh] sm:h-[75vh] md:h-[70vh] border-stitch bg-[#fcfaf7] shadow-inner p-4 overflow-hidden"
      >
        {/* Corkboard texture details (little dots and scratches) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#b8860b_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* DRAGGABLE POLAROIDS */}
        {items.map((item) => (
          <motion.div
            key={item.id}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            whileDrag={{ scale: 1.05, zIndex: 50, rotate: item.rotate * 1.5 }}
            style={{ 
              left: item.x, 
              top: item.y,
              rotate: item.rotate
            }}
            className="absolute cursor-grab active:cursor-grabbing z-20 w-[180px] sm:w-[220px] select-none"
          >
            {/* Washi Tape Accent */}
            <div 
              className={`washi-tape ${item.tapeColor} w-20 sm:w-24 -top-3 z-30`}
              style={{ left: item.tapeLeft }}
            />
            
            {/* Polaroid Box */}
            <div className="polaroid-frame bg-white flex flex-col">
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
        ))}

        {/* DRAGGABLE LOVE NOTES */}
        {notes.map((note) => (
          <motion.div
            key={note.id}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.15}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
            style={{ 
              left: note.x, 
              top: note.y,
              rotate: note.rotate
            }}
            className={`absolute cursor-grab active:cursor-grabbing z-10 px-4 py-3 rounded shadow-md ${note.bg} select-none`}
          >
            {/* Mini Pin head */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-rose-500 pointer-events-none drop-shadow-sm">
              <Pin size={16} fill="currentColor" className="rotate-45" />
            </div>

            <p className="font-handwritten text-lg sm:text-xl font-bold text-stone-700 whitespace-nowrap">
              {note.text}
            </p>
          </motion.div>
        ))}

        {/* Small decorative drawings */}
        <div className="absolute right-4 bottom-4 font-handwritten text-stone-400/80 text-xl pointer-events-none select-none select-none">
          Ishan ❤️ Sreeparna
        </div>

      </div>
    </div>
  )
}
