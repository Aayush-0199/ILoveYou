"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronUp, Download, HeartCrack } from "lucide-react";

// --- Configuration ---
const DISCORD_WEBHOOK = "YOUR_DISCORD_WEBHOOK_URL";

const LETTERS = [
  // SLIDE 1
  "Hi Sakshi. I wanted to give this to you on 8th February. but there is very specific reason behind giving you this today on 31st of December. So, We’ve been talking for the last few weeks, and I don’t know when it started, but I’ve been thinking about you constantly. At first, I didn’t see it as a big problem—it felt normal. But then my vacations ended, and it’s been almost two weeks since my college started. This is my final semester, so my focus should be on projects and studies. That’s what I should be thinking about. But instead, I’m still thinking about you—every minute of the day—so much that I genuinely can’t focus on my studies anymore. And just to be clear, this is not your fault at all.\n\n“Tula tar mahitye, thoda jast pagal jhalay… conversation vadhavnyasathi kahi pan bolto.”\n\nSo instead of saying all this on chat, I decided to create this and tell you everything I’ve been wanting to say. I know you might think this is a little cringe, but this is all I can do for now, because this is the only way I can express what I feel. I can’t really say these things on chat, and doing it in person—tar karuch shakat nahi... ghabartoch itka mi tula 😁.",
  
  // SLIDE 2
  "I treasure every memory we've made so far, and I find myself constantly looking forward to the next time I get to hear you laugh. You have this incredible way of making everything around you brighter just by being there. It’s not just the big moments, but the tiny ones—the way you tilt your head, the way you express your passions, and the kindness you show to everyone around you. You are my favorite person, and being part of your world is the greatest gift I've ever received.",
  
  // SLIDE 3
  "You are the most beautiful person I've ever known, inside and out. Your kindness, your strength, and your soul are things I treasure more than words can express. Today, I want to stop holding these feelings inside and finally ask you the question that's been in my heart for so long. I don't just want to be a chapter in your story; I want to be the one who walks beside you through every chapter yet to come. My heart is yours, Sakshi."
];

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; x: string; delay: number; size: number }[]>([]);
  useEffect(() => {
    setHearts(Array.from({ length: 15 }).map((_, i) => ({
      id: i, x: `${Math.random() * 100}vw`, delay: Math.random() * 5, size: Math.random() * 20 + 10,
    })));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div key={h.id} initial={{ y: "110vh", x: h.x, opacity: 0 }} animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: h.delay, ease: "linear" }} className="absolute text-red-300/30">
          <Heart fill="currentColor" size={h.size} />
        </motion.div>
      ))}
    </div>
  );
};

