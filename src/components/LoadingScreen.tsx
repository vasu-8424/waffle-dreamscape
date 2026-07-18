import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 1. Block scrolling on body while loading screen is active
    document.body.style.overflow = "hidden";

    // 2. Set up smooth fast progress increments
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 800); // Waits for the 0.8s Framer Motion exit animation
          }, 200); // Reduced delay before starting fade-out from 400ms to 200ms
          return 100;
        }

        // If page assets are already fully loaded, accelerate loading bar progress
        const isPageLoaded = typeof document !== "undefined" && document.readyState === "complete";
        const increment = isPageLoaded
          ? Math.random() * 25 + 15 // Fast load: increments of 15% - 40%
          : Math.random() * 12 + 6; // Standard load: increments of 6% - 18%

        return prev + increment;
      });
    }, 45); // Faster tick rate (45ms instead of 80ms)

    return () => {
      // 3. Restore scrolling when unmounted
      document.body.style.overflow = "";
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary noise-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Minimal Brand Identifier */}
          <div className="flex flex-col items-center justify-center">
            <motion.img
              src="/logo.png"
              alt="Just Waffles Logo"
              className="w-28 h-28 md:w-36 md:h-36 object-contain mb-6 animate-float"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.p
              className="text-[10px] font-sans font-medium uppercase tracking-[0.4em] text-text-secondary mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Enjoy More
            </motion.p>
          </div>

          {/* Clean Thin Progress Bar */}
          <div className="mt-16 w-32 h-[1px] bg-border relative">
            <motion.div
              className="h-full bg-brand-orange"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>

          <p className="text-[10px] font-mono tracking-widest text-text-muted mt-3 uppercase">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
