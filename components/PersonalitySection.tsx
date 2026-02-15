import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, MapPin, ChefHat, Sparkles, Power, Gauge, X, PartyPopper, GraduationCap, ArrowUpRight } from 'lucide-react';

interface PersonalitySectionProps {
    onResumeAudio: () => void;
}

const CardWrapper: React.FC<{ children: React.ReactNode; className?: string; onVisible?: () => void }> = ({ children, className = "", onVisible }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    onViewportEnter={() => {
        if (onVisible) onVisible();
    }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1, ease: "easeOut" }}
    className={`min-h-[80vh] flex items-center justify-center p-6 ${className}`}
  >
    {children}
  </motion.div>
);

const PersonalitySection: React.FC<PersonalitySectionProps> = ({ onResumeAudio }) => {
  const [engineState, setEngineState] = useState<'off' | 'cranking' | 'running'>('off');
  const [isHovered, setIsHovered] = useState(false);
  const [showCarPopup, setShowCarPopup] = useState(false);
  const engineAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleStartEngine = () => {
    if (engineState !== 'off') return;

    if (!engineAudioRef.current) {
      // NEW AUDIO: Custom FLAC file provided
      engineAudioRef.current = new Audio("https://image2url.com/r2/default/audio/1771128650706-fb76f6ad-81c9-4763-b8fb-e93a923a3981.flac");
      engineAudioRef.current.volume = 1.0;

      // Auto-shutoff when audio ends naturally (fallback)
      engineAudioRef.current.onended = () => {
         setEngineState('off');
         setShowCarPopup(true);
      };

      // Error handling
      engineAudioRef.current.onerror = (e) => {
          console.error("Audio source failed to load", e);
          setEngineState('off');
          alert("Engine sound could not be loaded. Please check your connection.");
      };
    }
    
    // Play Audio with Promise handling
    engineAudioRef.current.currentTime = 0;
    const playPromise = engineAudioRef.current.play();

    if (playPromise !== undefined) {
        setEngineState('cranking'); // Set state immediately to give feedback
        
        playPromise
        .then(() => {
            // Audio started successfully
            
            // 3. Running Phase (Lights ON) - synced with audio rev approx 800ms in
            setTimeout(() => {
                setEngineState(prev => prev === 'cranking' ? 'running' : prev);
            }, 800);

            // STOP exactly after 10 seconds as requested
            setTimeout(() => {
                if (engineAudioRef.current) {
                    engineAudioRef.current.pause();
                    engineAudioRef.current.currentTime = 0;
                }
                setEngineState('off');
                setShowCarPopup(true);
            }, 10000);
        })
        .catch(error => {
            console.error("Audio play failed:", error);
            setEngineState('off');
        });
    }
  };

  const parisImages = [
    "https://image2url.com/r2/default/files/1771129218105-276f2309-7da7-4fb3-bcb4-672b3cb44293.jpeg", // Replaced image 1
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",   // Romantic Street
    "https://image2url.com/r2/default/files/1771129316690-71b21b38-a1d2-4c62-a685-325659f4e2e4.jpeg"    // Replaced image 3
  ];

  // Fixed Theme - Icy White / Xenon (Replaces Red)
  const theme = { 
    btn: 'from-slate-800 to-black', 
    text: 'text-white', 
    border: 'border-white', 
    shadow: 'shadow-[0_0_30px_rgba(255,255,255,0.5)]',
    glow: 'rgba(255, 255, 255, 0.6)',
    light: 'bg-white',
    headlightShadow: '0 0 50px 10px rgba(255, 255, 255, 0.9)'
  };

  const lightsOn = engineState === 'running' || isHovered;

  return (
    <div className="w-full bg-slate-950 relative z-20 overflow-hidden">
      {/* Decorative background line - Neutral */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-700/50 to-transparent -translate-x-1/2 hidden md:block" />

      {/* 2. BMW Lover - REFACTORED: White Theme & Working Flash */}
      <CardWrapper>
        <div 
            className="max-w-6xl w-full relative rounded-3xl overflow-hidden shadow-2xl min-h-[600px] group flex items-center bg-black transition-all duration-500"
            style={{ 
                boxShadow: lightsOn ? `0 0 60px ${theme.glow}` : '' 
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Speed Lines Animation (Only when running) */}
            {engineState === 'running' && (
                <div className="absolute inset-0 z-0 opacity-50">
                    {[...Array(20)].map((_, i) => (
                        <motion.div 
                            key={i}
                            className="absolute h-[1px] bg-white/50"
                            style={{
                                top: Math.random() * 100 + '%',
                                left: '0',
                                width: Math.random() * 50 + 20 + '%'
                            }}
                            animate={{ x: ['100%', '-100%'], opacity: [0, 1, 0] }}
                            transition={{ duration: Math.random() * 0.5 + 0.2, repeat: Infinity, ease: 'linear' }}
                        />
                    ))}
                </div>
            )}

            {/* Background Image - Black BMW */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop" 
                    alt="BMW M3 Background" 
                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay for Text Readability - Neutral */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent mix-blend-multiply" />
                {/* Dynamic Neon Underglow in background - White/Ice Blue */}
                <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/20 to-transparent opacity-0" 
                    animate={{ opacity: lightsOn ? 0.6 : 0 }}
                />
            </div>

           <motion.div 
            className="relative z-10 p-8 md:p-16 max-w-2xl w-full"
            animate={engineState === 'running' ? { 
              x: [-1, 1, -1, 1, 0], 
              y: [1, -1, 1, -1, 0],
            } : engineState === 'cranking' ? {
              x: [-2, 2, -2, 2, 0],
              y: [-1, 1, -1, 1, 0],
            } : {}}
            transition={{ duration: engineState === 'cranking' ? 0.05 : 0.1, repeat: engineState !== 'off' ? Infinity : 0 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <motion.div
                        animate={engineState === 'running' ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    >
                        <Car 
                        className={`transition-colors duration-300 ${lightsOn ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'text-gray-500'}`} 
                        size={48} 
                        />
                    </motion.div>
                    <h2 className={`text-4xl md:text-5xl font-serif-display text-white italic tracking-wide transition-colors duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}>
                        BMW M3 Lover
                    </h2>
                </div>
            </div>

            <p className="text-gray-300 text-xl leading-relaxed font-light mb-10 text-shadow-sm">
              <span className="text-white font-medium">Fast cars</span>, late night drives, and the roar of an engine. Pure adrenaline and speed.
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* START ENGINE BUTTON - Metallic Silver/White Style */}
              <div className="relative group">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartEngine}
                  disabled={engineState !== 'off'}
                  className={`
                    w-24 h-24 rounded-full border-[3px] 
                    flex flex-col items-center justify-center relative overflow-hidden
                    transition-all duration-300 z-10
                    ${engineState !== 'off'
                      ? `bg-gradient-to-br from-white to-slate-300 border-white shadow-[0_0_40px_rgba(255,255,255,0.6)]` 
                      : `bg-gradient-to-br from-slate-900 to-black border-slate-600 hover:border-white cursor-pointer`
                    }
                  `}
                >
                  <Power size={32} className={`mb-1 transition-colors ${engineState !== 'off' ? 'text-black' : 'text-gray-500 group-hover:text-white'}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${engineState !== 'off' ? 'text-black' : 'text-gray-500 group-hover:text-white'}`}>
                    {engineState === 'off' ? 'Start' : 'ON'}
                  </span>
                </motion.button>
                {/* Glow ring */}
                <div className={`absolute -inset-2 rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${engineState !== 'off' && 'animate-ping opacity-60'}`} />

                {/* Interaction Hint (Shows to Click It Motions) */}
                {engineState === 'off' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 pointer-events-none flex flex-col items-center z-50">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                          className="text-4xl md:text-5xl filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
                        >
                           👆
                        </motion.div>
                    </motion.div>
                    <motion.span 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8 }}
                        className="text-white font-bold text-xs tracking-widest mt-2 bg-rose-600/80 px-3 py-1 rounded-full shadow-lg border border-rose-400 whitespace-nowrap"
                    >
                        CLICK TO START
                    </motion.span>
                  </div>
                )}
              </div>

              {/* Dashboard Elements */}
              <div className="flex items-center gap-6">
                  {/* Headlights Interaction - FIXED FLASH */}
                  <div className="flex gap-4 p-5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 relative overflow-hidden">
                        {/* Left Headlight */}
                        <div className={`w-14 h-14 rounded-full transition-all duration-300 border-2 relative
                            ${lightsOn
                                ? 'bg-white border-white scale-110' 
                                : engineState === 'cranking'
                                    ? 'bg-yellow-100/10 border-gray-600 animate-pulse'
                                    : 'bg-gray-900 border-gray-700'
                            }`}
                             style={{ boxShadow: lightsOn ? theme.headlightShadow : 'none' }}
                        >
                            {/* Inner bulb detail */}
                            <div className="absolute inset-2 rounded-full border border-gray-300/30"></div>
                        </div>

                        {/* Right Headlight */}
                        <div className={`w-14 h-14 rounded-full transition-all duration-300 border-2 relative
                            ${lightsOn
                                ? 'bg-white border-white scale-110' 
                                : engineState === 'cranking'
                                    ? 'bg-yellow-100/10 border-gray-600 animate-pulse'
                                    : 'bg-gray-900 border-gray-700'
                            }`}
                            style={{ boxShadow: lightsOn ? theme.headlightShadow : 'none' }}
                        >
                             {/* Inner bulb detail */}
                             <div className="absolute inset-2 rounded-full border border-gray-300/30"></div>
                        </div>
                  </div>
                  
                  {/* RPM Gauge Visualization */}
                  {engineState === 'running' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center"
                      >
                         <Gauge size={40} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                         <motion.span 
                            className="text-xl font-bold font-mono text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 0.1, repeat: Infinity }}
                         >
                            8000
                         </motion.span>
                         <span className="text-[10px] text-gray-400">RPM</span>
                      </motion.div>
                  )}
              </div>
            </div>
          </motion.div>
        </div>
      </CardWrapper>

      {/* 2.5. NEET to Engineering - The Pivot (NEW SECTION) */}
      <CardWrapper className="py-20 md:py-32">
        <div className="max-w-4xl w-full text-center relative z-10 px-4">
            {/* Background Glow */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ duration: 1.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-900/50 to-transparent blur-3xl -z-10 rounded-full"
            />
            
            {/* Main Headline */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-16"
            >
                <h3 className="text-3xl md:text-5xl font-serif-display text-slate-400 leading-tight">
                    She didn’t fail a path.
                    <br />
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] block mt-4"
                    >
                      She found a better one.
                    </motion.span>
                </h3>
            </motion.div>

            {/* Divider */}
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "120px", opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-16"
            />

            {/* The Transition Story */}
            <div className="space-y-12">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-xl md:text-3xl text-slate-300 font-light"
                >
                    <span className="relative">
                        From <span className="font-bold text-slate-500">NEET</span>
                        <motion.div 
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ delay: 1, duration: 0.5 }}
                          className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500/80 origin-left"
                        />
                    </span>
                    <ArrowUpRight className="text-blue-400 animate-pulse hidden md:block" size={32} />
                    <span className="hidden md:inline">to</span>
                    <span className="font-bold text-blue-300 drop-shadow-md flex items-center gap-2">
                        <GraduationCap size={32} className="text-blue-400" />
                        Engineering
                    </span>
                </motion.div>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-lg md:text-xl text-slate-400 italic font-serif-display max-w-2xl mx-auto"
                >
                    not a change of direction, but a change of <span className="text-purple-300 text-2xl not-italic font-bold ml-1">destiny</span>.
                </motion.p>

                {/* Cards: Restart & Rebuild */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
                >
                    <div className="group p-8 border border-white/5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:border-rose-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(225,29,72,0.15)] relative overflow-hidden">
                         <div className="absolute inset-0 bg-rose-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                         <div className="relative z-10">
                            <p className="text-rose-300 font-serif-display text-2xl mb-2">Brave enough</p>
                            <p className="text-white text-sm tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">To Restart</p>
                         </div>
                    </div>
                    
                    <div className="group p-8 border border-white/5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden">
                         <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                         <div className="relative z-10">
                             <p className="text-blue-300 font-serif-display text-2xl mb-2">Strong enough</p>
                             <p className="text-white text-sm tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">To Rebuild</p>
                         </div>
                    </div>
                </motion.div>
            </div>

            {/* Final Statement */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="mt-20"
            >
                <p className="font-cursive text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-2xl">
                    That is who she is.
                </p>
            </motion.div>
        </div>
      </CardWrapper>

      {/* 3. Paris Dream */}
      {/* TRIGGER AUDIO RESUME HERE */}
      <CardWrapper onVisible={onResumeAudio}>
        <div className="max-w-4xl w-full flex flex-col items-center text-center">
           <motion.div 
             className="mb-8 relative"
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           >
             <MapPin size={64} className="text-pink-400 mx-auto mb-4" />
             <h2 className="text-5xl font-serif-display text-pink-100 mb-2">Paris Dream 🗼</h2>
             <span className="font-cursive text-3xl text-pink-400">Paris Awaits</span>
           </motion.div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
             {parisImages.map((src, i) => (
               <motion.div 
                 key={i}
                 className="overflow-hidden rounded-lg aspect-[3/4] relative group"
                 whileHover={{ scale: 1.05 }}
               >
                 <img 
                   src={src}
                   className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                   alt={`Paris ${i+1}`} 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="text-yellow-200" />
                 </div>
               </motion.div>
             ))}
           </div>
           
           <p className="text-pink-200/80 max-w-xl text-lg">
             One day, we'll walk under the Eiffel Tower lights. Until then, let's keep dreaming big!
           </p>
        </div>
      </CardWrapper>

      {/* 4. Baking */}
      <CardWrapper className="mb-20">
         <div className="max-w-5xl w-full bg-rose-50/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-rose-400" />
            
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="text-left">
                <div className="inline-block p-3 bg-white/10 rounded-full mb-4">
                  <ChefHat size={32} className="text-yellow-200" />
                </div>
                <h2 className="text-4xl font-serif-display text-rose-100 mb-6">Loves Baking 🍰</h2>
                <p className="text-rose-200/80 text-lg mb-6">
                   Enjoying To Bake And Cook!!!
                </p>
                
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  className="h-px bg-rose-300/30 mb-6"
                />
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="font-cursive text-4xl text-rose-400">"Sweetest Vibes"</p>
                </motion.div>
              </div>
              
              <div className="relative h-64 md:h-80">
                 <motion.img 
                   src="https://picsum.photos/seed/cupcake/300/300"
                   className="absolute top-0 right-0 w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white/20 object-cover shadow-xl z-20"
                   animate={{ y: [0, -15, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                 />
                 <motion.img 
                   src="https://picsum.photos/seed/cake/300/300"
                   className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/20 object-cover shadow-xl z-10 grayscale-[0.5]"
                   animate={{ y: [0, 15, 0] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 />
              </div>
            </div>
         </div>
      </CardWrapper>

      {/* POPUP OVERLAY */}
      <AnimatePresence>
        {showCarPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               className="absolute inset-0 bg-black/80 backdrop-blur-sm"
               onClick={() => setShowCarPopup(false)}
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-gradient-to-br from-slate-900 to-black p-1 rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.2)] max-w-md w-full relative z-10 border border-white/20"
            >
              <div className="bg-black/50 rounded-xl p-8 text-center relative overflow-hidden">
                {/* Close Button */}
                <button 
                  onClick={() => setShowCarPopup(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Content */}
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <PartyPopper size={40} className="text-rose-500 animate-bounce" fill="currentColor" />
                  </div>
                </div>

                <h3 className="text-2xl font-serif-display text-white mb-4">
                  ⚠️ High Speed Engine Detected!
                </h3>
                
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  You've successfully revved the engine to the max RPM. Buckle up my dear, it's time for an adventure! 🏎️💨
                </p>

                <button
                  onClick={() => setShowCarPopup(false)}
                  className="w-full py-3 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  Let's Drive 🔑
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalitySection;