import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 800);
          }, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-luxury-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-orange/20 blur-[100px] rounded-full animate-glow-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-turquoise/20 blur-[100px] rounded-full animate-glow-pulse" style={{ animationDelay: "-4s" }} />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white">
              JUST<span className="text-brand-orange">WAFFLES</span>
            </h1>
            <motion.div
              className="absolute -bottom-2 left-0 h-0.5 bg-brand-orange"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </motion.div>

          {/* Animated waffle icon */}
          <motion.div
            className="w-20 h-20 mb-10 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="15" y="15" width="70" height="70" rx="8" fill="none" stroke="url(#orangeGrad)" strokeWidth="2" />
              <line x1="15" y1="38" x2="85" y2="38" stroke="url(#orangeGrad)" strokeWidth="1.5" opacity="0.6" />
              <line x1="15" y1="62" x2="85" y2="62" stroke="url(#orangeGrad)" strokeWidth="1.5" opacity="0.6" />
              <line x1="38" y1="15" x2="38" y2="85" stroke="url(#orangeGrad)" strokeWidth="1.5" opacity="0.6" />
              <line x1="62" y1="15" x2="62" y2="85" stroke="url(#orangeGrad)" strokeWidth="1.5" opacity="0.6" />
              <defs>
                <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF7A00" />
                  <stop offset="100%" stopColor="#4CC7C1" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-brand-turquoise font-mono text-sm uppercase tracking-[0.3em] mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Enjoy More
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-orange rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <p className="text-white/30 font-mono text-[10px] mt-4 uppercase tracking-widest">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
