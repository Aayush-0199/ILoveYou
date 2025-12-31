"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, HeartCrack, Gift, Timer, Sparkles } from "lucide-react";

// --- Configuration ---
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1453355902966173791/doAy_bp6NrxJowi8U99xFrEYrLpH7VciBcXJKfI35W_wY6_mWjJy_U-Tm8X8ZR-2ddTT";
const BEAR_GIF_SRC = "/milk-and-mocha.gif";
const SHY_GIF_SRC = "/milkmocha-shy.gif";
const BACKGROUND_IMAGE_SRC = "/pink background.jpg";

const SECTIONS = [
  { 
    title: "The Beginning", 
    content: `August 17th 2018...I still remember that day.. It was typical random evening of rainy season.... Wind was blowing its about to rain... I was just playing with my friends....  tu gallery madhe  ubhi hoti tevha tu  mla avaj dila ani vicharla tu tar pratik class madhe hota na... That moment when I saw literally noticed you for the  first time... My hairs started  waving by the wind and I suddenly felt that heart started to beating way too hard   I know it looks filmy and out of the blue... But ya it actually  happened with me... It was the moment love of first site happened with me for you... As nahi hot ki adhi mu tula baghitla ani notice navhata kel.. But this time I actually felt different for you...Since then i pray to god everyday ki kahi pn karun fakt tu disun Jayla pahije... Ani yasathi literally mi ani majhya friends specially Rupesh ne kay kay kelay te amhalach mahit ...` 
  },
  { 
    title: "About the Past", 
    content: `I am not philosopher but let me tell you one thing ki mla mahitiye tula rushi khup aavdaycha, tu tyachyavar true love karaychi and all that things... and now i am not gonna include those things here.. it's your past... but what what i know it he cheated you with his ex,  I  i know that you are scared of being attached to someone again just like you did before. but  Tula mahitiye ithe lokancha udyacha bharosa nasto ani te purn life chi planning karun thevtat.. But we don't have to take life this much seriously And think about past and future just live In today..` 
  },
  { 
    title: "A Second Chance", 
    content: `Mla tujhi hich gosht far avadli ki tu breakup jhalyavar asa vicharach kela nahi ki relationship karel but serious nahi karnar and all that things .. But he as karna 100% right nahiye joparyant tu dusryala chance det nhi topryant tula samajnar nahi and this is the reality...
maybe to dusra chance mi nasel ek main gosht aik.. First of all tar tula mi adhi khup vela sangitlay ki mla tu 8 years pasun khup avadte you are  like childhood crush... But te sod ata... Ghadi ghadi tech tech sangel tar bore hoshil tu...  bagh adhich sangtoy ki he sarva tula impress karnyasathi nahi bolat aahe just telling you what's really true And I know ki he sarva sangitlyawar konatich mulgi impress hot nahi.. But still mhatla tula sangun deto.. Who knows maybe it'll work...` 
  },
  { 
    title: "My Perspective", 
    content: `So, mla pn na he ata che panchat pane avdat nahi... Ki ekach timala 2-3 gf/bf banavun thevle aahet.. Ex sodun geli tar new gf bavel "just to feed my ego" hi sari falugiri aahe...   . I know that your past was very difficult...  Ata he tar obvious aahe ki tu tyane sodlyawar khup radli vaigere asnar... Ani you clearly don't want relationship now... But listen je tujhyasobt jhalay te tar mi change nahi karu shakat ... But one thing I can promise you that je ata  honar aahe i can make it better for you ... Ani I swear  that mi tula kadhich regret nahi hou denar ki tu mla YES bolnyacha decision gheun chuki keli... Ani ajun ek gosht  clear karun deto jar mla literally tujhyasobt timepass ani faltupane karnyasathi relationship karaychi asti na tar jevha tu majhyavar ragavli hoti tevhach message karna sodun dil asta... Because in this generation... Finding another girl to feed ego and all the stuff  is not difficult... But finding a girl who thinks, talks, behaves like you "I mean literally like you sakshi " is like finding the same soul twice in same life... (he chatgpt varun uchallay changla vatla mhanun 😁)` 
  },
  { 
    title: "One Last Request", 
    content: `So after all this things and bak bak  the conclusion is that maybe tujha love ani relationship madhe ata interest nasel rahila... Or bharosa uthun gela asel or you don't like me ...  But until you know truly know me for who I really am... You won't be able to understand me... i hope you will realise this..  All these years... This much praying. Think about it once really I don't deserve at least one chance to prove myself?... It's not a big deal.... As you already  told me all those things i am just taking my last chance.... I'm just telling that let's date casually.. Or let's meet sometimes as friends do. ... get to know me... And then decide kar ki we should stay together or not. . And just imagine if it worked out... Nasel tar breakup karun gheshil but at least there will be no regret  And after saying all this I'm assuming that you've read and understood  each and everything that I've written here... And I am very grateful of you for reading this patiently... After all this at least i am free now... And lucky that I've got chance to tell you the true feelings of mine about you...` 
  },
  { 
    title: "Final Thoughts", 
    content: `This is all I wanted to tell you... Sorry I'm just little bit more emotional jar jast kahi bolla asel tar... And the main purpose of doing all this is to tell you what I feel about you and share my thoughts... So bakich ignore kar karan mla as pn Javascript jast yet nahi..  Jevdhi yete tevdha try kel banvaych...  by The way when  you were telling me that you don't want relationship and all that things in our last conversation... It was the cutest thing I've ever seen... Saying polite after all that... Make me fall in love with you even more that day.. I wanted to tell you all this in person... But kayach karu Shakto....  Though ki itka pn kharab nahi disat ki mla he bolav lagtay.. But still I want you to judge me by my inner and real self baki looks mhanshil tar kashya kashyanchya gfs astat he tar tula sangaychi garaj nahi...` 
  }
];

