import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layers, RotateCcw, Flame, Droplets, Heart, Sparkles } from "lucide-react";
import imgBatter from "@/assets/opt-0F0A9288.jpg";

const steps = [
  {
    number: "01",
    title: "Sifted Flour",
    desc: "We source custom-milled flour of exceptional quality, double-sifting to achieve an airy structure that defines our signature waffle crumb.",
    details: "Custom Mill • 00 Fine Standard • Double Aerated",
    image: "/sifted_flour.png",
    icon: Layers,
  },
  {
    number: "02",
    title: "Silken Batter",
    desc: "Folded gently by hand with pure organic dairy, our eggless recipe rests at a cooled temperature to slow-mature the flavors.",
    details: "12-Hour Maturation • Organic Dairy • Egg-Free Recipe",
    image: imgBatter,
    icon: RotateCcw,
  },
  {
    number: "03",
    title: "Precision Press",
    desc: "Ladle by ladle, the batter is poured into high-density cast iron grids heated to a precise temperature, baking to a perfect golden brown.",
    details: "195°C Heated Grids • Poured Ladle-by-Ladle • 180s Bake",
    image: "/three.jpg",
    icon: Flame,
  },
  {
    number: "04",
    title: "Artisanal Drizzle",
    desc: "Rich single-origin Belgian chocolate is melted at precise temp and cascaded over the crisp waffle pockets in a fine, elegant drizzle.",
    details: "Belgian Single-Origin • Temperature Tempered • Cascading Coat",
    image: "/two.jpg",
    icon: Droplets,
  },
  {
    number: "05",
    title: "Fresh Presentation",
    desc: "Presented warm on minimalist stone dishes. We believe desserts should be enjoyed fresh, creating moments of culinary bliss.",
    details: "Stone Plating • Served Piping Hot • Garnish-Finished",
    image: "/five.jpg",
    icon: Heart,
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for the connecting line drawing animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative bg-bg-secondary py-20 lg:py-24 px-8 md:px-12 overflow-hidden z-20 border-b border-border"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-16">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.4em] text-brand-teal mb-4 block">
            Craftsmanship
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-black leading-tight tracking-tight">
            The Experience <span className="font-serif italic text-brand-teal">Process</span>
          </h2>
          <p className="text-xs font-sans tracking-widest text-text-muted uppercase mt-4">
            How we craft perfection, from grain to plate
          </p>
        </div>

        {/* Staggered Vertical Process Steps */}
        <div className="relative">
          {/* Animated Connecting Line */}
          <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[1px] bg-border md:-translate-x-[0.5px] z-0">
            <motion.div
              className="w-full bg-brand-teal origin-top"
              style={{ height: "100%", scaleY: pathLength }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => {
              const isEven = i % 2 === 1;
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-20 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step Icon Badge */}
                  <div className="absolute left-[30px] md:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full border border-border bg-surface shadow-sm">
                    <Icon className="w-4 h-4 text-brand-teal stroke-[1.2]" />
                  </div>

                  {/* Photo Side */}
                  <motion.div
                    className="w-full md:w-1/2 flex justify-center z-10 pl-16 md:pl-0"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="w-full max-w-[420px] aspect-[16/11] md:aspect-[3/2] bg-surface overflow-hidden border border-border rounded-[8px] p-2 shadow-sm">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover rounded-[6px] grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-102"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>

                  {/* Content Side */}
                  <motion.div
                    className="w-full md:w-1/2 flex flex-col justify-center text-left pl-16 md:pl-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="max-w-md">
                      <span className="text-3xl md:text-4xl font-display font-light text-brand-teal/40 block mb-2 font-mono">
                        {step.number}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-black mb-4 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-text-secondary font-sans font-light mb-4">
                        {step.desc}
                      </p>
                      {/* Tech Details Badge */}
                      <span className="inline-block px-3 py-1 bg-surface border border-border rounded-[4px] text-[11px] font-sans font-semibold tracking-wide text-brand-teal">
                        {step.details}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chef's Secret Tip Banner */}
        <div className="mt-20 p-6 bg-surface border border-border rounded-[8px] max-w-3xl mx-auto flex items-start gap-4 shadow-sm text-left relative z-10">
          <div className="p-2 bg-brand-orange/10 rounded-[6px] text-brand-orange mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[12px] font-sans font-bold uppercase tracking-wider text-brown-900 mb-1">Chef's Secret Tip</h4>
            <p className="text-[12px] leading-relaxed text-text-secondary font-sans font-light">
              A slow-maturing cold batter fermentation of 12 hours yields the perfect waffle crispiness without losing internal moisture. Always ensure the iron press is precisely at 195°C before pouring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
