import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layers, RotateCcw, Flame, Droplets, Heart } from "lucide-react";
import imgFlour from "@/assets/opt-0F0A9281.jpg";
import imgBatter from "@/assets/opt-0F0A9288.jpg";
import imgPress from "@/assets/opt-0F0A9310.jpg";
import imgDrizzle from "@/assets/opt-0F0A9362.jpg";
import imgServe from "@/assets/opt-0F0A9279.jpg";

const steps = [
  {
    number: "01",
    title: "Sifted Flour",
    desc: "We source custom-milled flour of exceptional quality, double-sifting to achieve an airy structure that defines our signature waffle crumb.",
    image: imgFlour,
    icon: Layers,
  },
  {
    number: "02",
    title: "Silken Batter",
    desc: "Folded gently by hand with pure organic dairy, our eggless recipe rests at a cooled temperature to slow-mature the flavors.",
    image: imgBatter,
    icon: RotateCcw,
  },
  {
    number: "03",
    title: "Precision Press",
    desc: "Ladle by ladle, the batter is poured into high-density cast iron grids heated to a precise temperature, baking to a perfect golden brown.",
    image: imgPress,
    icon: Flame,
  },
  {
    number: "04",
    title: "Artisanal Drizzle",
    desc: "Rich single-origin Belgian chocolate is melted at precise temp and cascaded over the crisp waffle pockets in a fine, elegant drizzle.",
    image: imgDrizzle,
    icon: Droplets,
  },
  {
    number: "05",
    title: "Fresh Presentation",
    desc: "Presented warm on minimalist stone dishes. We believe desserts should be enjoyed fresh, creating moments of culinary bliss.",
    image: imgServe,
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
      className="relative bg-bg-secondary py-36 px-8 md:px-12 overflow-hidden z-20 border-b border-border"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-28">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.4em] text-brand-teal mb-4 block">
            Craftsmanship
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-light text-brown-900 leading-tight tracking-tight">
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

          <div className="space-y-24 md:space-y-36">
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
                      <h3 className="text-2xl md:text-3xl font-display font-light text-brown-900 mb-4 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-text-secondary font-sans font-light">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
