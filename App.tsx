import React, { useState, useRef, useEffect } from 'react';
import IntroScene from './components/IntroScene';
import BirthdayIntro from './components/BirthdayIntro';
import PersonalitySection from './components/PersonalitySection';
import MemoryGallery from './components/MemoryGallery';
import BirthdayReveal from './components/BirthdayReveal';
import VideoTribute from './components/VideoTribute';
import VolumePrompt from './components/VolumePrompt';
import ThankYou from './components/ThankYou';
import { AppPhase } from './types';
import { heartExplosion } from './utils/confetti';
import { Volume2, VolumeX, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('volume');
  const [isMuted, setIsMuted] = useState(false);
  const [showTransitionModal, setShowTransitionModal] = useState(false);
  const [allowPersonalityMusic, setAllowPersonalityMusic] = useState(false);

  // Audio Ref 
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and start audio after volume prompt (user interaction)
  const handleVolumeComplete = () => {
    if (!audioRef.current) {
      // New Requested Audio Track
      audioRef.current = new Audio("https://image2url.com/r2/default/files/1771134277831-9e3160a3-9281-4537-ad44-9dd39583650e.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6;

      audioRef.current.onerror = (e) => {
        console.error("Background music failed to load:", e);
      };
    }

    // Play immediately as we are inside a user interaction event
    audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    setIsMuted(false);

    setPhase('intro');
  };

  const startExperience = () => {
    heartExplosion();
    // Transition to Birthday Intro
    setPhase('birthdayIntro');
  };

  // Robust Audio Management
  useEffect(() => {
    if (!audioRef.current) return;

    // Determine if music SHOULD be playing based on all states
    const shouldPlay =
      !isMuted &&
      phase !== 'volume' &&
      phase !== 'video' &&
      phase !== 'final' && // Stop music in final phases (reveal)
      phase !== 'finalVideo' && // Stop music in final video phase
      phase !== 'thankYou' && // Stop music in thank you phase
      (phase !== 'personality' || allowPersonalityMusic);

    if (shouldPlay) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => { });
      }
    } else {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      }
    }
  }, [phase, isMuted, allowPersonalityMusic]);

  // Handler to be called when Paris section is reached
  const handleResumeAudio = () => {
    setAllowPersonalityMusic(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  // Scroll detection to trigger final phase if at bottom of gallery
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // Logic could be added here to auto-advance
  };

  const handleBack = () => {
    switch (phase) {
      case 'personality':
        setPhase('intro');
        setAllowPersonalityMusic(false); // Reset so it doesn't play prematurely on restart
        break;
      case 'gallery':
        setPhase('personality');
        break;
      case 'final':
        setPhase('gallery');
        break;
      case 'video':
        setPhase('final');
        break;
      case 'finalVideo':
        setPhase('video');
        break;
      case 'thankYou':
        setPhase('finalVideo');
        break;
      default:
        break;
    }
  };

  const showBackButton = ['personality', 'gallery', 'final', 'video', 'finalVideo', 'thankYou'].includes(phase);

  return (
    <div className="text-slate-100 min-h-screen font-sans" onScroll={handleScroll}>

      {/* Back Button - Increased Z-Index to 100 to appear over Video Overlay */}
      {showBackButton && (
        <button
          onClick={handleBack}
          className="fixed top-6 left-6 z-[100] p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 text-rose-100 transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] group"
          aria-label="Go Back"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      )}

      {/* Audio Control - Hidden during video/final phase and initially in personality (BMW) to avoid distraction */}
      {phase !== 'volume' && phase !== 'video' && phase !== 'finalVideo' && phase !== 'final' && phase !== 'thankYou' && (
        <button
          onClick={toggleMute}
          className={`fixed top-6 right-6 z-50 p-3 backdrop-blur-md rounded-full border transition-all shadow-lg ${isMuted ? 'bg-red-500/20 border-red-500/50' : 'bg-black/40 border-white/10 hover:bg-white/10'}`}
        >
          {isMuted ? <VolumeX size={20} className="text-rose-400" /> : <Volume2 size={20} className="text-rose-400" />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {phase === 'volume' && (
          <motion.div
            key="volume"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="h-screen w-full"
          >
            <VolumePrompt onComplete={handleVolumeComplete} />
          </motion.div>
        )}

        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="h-screen w-full"
          >
            <IntroScene onStart={startExperience} />
          </motion.div>
        )}

        {phase === 'birthdayIntro' && (
          <motion.div
            key="birthdayIntro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="h-screen w-full relative z-50"
          >
            <BirthdayIntro onComplete={() => setPhase('personality')} />
          </motion.div>
        )}

        {phase === 'personality' && (
          <motion.div
            key="personality"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PersonalitySection onResumeAudio={handleResumeAudio} />

            {/* Transition Trigger */}
            <div className="w-full bg-slate-900 pb-32 pt-10 flex flex-col items-center justify-center gap-6">
              <p className="text-slate-400 font-serif-display italic text-lg animate-pulse">
                Ready to see some memories?
              </p>
              <button
                onClick={() => setShowTransitionModal(true)}
                className="group relative px-8 py-4 bg-transparent border border-rose-500/50 rounded-full text-rose-200 font-serif-display overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]"
              >
                <div className="absolute inset-0 w-0 bg-rose-900/40 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative flex items-center gap-2 text-xl">
                  Continue Journey <ArrowRight size={20} />
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MemoryGallery />

            {/* Bridge to Final Birthday Reveal */}
            <div className="w-full bg-slate-900 py-20 flex justify-center">
              <button
                onClick={() => setPhase('final')}
                className="px-10 py-5 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full text-xl font-serif-display font-bold shadow-[0_0_30px_rgba(225,29,72,0.6)] hover:scale-105 transition-transform flex items-center gap-2"
              >
                Open Special Message 💌
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen w-full"
          >
            {/* Pass handler to go to FIRST video phase */}
            <BirthdayReveal onShowVideo={() => setPhase('video')} />
          </motion.div>
        )}

        {/* Video 1 */}
        {phase === 'video' && (
          <motion.div
            key="video1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }} // Slide left on exit
            className="h-screen w-full"
          >
            <VideoTribute
              videoSrc="https://image2url.com/r2/default/videos/1771143142591-1c94f333-22b6-4b69-9959-75a78f732cc3.mp4"
              onComplete={() => setPhase('finalVideo')}
              onBack={handleBack}
              isEnd={false}
              heading="A Special Moment..."
              buttonText="One Last Surprise 🎥"
            />
          </motion.div>
        )}

        {/* Video 2 (Final) */}
        {phase === 'finalVideo' && (
          <motion.div
            key="video2"
            initial={{ opacity: 0, x: 50 }} // Slide from right
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="h-screen w-full"
          >
            <VideoTribute
              // Placeholder for the second video. You can change this URL to the new video.
              videoSrc="https://image2url.com/r2/default/videos/1771133282505-edec03cf-fea2-4948-b60f-2723f6431a4e.mp4"
              onBack={handleBack}
              onComplete={() => setPhase('thankYou')}
              isEnd={false} // Allow completion to go to next phase
              buttonText="Finale ✨"
              heading="Our Memories Forever..."
            />
          </motion.div>
        )}

        {/* Thank You Phase */}
        {phase === 'thankYou' && (
          <motion.div
            key="thankYou"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen w-full"
          >
            <ThankYou />
          </motion.div>
        )}

      </AnimatePresence>

      {/* TRANSITION CONFIRMATION MODAL */}
      <AnimatePresence>
        {showTransitionModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-slate-900 border border-rose-500/30 p-8 rounded-2xl max-w-sm w-full text-center shadow-[0_0_50px_rgba(225,29,72,0.2)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-yellow-500" />

              <h3 className="text-3xl font-serif-display text-white mb-4">Can we go next? 🥺</h3>
              <p className="text-slate-300 mb-8 font-light text-lg">
                I've collected some special moments just for you.
              </p>

              <div className="flex gap-4 justify-center items-center">
                <button
                  onClick={() => setShowTransitionModal(false)}
                  className="px-4 py-2 text-slate-500 hover:text-white transition-colors"
                >
                  Not yet
                </button>
                <button
                  onClick={() => {
                    setShowTransitionModal(false);
                    setPhase('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full font-bold shadow-lg transition-transform hover:scale-105 hover:shadow-[0_0_20px_rgba(225,29,72,0.5)]"
                >
                  Yes, let's go! 🚀
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;