import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, ArrowLeft } from 'lucide-react';

interface VideoTributeProps {
  videoSrc: string;
  onComplete?: () => void;
  onBack?: () => void;
  isEnd?: boolean;
  heading?: string;
  buttonText?: string;
}

const VideoTribute: React.FC<VideoTributeProps> = ({ 
  videoSrc, 
  onComplete,
  onBack,
  isEnd = false,
  heading,
  buttonText 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset play state when video source changes
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
        videoRef.current.load();
    }
  }, [videoSrc]);

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const defaultHeading = isEnd ? "Our Memories Forever..." : "A Special Moment...";
  const defaultButtonText = "Continue to Next Surprise";

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center relative z-50 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black opacity-80" />
      
      <motion.div
        key={videoSrc} // Force re-render animation when video changes
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center justify-center h-full py-10"
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-cursive text-rose-200 mb-6 text-center shrink-0"
        >
          {heading || defaultHeading}
        </motion.h2>

        {/* Video Container */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[60vh] md:h-[70vh] bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.3)] border border-rose-900/30 group flex items-center justify-center"
        >
          <video 
            ref={videoRef}
            className="max-w-full max-h-full object-contain"
            loop
            playsInline
            onClick={handlePlayToggle}
            onEnded={() => setIsPlaying(false)}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors cursor-pointer z-20" onClick={handlePlayToggle}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 bg-rose-600/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg border border-white/20 pl-1"
              >
                <Play size={32} fill="white" className="text-white" />
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 shrink-0 pb-10 flex gap-4 items-center"
        >
              {onBack && (
                  <button 
                    onClick={onBack}
                    className="group flex items-center gap-3 px-6 py-4 bg-transparent border border-white/20 rounded-full text-white/50 hover:text-white hover:border-white transition-all duration-300"
                  >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-serif-display tracking-widest uppercase text-xs">Back</span>
                  </button>
              )}

              {!isEnd && (
                <button 
                  onClick={onComplete}
                  className="group flex items-center gap-3 px-8 py-4 bg-transparent border border-rose-500/30 rounded-full text-rose-100/70 hover:text-white hover:border-rose-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]"
                >
                  <span className="font-serif-display tracking-widest uppercase text-sm">{buttonText || defaultButtonText}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VideoTribute;