// NEW BRIGHT COLOR THEME (Vibrant Rose-Red)
const BRIGHT_COLOR = "#ff3366"; 
const BRIGHT_HOVER = "#e02e5a";

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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((h) => (
        <motion.div key={h.id} initial={{ bottom: "0%", left: "0%", opacity: 0, scale: 0 }} animate={{ bottom: `${h.endY}%`, left: `${h.endX}%`, opacity: [0, 0.9, 0.9, 0], scale: [0.5, 1.2, 1.2, 0.6], rotate: [0, 180, -180, 0] }} transition={{ duration: h.duration, repeat: Infinity, delay: h.delay, ease: "easeOut" }} className="absolute">
          {/* Using the bright color for thrown hearts */}
          <Heart fill={BRIGHT_COLOR} size={h.size} strokeWidth={0} />
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

  // Updated card class with brighter border accent
  const cardClass = `bg-white/90 backdrop-blur-md border-2 border-[${BRIGHT_COLOR}]/30 shadow-[0_10px_40px_rgba(0,0,0,0.1)]`;
  const showHearts = ["scrolling", "pre-decision", "countdown", "decision"].includes(stage);
  const showCornerBear = ["scrolling", "pre-decision", "countdown", "decision", "success", "gift", "gift-claimed", "need-time"].includes(stage);

  return (
    <main className="relative h-screen w-full flex flex-col items-center overflow-hidden select-none">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&family=Lora:italic,wght@0,400;1,400&display=swap');
        .clean-font { font-family: 'Inter', sans-serif; }
        .romantic-text { font-family: 'Lora', serif; }
        .snap-container { scroll-snap-type: y mandatory; overflow-y: scroll; height: 100vh; width: 100%; scrollbar-width: none; position: relative; z-index: 20; }
        .snap-section { scroll-snap-align: center; min-height: 100vh; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; }
        .custom-scroll::-webkit-scrollbar { display: none; }
        /* Utility class for the bright text color */
        .text-bright { color: ${BRIGHT_COLOR}; }
        .bg-bright { background-color: ${BRIGHT_COLOR}; }
        .hover-bg-bright-dark:hover { background-color: ${BRIGHT_HOVER}; }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-no-repeat bg-center bg-cover"
          style={{ 
            backgroundImage: `url('${BACKGROUND_IMAGE_SRC}')`,
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-white/10" />
        </div>
      </div>

      <ThrowingHearts isVisible={showHearts} />

      {/* Floating Corner Bear */}
      <AnimatePresence>
        {showCornerBear && (
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="fixed bottom-6 left-6 z-[100] pointer-events-none">
            <img src={BEAR_GIF_SRC} alt="Corner Bear" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {stage === "start" && (
          <motion.div key="start" className="h-screen flex flex-col items-center justify-center z-30 cursor-pointer" onClick={() => setStage("zoom")}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              {/* Bright Heart */}
              <Heart size={150} fill={BRIGHT_COLOR} color={BRIGHT_COLOR} className="drop-shadow-2xl" />
            </motion.div>
            <p className="mt-8 text-bright font-black text-2xl tracking-[0.4em] drop-shadow-sm animate-pulse clean-font">CLICK ME</p>
          </motion.div>
        )}

        {stage === "zoom" && (
          <motion.div key="zoom" initial={{ scale: 1 }} animate={{ scale: 60, opacity: 0 }} transition={{ duration: 0.8 }} onAnimationComplete={() => setStage("mail")} className="h-screen flex items-center justify-center z-50">
            <Heart size={150} fill={BRIGHT_COLOR} color={BRIGHT_COLOR} />
          </motion.div>
        )}

        {stage === "mail" && (
          <motion.div key="mail" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-[350px] aspect-[16/10]">
              {/* Brighter Envelope Colors using arbitrary tailwind values based on BRIGHT_COLOR */}
              <div className="absolute inset-0 bg-[#e02e5a] rounded-b-xl shadow-2xl z-0" />
              <motion.div className="absolute top-0 left-0 w-full h-full bg-[#ff3366] origin-top shadow-md rounded-t-sm z-0" style={{ clipPath: "polygon(0 0, 100% 0, 50% 55%)", backfaceVisibility: "hidden" }} animate={{ rotateX: isMailOpen ? 180 : 0 }} transition={{ duration: 0.8 }} onClick={() => setIsMailOpen(true)} />
              <motion.div drag="y" dragConstraints={{ top: -300, bottom: 0 }} onDragEnd={(_, info) => { if (info.offset.y < -100) setStage("scrolling"); }} className="absolute left-2 right-2 bottom-4 bg-white rounded shadow-md p-6 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-10" animate={{ y: isMailOpen ? -140 : 0 }}>
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-2 italic text-center">Drag me up to read</p>
                <div className="h-1 w-12 bg-gray-100 rounded mb-1" /><div className="h-1 w-8 bg-gray-100 rounded" />
              </motion.div>
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute inset-0 bg-[#ff5c85] rounded-b-xl" style={{ clipPath: "polygon(0 0, 48% 50%, 0 100%)" }} />
                <div className="absolute inset-0 bg-[#ff5c85] rounded-b-xl" style={{ clipPath: "polygon(100% 0, 52% 50%, 100% 100%)" }} />
                <div className="absolute inset-0 bg-[#ff85a3] rounded-b-xl shadow-inner" style={{ clipPath: "polygon(0 100%, 50% 45%, 100% 100%)" }} />
              </div>
              {!isMailOpen && <div onClick={() => setIsMailOpen(true)} className="absolute inset-0 z-30 flex items-center justify-center text-white/90 font-black text-lg tracking-widest cursor-pointer">TAP TO OPEN</div>}
            </div>
          </motion.div>
        )}

        {stage === "scrolling" && (
          <motion.div key="scrolling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="snap-container custom-scroll">
            <div className="snap-section">
              <div className={`flex flex-col items-center text-center gap-6 max-w-2xl p-10 rounded-[3rem] ${cardClass}`}>
                <img src={SHY_GIF_SRC} alt="Shy Bear" className="w-40 h-40 object-contain" />
                <div className="space-y-4 px-6">
                  <h1 className="romantic-text text-5xl md:text-6xl font-black text-bright italic">Hii Sakshi</h1>
                  <p className="romantic-text text-lg md:text-xl text-gray-700 font-medium italic leading-relaxed">
                    I know we've already discussed all these things on chat before... <br/>
                    But still I want you to read seriously with a clear and open mind.
                  </p>
                </div>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-4 flex flex-col items-center gap-2">
                  <p className="clean-font font-bold text-bright uppercase tracking-widest text-[10px] opacity-70">scroll down to continue</p>
                  {/* Bright scroll indicator */}
                  <div className="w-px h-10 bg-bright opacity-70" />
                </motion.div>
              </div>
            </div>

            {SECTIONS.map((sec, i) => (
              <div key={i} className="snap-section">
                <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: false, amount: 0.5 }} className={`max-w-2xl w-full p-10 md:p-14 rounded-[2.5rem] relative flex flex-col items-center justify-center ${cardClass}`}>
                  <h2 className="romantic-text text-lg md:text-xl font-bold text-bright uppercase tracking-[0.2em] mb-6 opacity-80">{sec.title}</h2>
                  <p className="romantic-text text-gray-800 leading-relaxed text-lg md:text-xl italic text-center whitespace-pre-line">{sec.content}</p>
                  <div className="mt-8 flex gap-2"><Sparkles size={16} className="text-bright opacity-60" /></div>
                </motion.div>
              </div>
            ))}

            <div className="snap-section">
              {/* Bright Button */}
              <button onClick={() => setStage("pre-decision")} className="px-16 py-6 bg-bright text-white rounded-2xl font-black shadow-lg hover-bg-bright-dark transition active:scale-95 clean-font text-xl uppercase tracking-widest">Continue ➔</button>
            </div>
          </motion.div>
        )}

        {stage === "pre-decision" && (
          <motion.div key="pre-decision" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[110] flex items-center justify-center p-6 text-center">
            <div className={`w-full max-w-2xl p-10 md:p-14 rounded-[3rem] flex flex-col items-center ${cardClass}`}>
              <p className="romantic-text text-lg md:text-xl text-gray-700 mb-10 leading-relaxed italic">
                "And you know what, that i didn't ever let anyone take over my heart and mind.. as i am only get attracted as usual.. but not this much as it happened with your case.. because i know the reason behind this is not attraction because attraction fades after sometimes but its been 8 years now and i am mature enough now to say its actually love and nothing else..."
              </p>
              
              {/* Bright GO Button */}
              <button 
                onClick={() => setStage("countdown")}
                className="px-20 py-5 bg-bright text-white rounded-full font-black shadow-xl hover-bg-bright-dark transition active:scale-95 clean-font text-2xl uppercase tracking-[0.3em]"
              >
                GO
              </button>
            </div>
          </motion.div>
        )}

        {stage === "countdown" && (
          <motion.div key="countdown" className="fixed inset-0 z-[120] flex flex-col items-center justify-center p-8 text-center">
            <h2 className={`romantic-text text-xl md:text-2xl font-bold text-gray-800 mb-12 max-w-lg italic leading-relaxed p-8 rounded-[2rem] ${cardClass}`}>
              "I want you to think with a calm and clear mind before making your decision"
            </h2>
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                {/* Lighter track for the timer based on bright color */}
                <circle cx="96" cy="96" r="80" stroke={`${BRIGHT_COLOR}33`} strokeWidth="10" fill="transparent" />
                {/* Bright timer progress */}
                <motion.circle cx="96" cy="96" r="80" stroke={BRIGHT_COLOR} strokeWidth="10" fill="transparent" strokeDasharray="502" animate={{ strokeDashoffset: 502 - (502 * timer) / 15 }} transition={{ duration: 1, ease: "linear" }} />
              </svg>
              <span className="text-6xl font-black text-bright clean-font">{timer}</span>
            </div>
          </motion.div>
        )}

        {stage === "decision" && (
          <motion.div key="decision" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="fixed inset-0 z-[130] flex items-center justify-center p-6">
            <div className={`w-full max-w-md p-10 md:p-12 rounded-[3rem] text-center ${cardClass}`}>
              <motion.h1 
                className="romantic-text text-4xl md:text-5xl font-black text-bright mb-12 italic"
              >
                I Love You Sakshi
              </motion.h1>
              
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  {/* Bright YES button */}
                  <button onClick={() => { setStage("success"); notifyDiscord("YES ❤️"); }} className="py-6 bg-bright text-white rounded-2xl font-black shadow-md hover-bg-bright-dark transition active:scale-95 clean-font text-xl uppercase">Yes ❤️</button>
                  <button onClick={() => { const next = noCount + 1; setNoCount(next); notifyDiscord(`NO (${next})`); if (next >= 3) setStage("final-goodbye"); }} className="py-6 bg-gray-100 text-gray-500 rounded-2xl font-black shadow-sm hover:bg-gray-200 transition active:scale-95 clean-font text-xl">No...</button>
                </div>
                <button onClick={() => { notifyDiscord("NEED TIME"); setStage("need-time"); }} className="w-full py-6 bg-zinc-800 text-white rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition clean-font text-lg">
                  <Timer size={22} /> Need time to decide
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {stage === "success" && (
          <motion.div key="success" className="fixed inset-0 z-[200] flex flex-col items-center justify-center text-center p-8">
            <motion.h1 animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity }} className="clean-font text-6xl font-black text-white drop-shadow-xl mb-10">YAYYY! 🎉</motion.h1>
            <div className={`p-10 rounded-[2.5rem] ${cardClass} max-w-md`}>
              <p className="romantic-text text-2xl text-gray-800 font-bold mb-10 italic">"You just made me the luckiest person in the world."</p>
              {/* Bright Next Button */}
              <button onClick={() => setStage("gift")} className="px-16 py-5 bg-bright text-white rounded-full font-black shadow-lg active:scale-95 transition clean-font">Go Next ➔</button>
            </div>
          </motion.div>
        )}

        {stage === "gift" && (
          <motion.div key="gift" className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            {/* Bright border accent */}
            <div className={`w-full max-w-md p-12 rounded-[2.5rem] text-center border-t-[12px] border-[${BRIGHT_COLOR}] ${cardClass}`}>
              <h3 className="romantic-text text-xl font-black text-gray-800 mb-10 italic">I have a special gift planned just for you... 🎁</h3>
              {/* Bright Receive Gift Button */}
              <button onClick={() => { notifyDiscord("🎁 GIFT CLAIMED!"); setStage("gift-claimed"); }} className="flex items-center justify-center gap-3 w-full py-6 bg-bright text-white rounded-2xl font-black shadow-lg active:scale-95 transition clean-font">
                <Gift size={24} /> Receive My Gift
              </button>
            </div>
          </motion.div>
        )}

        {stage === "gift-claimed" && (
          <motion.div key="claimed" className="fixed inset-0 z-[200] flex items-center justify-center p-8 text-center">
            <div className={`p-12 rounded-[2.5rem] max-w-md ${cardClass}`}>
              {/* Bright Heart Icon */}
              <Heart size={60} className="text-bright mx-auto mb-6 animate-bounce" fill="currentColor" />
              <h3 className="romantic-text text-3xl font-black text-gray-800 mb-4 italic">Request Sent!</h3>
              <p className="romantic-text text-gray-700 italic font-bold text-xl">"Your gift is on its way, Sakshi. ❤️"</p>
            </div>
          </motion.div>
        )}

        {stage === "need-time" && (
          <motion.div key="time" className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-8 text-center">
            <div className={`p-12 rounded-3xl ${cardClass}`}>
               {/* Bright Timer Icon */}
               <Timer size={80} className="text-bright mb-8 mx-auto" />
               <p className="romantic-text text-2xl font-bold italic text-gray-800 max-w-sm">"Take all the time you need, Sakshi. I'm right here."</p>
            </div>
          </motion.div>
        )}

        {stage === "final-goodbye" && (
          <motion.div key="bye" className="fixed inset-0 z-[200] bg-white/60 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center">
            <HeartCrack size={100} className="text-gray-400 mb-8" />
            <p className="romantic-text text-2xl font-bold italic text-gray-800">"I understand. Goodbye, Sakshi."</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}