export default function ProposalPage() {
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState("start"); 
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => { setMounted(true); }, []);

  const notifyDiscord = async (choice: string) => {
    if (!DISCORD_WEBHOOK.includes("discord.com")) return;
    try {
      await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `💌 **Sakshi's Response:** **${choice}**` }),
      });
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    if (stage === "pre-proposal" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [stage, countdown]);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen w-full bg-[#fff0f3] flex flex-col items-center justify-center overflow-hidden select-none p-4">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
        .romantic-font { font-family: 'Lora', serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #fecaca; border-radius: 10px; }
        .letter-content { text-align: justify; text-justify: inter-word; white-space: pre-line; }
      `}</style>

      <FloatingHearts />

      <AnimatePresence mode="wait">
        {stage === "start" && (
          <motion.div key="start" className="z-10 flex flex-col items-center cursor-pointer" onClick={() => setStage("zoom")}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <Heart size={140} fill="#ff0000" color="#ff0000" />
            </motion.div>
            <p className="mt-6 text-red-600 font-bold text-2xl tracking-widest animate-pulse">CLICK ME</p>
          </motion.div>
        )}

        {stage === "zoom" && (
          <motion.div key="zoom" initial={{ scale: 1 }} animate={{ scale: 25, opacity: 0 }} transition={{ duration: 0.8 }}
            onAnimationComplete={() => setStage("mail")} className="z-50">
            <Heart size={140} fill="#ff0000" color="#ff0000" />
          </motion.div>
        )}

        {stage === "mail" && (
          <motion.div key="mail" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 flex flex-col items-center w-full max-w-sm">
            <div className="relative w-full aspect-[16/10] max-w-[320px]">
              <div className="absolute inset-0 bg-red-800 rounded-b-xl shadow-2xl z-0" />
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-red-400 origin-top shadow-md rounded-t-sm z-0"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 55%)", backfaceVisibility: "hidden" }}
                animate={{ rotateX: isMailOpen ? 180 : 0 }}
                transition={{ duration: 0.8 }}
                onClick={() => setIsMailOpen(true)}
              />
              <motion.div 
                drag="y" dragConstraints={{ top: -300, bottom: 0 }}
                onDragEnd={(_, info) => { if (info.offset.y < -100) setStage("reading"); }}
                className="absolute left-2 right-2 bottom-4 bg-white rounded shadow-md p-6 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-10"
                animate={{ y: isMailOpen ? -120 : 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-2 italic text-center">Drag me out</p>
                <div className="h-1 w-12 bg-gray-100 rounded mb-1" />
                <div className="h-1 w-8 bg-gray-100 rounded" />
              </motion.div>
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute inset-0 bg-red-600 rounded-b-xl" style={{ clipPath: "polygon(0 0, 48% 50%, 0 100%)" }} />
                <div className="absolute inset-0 bg-red-600 rounded-b-xl" style={{ clipPath: "polygon(100% 0, 52% 50%, 100% 100%)" }} />
                <div className="absolute inset-0 bg-red-500 rounded-b-xl shadow-inner" style={{ clipPath: "polygon(0 100%, 50% 45%, 100% 100%)" }} />
              </div>
              {!isMailOpen && (
                <div onClick={() => setIsMailOpen(true)} className="absolute inset-0 z-30 flex items-center justify-center text-white/90 font-black text-lg tracking-widest cursor-pointer">TAP TO OPEN</div>
              )}
            </div>
          </motion.div>
        )}

        {stage === "reading" && (
          <motion.div key="reading" initial={{ y: 600 }} animate={{ y: 0 }} exit={{ y: -800 }}
            className="z-30 w-full max-w-[360px] h-[620px] bg-white rounded-[2.5rem] shadow-2xl p-8 flex flex-col justify-between border-t-[12px] border-red-500 relative"
          >
            <div className="flex-1 overflow-y-auto pt-4 px-2 custom-scrollbar">
              <p className="romantic-font letter-content text-gray-700 text-[13.5px] leading-[1.8] italic font-medium">
                {LETTERS[currentLetterIdx]}
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4 mt-6 bg-white pt-2">
              {currentLetterIdx < 2 ? (
                <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => { 
                    if (info.offset.x < -40) {
                      if (currentLetterIdx === 0) setStage("popup1");
                      else setCurrentLetterIdx(currentLetterIdx + 1);
                    }
                  }}
                  className="w-full py-4 bg-red-50 rounded-2xl text-center text-red-500 text-[11px] font-bold border-2 border-dashed border-red-100 cursor-pointer"
                > Swipe Left for Next ➔ </motion.div>
              ) : (
                <button onClick={() => setStage("pre-proposal")} className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition">Done Reading</button>
              )}
            </div>
          </motion.div>
        )}

        {stage === "popup1" && (
          <motion.div key="p1" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="z-50 bg-white p-8 rounded-3xl shadow-2xl text-center max-w-[300px]">
            <p className="text-lg font-bold text-gray-800 mb-6">samajla ki translate karu ?</p>
            <div className="flex gap-4">
              <button onClick={() => setStage("popup2")} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold">Yes!</button>
              <button onClick={() => { setCurrentLetterIdx(1); setStage("reading"); }} className="flex-1 py-3 bg-gray-100 text-gray-400 rounded-xl">No, Continue </button>
            </div>
          </motion.div>
        )}

        {stage === "popup2" && (
          <motion.div key="p2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="z-50 bg-white p-8 rounded-3xl shadow-2xl text-center max-w-[300px]">
            <p className="text-gray-800 font-medium mb-6">Gupchap english madhech vach... jast exagerrate kel ki raag yeto tula 🙂</p>
            <button onClick={() => { setCurrentLetterIdx(1); setStage("reading"); }} className="w-full py-3 bg-black text-white rounded-xl font-bold">Okay 🙄</button>
          </motion.div>
        )}

        {stage === "pre-proposal" && (
          <motion.div key="pre-prop" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="z-50 bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-[360px] border-b-[10px] border-red-500">
             <p className="text-gray-800 font-bold text-lg italic px-2 mb-8 leading-relaxed">
               "I want you to think seriously before making any decision and clicking on any option... so take a deep breath, relax and be ready."
             </p>

             <div className="relative w-44 h-44 flex items-center justify-center mb-8 mx-auto">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="88" cy="88" r="75" stroke="#fecaca" strokeWidth="10" fill="transparent" />
                  <motion.circle cx="88" cy="88" r="75" stroke="#ef4444" strokeWidth="10" fill="transparent"
                    strokeDasharray="472" animate={{ strokeDashoffset: 472 - (472 * countdown) / 15 }}
                    transition={{ duration: 1, ease: "linear" }}
                  />
                </svg>
                <span className="text-6xl font-black text-red-600">{countdown}</span>
             </div>

             <AnimatePresence mode="wait">
               {countdown === 0 ? (
                 <motion.button key="btn-ready" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    onClick={() => setStage("proposal")} 
                    className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all"
                 >
                   I'm Ready
                 </motion.button>
               ) : (
                 <motion.p key="wait-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 font-bold animate-pulse uppercase tracking-tighter">Just Breathe...</motion.p>
               )}
             </AnimatePresence>
          </motion.div>
        )}

        {stage === "proposal" && (
          <motion.div key={`sakshi-${noCount}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="z-40 w-full max-w-[340px] bg-white rounded-[3rem] p-12 shadow-2xl text-center border-4 border-red-50"
          >
            <h1 className="text-3xl font-black text-red-600 mb-4 leading-none">I Love You Sakshi</h1>
            <h2 className="text-lg font-bold text-gray-800 mb-10 uppercase tracking-tight leading-snug">
              {noCount === 0 ? "Will you be my partner for life?" : noCount === 1 ? "Please don't do this 😢" : "Think one last time..."}
            </h2>
            <div className="flex flex-col gap-4">
              <button onClick={() => { setStage("success"); notifyDiscord("YES (Accepted)"); }}
                className="w-full py-6 bg-gradient-to-r from-red-600 to-red-400 text-white rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition">YES! ❤️</button>
              <button onClick={() => { 
                const next = noCount + 1; setNoCount(next); notifyDiscord(`NO (Attempt ${next})`);
                if (next >= 3) setStage("final-goodbye");
              }} className="w-full py-2 text-gray-300 font-semibold text-xs">No...</button>
            </div>
          </motion.div>
        )}

