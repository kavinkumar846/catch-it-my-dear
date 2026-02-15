import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { launchFireworks, heartExplosion } from '../utils/confetti';

const ThankYou: React.FC = () => {
  useEffect(() => {
    // Immediate explosion
    heartExplosion();
    launchFireworks();

    // Continuous celebration for a few seconds
    const interval = setInterval(() => {
      launchFireworks();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
       {/* Background gradient */}
       <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-slate-950 to-black opacity-80" />

       {/* Floating Particles */}
       {[...Array(20)].map((_, i) => (
         <motion.div
           key={i}
           className="absolute bg-white rounded-full opacity-20"
           initial={{ 
             x: Math.random() * window.innerWidth, 
             y: window.innerHeight, 
             scale: Math.random() * 0.5 + 0.5 
           }}
           animate={{ 
             y: -100, 
             opacity: 0 
           }}
           transition={{ 
             duration: Math.random() * 5 + 5, 
             repeat: Infinity, 
             ease: "linear" 
           }}
           style={{
             width: Math.random() * 4 + 2 + 'px',
             height: Math.random() * 4 + 2 + 'px',
           }}
         />
       ))}

       <motion.div
         initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
         animate={{ scale: 1, opacity: 1, rotate: 0 }}
         transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
         className="relative z-10 text-center p-4"
       >
         <h1 className="font-cursive text-5xl md:text-7xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-rose-500 to-purple-600 drop-shadow-[0_0_35px_rgba(225,29,72,0.6)] leading-tight py-4 mb-4">
           Nandriii Vanakam
         </h1>
         
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex justify-center gap-4 text-4xl md:text-6xl"
         >
            <motion.span 
              animate={{ rotate: [0, 10, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🙏
            </motion.span>
            <span>❤️</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ✨
            </motion.span>
         </motion.div>
       </motion.div>
    </div>
  );
};

export default ThankYou;