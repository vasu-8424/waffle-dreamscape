import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroWaffle from "@/assets/hero-waffle.jpg";

gsap.registerPlugin(ScrollTrigger);

const waffleTypes = [
  { name: "Classic Belgian", desc: "The original. Deep pockets, golden crust, timeless perfection.", image: heroWaffle },
  { name: "Bubble Waffle", desc: "Crispy spheres that pop with flavour in every bite.", image: heroWaffle },
  { name: "Waffy Wich", desc: "Sandwiched indulgence. Two waffles, infinite possibilities.", image: heroWaffle },
  { name: "Polar Waffle", desc: "Cool, creamy & refreshing. A waffle experience like no other.", image: heroWaffle },
  { name: "Bubble Sundae", desc: "Our signature sundae in a bubble waffle bowl.", image: heroWaffle },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const scrollWidth = containerRef.current!.scrollWidth - window.innerWidth;
      gsap.to(containerRef.current, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-luxury-black">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-brand-turquoise/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        className="absolute top-12 left-8 z-10"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="text-brand-orange font-mono text-xs uppercase tracking-[0.3em] mb-2 block">
          The Experience
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
          Scroll to Explore
        </h2>
      </motion.div>

      <div ref={containerRef} className="flex h-full items-center gap-12 px-8 pt-24">
        {waffleTypes.map((type, i) => (
          <motion.div
            key={type.name}
            className="flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[40vw] h-[70vh] relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="glass-card rounded-3xl h-full overflow-hidden relative group">
              <img
                src={type.image}
                alt={type.name}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                width={800}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <span className="text-brand-turquoise font-mono text-xs uppercase tracking-[0.3em] mb-3 block">
                  0{i + 1}
                </span>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  {type.name}
                </h3>
                <p className="text-zinc-300 max-w-md text-lg leading-relaxed">
                  {type.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
