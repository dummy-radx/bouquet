import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, AlertCircle, CheckCircle } from 'lucide-react'

export const LoveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [quizFinished, setQuizFinished] = useState(false)
  const [lovePower, setLovePower] = useState(0)
  const [overload, setOverload] = useState(false)

  const quizQuestions = [
    {
      question: "Where is Ishan's absolute favorite place to be?",
      options: [
        { text: "On a warm sandy beach", correct: false, msg: "Nice place, but not my absolute favorite!" },
        { text: "In a cozy gaming zone", correct: false, msg: "Close, but still not the winner!" },
        { text: "Right next to Sreeparna! 🥰", correct: true, msg: "YES! Anywhere is perfect as long as you're there. ❤" },
        { text: "A peaceful library", correct: false, msg: "A bit too quiet for me!" }
      ]
    },
    {
      question: "What is Sreeparna's super power?",
      options: [
        { text: "Mind reading", correct: false, msg: "She wishes! But nope." },
        { text: "Melting Ishan's heart with a single smile! 🫠", correct: true, msg: "YES! Works instantly, 100% of the time. 💖" },
        { text: "Eating chocolates in record time", correct: false, msg: "She's good at this, but not her superpower!" },
        { text: "Sleeping for 12 hours straight", correct: false, msg: "A very strong contender, but not the answer!" }
      ]
    },
    {
      question: "How much does Ishan love Sreeparna?",
      options: [
        { text: "To the moon and back 🌙", correct: false, msg: "That's way too short of a distance!" },
        { text: "More than all the chocolate in the world", correct: false, msg: "An understatement!" },
        { text: "All of the options combined and times infinity! 💞", correct: true, msg: "Exactly! My love is infinite and beyond measure. 🥰" }
      ]
    }
  ]

  const handleOptionClick = (option) => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    setSelectedOption(null)
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizFinished(true)
    }
  }

  const handleLoveSliderChange = (e) => {
    const val = parseInt(e.target.value, 10)
    setLovePower(val)
    if (val >= 100) {
      setOverload(true)
    } else {
      setOverload(false)
    }
  }

  const getLovePowerText = () => {
    if (lovePower === 0) return 'Drag to charge! 🔋'
    if (lovePower < 30) return 'Warm-up phase... ☕'
    if (lovePower < 60) return 'Cuddles loading... 🧸'
    if (lovePower < 90) return 'Love levels critical! 🔥'
    if (lovePower < 100) return 'Cute explosion imminent! 💣'
    return '10,000% OVERLOAD OF LOVE! 💥❤️'
  }

  return (
    <div className="relative w-full min-h-screen bg-grid-paper py-16 px-4 flex flex-col items-center justify-start overflow-hidden">
      
      {/* Tape decoration */}
      <div className="washi-tape washi-tape-blue w-28 -rotate-6 -left-4 top-10 z-10" />

      {/* Header */}
      <div className="text-center max-w-xl mb-12 z-10">
        <span className="inline-block px-3 py-1 mb-2 rounded-full bg-pink-100 text-pink-600 font-cute text-xs border border-pink-200 shadow-sm">
          Love Sandbox 🎮💖
        </span>
        <h2 className="font-pacifico text-3xl sm:text-4xl text-[#795548] drop-shadow-sm">
          The Sweet Quiz & Love Charger
        </h2>
        <p className="font-handwritten text-xl sm:text-2xl text-stone-600 mt-2">
          Play our mini quiz, and make sure to charge the love meter up to the limit!
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch z-10">
        
        {/* QUIZ BOX (Left) */}
        <div className="bg-[#fffdfa] border-stitch p-6 sm:p-8 shadow-md flex flex-col justify-between min-h-[420px] relative">
          <div className="absolute washi-tape washi-tape-pink w-24 -top-3 left-12" />

          {!quizFinished ? (
            <div className="space-y-6">
              {/* Question Index */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="font-cute text-xs text-stone-400">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <div className="flex gap-1">
                  {quizQuestions.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full ${i <= currentQuestion ? 'bg-pink-400' : 'bg-stone-200'}`} 
                    />
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <h3 className="font-cute text-xl font-bold text-stone-700 leading-snug">
                {quizQuestions[currentQuestion].question}
              </h3>

              {/* Options Grid */}
              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((opt, idx) => {
                  const isSelected = selectedOption === opt
                  let btnStyle = 'border-stone-200 bg-stone-50 hover:bg-stone-100/70 text-stone-600'
                  
                  if (selectedOption) {
                    if (opt.correct) {
                      btnStyle = 'border-green-200 bg-green-50 text-green-700'
                    } else if (isSelected) {
                      btnStyle = 'border-red-200 bg-red-50 text-red-700'
                    } else {
                      btnStyle = 'border-stone-100 bg-stone-50/50 text-stone-300 opacity-60'
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedOption !== null}
                      onClick={() => handleOptionClick(opt)}
                      className={`w-full p-4 rounded-xl border text-left font-cute text-sm font-semibold transition-all flex items-center justify-between select-none ${
                        !selectedOption && 'hover:scale-[1.01] cursor-pointer'
                      } ${btnStyle}`}
                    >
                      <span>{opt.text}</span>
                      {selectedOption && opt.correct && <CheckCircle size={18} className="text-green-500 shrink-0 ml-2" />}
                      {selectedOption && isSelected && !opt.correct && <AlertCircle size={18} className="text-red-500 shrink-0 ml-2" />}
                    </button>
                  )
                })}
              </div>

              {/* Explanation / Result */}
              <AnimatePresence>
                {selectedOption && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-4 rounded-xl font-handwritten text-xl font-semibold border ${
                      selectedOption.correct 
                        ? 'bg-green-50 border-green-100 text-green-700' 
                        : 'bg-red-50 border-red-100 text-red-700'
                    }`}
                  >
                    {selectedOption.msg}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-8 space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                className="text-pink-500"
              >
                <Heart fill="currentColor" size={64} className="animate-pulse" />
              </motion.div>
              <h3 className="font-pacifico text-2xl text-pink-500 select-none">
                You are amazing!
              </h3>
              <p className="font-handwritten text-2xl text-stone-700 leading-relaxed px-4">
                You passed the test with flying colors! But honestly, there was never a doubt—you know exactly how much you mean to me. ✨❤️
              </p>
              <button
                onClick={() => {
                  setQuizFinished(false)
                  setCurrentQuestion(0)
                  setSelectedOption(null)
                }}
                className="px-6 py-2.5 rounded-xl border border-pink-200 text-pink-500 font-cute text-xs font-bold hover:bg-pink-50 cursor-pointer"
              >
                Play Again 🔄
              </button>
            </div>
          )}

          {/* Next Button */}
          {!quizFinished && (
            <div className="mt-6 flex justify-end">
              <button
                disabled={!selectedOption}
                onClick={handleNext}
                className={`px-6 py-2.5 rounded-xl font-cute text-xs font-bold shadow transition-all select-none ${
                  selectedOption
                    ? 'bg-pink-500 text-white hover:bg-pink-600 hover:scale-105 active:scale-95 cursor-pointer'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
                }`}
              >
                {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz 🎉" : "Next Question ➡️"}
              </button>
            </div>
          )}

        </div>

        {/* LOVE CHARGER (Right) */}
        <div className="bg-[#fffdfa] border-stitch p-6 sm:p-8 shadow-md flex flex-col justify-between min-h-[420px] relative">
          <div className="absolute washi-tape washi-tape-yellow w-24 -top-3 left-12" />

          <div className="space-y-6">
            <h3 className="font-cute text-xl font-bold text-stone-700 flex items-center gap-2">
              <Sparkles className="text-yellow-400" size={20} />
              The Love Charger
            </h3>
            
            <p className="font-handwritten text-lg sm:text-xl text-stone-600">
              Drag the heart slider below to charge up the Love Meter! Can you overload the core?
            </p>

            {/* Slider Container */}
            <div className="space-y-4 pt-6">
              <div className="flex justify-between items-center font-cute text-xs text-stone-400">
                <span>0% Empty</span>
                <span>100% Loaded</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={lovePower}
                onChange={handleLoveSliderChange}
                className="w-full h-3 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Progress Heart Bar */}
            <div className="relative h-20 w-full bg-stone-100 rounded-2xl border-2 border-stone-200 overflow-hidden flex items-center justify-center">
              
              {/* Colored charging overlay */}
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-pink-300 to-pink-500 opacity-80"
                style={{ width: `${lovePower}%` }}
              />

              {/* Bubbles / sparkles inside battery */}
              {lovePower > 0 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: Math.floor(lovePower / 10) }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-white"
                      initial={{ 
                        x: Math.random() * 300, 
                        y: 80, 
                        scale: Math.random() * 0.4 + 0.3,
                        opacity: 0.8
                      }}
                      animate={{ 
                        y: -20, 
                        opacity: [0.8, 1, 0] 
                      }}
                      transition={{ 
                        duration: Math.random() * 2 + 1, 
                        repeat: Infinity, 
                        ease: "easeOut" 
                      }}
                    >
                      <Heart fill="currentColor" size={16} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Current Value label */}
              <span className="relative z-10 font-cute text-2xl font-bold text-stone-700 drop-shadow-sm select-none">
                {lovePower}%
              </span>

            </div>

            {/* Cute Status Note */}
            <div className="p-4 rounded-xl bg-pink-50/50 border border-pink-100 flex items-center justify-center min-h-[60px] text-center">
              <span className="font-handwritten text-2xl text-pink-600 font-bold">
                {getLovePowerText()}
              </span>
            </div>

          </div>

          {/* Sparks/Heart Shower overlay on overload */}
          <AnimatePresence>
            {overload && (
              <div className="absolute inset-0 bg-pink-500/10 pointer-events-none flex items-center justify-center">
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-rose-500"
                    initial={{ 
                      x: (Math.random() - 0.5) * 300, 
                      y: 200, 
                      scale: 0.1, 
                      opacity: 1 
                    }}
                    animate={{ 
                      y: -200, 
                      scale: Math.random() * 1.5 + 0.5,
                      opacity: [1, 1, 0],
                      x: (Math.random() - 0.5) * 300 + (Math.sin(i) * 50)
                    }}
                    transition={{ 
                      duration: Math.random() * 2.5 + 1.5, 
                      repeat: Infinity, 
                      delay: Math.random() * 0.5 
                    }}
                  >
                    <Heart fill="currentColor" size={24} />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          <div className="text-center font-cute text-xs text-stone-400">
            Keep dragging to full overload! 🔥
          </div>

        </div>

      </div>
    </div>
  )
}
