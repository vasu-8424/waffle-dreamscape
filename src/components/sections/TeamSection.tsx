import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import divyaImg from "@/assets/divya.png";
import venkatImg from "@/assets/venkat.png";
import vinodImg from "@/assets/vinod.png";

const teamMembers = [
  {
    name: "Divyateja Baireddy",
    role: "Co-Founder",
    desc: "A banker by profession possessing sharp financial and marketing insight. A baker by passion holding deep experience in waffle craftsmanship. Divya directs brand strategy, financial operations, and culinary R&D.",
    image: divyaImg,
  },
  {
    name: "Venkatesh Kovuru",
    role: "Co-Founder",
    desc: "A professional tax consultant having previously served at Deloitte and PwC. Venkatesh leads store operations, franchise licensing systems, and supply chain logistics to guarantee premium service.",
    image: venkatImg,
  },
  {
    name: "Vinod Achuthan",
    role: "Co-Promoter & Advisor",
    desc: "An engineer and serial investor with extensive operations in F&B. Vinod operates multiple franchised store locations and guides brand development, corporate advisory boards, and expansion strategies.",
    image: vinodImg,
  },
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="team"
      className="relative bg-bg-primary py-20 lg:py-24 px-8 md:px-12 overflow-hidden z-20 border-b border-border"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-16">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.4em] text-brand-teal mb-4 block">
            Behind the Dreams
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-black leading-tight tracking-tight">
            The Brand <span className="font-serif italic text-brand-teal">Founders</span>
          </h2>
          <p className="text-xs font-sans tracking-widest text-text-muted uppercase mt-4">
            Meet the pioneers crafting Bengaluru's premium waffle brand
          </p>
        </div>

        {/* Members Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              className="flex flex-col text-left group"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              {/* Portrait Image Frame */}
              <div className="relative aspect-[4/5] bg-bg-secondary border border-border overflow-hidden mb-6 rounded-[8px] p-2 shadow-sm bg-surface">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 hover:scale-102 rounded-[6px]"
                  loading="lazy"
                />
              </div>

              {/* Founder info */}
              <span className="text-[10px] font-sans font-bold tracking-widest text-brand-teal uppercase mb-1.5">
                {member.role}
              </span>

              <h3 className="text-xl md:text-2xl font-display font-light text-brown-900 mb-4 tracking-tight">
                {member.name}
              </h3>

              <p className="text-[13px] leading-relaxed text-text-secondary font-sans font-light">
                {member.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
