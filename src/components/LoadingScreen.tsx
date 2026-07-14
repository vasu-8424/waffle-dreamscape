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
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-10 flex flex-col items-center"
          >
            {/* Soft glowing background behind the logo */}
            <div className="absolute inset-0 bg-brand-orange/20 blur-2xl rounded-full scale-75 animate-pulse" />
            <img
              src="/logo.png"
              alt="Just Waffles Logo"
              className="relative z-10 w-44 h-44 md:w-56 md:h-56 object-contain drop-shadow-[0_0_40px_rgba(63,182,164,0.35)] animate-float"
            />
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
