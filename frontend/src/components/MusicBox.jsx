import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Play, Square, Heart, Sparkles } from 'lucide-react'

// Procedural audio scheduler for a sweet, cute chime melody
let audioCtx = null;
let synthTimer = null;

const playChimeMelody = (isPlaying, setIsPlaying) => {
  if (!isPlaying) {
    // Start Audio Context
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    setIsPlaying(true);

    // Chime Synth Melody Definition
    // Notes: C Major -> G Major -> A Minor -> F Major arpeggios
    const notes = [
      261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
      293.66, 392.00, 493.88, 587.33, // D4, G4, B4, D5
      220.00, 261.63, 329.63, 440.00, // A3, C4, E4, A4
      174.61, 220.00, 261.63, 349.23  // F3, A3, C4, F4
    ];

    let index = 0;
    const tempo = 220; // ms per note

    const playNote = () => {
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      // Use triangle wave for a soft woodwind/chime feel
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(notes[index], audioCtx.currentTime);

      // Cute filter for extra warmth
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, audioCtx.currentTime);

      // Envelope with soft attack and decay to resemble a music box chime
      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);

      index = (index + 1) % notes.length;
      synthTimer = setTimeout(playNote, tempo);
    };

    playNote();
  } else {
    // Stop Synth
    if (synthTimer) {
      clearTimeout(synthTimer);
      synthTimer = null;
    }
    setIsPlaying(false);
  }
};

export const MusicBox = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLetterOpen, setIsLetterOpen] = useState(false)
  const [confetti, setConfetti] = useState([])
  const [notesFloating, setNotesFloating] = useState([])

  // Cleanup audio timer on unmount
  useEffect(() => {
    return () => {
      if (synthTimer) {
        clearTimeout(synthTimer);
        synthTimer = null;
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
            symbol: ['🎵', '🎶', '✨', '♩', '💖'][Math.floor(Math.random() * 5)]
          }
        ]);
      }, 500);
    } else {
      setNotesFloating([]);
    }
    return () => clearInterval(noteInterval);
  }, [isPlaying]);

  const toggleMusic = () => {
    playChimeMelody(isPlaying, setIsPlaying);
  };

  const triggerConfetti = () => {
    // Spawn tons of hearts all over the screen!
    const newConfetti = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * window.innerWidth,
      y: (Math.random() - 0.5) * window.innerHeight,
      scale: Math.random() * 1.2 + 0.6,
      rotate: Math.random() * 360,
      color: ['text-rose-400', 'text-pink-400', 'text-amber-400', 'text-purple-400'][Math.floor(Math.random() * 4)]
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

              <div className="font-pacifico text-xs text-[#8d6e63]/70">Lullaby Box</div>
            </div>

            <h3 className="font-cute text-lg font-bold text-stone-700 mt-4 select-none">
              Chime Music Box
            </h3>
            <p className="font-handwritten text-lg text-stone-500 mt-1 select-none">
              {isPlaying ? 'Melody is playing softly... 🎶' : 'Click play to start the chime!'}
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
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-14 h-14 rounded-full bg-rose-600/90 flex items-center justify-center text-white shadow-md mx-auto relative z-10"
                  >
                    <Heart fill="currentColor" size={24} />
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
                <div className="absolute washi-tape washi-tape-pink w-24 -top-3 left-1/2 -translate-x-1/2" />

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
                          <Heart fill="currentColor" size={24} />
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
