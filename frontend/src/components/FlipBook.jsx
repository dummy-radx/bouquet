import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, Heart, Sparkles } from 'lucide-react'

export const FlipBook = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for next, -1 for prev

  const pages = [
    {
      id: 0,
      type: 'cover',
      title: 'Our Sweet Story',
      subtitle: 'A flipbook of our favorite chapters 📖',
      footer: 'For Sreeparna, with all my love ❤️',
      bgClass: 'bg-gradient-to-br from-amber-100 to-orange-50 border-stitch'
    },
    {
      id: 1,
      type: 'content',
      image: '/photo1-walkingtogether.png',
      caption: 'Walking Together Hand in Hand 🌸',
      description: 'Every step we take together feels like a beautiful dream. I love holding your warm hand and just walking down the street with you, talking about everything and nothing.',
      tapeColor: 'washi-tape-pink'
    },
    {
      id: 2,
      type: 'content',
      image: '/photo2-coffeedats.jpeg',
      caption: 'Coffee Dates & Sweet Chats ☕',
      description: 'Laughter, cozy cafes, and the sweetest smile that makes my heart melt every single time. Our coffee dates are my absolute favorite escape from the rest of the world.',
      tapeColor: 'washi-tape-blue'
    },
    {
      id: 3,
      type: 'content',
      image: '/photo3-sunsets.jpeg',
      caption: 'Chasing Sunsets with You 🌅',
      description: 'Watching the skies glow in orange and gold, but nothing shines brighter than you. With you, every sunset feels like a promise of a new and beautiful tomorrow.',
      tapeColor: 'washi-tape-sunflower'
    },
    {
      id: 4,
      type: 'content',
      image: '/photo4-kissingyou.jpeg',
      caption: 'Sweet Kisses & Warm Hugs 💖',
      description: 'The world disappears when I am close to you. Your warm hugs make me feel safer than anything, and your sweet kisses fill my days with absolute joy.',
      tapeColor: 'washi-tape-green'
    },
    {
      id: 5,
      type: 'content',
      image: '/photo5-firstvacation.jpeg',
      caption: 'Our First Vacation Together ✈️',
      description: 'Exploring new places, taking endless pictures, and building memories that will last a lifetime. Traveling with you is a grand adventure I never want to end!',
      tapeColor: 'washi-tape-purple'
    },
    {
      id: 6,
      type: 'content',
      image: '/photo6-firstanniversary.jpg',
      caption: 'My Safe Haven 🏡✨',
      description: 'No matter how chaotic the world gets, everything feels perfectly still and right when I am in your arms. You are my safe place, my comfort, and the person I want to hold onto forever. I love you more than words can say. ❤️',
      tapeColor: 'washi-tape-pink'
    },
    {
      id: 7,
      type: 'back-cover',
      title: 'To Be Continued...',
      subtitle: 'To many more chapters, travels, and laughs with my favorite girl. 🌻',
      footer: 'Forever & Always, Ishan ❤️',
      bgClass: 'bg-gradient-to-br from-orange-50 to-amber-100 border-stitch'
    }
  ]

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1)
      setCurrentPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1)
      setCurrentPage((prev) => prev - 1)
    }
  }

  // 3D Flip Page transition settings
  const pageVariants = {
    enter: (dir) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        rotateY: { type: 'spring', stiffness: 80, damping: 15 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
      transition: {
        rotateY: { type: 'spring', stiffness: 80, damping: 15 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.4 }
      }
    })
  }

  return (
    <div className="relative w-full min-h-screen bg-dotted-paper py-16 px-4 flex flex-col items-center justify-start overflow-hidden">
      
      {/* Decorative Floating Sunflowers */}
      <div className="absolute top-12 left-6 text-yellow-500/10 text-6xl pointer-events-none select-none animate-spin-slow">🌻</div>
      <div className="absolute bottom-12 right-6 text-yellow-500/10 text-5xl pointer-events-none select-none animate-wiggle">🌻</div>

      {/* Header */}
      <div className="text-center max-w-xl mb-10 z-10">
        <span className="inline-block px-3 py-1 mb-2 rounded-full bg-amber-100 text-amber-700 font-cute text-xs border border-amber-200 shadow-sm animate-wiggle">
          Our Adventures 📖
        </span>
        <h2 className="font-pacifico text-3xl sm:text-4xl text-amber-600 drop-shadow-sm flex items-center justify-center gap-2">
          The Story of Us <span className="animate-wiggle inline-block">🌻</span>
        </h2>
        <p className="font-handwritten text-xl sm:text-2xl text-stone-600 mt-2">
          Flip through the pages of our beautiful memories together...
        </p>
      </div>

      {/* Flipbook Frame Container */}
      <div className="relative w-full max-w-md flex flex-col items-center z-10 px-4">
        
        {/* Book Outer Binder Wrapper */}
        <div className="relative w-full h-[470px] sm:h-[520px] bg-amber-900 rounded-r-2xl rounded-l-md shadow-2xl p-1.5 flex items-stretch border-l-14 border-amber-950 bg-linear-to-r from-amber-950 via-amber-900 to-amber-900">
          
          {/* Inner Binder shadow/rings design */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/30 pointer-events-none rounded-l" />

          {/* Core Page area */}
          <div className="relative flex-1 bg-lined-paper rounded-r-xl overflow-hidden flex flex-col p-4 shadow-inner" style={{ perspective: '1200px' }}>
            
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
                className="absolute inset-4 flex flex-col justify-between"
              >
                
                {/* 1. COVER PAGE TYPE */}
                {pages[currentPage].type === 'cover' && (
                  <div className={`h-full w-full p-6 flex flex-col justify-between items-center text-center bg-linear-to-br from-amber-100 to-orange-50 border-stitch`}>
                    
                    <div className="w-16 h-4 washi-tape washi-tape-sunflower opacity-80 rotate-2" />
                    
                    <div className="flex flex-col items-center gap-4 my-auto">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        className="text-6xl text-amber-500 drop-shadow-md select-none"
                      >
                        🌻
                      </motion.div>
                      <h3 className="font-pacifico text-3xl sm:text-4xl text-amber-600 tracking-wide select-none drop-shadow-sm">
                        {pages[currentPage].title}
                      </h3>
                      <p className="font-handwritten text-xl sm:text-2xl text-stone-600 max-w-xs mt-2 leading-relaxed">
                        {pages[currentPage].subtitle}
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <p className="font-handwritten text-lg font-bold text-stone-700 select-none">
                        {pages[currentPage].footer}
                      </p>
                      <span className="font-cute text-xs text-stone-400">Click arrow below to open ➔</span>
                    </div>

                  </div>
                )}

                {/* 2. PHOTO CONTENT PAGE TYPE */}
                {pages[currentPage].type === 'content' && (
                  <div className="h-full w-full flex flex-col justify-between">
                    
                    {/* Polaroid Area */}
                    <div className="relative w-full max-w-[210px] xs:max-w-[240px] sm:max-w-[260px] mx-auto select-none mt-2">
                      <div className={`washi-tape ${pages[currentPage].tapeColor} w-20 -top-3 left-[35%] z-20`} />
                      
                      <div className="polaroid-frame bg-white p-2.5 pb-5 sm:p-3 sm:pb-6 shadow-md border border-stone-200/50 flex flex-col rounded-sm">
                        <div className="w-full aspect-4/3 overflow-hidden bg-stone-100 border border-stone-200/20 rounded-sm">
                          <img 
                            src={pages[currentPage].image} 
                            alt={pages[currentPage].caption} 
                            className="w-full h-full object-cover pointer-events-none"
                          />
                        </div>
                        <p className="font-handwritten text-stone-700 text-sm xs:text-base sm:text-lg text-center mt-2.5 leading-snug px-0.5 truncate font-bold">
                          {pages[currentPage].caption}
                        </p>
                      </div>
                    </div>

                    {/* Handwriting text content below polaroid */}
                    <div className="mt-3 sm:mt-4 px-2 flex-1 flex flex-col justify-center">
                      <p className="font-handwritten text-stone-600 text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed text-center italic max-h-[110px] sm:max-h-[120px] overflow-y-auto pr-1 select-none">
                        "{pages[currentPage].description}"
                      </p>
                    </div>

                    {/* Notebook grid dots corner decor */}
                    <div className="absolute bottom-1 right-2 text-yellow-500/20 text-xl font-bold select-none pointer-events-none">🌻</div>
                  </div>
                )}

                {/* 3. BACK COVER PAGE TYPE */}
                {pages[currentPage].type === 'back-cover' && (
                  <div className={`h-full w-full p-6 flex flex-col justify-between items-center text-center bg-linear-to-br from-orange-50 to-amber-100 border-stitch`}>
                    
                    <div className="w-16 h-4 washi-tape washi-tape-pink opacity-80 -rotate-3" />
                    
                    <div className="flex flex-col items-center gap-4 my-auto">
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-5xl text-rose-500 drop-shadow-md select-none"
                      >
                        ❤️
                      </motion.div>
                      <h3 className="font-pacifico text-3xl text-amber-600 select-none drop-shadow-sm">
                        {pages[currentPage].title}
                      </h3>
                      <p className="font-handwritten text-xl sm:text-2xl text-stone-600 max-w-xs mt-2 leading-relaxed">
                        {pages[currentPage].subtitle}
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-1 select-none">
                      <p className="font-handwritten text-lg font-bold text-stone-700">
                        {pages[currentPage].footer}
                      </p>
                      <div className="text-[10px] text-stone-400 font-cute">Created with love. Always.</div>
                    </div>

                  </div>
                )}

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between w-full mt-6 select-none">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 bg-white font-cute text-xs font-semibold text-stone-600 shadow-sm cursor-pointer transition-all hover:bg-stone-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none`}
          >
            <ArrowLeft size={14} />
            Prev Page
          </button>
          
          <span className="font-cute text-xs text-stone-500 font-medium">
            Page {currentPage + 1} of {pages.length}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border border-amber-200 bg-amber-50 font-cute text-xs font-semibold text-amber-700 shadow-sm cursor-pointer transition-all hover:bg-amber-100/70 active:scale-95 disabled:opacity-30 disabled:pointer-events-none`}
          >
            Next Page
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

    </div>
  )
}
