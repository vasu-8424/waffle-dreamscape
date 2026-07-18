import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Leaf, Calendar, MapPin } from "lucide-react";

const stats = [
  {
    value: "4.8★",
    label: "Customer Rating",
    desc: "Averaged across premier platforms",
    icon: Award,
  },
  {
    value: "100%",
    label: "Pure Eggless",
    desc: "Strictly vegetarian, premium sourcing",
    icon: Leaf,
  },
  {
    value: "2024",
    label: "Founded",
    desc: "Crafting dessert dreams in Bengaluru",
    icon: Calendar,
  },
  {
    value: "4+",
    label: "Stores",
    desc: "Serving fresh warm grids daily",
    icon: MapPin,
  },
];

export default function StatsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative bg-bg-primary py-16 px-8 md:px-12 z-20 border-y border-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="p-8 md:p-10 flex flex-col justify-between first:pl-0 last:pr-0"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-brand-teal">
                    Metric 0{i + 1}
                  </span>
                  <Icon className="w-5 h-5 text-brand-teal stroke-[1.2]" />
                </div>

                <div>
                  <h3 className="text-4xl lg:text-5xl font-display font-light text-brown-900 mb-3 tracking-tight">
                    {stat.value}
                  </h3>
                  <h4 className="text-xs font-sans font-semibold tracking-wider uppercase text-brown-900 mb-1">
                    {stat.label}
                  </h4>
                  <p className="text-[12px] text-text-secondary font-light font-sans">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
