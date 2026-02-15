import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { launchFireworks } from '../utils/confetti';

const FinalSurprise: React.FC = () => {
  const [showMainMessage, setShowMainMessage] = useState(false);
  const introText = "From the moment you came into my life...";
  const finalMessage = "Happy Birthday  ❤️";

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
          className="text-rose-200 text-2xl md:text-4xl font-serif-display"
          onAnimationComplete={() => {
            setTimeout(() => setShowMainMessage(true), 3000);
          }}
        >
          {/* Simple Typewriter simulation via CSS steps could be done, but framer is smoother */}
          <Typewriter text={introText} speed={100} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, type: "spring" }}
          className="z-10"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600 drop-shadow-[0_0_25px_rgba(225,29,72,0.8)] leading-tight">
            {finalMessage}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-8 text-rose-200/60 font-serif-display italic"
          >
            I love you more than words can say.
          </motion.p>
        </motion.div>
      )}

      {/* Decorative Fireworks Background Elements (CSS only backup) */}
      {showMainMessage && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-500 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-rose-500 rounded-full animate-ping delay-300" />
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-ping delay-700" />
        </div>
      )}
    </div>
  );
};

const Typewriter = ({ text, speed }: { text: string; speed: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
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

  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
};

export default FinalSurprise;
