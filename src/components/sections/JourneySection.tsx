import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Store, Star, GraduationCap, PartyPopper, Users } from "lucide-react";

const milestones = [
  { month: "July 2024", title: "Brand Launch", desc: "Just Waffles born in Bengaluru", icon: Rocket },
  { month: "Aug 2024", title: "Multiple Stores", desc: "Opened in Kammanahalli, Vidyaranyapura & more", icon: Store },
  { month: "Sep 2024", title: "4.8+ Ratings", desc: "Loved by thousands of customers", icon: Star },
  { month: "Oct 2024", title: "College Events", desc: "Became the student favourite across campuses", icon: GraduationCap },
  { month: "Nov 2024", title: "Food Festivals", desc: "Featured at Bengaluru's top food festivals", icon: PartyPopper },
  { month: "Dec 2024", title: "Growing Community", desc: "Building a tribe of waffle lovers", icon: Users },
];

export default function JourneySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-brand-orange/5 blur-[100px] rounded-full" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-turquoise font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            Our Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
            The <span className="text-brand-orange">Story</span> So Far
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px" />

          {milestones.map((milestone, i) => {
            const isLeft = i % 2 === 0;
            const Icon = milestone.icon;
            return (
              <motion.div
                key={milestone.title}
                className={`relative flex items-center gap-8 mb-16 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
              >
                {/* Content */}
                <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                  <span className="text-brand-turquoise font-mono text-xs uppercase tracking-[0.2em] mb-2 block">
                    {milestone.month}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">{milestone.title}</h3>
                  <p className="text-zinc-400 text-sm max-w-xs mx-auto md:mx-0">{milestone.desc}</p>
                </div>

                {/* Center dot */}
                <div className="relative z-10 w-16 h-16 glass-card rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${i % 2 === 0 ? "text-brand-orange" : "text-brand-turquoise"}`} />
                </div>

                {/* Spacer for other side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
