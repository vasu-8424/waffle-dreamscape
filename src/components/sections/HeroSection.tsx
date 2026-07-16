import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/opt-one.jpg";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll position for image scale/zoom effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Map scroll progress to subtle zoom (1.0 -> 1.05) and vertical parallax
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center bg-[#2B1A12] overflow-hidden z-20"
    >
      {/* 8K Cinematic Background Image Container */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none"
        style={{ scale, y: yTranslate }}
      >
        <img
          src={heroBg}
          alt="Cinematic gourmet waffle with glossy chocolate drizzle"
          className="w-full h-full object-cover object-right grayscale-[5%] brightness-[95%]"
          loading="eager"
        />
      </motion.div>

      {/* Subtle Gradient Overlay for Text Readability */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.35) 45%, rgba(0, 0, 0, 0.10) 75%, transparent 100%)"
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-8 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (Luxury Content Box) */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center text-left max-w-[620px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.span
              className="text-[9px] font-sans font-bold uppercase tracking-[0.6em] text-brand-teal mb-6 block"
              variants={fadeUpVariants}
            >
              ESTABLISHED • BENGALURU • 2024
            </motion.span>

            {/* Headline (Serif 90-110px desktop, White, 1 Teal highlight word) */}
            <h1 className="font-display font-light text-5xl sm:text-7xl md:text-8xl lg:text-[90px] xl:text-[105px] text-[#FCFBF8] tracking-tight leading-[0.95] mb-8 select-none">
              <motion.span className="block" variants={fadeUpVariants}>
                Where
              </motion.span>
              <motion.span className="block" variants={fadeUpVariants}>
                Every Waffle
              </motion.span>
              <motion.span className="block font-serif italic text-brand-teal" variants={fadeUpVariants}>
                Becomes Art.
              </motion.span>
            </h1>

            {/* Description (max 3 lines, light warm cream) */}
            <motion.p
              className="text-[14px] sm:text-[15px] leading-relaxed text-[#FCFBF8]/80 font-sans font-light mb-10"
              variants={fadeUpVariants}
            >
              Handcrafted eggless waffles prepared with carefully selected
              ingredients, premium chocolate and artisanal techniques that
              transform every bite into an unforgettable experience.
            </motion.p>

            {/* Buttons (strictly 56px height, 8px radius) */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeUpVariants}
            >
              <button
                onClick={() => {
                  document.querySelector("#signature")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="h-14 px-8 bg-brand-orange text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:bg-brand-orange-hover rounded-[8px] cursor-pointer"
              >
                Explore Menu
              </button>

              <button
                onClick={() => {
                  document.querySelector("#locations")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="h-14 px-8 bg-transparent text-white border border-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:bg-white hover:text-brown-900 rounded-[8px] cursor-pointer"
              >
                Find Boutique
              </button>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
        <span className="text-[9px] font-sans font-medium uppercase tracking-[0.25em] text-[#FCFBF8]/60">
          Scroll
        </span>
        <div className="w-[1.5px] h-12 bg-white/20 relative overflow-hidden rounded-full">
          <motion.div 
            className="absolute top-0 left-0 right-0 h-4 bg-brand-teal rounded-full"
            animate={{
              y: [0, 32, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  );
}
