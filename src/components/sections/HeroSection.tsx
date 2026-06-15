import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Waffle3D from "../Waffle3D";
import MagneticButton from "../MagneticButton";

// Animating Counter component
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = 40;
    const steps = duration / stepTime;
    const increment = value / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}{suffix}</span>;
}

// Decimal Counter component for Ratings
function DecimalCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0.0);
  useEffect(() => {
    let start = 0.0;
    const target = value;
    const timer = setInterval(() => {
      start += 0.1;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Number(start.toFixed(1)));
      }
    }, 40);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count.toFixed(1)}{suffix}</span>;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll tracking for parallax and reveal fades
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.45], [0, -80]);
  const textScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.96]);

  const visualScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.35]);
  const visualY = useTransform(scrollYProgress, [0, 0.7], [0, 100]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.7, 0.85], [1, 1, 0]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        section.style.setProperty("--mouse-x", `${x}px`);
        section.style.setProperty("--mouse-y", `${y}px`);
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-black noise-overlay z-10"
    >
      {/* 1. Volumetric spotlight following the cursor */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 opacity-70"
        style={{
          background: `radial-gradient(900px circle at var(--mouse-x, 50vw) var(--mouse-y, 45vh), rgba(227,122,36,0.08) 0%, rgba(47,166,154,0.04) 50%, transparent 100%)`,
        }}
      />

      {/* 2. Premium background gradients and mesh lighting beams */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-brand-orange/10 blur-[140px] rounded-full animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-brand-turquoise/8 blur-[140px] rounded-full animate-glow-pulse pointer-events-none" style={{ animationDelay: "-4s" }} />

      {/* Volumetric Moving light beams */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[60%] bg-gradient-to-tr from-transparent via-brand-orange/5 to-transparent rotate-12 blur-3xl transform animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[120%] h-[60%] bg-gradient-to-bl from-transparent via-brand-turquoise/5 to-transparent -rotate-12 blur-3xl transform animate-pulse" style={{ animationDuration: "16s", animationDelay: "2s" }} />
      </div>

      {/* 3. Cinematic 100vh Layout (40% Content / 60% Visual on desktop) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex-1 flex flex-col justify-center pt-28 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center w-full my-auto">
          
          {/* Left Column: 40% Content Block */}
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left z-20">
            <motion.span
              className="inline-block text-brand-turquoise font-mono text-xs uppercase tracking-[0.45em] mb-5 font-semibold"
              style={{ opacity: textOpacity, y: textY }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Bengaluru&apos;s Original Waffle Experience
            </motion.span>

            <motion.h1
              className="font-display font-extrabold text-[13vw] sm:text-[10vw] lg:text-[7.5rem] xl:text-[8.5rem] tracking-tighter leading-[0.85] mb-6 select-none"
              style={{ opacity: textOpacity, y: textY, scale: textScale }}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              JUST
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-orange via-amber-300 to-brand-turquoise text-glow-orange animate-pulse">
                WAFFLES
              </span>
            </motion.h1>

            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-4 max-w-md mx-auto lg:mx-0"
            >
              <p className="text-lg md:text-xl text-zinc-100 font-display font-medium tracking-wide">
                Crafted Fresh. Served Warm. Enjoyed More.
              </p>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans font-normal">
                Premium Eggless Waffles made with carefully selected ingredients and innovative recipes.
              </p>
            </motion.div>

            {/* CTA Buttons with premium glassmorphism and glow borders */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start items-center mt-8"
              style={{ opacity: textOpacity, y: textY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <MagneticButton
                onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3.5 bg-brand-orange text-black rounded-full font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(227,122,36,0.3)] hover:shadow-[0_0_40px_rgba(227,122,36,0.5)] hover:bg-brand-orange/95 transition-all cursor-pointer relative overflow-hidden"
              >
                Explore Waffles
              </MagneticButton>

              <MagneticButton
                onClick={() => document.querySelector("#locations")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3.5 glass-card-strong text-white border border-white/10 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer"
              >
                Visit Store
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: 60% Visual (Interactive 3D Cinematic Showcase) */}
          <div className="lg:col-span-7 flex items-center justify-center relative w-full h-[55vh] lg:h-[75vh]">
            <motion.div 
              className="w-full h-full flex items-center justify-center z-10"
              style={{ scale: visualScale, y: visualY, opacity: visualOpacity }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Waffle3D />
            </motion.div>
          </div>

        </div>
      </div>

      {/* 4. Floating Glassmorphism Stats Bar */}
      <motion.div
        className="w-full max-w-5xl mx-auto mt-auto mb-10 px-6 z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <div className="glass-card rounded-3xl p-5 md:py-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border border-white/5 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          {/* Stat 1 */}
          <div className="text-center flex flex-col items-center justify-center md:border-r border-white/5 last:border-0 pr-2 last:pr-0">
            <span className="text-amber-400 text-xs mb-1">★★★★★</span>
            <h4 className="text-xl md:text-2xl font-display font-extrabold text-white">
              <DecimalCounter value={4.8} />+
            </h4>
            <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Rating</p>
          </div>
          {/* Stat 2 */}
          <div className="text-center flex flex-col items-center justify-center md:border-r border-white/5 last:border-0 pr-2 last:pr-0">
            <span className="text-brand-turquoise text-xs mb-1">🍀</span>
            <h4 className="text-xl md:text-2xl font-display font-extrabold text-white">
              <Counter value={100} />%
            </h4>
            <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Eggless</p>
          </div>
          {/* Stat 3 */}
          <div className="text-center flex flex-col items-center justify-center md:border-r border-white/5 last:border-0 pr-2 last:pr-0">
            <span className="text-brand-orange text-xs mb-1">📅</span>
            <h4 className="text-xl md:text-2xl font-display font-extrabold text-white">
              <Counter value={2024} />
            </h4>
            <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Founded</p>
          </div>
          {/* Stat 4 */}
          <div className="text-center flex flex-col items-center justify-center last:border-0">
            <span className="text-brand-turquoise text-xs mb-1">📍</span>
            <h4 className="text-xl md:text-2xl font-display font-extrabold text-white">
              <Counter value={4} />+
            </h4>
            <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Locations</p>
          </div>
        </div>
      </motion.div>

      {/* 5. Premium Glowing Scroll Line Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3.5 z-20 pointer-events-auto cursor-pointer"
        onClick={() => document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-500 hover:text-brand-orange transition-colors">Scroll</span>
        <div className="w-[1.5px] h-14 bg-zinc-800/80 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 right-0 w-full bg-gradient-to-b from-brand-orange via-amber-300 to-brand-turquoise"
            style={{ height: "40%" }}
            animate={{
              y: ["-100%", "250%"]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