{stage === "final-goodbye" && (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }} 
    animate={{ opacity: 1, scale: 1 }} 
    className="z-40 text-center p-10 bg-white rounded-[2.5rem] max-w-[320px] shadow-2xl border-b-8 border-gray-100"
  >
     <motion.div 
       animate={{ x: [-1, 1, -1], rotate: [-2, 2, -2] }} 
       transition={{ repeat: Infinity, duration: 0.5 }}
       className="mb-6 flex justify-center"
     >
       <HeartCrack size={80} className="text-red-600" fill="#fee2e2" />
     </motion.div>
     
     <p className="text-gray-600 italic romantic-font text-lg leading-relaxed px-2">
       "I understand, We Can't force anyone to love us back.. Thank You For Coming Into My Life Even For These 1-2 months.. And making Those Days Beautiful  ."
     </p>
  </motion.div>
)}

        {stage === "success" && (
          <motion.div key="success" className="z-40 text-center p-8 flex flex-col items-center">
             <motion.h1 animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="text-7xl font-black text-red-600 mb-6 drop-shadow-lg">YAYYY! 🎉</motion.h1>
             <p className="text-2xl text-gray-700 font-bold mb-10 italic romantic-font">"You just made me the luckiest person in the world."</p>
             <button onClick={() => setStage("gift")} className="px-12 py-5 bg-black text-white rounded-full font-bold shadow-2xl">Go Next ➔</button>
          </motion.div>
        )}

        {stage === "gift" && (
          <motion.div key="gift" className="z-40 w-full max-w-[350px] bg-white rounded-[2.5rem] p-10 shadow-2xl text-center border-t-8 border-black">
             <h3 className="text-xl font-black text-gray-800 mb-6 leading-tight">I Have Something for you,You may not like this or may be..  .</h3>
             <p className="text-gray-600 text-sm mb-10 italic leading-relaxed romantic-font">Bas fakt he baghitlyavar  majhyavar case nko karu ani ghari nko yeu fakt marayla mhanje jhal.. 🙂.</p>
             <button onClick={() => { ["/photo1.jpg", "/photo2.jpg"].forEach((url, i) => { const a = document.createElement("a"); a.href = url; a.download = `Memories_${i+1}.jpg`; a.click(); }); }}
                className="flex items-center justify-center gap-3 w-full py-6 bg-red-600 text-white rounded-2xl font-bold shadow-xl">
                <Download size={24} /> Download Now
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}