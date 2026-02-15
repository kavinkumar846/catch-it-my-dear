import React from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface VolumePromptProps {
  onComplete: () => void;
}

const VolumePrompt: React.FC<VolumePromptProps> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-rose-50 via-white to-pink-50 flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose-200/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-200/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        className="relative z-10 w-full max-w-[480px] p-6"
      >
        {/* The Card Container - White Glassmorphism */}
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-[3rem] p-12 flex flex-col items-center text-center shadow-[0_20px_60px_-15px_rgba(225,29,72,0.15)] border border-rose-100 overflow-hidden">
            
            {/* Top Highlight Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-50" />

            {/* Glowing Speaker Icon */}
            <div className="relative mb-10 group cursor-pointer" onClick={onComplete}>
                {/* Outer Rings */}
                <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-rose-300 rounded-full blur-md opacity-40"
                />
                <motion.div 
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="absolute inset-0 bg-pink-300 rounded-full blur-md opacity-40"
                />
                
                {/* The Icon Circle */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-28 h-28 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(225,29,72,0.3)] border-4 border-white ring-4 ring-rose-100"
                >
                    <Volume2 size={48} className="text-white drop-shadow-sm" strokeWidth={2.5} />
                </motion.div>
            </div>

            {/* Headline */}
            <div className="relative mb-6">
                <h2 className="text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-rose-600 to-rose-400 drop-shadow-sm transform -skew-x-6">
                    WAIT!
                </h2>
                <motion.div
                  className="absolute -top-6 -right-8 text-5xl"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                >
                    🛑
                </motion.div>
            </div>

            {/* Subtext */}
            <h3 className="text-slate-800 font-bold text-xl mb-6 tracking-wide">
                Are your speakers on? 🧐
            </h3>

            {/* Description */}
            <div className="bg-rose-50/50 rounded-2xl p-6 mb-8 border border-rose-100/50">
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Watching this without sound is like eating a <br/>
                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-700 font-bold rounded-full border border-yellow-200 shadow-sm transform -rotate-2">
                        pizza without cheese 🍕
                    </span>
                </p>
            </div>

            {/* Action Button */}
            <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(225, 29, 72, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onComplete}
                className="w-full py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
            >
                <span className="relative z-10 tracking-wider">OKAY, IT'S LOUD!</span>
                <span className="text-2xl relative z-10 group-hover:rotate-12 transition-transform">🫡</span>
                
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />
            </motion.button>

            {/* Footer */}
            <p className="mt-8 text-[11px] text-slate-400 font-bold tracking-[0.2em] uppercase opacity-70">
                (I promise it's not a screamer)
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VolumePrompt;