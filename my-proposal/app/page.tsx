"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, HeartCrack, Gift, Timer, Sparkles, ChevronDown, Check, ArrowRight } from "lucide-react";

// --- Configuration ---
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1453355902966173791/doAy_bp6NrxJowi8U99xFrEYrLpH7VciBcXJKfI35W_wY6_mWjJy_U-Tm8X8ZR-2ddTT";
const BEAR_GIF_SRC = "/milk-and-mocha.gif";
const SHY_GIF_SRC = "/milkmocha-shy.gif";
const BACKGROUND_IMAGE_SRC = "/pink background.jpg";
const BRIGHT_RED = "#ff0000"; 
const BRIGHT_HOVER = "#cc0000";

const SECTIONS = [
  { 
    content: `August 17th 2018...I still remember that day.. It was typical random evening of rainy season.... Wind was blowing its about to rain... I was just playing with my friends....  tu gallery madhe  ubhi hoti tevha  and i think tu  mla avaj dila ani vicharla tu tar pratik class madhe hota na... and That was the exact  moment when My hairs started waving in the wind and I suddenly felt that heart started to beating way too hard   I know it looks filmy and out of the blue... But yes it actually  happened with me... It was the moment love of first site happened with me for you... And I completely fell in love with you.  As nahi hot ki adhi mu tula baghitla ani notice navhata kel.. But this time I actually felt different for you... Since then i pray to god everyday ki kahi pn karun fakt tu disun Jayla pahije... Ani yasathi literally mi ani majhya friends specially Rupesh ne kay kay kelay te amhalach mahit ...` 
  },
  { 
    content: `I am not philosopher but let me tell you one thing ki mla mahitiye tula rushi khup aavdaycha, tu tyachyavar true love karaychi and all that things... and now i am not gonna include those things here.. it's your past... but what what i know it he cheated you with his ex,  I  i know that you are scared of being attached to someone again just like you did before. but  Tula mahitiye ithe lokancha udyacha bharosa nasto ani te purn life chi planning karun thevtat.. But we don't have to take life this much seriously And think about past and future just live In today..` 
  },
  { 
    content: `Mla tujhi hich gosht far avadli ki tu breakup jhalyavar asa vicharach kela nahi ki relationship karel but serious nahi karnar and all that things .. But he as karna 100% right nahiye joparyant tu dusryala chance det nhi topryant tula samajnar nahi and this is the reality...
maybe to dusra chance mi nasel ek main gosht aik.. First of all tar tula mi adhi khup vela sangitlay ki mla tu 8 years pasun khup avadte you are  like childhood crush... But te sod ata... Ghadi ghadi tech tech sangel tar bore hoshil tu...  bagh adhich sangtoy ki he sarva tula impress karnyasathi nahi bolat aahe just telling you what's really true And I know ki he sarva sangitlyawar konatich mulgi impress hot nahi..  ani i also know ki "Mard ko kabhi uska pehla pyaar nahi milta "But still mhatla tula sangun deto.. Who knows maybe it'll work...` 
  },
  { 
    content: `So, mla na literally he atache panchat pane avdat nahi... Ki ekach timala 2-3 gf/bf banavun thevle aahet.. Ex sodun geli tar new gf bavel "just to feed my ego" hi sari falugiri aahe... ata che 13-14 years che mul 2-3 girlfriend gheun firtat.. and here i am who just want to date and be in relationship to marry and to be with her for my life.. . I know that your past was very difficult... Ata he tar obvious aahe ki tu tyane sodlyawar khup radli vaigere asnar... Ani you clearly don't want relationship now or maybe with me... but i want you to think about this one last time Ani ajun ek gosht clear karun deto jar mla literally tujhyasobt timepass ani faltupane karnyasathi relationship karaychi asti na tar jevha tu majhyavar ragavli hoti tevhach message karna sodun dil asta... Because in this generation... Finding another girl to feed ego and all the stuff is not difficult... But finding a girl who thinks, talks, behaves like you "I mean literally like you sakshi " is like finding the same soul twice in same life...` 
  },
  { 
    content: `So after all this things and bak bak  the conclusion is that maybe tujha love ani relationship madhe ata interest nasel rahila... Or bharosa uthun gela asel or you don't like me ...  But until you know truly know me for who I really am... You won't be able to understand me... i hope you will realise this..  All these years... This much praying. Think about it once really I don't deserve at least one chance to prove myself?... It's not a big deal.... As you already  told me all those things i am just taking my last chance.... I'm just telling that let's date casually.. Or let's meet sometimes as friends do. ... get to know me... And then decide kar ki we should stay together or not. . And just imagine if it worked out... Nasel tar breakup karun gheshil but at least there will be no regret  And after saying all this I'm assuming that you've read and understood  each and everything that I've written here... And I am very grateful of you for reading this patiently... After all this at least i am free now... And lucky that I've got chance to tell you the true feelings of mine about you...` 
  },
  { 
    content: `This is all I wanted to tell you... Sorry I'm just little bit more emotional jar jast kahi bolla asel tar... And the main purpose of doing all this is to tell you what I feel about you and share my thoughts... So bakich ignore kar karan mla as pn Javascript jast yet nahi..  Jevdhi yete tevdha try kel banvaych... AI use karu shaklo asto thought to make this by myself.... by The way when  you were telling me that you don't want relationship and all that things in our last conversation... It was the cutest thing I've ever seen... Saying polite after all that... Make me fall in love with you even more that day.. I wanted to tell you all this in person... But kayach karu Shakto....  Though ki itka pn kharab nahi disat ki mla he bolav lagtay.. But still I want you to judge me by my inner and real self baki looks mhanshil tar kashya kashyanchya gfs astat he tar tula sangaychi garaj nahi...
    and you know what, that i didn't ever let anyone take our my heart and mind.. as i am only get attracted as usual.. but not this much as it happened with your case.. because i know the reason behind this is not attraction because attraction fades after sometimes but its been 8 years now and i mature enough now to say its actually love and nothing else...` 
  },
  { 
    content: `Mla tar kadhi kadhi as vatta ki jar tu mla ho bolli asti relationship sathi tar kiti vayit jhal asta tujhyasobat... Tula  ek handsome, smart, intelligent, beautiful eyes vala, care karnara, trust karnara, tujhyashi nehmi loyal rahnara, tula samjun ghenara boyfriend bhetun gela asta..  mg tula dusra koni partner shodhnyaachi garajch padli nasti..  Bichari mulgi... just imagine,  jar  As jhal asta tar tujhi purn life kharab houn geli asti.  but kay karnar.. brr te sod 25th January la tujhya hya honarya but nahi jhalelya bf cha birthday aahe... so i am waiting for your gift.. tension nko gheu i love you too cha message pn takla tari chalel mla.... jast kahi expectation nahi thevat mi as pn.. 
    and the main thing.. he sarva vachlyavar ghari nko yeu marayla, mi literally tula khup ghabarto... ani jar avadla nasel tar tujhyakadech thev.. rikam ajun vichar karat basel mi tyacha.. haa baki avadla asel tar message karshil.. tujhyakadun Majhi tarif aikayla avdel mla..` 
  }
];

