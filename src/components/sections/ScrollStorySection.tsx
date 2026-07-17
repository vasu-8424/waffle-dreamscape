import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import imgBatter from "@/assets/opt-0F0A9288.jpg";

const stages = [
  {
    title: "Flour",
    subtitle: "Premium quality flour, sifted to perfection",
    color: "#5c4731",
    image: "/sifted_flour.png",
  },
  {
    title: "Batter",
    subtitle: "Freshly mixed, smooth as silk",
    color: "#7e5b35",
    image: imgBatter,
  },
  {
    title: "Press",
    subtitle: "Golden grids form in the hot iron",
    color: "#3FB6A4",
    image: "/three.jpg",
  },
  {
    title: "Drizzle",
    subtitle: "Rich chocolate cascades over the warm surface",
    color: "#423724",
    image: "/two.jpg",
  },
  {
    title: "Serve",
    subtitle: "Crafted fresh. Served warm. Enjoyed more.",
    color: "#2FA69A",
    image: "/five.jpg",
  },
];

export default function ScrollStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative"
      style={{ height: `${stages.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Full-Screen Background Images (Cross-fading) */}
        <div className="absolute inset-0 z-0 w-full h-full">
          {stages.map((stage, i) => {
            const stageStart = i / stages.length;
            const stageEnd = (i + 1) / stages.length;
            const stageMid = (stageStart + stageEnd) / 2;

            return (
              <StageImageContent
                key={stage.title}
                stage={stage}
                index={i}
                scrollYProgress={scrollYProgress}
                stageStart={stageStart}
                stageEnd={stageEnd}
                stageMid={stageMid}
              />
            );
          })}

          {/* Immersive Light Vignette Overlay for Premium Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/80 z-10" />
          <div
            className="absolute inset-0 z-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, transparent 20%, rgba(255, 255, 255, 0.85) 100%)",
            }}
          />
        </div>

        {/* Progress bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-30">
          <motion.div className="h-full bg-brand-orange" style={{ width: progressWidth }} />
        </div>

        {/* Cinematic Centered Story Text */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 h-[80vh] flex items-center justify-center">
          <div className="relative w-full h-[50vh] flex items-center justify-center">
            {stages.map((stage, i) => {
              const stageStart = i / stages.length;
              const stageEnd = (i + 1) / stages.length;
              const stageMid = (stageStart + stageEnd) / 2;

              return (
                <StageTextContent
                  key={stage.title}
                  stage={stage}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  stageStart={stageStart}
                  stageEnd={stageEnd}
                  stageMid={stageMid}
                />
              );
            })}
          </div>
        </div>

        {/* Stage counter / dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
          {stages.map((_, i) => (
            <StageDot key={i} index={i} total={stages.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StageTextContent({
  stage,
  index,
  scrollYProgress,
  stageStart,
  stageEnd,
  stageMid,
}: {
  stage: (typeof stages)[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  stageStart: number;
  stageEnd: number;
  stageMid: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [stageStart, stageStart + 0.05, stageMid, stageEnd - 0.05, stageEnd],
    [0, 1, 1, 1, 0],
  );

  const y = useTransform(
    scrollYProgress,
    [stageStart, stageStart + 0.1, stageEnd - 0.1, stageEnd],
    [40, 0, 0, -40],
  );

  const scale = useTransform(
    scrollYProgress,
    [stageStart, stageStart + 0.1, stageEnd - 0.1, stageEnd],
    [0.95, 1, 1, 0.95],
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4"
      style={{ opacity, y, scale }}
    >
      <span className="text-brand-orange font-mono text-xs md:text-sm uppercase tracking-[0.4em] mb-4 block font-bold text-glow-orange">
        Stage {String(index + 1).padStart(2, "0")}
      </span>
      <h3
        className="text-5xl sm:text-6xl md:text-8xl font-display font-extrabold mb-6 tracking-wide drop-shadow-[0_4px_12px_rgba(255,255,255,0.85)]"
        style={{ color: stage.color }}
      >
        {stage.title}
      </h3>
      <p className="text-zinc-100 text-base sm:text-lg md:text-2xl max-w-xl leading-relaxed font-sans font-medium drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]">
        {stage.subtitle}
      </p>
    </motion.div>
  );
}

function StageImageContent({
  stage,
  index,
  scrollYProgress,
  stageStart,
  stageEnd,
  stageMid,
}: {
  stage: (typeof stages)[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  stageStart: number;
  stageEnd: number;
  stageMid: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [stageStart, stageStart + 0.08, stageMid, stageEnd - 0.08, stageEnd],
    [0, 1, 1, 1, 0],
  );

  // Subtle zoom-out effect for a cinematic camera feel
  const imgScale = useTransform(
    scrollYProgress,
    [stageStart, stageMid, stageEnd],
    [1.12, 1.04, 1.0],
  );

  return (
    <motion.div
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity }}
    >
      <motion.img
        src={stage.image}
        alt={stage.title}
        className="w-full h-full object-cover"
        style={{ scale: imgScale }}
      />
    </motion.div>
  );
}

function StageDot({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const backgroundColor = useTransform(
    scrollYProgress,
    [index / total, (index + 0.5) / total],
    ["rgba(255,255,255,0.2)", "#FF7A00"],
  );

  const scale = useTransform(
    scrollYProgress,
    [index / total, (index + 0.5) / total, (index + 1) / total],
    [1, 1.25, 1],
  );

  return (
    <motion.div
      className="w-2 h-2 rounded-full"
      style={{
        backgroundColor,
        scale,
      }}
    />
  );
}
