import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { launchFireworks } from '../utils/confetti';
import { ArrowRight } from 'lucide-react';

interface BirthdayRevealProps {
  onShowVideo: () => void;
}

const BirthdayReveal: React.FC<BirthdayRevealProps> = ({ onShowVideo }) => {
  const [showMainMessage, setShowMainMessage] = useState(false);
  const introText = "On your special day...";
  const finalMessage = "Happy Birthday My Dear ✨";
  
  // Audio ref for the special birthday song/audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    // Initialize audio
    const audio = new Audio("https://image2url.com/r2/default/files/1771135858124-1fc4a306-c2e3-4ab3-ba99-9d8e77b43076.mp3");
    audio.volume = 0.8;
    audioRef.current = audio;
    
    const playAudio = async () => {
        try {
            await audio.play();
        } catch (e: any) {
            // Check if component is still mounted
            if (!isMounted) return;

            // Check if error is due to interruption (navigation/unmount) or AbortError
            const errorMessage = e?.message || '';
            const isInterruption = 
                e.name === 'AbortError' || 
                errorMessage.includes('interrupted') ||
                errorMessage.includes('pause') ||
                errorMessage.includes('play() request was interrupted');

            if (!isInterruption) {
                console.warn("Final reveal audio playback issue:", e);
            }
        }
    };

    playAudio();

    // Cleanup on unmount
    return () => {
        isMounted = false;
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };
  }, []);

  useEffect(() => {
    // Start fireworks when main message appears
    if (showMainMessage) {
      launchFireworks();
    }
  }, [showMainMessage]);

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden text-center px-4">
      
      {!showMainMessage ? (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="text-rose-200 text-2xl md:text-4xl font-serif-display max-w-3xl leading-relaxed"
           onAnimationComplete={() => {
             // Delay before showing the final message
             setTimeout(() => setShowMainMessage(true), 3500);
           }}
        >
          <Typewriter text={introText} speed={70} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
          className="z-10 relative flex flex-col items-center justify-center max-h-screen"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600 drop-shadow-[0_0_25px_rgba(225,29,72,0.8)] leading-tight p-4">
            {finalMessage}
          </h1>

          {/* Added Photo Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, type: "spring" }}
            className="relative w-64 h-64 md:w-[28rem] md:h-[28rem] my-4"
          >
             {/* Back Glow */}
             <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/30 via-pink-500/20 to-transparent rounded-full blur-[50px] animate-pulse" />
             
             <img 
               src="https://image2url.com/r2/default/files/1771136189893-4f72d51f-190f-454a-a5a0-a88e50713cf9.png"
               alt="The Birthday Girl"
               className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(225,29,72,0.5)] relative z-10"
             />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-4 text-rose-200/60 font-serif-display italic text-xl"
          >
            Wishing you all the happiness in the world.
          </motion.p>

          {/* Final Video Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 1 }}
            className="mt-8 relative z-20"
          >
             <button 
                onClick={onShowVideo}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full text-white font-serif-display font-bold shadow-[0_0_30px_rgba(225,29,72,0.6)] hover:scale-105 transition-all duration-300"
             >
                <span>Watch Final Video</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </motion.div>

        </motion.div>
      )}

      {/* Decorative Fireworks Background Elements */}
      {showMainMessage && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-500 rounded-full animate-ping duration-[2000ms]" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-rose-500 rounded-full animate-ping delay-300 duration-[2500ms]" />
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-ping delay-700 duration-[1500ms]" />
          <div className="absolute top-2/3 left-1/5 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-500 duration-[2200ms]" />
        </div>
      )}
    </div>
  );
};

const Typewriter = ({ text, speed }: { text: string; speed: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}<span className="animate-pulse text-rose-500">|</span></span>;
};

export default BirthdayReveal;