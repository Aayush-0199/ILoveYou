"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Stars, Frown, MousePointer2, Sparkles } from 'lucide-react';

// --- CONFIGURATION ---
const PINK_GRADIENT = "bg-gradient-to-br from-rose-100 via-pink-200 to-rose-300";
const ACCENT_ROSE = "#be123c"; 
const DISCORD_WEBHOOK_URL = "YOUR_DISCORD_WEBHOOK_URL_HERE"; 

const galleryItems = [
  { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600", line: "The way you smile makes my heart skip a beat... 😉" },
  { url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600", line: "Are you a magician? Because whenever I look at you, everything else disappears." },
  { url: "https://images.unsplash.com/photo-1516589174184-c6848b11674c?w=600", line: "I'm not a photographer, but I can definitely picture us together." },
  { url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=600", line: "I realized my favorite place to be is wherever you are." },
];

type AppState = 'landing' | 'envelope' | 'gallery' | 'propose_trick' | 'propose_real' | 'propose_retry1' | 'propose_retry2' | 'accepted' | 'rejected';

export default function ProposalSite() {
  const [state, setState] = useState<AppState>('landing');
  const [envStep, setEnvStep] = useState<'closed' | 'open' | 'peek' | 'fan' | 'back'>('closed');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const sendNotification = async (msg: string) => {
    if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL.includes("YOUR")) return;
    try { await fetch(DISCORD_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: `💌 Sakshi Update: ${msg}` }) }); } catch (e) {}
  };

  // --- THE COMPLEX ENVELOPE SEQUENCE ---
  const startEnvelopeSequence = async () => {
    sendNotification("Started the letter sequence! ✉️");
    setEnvStep('open'); // Step 1: Open Lid
    
    setTimeout(() => setEnvStep('peek'), 800);  // Step 2: First pic peeks
    setTimeout(() => setEnvStep('fan'), 1800); // Step 3: Cards fan out like a hand
    setTimeout(() => setEnvStep('back'), 3200); // Step 4: Cards hide back behind first pic
    
    setTimeout(() => {
        setState('gallery'); // Step 5: Launch Gallery (Envelope drops, pics center)
    }, 4000);
  };

  if (!isMounted) return null;

  return (
    <main className={`h-[100dvh] w-full relative flex items-center justify-center overflow-hidden ${PINK_GRADIENT} font-sans`}>
      
      {/* BACKGROUND (Z-0) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <FloatingHearts />
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        
        {/* STAGE 1: PERFECTLY ALIGNED LANDING HEART */}
        {state === 'landing' && (
          <motion.div 
            key="landing"
            exit={{ scale: 120, opacity: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
            className="cursor-pointer flex flex-col items-center justify-center"
            onClick={() => setState('envelope')}
          >
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="relative flex items-center justify-center will-change-transform"
            >
              <Heart size={260} fill={ACCENT_ROSE} stroke="white" strokeWidth={1} className="drop-shadow-2xl" />
              {/* Adjusted positioning for perfect optical center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white select-none pb-2">
                <span className="text-xl font-medium tracking-[0.2em] uppercase opacity-90">Click me</span>
                <span className="text-5xl font-black uppercase tracking-tighter leading-none"></span>
              </div>
            </motion.div>
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-8 flex items-center gap-2 text-rose-700 font-bold uppercase text-xs tracking-widest">
              <MousePointer2 size={16} /> 
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 2: THE ENVELOPE & THE CARD FANNING */}
        {state === 'envelope' && (
          <motion.div 
            key="envelope"
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            exit={{ y: 800, transition: { duration: 0.8, ease: "circIn" } }} // Envelope goes DOWN
            className="relative flex flex-col items-center"
          >
            <h2 className="text-rose-800 font-bold tracking-[0.3em] uppercase text-[10px] mb-20 bg-white/30 px-4 py-1 rounded-full">For your eyes only</h2>
            
            <div className="relative w-80 h-52 transition-all" onClick={envStep === 'closed' ? startEnvelopeSequence : undefined}>
              
              {/* THE CARD DECK (Inside Envelope) */}
              {['fan', 'peek', 'back'].includes(envStep) && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-40 z-10">
                   {galleryItems.map((item, i) => (
                     <motion.div
                        key={i}
                        initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
                        animate={{ 
                          opacity: 1,
                          y: (envStep === 'peek' || envStep === 'fan' || envStep === 'back') ? -45 : 0,
                          // FANNING LOGIC:
                          x: envStep === 'fan' ? (i - 1.5) * 45 : 0,
                          rotate: envStep === 'fan' ? (i - 1.5) * 12 : 0,
                        }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 100, 
                            damping: 15, 
                            delay: envStep === 'fan' ? i * 0.1 : 0 
                        }}
                        className="absolute inset-0 bg-white border-4 border-white shadow-lg rounded-lg overflow-hidden"
                     >
                        <img src={item.url} className="w-full h-full object-cover" alt="mem" />
                     </motion.div>
                   ))}
                </div>
              )}

              {/* ENVELOPE BODY */}
              <div className="absolute inset-0 bg-rose-50 shadow-2xl rounded-xl z-20 border-b-4 border-rose-200"></div>
              
              {/* ENVELOPE INNER CLIP */}
              <div className="absolute inset-0 bg-white shadow-inner z-20 rounded-xl" style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 100%, 100% 0, 50% 50%)' }}></div>

              {/* ENVELOPE TOP FLAP */}
              <motion.div 
                animate={{ rotateX: envStep !== 'closed' ? -180 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 left-0 w-full h-1/2 bg-rose-100 origin-top z-30 shadow-sm"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden' }}
              />

              {envStep === 'closed' && (
                <div className="absolute inset-0 flex items-center justify-center z-40">
                  <div className="w-14 h-14 bg-rose-600 rounded-full flex items-center justify-center shadow-xl text-white animate-bounce cursor-pointer">
                    <Mail size={28} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* STAGE 3: GALLERY (Slides in as Envelope drops) */}
        {state === 'gallery' && (
          <motion.div 
            key="gallery"
            initial={{ y: -500, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="w-full h-full flex flex-col items-center justify-center p-6 gap-8"
          >
            <div className="flex gap-2 mb-2">
              {galleryItems.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= galleryIndex ? 'w-12 bg-rose-600' : 'w-2 bg-rose-200'}`} />
              ))}
            </div>
            <div className="relative w-full max-w-[340px] aspect-[4/5] perspective-1000">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={galleryIndex}
                  initial={{ x: 400, rotate: 15, opacity: 0 }}
                  animate={{ x: 0, rotate: 0, opacity: 1 }}
                  exit={{ x: -400, rotate: -15, opacity: 0 }}
                  drag="x" dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => { if (info.offset.x < -50) { 
                    if (galleryIndex < galleryItems.length - 1) setGalleryIndex(v => v + 1);
                    else setState('propose_trick');
                  }}}
                  className="absolute inset-0 bg-white p-3 pb-20 shadow-2xl rounded-2xl flex flex-col gap-4 border border-rose-100 cursor-grab active:cursor-grabbing"
                >
                  <div className="w-full h-full overflow-hidden rounded-xl">
                    <img src={galleryItems[galleryIndex].url} className="w-full h-full object-cover" alt="mem" />
                  </div>
                  <p className="text-rose-950 font-medium text-xl leading-tight text-center italic px-4">"{galleryItems[galleryIndex].line}"</p>
                  <div className="absolute bottom-6 w-full flex justify-center left-0 text-rose-300 text-[10px] font-bold tracking-[0.3em] uppercase animate-pulse">Swipe left</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* STAGE 4: THE PROPOSAL (SIDE BY SIDE BUTTONS) */}
        {(state.startsWith('propose')) && (
           <motion.div
             key={state}
             initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
             className="z-50 w-[92%] max-w-md bg-white/60 backdrop-blur-2xl border border-white/80 p-10 rounded-[3rem] text-center shadow-2xl"
           >
             <Sparkles className="mx-auto mb-4 text-rose-500" size={32} />
             <h2 className="text-4xl font-black text-rose-900 mb-6">Sakshi,</h2>
             <p className="text-rose-900/80 mb-10 text-lg font-semibold leading-relaxed">
               {state === 'propose_trick' && "I have one final question... but first, you must agree to be happy with me forever? 😉"}
               {state === 'propose_real' && "Will you be the one I share my life with? Will you be mine?"}
               {state === 'propose_retry1' && "Please... give us at least one chance together. I know we can be beautiful. 🥺"}
               {state === 'propose_retry2' && "This is the final chance. Think once before clicking. You mean the world to me. ❤️"}
             </p>
             <div className="flex flex-row gap-4 w-full">
                <button 
                  onClick={() => { setState('accepted'); sendNotification("SHE SAID YES! 🎉"); }}
                  className="flex-1 bg-rose-600 text-white py-4 rounded-2xl text-lg font-bold shadow-xl active:scale-95 transition-transform"
                >
                  YES! ❤️
                </button>
                <button 
                  onClick={() => {
                    if (state === 'propose_trick') { setState('propose_real'); sendNotification("Agreed to be happy! 🎉"); }
                    else if (state === 'propose_real') { setState('propose_retry1'); sendNotification("Clicked No #1"); }
                    else if (state === 'propose_retry1') { setState('propose_retry2'); sendNotification("Clicked No #2"); }
                    else { setState('rejected'); sendNotification("Final No 💔"); }
                  }}
                  className={`flex-1 py-4 rounded-2xl font-bold transition-all border border-white/60 active:scale-95
                    ${state === 'propose_trick' ? 'bg-rose-600 text-white' : 'bg-white/40 text-rose-900/40'}`}
                >
                  {state === 'propose_trick' ? "YES! 😍" : "No"}
                </button>
             </div>
             {state === 'propose_trick' && <div className="mt-4 text-rose-400 font-bold uppercase text-[9px] tracking-widest">Select your answer</div>}
           </motion.div>
        )}

        {/* RESULTS */}
        {state === 'accepted' && (
          <motion.div key="yes" initial={{ scale: 0 }} animate={{ scale: 1, transition: { type: 'spring', bounce: 0.5 } }} className="text-center z-50 p-8">
            <Stars size={120} className="text-rose-600 mx-auto mb-6" fill="currentColor" />
            <h1 className="text-6xl font-black text-rose-950 mb-6">Forever! ❤️</h1>
            <p className="text-2xl text-rose-800 font-medium max-w-sm mx-auto leading-relaxed italic">
              "I love you more than words can express. Thank you for making me the luckiest person."
            </p>
          </motion.div>
        )}

        {state === 'rejected' && (
          <motion.div key="no" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-50 p-8 text-rose-950/40">
            <Frown size={100} className="mx-auto mb-6" strokeWidth={1} />
            <h1 className="text-2xl font-medium italic leading-relaxed">"Sometimes silence is an answer too. I'll always value our memories."</h1>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </main>
  );
}

function FloatingHearts() {
  const hearts = useMemo(() => [...Array(18)].map((_, i) => ({
    id: i, left: `${Math.random() * 100}%`, size: 20 + Math.random() * 30, duration: 20 + Math.random() * 10, delay: Math.random() * 10
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {hearts.map(h => (
        <motion.div
          key={h.id} className="absolute text-rose-400/40"
          initial={{ y: "110vh", x: h.left }} animate={{ y: "-10vh" }}
          transition={{ duration: h.duration, repeat: Infinity, ease: "linear", delay: h.delay }}
        >
          <Heart fill="currentColor" size={h.size} />
        </motion.div>
      ))}
    </div>
  );
}