const ScrollingContent = ({ onFinish }: { onFinish: () => void }) => {
  const cardClass = `bg-white/95 backdrop-blur-md border-2 border-[${BRIGHT_RED}]/40 shadow-[0_10px_50px_rgba(255,0,0,0.2)]`;

  return (
    <div className="snap-container custom-scroll">
      <div className="snap-section">
        <div className={`flex flex-col items-center text-center gap-6 max-w-3xl w-full p-10 md:p-14 rounded-[3rem] relative ${cardClass}`}>
          <img src={SHY_GIF_SRC} alt="Shy Bear" className="w-40 h-40 object-contain" />
          <div className="space-y-4 px-6">
            <h1 className="romantic-text text-5xl md:text-7xl font-black text-bright italic">Hii Sakshi</h1>
            <p className="romantic-text text-lg md:text-2xl text-gray-700 font-medium italic leading-relaxed">
              I know we've already discussed all these things on chat before... <br/>
              But still I want you to read seriously with a clear and open mind.
            </p>
          </div>
          <div className="mt-8 text-black font-bold text-sm clean-font tracking-[0.2em]">01</div>
        </div>
      </div>

      {SECTIONS.map((sec, i) => (
        <div key={i} className="snap-section">
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: false, amount: 0.3 }} className={`max-w-4xl w-full max-h-[85vh] p-8 md:p-14 rounded-[2.5rem] relative flex flex-col items-center justify-center ${cardClass}`}>
            <div className="relative w-full overflow-hidden flex flex-col items-center">
              <div className="overflow-y-auto px-2 md:px-6 custom-scroll w-full max-h-[50vh]">
                <p className="romantic-text text-gray-800 leading-relaxed text-lg md:text-2xl italic text-center whitespace-pre-line">
                  {sec.content}
                </p>
              </div>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="mt-4 flex flex-col items-center opacity-40 pointer-events-none">
                <ChevronDown size={24} className="text-bright" />
              </motion.div>
            </div>
            <div className="mt-6 text-black font-bold text-sm clean-font tracking-[0.2em]">{String(i + 2).padStart(2, '0')}</div>
            <div className="absolute top-8 right-8"><Sparkles size={16} className="text-bright opacity-40" /></div>
          </motion.div>
        </div>
      ))}

      <div className="snap-section">
        <button 
          onClick={onFinish} 
          className="px-24 py-6 bg-bright text-white rounded-2xl font-black shadow-lg hover-bg-bright-dark transition-all active:scale-95 clean-font text-2xl uppercase tracking-[0.3em]"
        >
          GO ➔
        </button>
      </div>
    </div>
  );
};

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
          <Heart fill={BRIGHT_RED} size={h.size} strokeWidth={0} />
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

  const cardClass = `bg-white/95 backdrop-blur-md border-2 border-[${BRIGHT_RED}]/40 shadow-[0_10px_50px_rgba(255,0,0,0.2)]`;
  const showHearts = ["scrolling", "countdown", "decision"].includes(stage);
  const showCornerBear = ["scrolling", "countdown", "decision", "success", "gift", "gift-claimed", "need-time"].includes(stage);

  // Circle circumference for 30px radius = 2 * PI * 30 ≈ 188.5
  const CIRCUMFERENCE = 188.5;

  return (
    <main className="relative h-screen w-full flex flex-col items-center overflow-hidden select-none">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Lora:italic,wght@0,400;1,400&family=Playfair+Display:ital,wght@1,900&display=swap');
        .clean-font { font-family: 'Inter', sans-serif; }
        .romantic-text { font-family: 'Lora', serif; }
        .proposal-heading { font-family: 'Playfair Display', serif; }
        .snap-container { scroll-snap-type: y mandatory; overflow-y: scroll; height: 100vh; width: 100%; scrollbar-width: none; position: relative; z-index: 20; }
        .snap-section { scroll-snap-align: center; min-height: 100vh; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px; }
        .custom-scroll::-webkit-scrollbar { display: none; }
        .text-bright { color: ${BRIGHT_RED}; }
        .bg-bright { background-color: ${BRIGHT_RED}; }
        .hover-bg-bright-dark:hover { background-color: ${BRIGHT_HOVER}; }
        .glass-panel { background: rgba(255, 255, 255, 0.88); backdrop-filter: blur(20px); border: 1px solid rgba(255, 0, 0, 0.1); border-radius: 40px; }
      `}</style>

      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url('${BACKGROUND_IMAGE_SRC}')`, backgroundAttachment: 'fixed' }}
        >
          <div className="absolute inset-0 bg-white/5" />
        </div>
      </div>

      <ThrowingHearts isVisible={showHearts} />

      <AnimatePresence>
        {showCornerBear && (
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="fixed bottom-6 left-6 z-[100] pointer-events-none">
            <img src={BEAR_GIF_SRC} alt="Bear" className="w-20 h-20 md:w-32 md:h-32 object-contain" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {stage === "start" && (
          <motion.div key="start" className="h-screen flex flex-col items-center justify-center z-30 cursor-pointer" onClick={() => setStage("zoom")}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <Heart size={150} fill={BRIGHT_RED} color={BRIGHT_RED} className="drop-shadow-[0_0_30px_rgba(255,0,0,0.5)]" />
            </motion.div>
            <p className="mt-8 text-bright font-black text-2xl tracking-[0.4em] clean-font uppercase">Click Me</p>
          </motion.div>
        )}

        {stage === "zoom" && (
          <motion.div key="zoom" initial={{ scale: 1 }} animate={{ scale: 80, opacity: 0 }} transition={{ duration: 0.8 }} onAnimationComplete={() => setStage("mail")} className="h-screen flex items-center justify-center z-50">
            <Heart size={150} fill={BRIGHT_RED} color={BRIGHT_RED} />
          </motion.div>
        )}

        {stage === "mail" && (
          <motion.div key="mail" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-[350px] aspect-[16/10]">
              <div className="absolute inset-0 bg-[#b30000] rounded-b-xl shadow-2xl z-0" />
              <motion.div className="absolute top-0 left-0 w-full h-full bg-[#ff0000] origin-top shadow-md rounded-t-sm z-0" style={{ clipPath: "polygon(0 0, 100% 0, 50% 55%)", backfaceVisibility: "hidden" }} animate={{ rotateX: isMailOpen ? 180 : 0 }} transition={{ duration: 0.8 }} onClick={() => setIsMailOpen(true)} />
              <motion.div drag="y" dragConstraints={{ top: -300, bottom: 0 }} onDragEnd={(_, info) => { if (info.offset.y < -100) setStage("scrolling"); }} className="absolute left-2 right-2 bottom-4 bg-white rounded shadow-md p-6 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-10" animate={{ y: isMailOpen ? -140 : 0 }}>
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-2 italic">Drag up to read</p>
                <div className="h-1 w-12 bg-gray-100 rounded mb-1" />
              </motion.div>
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute inset-0 bg-[#cc0000] rounded-b-xl" style={{ clipPath: "polygon(0 0, 48% 50%, 0 100%)" }} />
                <div className="absolute inset-0 bg-[#cc0000] rounded-b-xl" style={{ clipPath: "polygon(100% 0, 52% 50%, 100% 100%)" }} />
                <div className="absolute inset-0 bg-[#ff3333] rounded-b-xl shadow-inner" style={{ clipPath: "polygon(0 100%, 50% 45%, 100% 100%)" }} />
              </div>
              {!isMailOpen && <div onClick={() => setIsMailOpen(true)} className="absolute inset-0 z-30 flex items-center justify-center text-white/90 font-black text-lg cursor-pointer uppercase">Tap to Open</div>}
            </div>
          </motion.div>
        )}

        {stage === "scrolling" && (
          <ScrollingContent onFinish={() => setStage("countdown")} />
        )}

        {stage === "countdown" && (
          <motion.div key="countdown" className="fixed inset-0 z-[120] flex flex-col items-center justify-center p-6 md:p-12 text-center bg-white/10 backdrop-blur-md">
            <div className={`flex flex-col items-center max-w-2xl w-full p-8 md:p-12 rounded-[3.5rem] relative ${cardClass}`}>
              
              {/* Promise Text (Impactful styling) */}
              <motion.p 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="romantic-text text-xl md:text-2xl text-gray-800 font-bold italic leading-relaxed mb-6"
              >
                "Listen je tujhyasobt jhalay te tar mi change nahi karu shakat ... But one thing I can promise you that je ata honar aahe i can make it better for you ... Ani I swear that mi tula kadhich regret nahi hou denar ki tu mla YES bolnyacha decision gheun chuki keli..."
              </motion.p>

              {/* Calm Mind Text */}
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5 }}
                className="romantic-text text-lg text-gray-500 italic mb-10"
              >
                I want you to think with a calm and clear mind before making your decision.
              </motion.p>

              {/* Smaller Timer at the Bottom */}
              <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="48" cy="48" r="30" stroke={`${BRIGHT_RED}22`} strokeWidth="5" fill="transparent" />
                  <motion.circle 
                    cx="48" cy="48" r="30" 
                    stroke={BRIGHT_RED} strokeWidth="5" 
                    fill="transparent" 
                    strokeDasharray={CIRCUMFERENCE} 
                    animate={{ strokeDashoffset: CIRCUMFERENCE - (CIRCUMFERENCE * timer) / 15 }} 
                    transition={{ duration: 1, ease: "linear" }} 
                  />
                </svg>
                <span className="text-3xl font-black text-bright clean-font">{timer}</span>
              </div>

              {/* Next Button appearing at end of timer */}
              <AnimatePresence>
                {timer === 0 && (
                  <motion.button 
                    key="next-btn"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    onClick={() => setStage("decision")}
                    className="mt-4 p-5 bg-bright text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    <ArrowRight size={32} strokeWidth={3} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {stage === "decision" && (
          <motion.div key="decision" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-lg glass-panel p-10 md:p-14 text-center shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="mb-8 inline-block">
                <Heart fill={BRIGHT_RED} size={64} className="text-bright" />
              </motion.div>
              <h1 className="proposal-heading text-4xl md:text-6xl text-gray-900 mb-4 italic leading-tight">I Love You <br/><span className="text-bright">Sakshi</span></h1>
              <p className="romantic-text text-gray-600 mb-12 text-lg italic">Will you give me a chance to make you truly happy?</p>
              
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => { setStage("success"); notifyDiscord("YES ❤️"); }} className="group relative py-6 rounded-2xl font-black transition-all active:scale-95 shadow-lg overflow-hidden bg-bright">
                    <span className="relative flex items-center justify-center gap-2 text-white clean-font text-xl uppercase tracking-widest">Yes ❤️</span>
                  </button>
                  <button onClick={() => { const next = noCount + 1; setNoCount(next); notifyDiscord(`NO (${next})`); if (next >= 3) setStage("final-goodbye"); }} className="py-6 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-black shadow-sm transition-all active:scale-95 clean-font text-xl uppercase flex items-center justify-center gap-2">No 💔</button>
                </div>
                <button onClick={() => { notifyDiscord("NEED TIME"); setStage("need-time"); }} className="w-full py-5 bg-zinc-900 text-white/90 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-md clean-font">
                  <Timer size={20} /> I need a little more time
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {stage === "success" && (
          <motion.div key="success" className="fixed inset-0 z-[200] flex flex-col items-center justify-center text-center p-8 bg-white/40 backdrop-blur-md">
            <motion.h1 animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity }} className="proposal-heading text-7xl font-black text-bright mb-10 italic">YAYYY! 🎉</motion.h1>
            <div className={`p-10 rounded-[2.5rem] ${cardClass} max-w-md shadow-2xl`}>
              <Check size={50} className="text-green-500 mx-auto mb-6" />
              <p className="romantic-text text-2xl text-gray-800 font-bold mb-10 italic">"You just made me the luckiest person in the world."</p>
              <button onClick={() => setStage("gift")} className="px-16 py-5 bg-bright text-white rounded-full font-black shadow-lg hover-bg-bright-dark transition active:scale-95 clean-font uppercase tracking-widest">Next ➔</button>
            </div>
          </motion.div>
        )}

        {stage === "gift" && (
          <motion.div key="gift" className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div className={`w-full max-w-md p-12 rounded-[2.5rem] text-center border-t-[12px] border-[#ff0000] ${cardClass}`}>
              <h3 className="romantic-text text-xl font-black text-gray-800 mb-10 italic">I have a special gift planned just for you... 🎁</h3>
              <button onClick={() => { notifyDiscord("🎁 GIFT CLAIMED!"); setStage("gift-claimed"); }} className="flex items-center justify-center gap-3 w-full py-6 bg-bright text-white rounded-2xl font-black shadow-lg transition active:scale-95 clean-font uppercase tracking-widest">Receive Gift</button>
            </div>
          </motion.div>
        )}

        {stage === "gift-claimed" && (
          <motion.div key="claimed" className="fixed inset-0 z-[200] flex items-center justify-center p-8 text-center bg-white/20 backdrop-blur-xl">
            <div className={`p-12 rounded-[2.5rem] max-w-md ${cardClass}`}>
              <Heart size={60} className="text-bright mx-auto mb-6 animate-bounce" fill="currentColor" />
              <h3 className="romantic-text text-3xl font-black text-gray-800 mb-4 italic">Request Sent!</h3>
              <p className="romantic-text text-gray-700 italic font-bold text-xl">"Your gift is on its way, Sakshi. ❤️"</p>
            </div>
          </motion.div>
        )}

        {stage === "need-time" && (
          <motion.div key="time" className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-8 text-center bg-white/20 backdrop-blur-xl">
            <div className={`p-12 rounded-3xl ${cardClass} shadow-2xl`}>
               <Timer size={80} className="text-bright mb-8 mx-auto" />
               <p className="romantic-text text-2xl font-bold italic text-gray-800 max-w-sm">"Take all the time you need, Sakshi. I'm right here."</p>
            </div>
          </motion.div>
        )}

        {stage === "final-goodbye" && (
          <motion.div key="bye" className="fixed inset-0 z-[200] bg-white/80 backdrop-blur-3xl flex flex-col items-center justify-center p-8 text-center text-gray-800">
            <HeartCrack size={100} className="text-gray-400 mb-8" />
            <p className="romantic-text text-2xl font-bold italic">"I understand. Goodbye, Sakshi."</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}