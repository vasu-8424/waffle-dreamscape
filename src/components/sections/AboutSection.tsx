import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  { icon: "🧇", title: "Belgian Waffles", desc: "Classic deep-pocketed perfection" },
  { icon: "🫧", title: "Bubble Waffles", desc: "Crispy spheres of delight" },
  { icon: "🥪", title: "Waffy Wich", desc: "Sandwiched indulgence" },
  { icon: "🍨", title: "Waffle Sundaes", desc: "Scoops of happiness" },
  { icon: "🧊", title: "Polar Waffles", desc: "Cool, creamy & refreshing" },
  { icon: "🔺", title: "Waff-Angle", desc: "Our signature triangle twist" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-turquoise/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-brand-orange font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            Our Story
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
            Not Just Waffles.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-turquoise to-brand-orange">
              An Experience.
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Just Waffles is Bengaluru&apos;s affordable premium waffle brand. We believe every bite should be
            memorable — crafted with passion, served with warmth, and designed to be enjoyed more.
          </p>
        </motion.div>

        {/* Promise badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {["100% Eggless", "Freshly Made", "Hygienically Prepared", "Premium Quality", "Student Friendly"].map((tag) => (
            <span
              key={tag}
              className="px-5 py-2 glass-card rounded-full text-sm text-zinc-300 font-medium"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="glass-card rounded-2xl p-8 group hover:border-brand-orange/30 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-display font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-500 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
