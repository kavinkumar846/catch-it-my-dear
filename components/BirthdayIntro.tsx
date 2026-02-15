import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { launchFireworks } from '../utils/confetti';

interface BirthdayIntroProps {
  onComplete: () => void;
}

const popups = [
  { text: "🎂", x: "10%", y: "20%" },
  { text: "💖", x: "85%", y: "15%" },
  { text: "🎉", x: "75%", y: "80%" },
  { text: "✨", x: "20%", y: "75%" },
  { text: "🎁", x: "50%", y: "10%" },
  { text: "🥰", x: "15%", y: "50%" },
  { text: "🥳", x: "80%", y: "40%" },
  { text: "🌹", x: "40%", y: "85%" },
];

const BirthdayIntro: React.FC<BirthdayIntroProps> = ({ onComplete }) => {
  useEffect(() => {
    launchFireworks();
    
    // Auto-advance after 7 seconds for a full video feel
    const timer = setTimeout(() => {
      onComplete();
    }, 7000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-rose-950 to-black animate-gradient" />
      
      {/* Dynamic Popups */}
      {popups.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl md:text-6xl select-none pointer-events-none"
          initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
          animate={{ 
            scale: [0, 1.2, 1], 
            opacity: [0, 1, 0],
            y: -100
          }}
          transition={{ 
            delay: i * 0.4, 
            duration: 2, 
            repeat: Infinity,
            repeatDelay: 1
          }}
          style={{ left: item.x, top: item.y }}
        >
          {item.text}
        </motion.div>
      ))}

      {/* Heart Container */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 10, duration: 1.5 }}
        className="relative z-10 w-full max-w-[500px] md:max-w-[700px] aspect-square flex items-center justify-center p-4"
      >
        {/* SVG Heart Background with Pulse */}
        <motion.div
           animate={{ scale: [1, 1.05, 1] }}
           transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
           className="w-full h-full absolute inset-0"
        >
            <svg viewBox="0 0 512 512" className="w-full h-full drop-shadow-[0_0_60px_rgba(225,29,72,0.8)]">
                <path
                    d="M256 448l-30.16-27.15C118.71 324.47 48 260.65 48 182.26 48 118.44 98.44 68 162.26 68c36.06 0 70.62 16.78 93.74 43.19C279.12 84.78 313.68 68 349.74 68 413.56 68 464 118.44 464 182.26c0 78.39-70.71 142.21-177.84 238.6L256 448z"
                    fill="url(#heartGradientIntro)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="4"
                />
                <defs>
                    <linearGradient id="heartGradientIntro" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" /> 
                        <stop offset="50%" stopColor="#e11d48" /> 
                        <stop offset="100%" stopColor="#be123c" /> 
                    </linearGradient>
                </defs>
            </svg>
        </motion.div>

        {/* Text Content inside Heart */}
        <div className="relative z-20 text-center flex flex-col items-center justify-center -mt-6 md:-mt-10">
            <motion.div 
                className="text-5xl md:text-6xl mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                🎂
            </motion.div>

            <motion.h1 
                className="font-cursive text-5xl md:text-7xl text-white leading-none drop-shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
            >
            Happy<br/>Birthday
            </motion.h1>
            
            <motion.h2 
                className="font-serif-display text-2xl md:text-4xl text-rose-200 mt-2 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
            Pranaviii
            </motion.h2>
        </div>
      </motion.div>

      {/* Floating Particles Background */}
      {[...Array(30)].map((_, i) => (
         <motion.div 
            key={`p-${i}`}
            className="absolute rounded-full bg-white blur-[1px]"
            initial={{ 
                x: Math.random() * 100 + "vw", 
                y: "110vh",
                opacity: 0
            }}
            animate={{ 
                y: "-10vh",
                opacity: [0, 0.4, 0]
            }}
            transition={{ 
                duration: Math.random() * 5 + 3, 
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
            }}
            style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
            }}
         />
      ))}
    </motion.div>
  );
};

export default BirthdayIntro;