import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Play, Square, Heart, Sparkles } from 'lucide-react'

export const MusicBox = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLetterOpen, setIsLetterOpen] = useState(false)
  const [confetti, setConfetti] = useState([])
  const [notesFloating, setNotesFloating] = useState([])
  const audioRef = useRef(null)

  // Load audio on mount and cleanup on unmount
  useEffect(() => {
    audioRef.current = new Audio('/Sufjan_Stevens_-_Mystery_of_Love_(mp3.pm).mp3');
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Spawn floating music notes while playing
  useEffect(() => {
    let noteInterval;
    if (isPlaying) {
      noteInterval = setInterval(() => {
        setNotesFloating((prev) => [
          ...prev.slice(-10), // keep only last 10 notes
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 100 - 50,
            y: Math.random() * -100 - 30,
            scale: Math.random() * 0.4 + 0.8,
            symbol: ['🎵', '🎶', '🌻', '✨', '💖'][Math.floor(Math.random() * 5)]
          }
        ]);
      }, 500);
    } else {
      setNotesFloating([]);
    }
    return () => clearInterval(noteInterval);
  }, [isPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
      setIsPlaying(true);
    }
  };

  const triggerConfetti = () => {
    // Spawn tons of hearts and sunflowers all over the screen!
    const newConfetti = Array.from({ length: 45 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * window.innerWidth,
      y: (Math.random() - 0.5) * window.innerHeight,
      scale: Math.random() * 1.2 + 0.6,
      rotate: Math.random() * 360,
      isSunflower: i % 2 === 0,
      color: ['text-rose-400', 'text-pink-400', 'text-amber-450', 'text-purple-400'][Math.floor(Math.random() * 4)]
    }));

    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3500);
  };

  return (
    <div className="relative w-full min-h-screen bg-grid-paper py-16 px-4 flex flex-col items-center justify-start overflow-hidden">
      
      {/* Tape decoration */}
      <div className="washi-tape washi-tape-pink w-32 -rotate-12 -left-6 top-8 z-10" />

      {/* Header */}
      <div className="text-center max-w-xl mb-12 z-10">
        <span className="inline-block px-3 py-1 mb-2 rounded-full bg-pink-100 text-pink-600 font-cute text-xs border border-pink-200 shadow-sm">
          Sweet Symphony 🎵📖
        </span>
        <h2 className="font-pacifico text-3xl sm:text-4xl text-pink-500 drop-shadow-sm">
          The Music Box & Letter
        </h2>
        <p className="font-handwritten text-xl sm:text-2xl text-stone-600 mt-2">
          Turn on the music box to play a soft romantic chime, and open the sealed scroll for my final message to you.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
        
        {/* MUSIC BOX SIDE (Left 5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center">
          
          <div className="relative bg-[#fffdfa] border-stitch p-6 sm:p-8 shadow-md flex flex-col items-center w-full max-w-xs text-center overflow-hidden">
            <div className="absolute washi-tape washi-tape-blue w-20 -top-3 left-1/4" />
            
            {/* Music Box visual wrapper */}
            <div className="relative w-36 h-32 bg-amber-100 border-2 border-[#8d6e63] rounded-xl flex flex-col items-center justify-between p-3 shadow-inner mt-4">
              
              {/* Gears inside music box (rotating when playing) */}
              <div className="flex gap-4 mt-2 justify-center w-full">
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={isPlaying ? { repeat: Infinity, duration: 5, ease: "linear" } : {}}
                  className="w-10 h-10 border-4 border-dashed border-[#8d6e63] rounded-full flex items-center justify-center text-xs font-cute text-[#8d6e63]"
                >
                  ⚙️
                </motion.div>
                <motion.div
                  animate={isPlaying ? { rotate: -360 } : { rotate: 0 }}
                  transition={isPlaying ? { repeat: Infinity, duration: 3, ease: "linear" } : {}}
                  className="w-6 h-6 border-4 border-dashed border-[#8d6e63] rounded-full flex items-center justify-center text-[8px] text-[#8d6e63]"
                >
                  ⚙️
                </motion.div>
              </div>

              {/* Music notes visual floating */}
              <AnimatePresence>
                {notesFloating.map((note) => (
                  <motion.div
                    key={note.id}
                    className="absolute font-cute text-pink-400 text-lg pointer-events-none"
                    initial={{ x: 0, y: -20, scale: 0.2, opacity: 1 }}
                    animate={{ 
                      x: note.x, 
                      y: note.y, 
                      scale: note.scale,
                      opacity: 0 
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    {note.symbol}
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="font-pacifico text-xs text-[#8d6e63]/70">Mystery of Love</div>
            </div>

            <h3 className="font-cute text-lg font-bold text-stone-700 mt-4 select-none">
              Sufjan Stevens 🎵
            </h3>
            <p className="font-handwritten text-lg text-stone-500 mt-1 select-none">
              {isPlaying ? 'Mystery of Love is playing... 🎶' : 'Click play to start our song!'}
            </p>

            <button
              onClick={toggleMusic}
              className={`mt-4 px-6 py-2.5 rounded-full text-white font-cute text-xs font-bold shadow flex items-center gap-1.5 transition-all select-none hover:scale-105 active:scale-95 cursor-pointer ${
                isPlaying ? 'bg-amber-600' : 'bg-pink-500 hover:bg-pink-600'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square size={14} fill="currentColor" /> Stop Melody
                </>
              ) : (
                <>
                  <Play size={14} fill="currentColor" /> Play Melody
                </>
              )}
            </button>
          </div>
        </div>

        {/* PARCHMENT LETTER SIDE (Right 7 cols) */}
        <div className="md:col-span-7 flex flex-col items-center">
          
          <AnimatePresence mode="wait">
            {!isLetterOpen ? (
              // SEALED SCROLL
              <motion.div
                key="sealed"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsLetterOpen(true)}
                className="w-full max-w-md aspect-4/3 bg-[#fbf5e6] border-stitch p-6 shadow-lg flex flex-col items-center justify-center cursor-pointer select-none text-center relative group"
              >
                {/* Vintage rolled scroll boundaries */}
                <div className="absolute left-2 top-0 bottom-0 w-3 bg-[#e2d8c3] rounded-full border-r border-[#c2b69f]" />
                <div className="absolute right-2 top-0 bottom-0 w-3 bg-[#e2d8c3] rounded-full border-l border-[#c2b69f]" />
                
                <div className="space-y-4">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center text-white shadow-md mx-auto relative z-10 border-4 border-amber-600/80 font-bold"
                    style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.15), inset 0 0 4px rgba(0,0,0,0.2)" }}
                  >
                    <span className="text-2xl filter drop-shadow select-none">🌻</span>
                  </motion.div>
                  <h3 className="font-pacifico text-2xl text-stone-700">Sealed Letter</h3>
                  <p className="font-handwritten text-xl text-stone-500">
                    Click the wax heart seal to open the letter...
                  </p>
                </div>
              </motion.div>
            ) : (
              // OPENED LETTER
              <motion.div
                key="opened"
                initial={{ rotate: -5, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 1, opacity: 1, scale: 1 }}
                exit={{ rotate: -5, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 15 }}
                className="w-full bg-lined-paper border-stitch p-8 shadow-xl flex flex-col justify-between relative min-h-[400px]"
              >
                {/* Washi tape holds scroll top */}
                <div className="absolute washi-tape washi-tape-sunflower w-24 -top-3 left-1/2 -translate-x-1/2" />

                {/* Hand-drawn sunflower corner doodles */}
                <div className="absolute bottom-4 left-6 text-yellow-500/20 text-3xl select-none pointer-events-none">🌻</div>
                <div className="absolute top-4 right-6 text-yellow-500/20 text-3xl select-none pointer-events-none">🌻</div>

                <div className="font-handwritten text-stone-700 text-2xl sm:text-3xl leading-relaxed space-y-4">
                  <p>My Dearest Sreeparna,</p>
                  <p>
                    Thank you for being in my life. You are the sweetest melody, the brightest sun, and my favorite thought every single day.
                  </p>
                  <p>
                    I hope this tiny digital scrapbook brought a big smile to your face. You deserve all the flowers in the universe, all the chocolates, and all the warm teddy hugs.
                  </p>
                  <p>
                    I am so incredibly lucky to call you mine. Here's to us, our endless laughs, and our sweet journey ahead. Forever & always. ❤️
                  </p>
                  <p className="text-right font-pacifico text-pink-500 mt-6 select-none">
                    With all my love, <br/>
                    Ishan 💖
                  </p>
                </div>

                <div className="flex flex-col items-center mt-8 space-y-3 pt-4 border-t border-stone-100">
                  <button
                    onClick={triggerConfetti}
                    className="px-6 py-2.5 rounded-full bg-linear-to-r from-pink-500 to-rose-500 text-white font-cute text-xs font-bold shadow hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Heart fill="currentColor" size={12} /> Shower Hearts Confetti!
                  </button>
                  <button
                    onClick={() => setIsLetterOpen(false)}
                    className="text-stone-400 font-cute text-xs hover:text-stone-600 transition-colors cursor-pointer"
                  >
                    Reseal Letter 🔒
                  </button>
                </div>

                {/* Confetti Overlay */}
                <AnimatePresence>
                  {confetti.length > 0 && (
                    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                      {confetti.map((c) => (
                        <motion.div
                          key={c.id}
                          className={`absolute ${c.color}`}
                          initial={{ 
                            x: window.innerWidth / 2, 
                            y: window.innerHeight / 2, 
                            scale: 0.1, 
                            opacity: 1, 
                            rotate: c.rotate 
                          }}
                          animate={{ 
                            x: window.innerWidth / 2 + c.x, 
                            y: window.innerHeight / 2 + c.y - 100, 
                            scale: c.scale,
                            opacity: [1, 1, 0]
                          }}
                          transition={{ duration: 2.2, ease: "easeOut" }}
                        >
                          {c.isSunflower ? (
                            <span className="text-3xl select-none filter drop-shadow">🌻</span>
                          ) : (
                            <Heart fill="currentColor" size={24} />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
