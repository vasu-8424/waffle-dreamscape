import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Priya S.",
    rating: 5,
    text: "The best waffles I've ever had in Bengaluru! The Brownielicious Waffy Tree is absolutely divine. Can't believe it's eggless!",
    tag: "Student Favourite",
  },
  {
    name: "Rahul M.",
    rating: 5,
    text: "Premium quality at student-friendly prices. The bubble waffle sundae is a game-changer. My go-to spot after college.",
    tag: "Regular Customer",
  },
  {
    name: "Ananya K.",
    rating: 5,
    text: "Finally, a waffle place that understands what 'premium' means without breaking the bank. The KitKat Waffy Wich is my weakness!",
    tag: "Food Blogger",
  },
  {
    name: "Vikram R.",
    rating: 5,
    text: "Took my family here and everyone loved it. From kids to grandparents, there's something for everyone. 10/10 would recommend.",
    tag: "Family Visit",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] bg-brand-orange/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-orange font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            Customer Love
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-6">
            Loved by <span className="text-brand-turquoise">Thousands</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-brand-orange text-brand-orange" />
            ))}
          </div>
          <p className="text-zinc-400 font-mono text-sm">4.8+ Average Rating across all platforms</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="glass-card rounded-3xl p-10 md:p-14 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-display italic">
                "{testimonials[active].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-10 h-10 bg-brand-orange/20 rounded-full flex items-center justify-center text-brand-orange font-bold text-sm">
                  {testimonials[active].name[0]}
                </div>
                <div className="text-left">
                  <p className="text-white font-medium text-sm">{testimonials[active].name}</p>
                  <span className="text-brand-turquoise font-mono text-[10px] uppercase tracking-widest">
                    {testimonials[active].tag}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === active ? "bg-brand-orange w-6" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setActive((prev) => (prev + 1) % testimonials.length)}
              className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
