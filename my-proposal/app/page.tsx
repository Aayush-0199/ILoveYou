"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, PanInfo } from "framer-motion";
import { Heart, Mail, Lightbulb, Ghost, Frown, Sparkles, Star } from "lucide-react";

// --- Configuration & Content ---
const LETTERS = [
  "Dear Crush, \nYou are so beautiful. Every time I see you, it feels like a dream I never want to wake up from.",
  "I want you to be by my side, holding my hand through everything. You make the ordinary extraordinary.",
  "I've been wanting to tell you this for a long time... You light up my world in ways I can't explain."
];

// --- Components ---

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 100, // Random starting horizontal position
          size: 10 + Math.random() * 25,
          duration: 5 + Math.random() * 5,
        },
      ]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: "110vh", x: `${h.x}vw`, opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.7, 0.7, 0], rotate: 360 }}
          transition={{ duration: h.duration, ease: "linear" }}
          onAnimationComplete={() => setHearts((prev) => prev.filter((item) => item.id !== h.id))}
          style={{ position: "absolute", left: 0 }}
        >
          <Heart fill="#ff8fab" color="#ff8fab" size={h.size} />
        </motion.div>
      ))}
    </div>
  );
};

export default function ProposalPage() {
  const [stage, setStage] = useState("start");
  const [letterIndex, setLetterIndex] = useState(0);
  const [darknessPullCount, setDarknessPullCount] = useState(0);
  const [showRope, setShowRope] = useState(false);
  const [noCount, setNoCount] = useState(0);
  
  const envelopeControls = useAnimation();
  const ropeControl = useAnimation();

  const handleStart = () => {
    setStage("heart-clicked");
    setTimeout(() => setStage("envelope-closed"), 800);
  };

  const handleOpenEnvelope = () => {
    if (stage === "envelope-closed") {
      setStage("envelope-opening");
      setTimeout(() => setStage("letter-peek"), 600);
    }
  };

  const handleLetterDragEnd = (e: any, info: PanInfo) => {
    if (info.offset.y < -60) {
      setStage("reading-transition");
      envelopeControls.start({ y: "120vh", opacity: 0, transition: { duration: 0.8 } });
      setTimeout(() => setStage("reading"), 800);
    }
  }

  useEffect(() => {
    if (stage === "reading" && letterIndex === 1) {
      const timer = setTimeout(() => {
        setStage("darkness");
        setTimeout(() => setShowRope(true), 1000);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [stage, letterIndex]);

  const handleRopePull = (e: any, info: PanInfo) => {
    if (info.offset.y > 60) {
      if (darknessPullCount < 1) {
        setDarknessPullCount(1);
        ropeControl.start({ y: 0 });
      } else {
        setDarknessPullCount(2);
        setShowRope(false);
        setTimeout(() => setStage("reading-resumed"), 2500);
      }
    } else {
      ropeControl.start({ y: 0 });
    }
  };

  return (
    <div className="h-screen w-screen bg-[#ffccd5] overflow-hidden relative flex items-center justify-center font-sans touch-none">
      <FloatingHearts />

      {/* --- Initial Heart --- */}
      <AnimatePresence>
        {stage === "start" && (
          <motion.div 
            className="z-50 text-center cursor-pointer"
            exit={{ scale: 8, opacity: 0, transition: { duration: 0.8 } }}
            onClick={handleStart}
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
              <Heart fill="#ff4d6d" color="#ff4d6d" size={120} />
            </motion.div>
            <p className="mt-4 font-black text-[#ff4d6d] text-2xl tracking-widest uppercase">Click Me</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Envelope --- */}
      <AnimatePresence>
        {(["envelope-closed", "envelope-opening", "letter-peek", "reading-transition"].includes(stage)) && (
          <motion.div className="relative z-40 w-80 h-56" animate={envelopeControls}>
            <div className="absolute inset-0 bg-[#ff85a1] rounded-xl shadow-2xl z-0" />
            
            {/* The Letter */}
            <motion.div
              className="absolute left-6 right-6 bg-white rounded-md shadow-inner p-4 z-10 flex flex-col items-center border border-pink-100 overflow-hidden"
              initial={{ top: 20, height: 160 }}
              animate={stage === "letter-peek" ? { top: -80, height: 240 } : stage === "reading-transition" ? { top: -800 } : { top: 20 }}
              drag={stage === "letter-peek" ? "y" : false}
              dragConstraints={{ top: -400, bottom: 0 }}
              onDragEnd={handleLetterDragEnd}
            >
              {/* FIXED: Pull Up text at the top */}
              {stage === "letter-peek" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-2 flex flex-col items-center">
                  <span className="text-[12px] text-pink-500 font-bold uppercase tracking-tighter">Pull Up ▲</span>
                </motion.div>
              )}
              <div className="mt-8 text-pink-300"><Sparkles size={20} fill="currentColor" /></div>
              <div className="mt-4 space-y-2 w-full px-4">
                <div className="w-full h-1 bg-pink-50 rounded-full" />
                <div className="w-4/5 h-1 bg-pink-50 rounded-full" />
              </div>
            </motion.div>

            {/* Front Pocket */}
            <div className="absolute bottom-0 w-full h-full z-20 overflow-hidden rounded-xl pointer-events-none">
              <div className="absolute bottom-0 w-full h-32 bg-[#ff4d6d]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }} />
              <div className="absolute bottom-0 w-full h-full bg-[#ff758f]" style={{ clipPath: 'polygon(0 100%, 0 0, 50% 50%, 100% 0, 100% 100%)' }} />
            </div>

            {/* Flap */}
            <motion.div 
              className="absolute top-0 w-full h-32 bg-[#ff4d6d] z-30 origin-top cursor-pointer shadow-lg"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              initial={{ rotateX: 0 }}
              animate={stage !== "envelope-closed" ? { rotateX: 180, zIndex: 5 } : { rotateX: 0 }}
              transition={{ duration: 0.6 }}
              onClick={handleOpenEnvelope}
            >
              {stage === "envelope-closed" && (
                <div className="flex justify-center pt-4 text-white/70"><Mail size={40} /></div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Letter Carousel --- */}
      {(stage === "reading" || stage === "reading-resumed") && (
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="z-50 px-6 w-full max-w-sm">
          <div className="bg-white rounded-[40px] shadow-2xl p-8 min-h-[420px] flex flex-col items-center text-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={letterIndex}
                initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
                drag="x" dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -50 && letterIndex < LETTERS.length - 1) setLetterIndex(l => l + 1);
                  if (offset.x > 50 && letterIndex > 0) setLetterIndex(l => l - 1);
                }}
                className="flex flex-col items-center h-full pt-10"
              >
                <div className="bg-pink-50 p-4 rounded-full mb-6">
                    <Heart size={40} fill="#ff4d6d" color="#ff4d6d" />
                </div>
                <p className="text-gray-800 text-xl font-semibold leading-relaxed px-2">"{LETTERS[letterIndex]}"</p>
                <div className="mt-auto pt-10 flex gap-1">
                    {LETTERS.map((_, i) => (
                        <div key={i} className={`h-1.5 w-6 rounded-full ${i === letterIndex ? 'bg-pink-500' : 'bg-pink-100'}`} />
                    ))}
                </div>
                <p className="mt-4 text-pink-300 text-xs font-black uppercase tracking-widest animate-pulse">
                  {letterIndex < LETTERS.length - 1 ? "Swipe Left" : "That's all for now"}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          {letterIndex === LETTERS.length - 1 && (
            <motion.button 
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="w-full mt-6 bg-[#ff4d6d] text-white py-5 rounded-3xl font-black text-xl shadow-xl active:scale-95 transition-transform"
              onClick={() => setStage("proposal")}
            >
              Finish Reading ❤️
            </motion.button>
          )}
        </motion.div>
      )}

      {/* --- Darkness Stage --- */}
      <AnimatePresence>
        {stage === "darkness" && (
          <motion.div className="fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col items-center justify-center p-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {showRope && (
              <motion.div className="absolute top-0 right-10 flex flex-col items-center" initial={{ y: -300 }} animate={{ y: 0 }}>
                <div className="w-1.5 h-48 bg-gray-700 rounded-full" />
                <motion.div 
                  className="w-10 h-10 bg-yellow-500 rounded-full shadow-[0_0_30px_rgba(234,179,8,0.6)] border-4 border-yellow-300 cursor-grab active:scale-110"
                  drag="y" dragConstraints={{ top: 0, bottom: 80 }} onDragEnd={handleRopePull} animate={ropeControl}
                />
              </motion.div>
            )}
            {darknessPullCount === 0 && (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                <Ghost size={100} className="mx-auto mb-8 text-white/20" />
                <h2 className="text-3xl font-black text-white mb-4">It's way too dark...</h2>
                <p className="text-white/40 font-bold">Try to pull the light rope on the right!</p>
              </motion.div>
            )}
            {darknessPullCount === 1 && <p className="text-yellow-400 text-2xl font-black animate-bounce">ALMOST THERE! ONE MORE PULL!</p>}
            {darknessPullCount === 2 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-yellow-400">
                <Lightbulb size={120} fill="currentColor" className="mx-auto mb-8 shadow-yellow-500/50 filter drop-shadow-2xl" />
                <h2 className="text-4xl font-black px-6 leading-tight">"I want you to light up my life like this..."</h2>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Proposal Stage --- */}
      <AnimatePresence>
        {stage === "proposal" && (
          <div className="fixed inset-0 bg-pink-100/40 backdrop-blur-xl z-[110] flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.5, y: 100 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-[50px] p-12 w-full max-w-sm text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-red-400 to-pink-300" />
              <Heart size={80} fill="#ff4d6d" color="#ff4d6d" className="mx-auto mb-8 animate-pulse" />
              <h2 className="text-3xl font-black text-gray-800 mb-10 leading-tight">
                {noCount === 0 ? "Will you be my Valentine?" : noCount === 1 ? "Pretty please? I'll be the best! 🥺" : "Last chance... think about us! ✨"}
              </h2>
              <div className="space-y-4 relative z-10">
                <button 
                  className="w-full bg-[#ff4d6d] text-white py-5 rounded-3xl font-black text-2xl shadow-lg shadow-pink-200 active:scale-95 transition-all flex items-center justify-center gap-3" 
                  onClick={() => setStage("yes")}
                >
                  YES! <Sparkles />
                </button>
                <button 
                  className="w-full bg-gray-50 text-gray-400 py-4 rounded-3xl font-bold text-lg hover:bg-gray-100 transition-colors" 
                  onClick={() => setNoCount(c => Math.min(c + 1, 2))}
                >
                  No
                </button>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-10 -left-10 text-pink-50 opacity-50"><Star size={100} fill="currentColor" /></div>
              <div className="absolute -top-10 -right-10 text-pink-50 opacity-50"><Heart size={100} fill="currentColor" /></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- YES Screen --- */}
      {stage === "yes" && (
        <div className="fixed inset-0 bg-[#ff4d6d] z-[200] flex flex-col items-center justify-center text-white p-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 10, -10, 0] }}>
            <div className="flex justify-center mb-6">
                {[...Array(3)].map((_, i) => (
                    <motion.div key={i} animate={{ y: [0, -20, 0] }} transition={{ delay: i * 0.2, repeat: Infinity }}>
                        <Heart fill="white" color="white" size={40} className="mx-1" />
                    </motion.div>
                ))}
            </div>
            <h1 className="text-6xl font-black mb-6 drop-shadow-lg">YAYYY! ❤️</h1>
            <p className="text-2xl font-bold opacity-90 max-w-xs mx-auto">You just made me the luckiest person! See you soon!</p>
          </motion.div>
          <FloatingHearts />
        </div>
      )}
    </div>
  );
}