import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroWaffle from "@/assets/hero-waffle.jpg";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ opacity, scale }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-orange/15 blur-[120px] rounded-full animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-turquoise/15 blur-[120px] rounded-full animate-glow-pulse" style={{ animationDelay: "-4s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-orange/5 blur-[150px] rounded-full" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.span
          className="inline-block text-brand-turquoise font-mono text-xs uppercase tracking-[0.3em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Bengaluru&apos;s Premium Original
        </motion.span>

        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-display font-bold text-white leading-[0.9] tracking-tight mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          JUST
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-turquoise text-glow-orange">
            WAFFLES
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Bengaluru&apos;s Most Loved Waffle Experience
        </motion.p>

        <motion.p
          className="text-sm text-zinc-500 max-w-md mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Crafted fresh. Served warm. Enjoyed more.
          <br />
          Premium eggless waffles made with high-quality ingredients.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <button
            onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-8 py-4 bg-brand-orange text-white rounded-full font-medium overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,122,0,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Waffles
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <button
            onClick={() => document.querySelector("#locations")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 glass-card-strong text-white rounded-full font-medium hover:bg-white/10 transition-all"
          >
            Visit Store
          </button>
        </motion.div>
      </div>

      {/* Hero waffle image with parallax */}
      <motion.div
        className="relative mt-12 w-full max-w-lg mx-auto"
        style={{ y }}
      >
        <div
          className="relative animate-float-slow"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div className="absolute inset-0 bg-brand-orange/30 blur-[80px] rounded-full scale-75 animate-glow-pulse" />
          <img
            src={heroWaffle}
            alt="Premium Belgian waffle with chocolate drizzle"
            className="relative z-10 w-full h-auto drop-shadow-[0_20px_60px_rgba(255,122,0,0.2)]"
            width={1024}
            height={1024}
          />
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-10 -left-8 w-16 h-16 glass-card rounded-2xl rotate-12 animate-float"
          style={{ animationDelay: "-1s" }}
        />
        <motion.div
          className="absolute bottom-20 -right-6 w-12 h-12 glass-card rounded-xl -rotate-12 animate-float"
          style={{ animationDelay: "-3s" }}
        />
        <motion.div
          className="absolute top-1/2 -right-12 w-8 h-8 bg-brand-turquoise/20 rounded-full blur-sm animate-float"
          style={{ animationDelay: "-2s" }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
        <motion.div
          className="w-5 h-8 border border-zinc-600 rounded-full flex justify-center pt-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-brand-orange rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
