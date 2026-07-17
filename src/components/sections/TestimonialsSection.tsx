import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Star, CheckCircle, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya S.",
    rating: 5,
    text: "The best waffles I've ever had in Bengaluru. The Brownielicious Waffy Tree is absolutely divine—delicate, crispy, and amazingly eggless.",
    tag: "Verified Guest",
  },
  {
    name: "Rahul M.",
    rating: 5,
    text: "Exceptional quality and flavor restraint. The bubble waffle sundae is a masterpiece. My go-to spot for gourmet dessert cravings.",
    tag: "Verified Guest",
  },
  {
    name: "Ananya K.",
    rating: 5,
    text: "A waffle house that truly understands premium dessert architecture. The KitKat Waffy Wich is beautifully structured and rich.",
    tag: "Connoisseur",
  },
  {
    name: "Vikram R.",
    rating: 5,
    text: "We ordered a selection for a private gathering, and the balance of sweetness and texture was a hit with guests of all ages.",
    tag: "Verified Guest",
  },
  {
    name: "Sneha P.",
    rating: 5,
    text: "Crispy grids on the outside, incredibly light and warm inside. The packaging for takeout preserves the crispness perfectly.",
    tag: "Local Regular",
  },
  {
    name: "Karan D.",
    rating: 5,
    text: "The waffle sandwich is incredibly innovative. The gourmet chocolate coating has a deep cocoa flavor that isn't overly sweet.",
    tag: "Chocolate Critic",
  },
];

export default function TestimonialsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="bg-bg-secondary py-20 lg:py-24 px-8 md:px-12 z-20 border-b border-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-16">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.4em] text-brand-teal mb-4 block">
            Guest Journal
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-black leading-tight tracking-tight">
            Loved by <span className="font-serif italic text-brand-teal">Connoisseurs</span>
          </h2>
          <p className="text-xs font-sans tracking-widest text-text-muted uppercase mt-4">
            Read stories of sweet indulgence from our visitors
          </p>
        </div>

        {/* Static Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              className="p-8 md:p-10 bg-surface border border-border flex flex-col justify-between relative rounded-[8px] shadow-sm hover:border-brown-700 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.8 }}
            >
              {/* quote mark at top */}
              <div className="mb-6 flex justify-between items-center">
                <Quote className="w-4 h-4 text-brand-teal stroke-[1.2]" />
                <div className="flex gap-0.5">
                  {[...Array(item.rating)].map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className="w-3.5 h-3.5 fill-brand-orange text-brand-orange"
                    />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-brown-900 font-display font-light italic text-[15px] leading-relaxed mb-8">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Author Details */}
              <div className="flex items-center gap-3 pt-6 border-t border-border mt-auto">
                <div className="w-8 h-8 rounded-full bg-bg-secondary text-brown-900 flex items-center justify-center font-display font-light text-sm border border-border">
                  {item.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-sans font-semibold text-brown-900 flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle className="w-3 h-3 text-brand-teal" />
                  </h4>
                  <span className="text-[9px] font-sans tracking-widest uppercase text-text-muted mt-0.5 block">
                    {item.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Accolades and Trust Badges Bar */}
        <div className="mt-16 pt-8 border-t border-border/60 flex flex-wrap justify-center items-center gap-12 lg:gap-20 text-center">
          {[
            { value: "4.8★", label: "Swiggy & Zomato Rating" },
            { value: "10,000+", label: "Happy Waffle Lovers" },
            { value: "5/5 Stars", label: "Average Google Rating" },
            { value: "100% Eggless", label: "Artisanal Recipe Crafts" },
          ].map((acc, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-xl lg:text-2xl font-display font-bold text-brand-teal">{acc.value}</span>
              <span className="text-[10px] font-sans font-semibold tracking-wider text-text-muted uppercase mt-1">{acc.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
