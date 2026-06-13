import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlowCard from "@/components/GlowCard";
import { Star, Leaf, Gem, Wallet, ChefHat, Lightbulb } from "lucide-react";

const reasons = [
  {
    icon: Star,
    title: "First Bubble Waffle Sundaes In Bengaluru",
    desc: "We pioneered the bubble waffle sundae experience in the city, setting trends others follow.",
    color: "orange" as const,
  },
  {
    icon: Leaf,
    title: "100% Eggless Recipes",
    desc: "Our secret eggless batter delivers the same golden crunch and fluffy interior without compromise.",
    color: "turquoise" as const,
  },
  {
    icon: Gem,
    title: "Premium Ingredients",
    desc: "From Belgian cocoa to hand-picked blueberries, we source only the world's finest toppings.",
    color: "orange" as const,
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    desc: "Premium taste doesn't need a premium price tag. Student-friendly without cutting corners.",
    color: "turquoise" as const,
  },
  {
    icon: ChefHat,
    title: "Freshly Made Every Order",
    desc: "Every waffle is pressed to order. No heat lamps, no compromises. Freshness is our promise.",
    color: "orange" as const,
  },
  {
    icon: Lightbulb,
    title: "Innovative Waffle Concepts",
    desc: "From Waff-Angle to Polar Waffles, we continuously reinvent what a waffle can be.",
    color: "turquoise" as const,
  },
];

export default function WhySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-brand-orange/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-turquoise font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            Why Us
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
            Why Just <span className="text-brand-orange">Waffles</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            >
              <GlowCard glowColor={reason.color} className="h-full">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  reason.color === "orange" ? "bg-brand-orange/20 text-brand-orange" : "bg-brand-turquoise/20 text-brand-turquoise"
                }`}>
                  <reason.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{reason.desc}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
