import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, MapPin, Award, Bookmark, ShieldCheck, Heart } from "lucide-react";

const milestones = [
  {
    month: "July 2024",
    title: "The Genesis",
    desc: "Just Waffles is born in Bengaluru, reimagining the gourmet dessert landscape.",
    icon: Sparkles,
  },
  {
    month: "August 2024",
    title: "Store Expansion",
    desc: "Opening of new store doors in Kammanahalli, Vidyaranyapura, and Kothanur.",
    icon: MapPin,
  },
  {
    month: "September 2024",
    title: "Excellence Applauded",
    desc: "Acquiring a solid 4.8★ consumer score, praised for pure eggless recipe crafts.",
    icon: Award,
  },
  {
    month: "October 2024",
    title: "Campus Chapters",
    desc: "Partnering with elite institutions to cater artisanal treats for college occasions.",
    icon: Bookmark,
  },
  {
    month: "November 2024",
    title: "Festival Spotlights",
    desc: "Showcasing signature waffle wedges at Bengaluru's premier culinary events.",
    icon: ShieldCheck,
  },
  {
    month: "December 2024",
    title: "The Waffle Tribe",
    desc: "Nurturing a growing community of connoisseurs who seek dessert sophistication.",
    icon: Heart,
  },
];

export default function JourneySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="journey"
      className="relative bg-bg-secondary py-20 lg:py-24 px-8 md:px-12 overflow-hidden z-20 border-b border-border"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-16">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.4em] text-brand-teal mb-4 block">
            Our Narrative
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-black leading-tight tracking-tight">
            The Journey <span className="font-serif italic text-brand-teal">Chronicles</span>
          </h2>
          <p className="text-xs font-sans tracking-widest text-text-muted uppercase mt-4">
            Tracing our pursuit of waffle perfection
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical axis line */}
          <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[1px] bg-border" />

          <div className="space-y-16">
            {milestones.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={milestone.title}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.8 }}
                >
                  {/* Content Block */}
                  <div
                    className={`w-full md:w-1/2 pl-16 md:pl-0 ${isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}
                  >
                    <span className="text-xs font-mono font-semibold tracking-widest text-brand-teal uppercase mb-2 block">
                      {milestone.month}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-black mb-2 tracking-tight">
                      {milestone.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-text-secondary font-light font-sans max-w-sm ml-0 md:ml-auto md:mr-0">
                      {milestone.desc}
                    </p>
                  </div>

                  {/* Dot/Icon on the line */}
                  <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-border bg-surface shadow-sm">
                    <Icon className="w-3.5 h-3.5 text-brand-teal stroke-[1.2]" />
                  </div>

                  {/* Spacer for other side */}
                  <div className="w-full md:w-1/2 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
