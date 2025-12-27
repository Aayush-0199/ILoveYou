"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, HeartCrack, Gift, Timer, Quote, Sparkles } from "lucide-react";

// --- Configuration ---
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1453355902966173791/doAy_bp6NrxJowi8U99xFrEYrLpH7VciBcXJKfI35W_wY6_mWjJy_U-Tm8X8ZR-2ddTT";
const BEAR_GIF_SRC = "/milk-and-mocha.gif"; 
const SHY_GIF_SRC = "/milkmocha-shy.gif";

const SECTIONS = [
  { title: "How We Met", content: "Hi Sakshi. I remember how we started talking. At first, it felt normal, but lately, I’ve been thinking about you constantly. This is my final semester, and instead of focusing on projects, I find myself thinking about you every minute of the day. It's not your fault at all—it's just how special you've become to me." },
  { title: "Why I Love You", content: "“Tula tar mahitye, thoda jast pagal jhalay… conversation vadhavnyasathi kahi pan bolto.” I treasure every memory we've made so far. I find myself constantly looking forward to the next time I get to hear you laugh. You have this incredible way of making everything around you brighter just by being there." },
  { title: "What Makes You Special", content: "It’s not just the big moments, but the tiny ones—the way you tilt your head, the way you express your passions, and the kindness you show to everyone around you. You are my favorite person, and being part of your world is the greatest gift I've ever received." },
  { title: "My Promise To You", content: "You are the most beautiful person I've ever known, inside and out. I want to be the reason you smile when you wake up. I don't just want to be a chapter in your story; I want to be the one who walks beside you through every chapter yet to come. My heart is yours, Sakshi." }
];

// --- Sub-Component: Fixed Heart Origin (Bottom Left) ---
const ThrowingHearts = ({ isVisible }: { isVisible: boolean }) => {
  const [hearts, setHearts] = useState<{ id: number; endX: number; endY: number; delay: number; size: number; duration: number }[]>([]);
  
  useEffect(() => {
    if (isVisible) {
      setHearts(Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        endX: Math.random() * 100, 
        endY: Math.random() * 100, 
        delay: Math.random() * 8,
        size: Math.random() * 18 + 12,
        duration: 5 + Math.random() * 5,
      })));
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ bottom: "0%", left: "0%", opacity: 0, scale: 0 }}
          animate={{
            bottom: `${h.endY}%`,
            left: `${h.endX}%`,
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.5, 1.2, 1.2, 0.6],
            rotate: [0, 180, -180, 0]
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "easeOut"
          }}
          className="absolute"
        >
          <Heart fill="#ff8da1" size={h.size} strokeWidth={0} />
        </motion.div>
      ))}
    </div>
  );
};

export default function ProposalPage() {
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState("start");
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [timer, setTimer] = useState(15);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (stage === "countdown" && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (stage === "countdown" && timer === 0) {
      setStage("decision");
    }
  }, [stage, timer]);

  const notifyDiscord = async (choice: string) => {
    if (!DISCORD_WEBHOOK) return;
    try {
      await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `💌 **Sakshi's Update:** **${choice}**` }),
      });
    } catch (e) { console.error(e); }
  };

  if (!mounted) return null;

  // UPDATED: Changed card styles for the pink glow effect
  const cardClass = "bg-[#fff5f7] border border-pink-100 shadow-[0_0_40px_rgba(255,105,180,0.5)]";
  const showHearts = stage === "scrolling" || stage === "countdown" || stage === "decision";

  return (
    // UPDATED: Changed main background to a much lighter pink to match image_1.png
    <main className="relative h-screen w-full bg-[#fff0f5] flex flex-col items-center overflow-hidden select-none">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&family=Lora:italic,wght@0,400;1,400&display=swap');
        .clean-font { font-family: 'Inter', sans-serif; }
        .romantic-text { font-family: 'Lora', serif; }
        .custom-scroll::-webkit-scrollbar { width: 0px; }
        .snap-container {
          scroll-snap-type: y mandatory;
          overflow-y: scroll;
          height: 100vh;
          width: 100%;
          scrollbar-width: none;
        }
        .snap-section {
          scroll-snap-align: center;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
      `}</style>

      {/* Background Hearts */}
      <ThrowingHearts isVisible={showHearts} />

      {/* Static Bear GIF */}
      <AnimatePresence>
        {showHearts && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="fixed bottom-4 left-4 z-50 pointer-events-none"
          >
            <img src={BEAR_GIF_SRC} alt="Bear" className="w-32 h-32 md:w-48 md:h-48 object-contain" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* Stage 1: The Red Heart */}
        {stage === "start" && (
          <motion.div key="start" className="h-screen flex flex-col items-center justify-center z-10 cursor-pointer" onClick={() => setStage("zoom")}>
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <Heart size={150} fill="#ff0000" color="#ff0000" className="drop-shadow-2xl" />
            </motion.div>
            <p className="mt-8 text-red-700 font-black text-2xl tracking-[0.4em] animate-pulse clean-font">CLICK ME</p>
          </motion.div>
        )}

        {/* Stage 2: Heart Zoom Transition */}
        {stage === "zoom" && (
          <motion.div key="zoom" initial={{ scale: 1 }} animate={{ scale: 60, opacity: 0 }} transition={{ duration: 0.8 }} onAnimationComplete={() => setStage("mail")} className="h-screen flex items-center justify-center z-50">
            <Heart size={150} fill="#ff0000" color="#ff0000" />
          </motion.div>
        )}

        {/* STAGE 3: ENVELOPE (Centered) */}
        {stage === "mail" && (
          <motion.div 
            key="mail" 
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-[350px] aspect-[16/10]">
              <div className="absolute inset-0 bg-red-900 rounded-b-xl shadow-2xl z-0" />
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-red-400 origin-top shadow-md rounded-t-sm z-0"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 55%)", backfaceVisibility: "hidden" }}
                animate={{ rotateX: isMailOpen ? 180 : 0 }}
                transition={{ duration: 0.8 }}
                onClick={() => setIsMailOpen(true)}
              />
              <motion.div 
                drag="y" 
                dragConstraints={{ top: -300, bottom: 0 }}
                onDragEnd={(_, info) => { if (info.offset.y < -100) setStage("scrolling"); }}
                className="absolute left-2 right-2 bottom-4 bg-white rounded shadow-md p-6 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-10"
                animate={{ y: isMailOpen ? -140 : 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-2 italic text-center">Drag me up to read</p>
                <div className="h-1 w-12 bg-gray-100 rounded mb-1" />
                <div className="h-1 w-8 bg-gray-100 rounded" />
              </motion.div>
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute inset-0 bg-red-700 rounded-b-xl" style={{ clipPath: "polygon(0 0, 48% 50%, 0 100%)" }} />
                <div className="absolute inset-0 bg-red-700 rounded-b-xl" style={{ clipPath: "polygon(100% 0, 52% 50%, 100% 100%)" }} />
                <div className="absolute inset-0 bg-red-600 rounded-b-xl shadow-inner" style={{ clipPath: "polygon(0 100%, 50% 45%, 100% 100%)" }} />
              </div>
              {!isMailOpen && (
                <div onClick={() => setIsMailOpen(true)} className="absolute inset-0 z-30 flex items-center justify-center text-white/90 font-black text-lg tracking-widest cursor-pointer">TAP TO OPEN</div>
              )}
            </div>
          </motion.div>
        )}

        {/* Stage 4: Scrolling Cards Content */}
        {stage === "scrolling" && (
          <motion.div key="scrolling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="snap-container z-10 custom-scroll">
            <div className="snap-section">
              <div className="flex flex-col items-center text-center gap-8 max-w-2xl">
                <img src={SHY_GIF_SRC} alt="Shy Bear" className="w-48 h-48 object-contain" />
                <h1 className="romantic-text text-3xl md:text-5xl font-bold text-[#7a5c5c] px-6 leading-tight italic">
                  Hi Sakshi.. I wanted to share something with you...
                </h1>
                <motion.div 
                  animate={{ y: [0, 12, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mt-4 flex flex-col items-center gap-2"
                >
                  <p className="clean-font font-bold text-red-400 uppercase tracking-widest text-xs">scroll down to read</p>
                  <div className="w-px h-8 bg-red-300" />
                </motion.div>
              </div>
            </div>

            {SECTIONS.map((sec, i) => (
              <div key={i} className="snap-section">
                <motion.div 
                  initial={{ y: 50, opacity: 0 }} 
                  whileInView={{ y: 0, opacity: 1 }} 
                  viewport={{ once: false, amount: 0.5 }}
                  className={`max-w-2xl w-full p-10 md:p-16 rounded-[2.5rem] relative flex flex-col items-center justify-center ${cardClass}`}
                >
                  {/* Content Container */}
                  <div className="space-y-6 text-center">
                    <h2 className="romantic-text text-xl md:text-2xl font-bold text-[#8b5e5e] uppercase tracking-[0.2em] opacity-80">{sec.title}</h2>
                    <p className="romantic-text text-[#5a4a4a] leading-[1.8] text-lg md:text-2xl italic">
                      {sec.content}
                    </p>
                  </div>

                  {/* Aesthetic Sparkles at Bottom */}
                  <div className="mt-12 flex items-center gap-2">
                     <Sparkles size={16} fill="#fbbf24" className="text-[#fbbf24]" />
                     <Sparkles size={10} fill="#fcd34d" className="text-[#fcd34d]" />
                  </div>
                </motion.div>
              </div>
            ))}

            <div className="snap-section">
              <button 
                onClick={() => setStage("countdown")} 
                className="px-16 py-7 bg-[#ff4d6d] text-white rounded-2xl font-black shadow-2xl hover:scale-105 transition active:scale-95 clean-font text-2xl tracking-wide"
              >
                Continue ➔
              </button>
            </div>
          </motion.div>
        )}

        {/* Stage 5: Countdown */}
        {stage === "countdown" && (
          // UPDATED: BG color
          <motion.div key="countdown" className="fixed inset-0 z-[100] bg-[#fff0f5] flex flex-col items-center justify-center p-8 text-center">
            <h2 className="romantic-text text-2xl md:text-3xl font-bold text-[#5a4a4a] mb-16 max-w-lg italic leading-relaxed px-4">
              "I want you to clearly think one last time before making any decision"
            </h2>
            <div className="relative w-52 h-52 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="104" cy="104" r="90" stroke="white" strokeWidth="12" fill="transparent" opacity="0.2" />
                <motion.circle 
                  cx="104" cy="104" r="90" stroke="#ff4d6d" strokeWidth="12" fill="transparent"
                  strokeDasharray="565" 
                  animate={{ strokeDashoffset: 565 - (565 * timer) / 15 }} 
                  transition={{ duration: 1, ease: "linear" }}
                />
              </svg>
              <span className="text-7xl font-black text-[#ff4d6d] clean-font">{timer}</span>
            </div>
          </motion.div>
        )}

        {/* Stage 6: Final Decision */}
        {stage === "decision" && (
          // UPDATED: BG color
          <motion.div key="decision" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="fixed inset-0 z-[101] flex items-center justify-center p-6 bg-[#fff0f5]">
            <div className={`w-full max-w-md p-10 md:p-14 rounded-[2.5rem] text-center ${cardClass}`}>
              <h1 className="romantic-text text-3xl md:text-4xl font-black text-red-600 mb-3 italic">I Love You Sakshi</h1>
              <p className="romantic-text font-bold text-gray-600 mb-12 italic text-lg">Will you be my partner for life?</p>
              
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-5">
                  <button onClick={() => { setStage("success"); notifyDiscord("YES ❤️"); }} className="py-5 bg-red-500 text-white rounded-3xl font-black shadow-xl hover:bg-red-600 transition active:scale-95 clean-font text-lg">Yes ❤️</button>
                  <button onClick={() => { 
                    const next = noCount + 1; setNoCount(next); notifyDiscord(`NO (${next})`);
                    if (next >= 3) setStage("final-goodbye");
                  }} className="py-5 bg-white/70 text-gray-600 rounded-3xl font-black shadow-md hover:bg-white transition active:scale-95 clean-font text-lg">No...</button>
                </div>
                <button onClick={() => { notifyDiscord("NEED TIME"); setStage("need-time"); }} className="w-full py-5 bg-zinc-900 text-white rounded-3xl font-black flex items-center justify-center gap-3 shadow-2xl active:scale-95 clean-font hover:bg-black transition text-lg">
                  <Timer size={22} /> Need time to decide
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Success Screen */}
        {stage === "success" && (
          <motion.div key="success" className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center text-center p-8">
            <motion.h1 animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity }} className="clean-font text-6xl md:text-7xl font-black text-red-500 mb-10">YAYYY! 🎉</motion.h1>
            <div className={`p-10 md:p-14 rounded-[2.5rem] ${cardClass} max-w-md`}>
              <p className="romantic-text text-2xl md:text-3xl text-gray-800 font-bold mb-12 italic">"You just made me the luckiest person in the world."</p>
              <button onClick={() => setStage("gift")} className="px-16 py-6 bg-black text-white rounded-full font-black shadow-2xl active:scale-95 transition clean-font text-xl">Go Next ➔</button>
            </div>
          </motion.div>
        )}

        {/* Gift Section */}
        {stage === "gift" && (
          // UPDATED: BG color
          <motion.div key="gift" className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#fff0f5]">
            <div className={`w-full max-w-md p-10 md:p-14 rounded-[2.5rem] text-center border-t-[12px] border-red-500 ${cardClass}`}>
              <h3 className="romantic-text text-xl md:text-2xl font-black text-gray-900 mb-10 italic">I have a special gift planned just for you... 🎁</h3>
              <button onClick={() => { notifyDiscord("🎁 GIFT CLAIMED!"); setStage("gift-claimed"); }} className="flex items-center justify-center gap-3 w-full py-6 bg-red-600 text-white rounded-3xl font-black shadow-2xl active:scale-95 transition clean-font text-xl">
                <Gift size={28} /> Receive My Gift
              </button>
            </div>
          </motion.div>
        )}

        {/* Claimed Status */}
        {stage === "gift-claimed" && (
          <motion.div key="claimed" className="fixed inset-0 z-[200] flex items-center justify-center bg-white p-8 text-center">
            <div className="bg-pink-50/50 p-12 md:p-16 rounded-[2.5rem] border border-pink-100 shadow-2xl max-w-md">
              <Heart size={80} className="text-green-500 mx-auto mb-8" fill="currentColor" />
              <h3 className="romantic-text text-3xl md:text-4xl font-black text-gray-900 mb-6 italic">Request Sent!</h3>
              <p className="romantic-text text-gray-600 italic font-bold text-xl md:text-2xl">"Your gift is on its way, Sakshi. ❤️"</p>
            </div>
          </motion.div>
        )}

        {/* Need Time Screen */}
        {stage === "need-time" && (
          // UPDATED: BG color
          <motion.div key="time" className="fixed inset-0 z-[200] bg-[#fff0f5] flex flex-col items-center justify-center p-8 text-center">
            <Timer size={100} className="text-blue-500 mb-10" />
            <p className="romantic-text text-2xl md:text-3xl font-bold italic text-[#5a4a4a] max-w-sm leading-relaxed">"Take all the time you need, Sakshi. I'm right here."</p>
          </motion.div>
        )}

        {/* Final Goodbye Screen */}
        {stage === "final-goodbye" && (
          <motion.div key="bye" className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-8 text-center">
            <HeartCrack size={120} className="text-gray-400 mb-10" />
            <p className="romantic-text text-2xl md:text-3xl font-bold italic text-gray-600 leading-relaxed">"I understand. Goodbye, Sakshi."</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}