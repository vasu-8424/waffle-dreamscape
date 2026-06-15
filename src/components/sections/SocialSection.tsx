import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { label: "Followers", value: "12K+", platform: "Instagram" },
  { label: "Posts", value: "500+", platform: "Instagram" },
  { label: "Likes", value: "50K+", platform: "Instagram" },
  { label: "Reviews", value: "4.8★", platform: "Google" },
];

export default function SocialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-brand-orange/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-turquoise/5 blur-[100px] rounded-full" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-turquoise font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            Join the Community
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-4">
            Follow the <span className="text-brand-orange">Crunch</span>
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Tag us @justwaffles and share your waffle moments. We feature our favourites every week.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            >
              <p className="text-3xl font-display font-bold text-white mb-1">{stat.value}</p>
              <p className="text-zinc-500 text-xs uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Social CTA */}
        <motion.div
          className="glass-card rounded-3xl p-10 md:p-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Share Your <span className="text-brand-orange">Waffle Story</span>
          </h3>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            Every waffle has a story. Share yours with #JustWaffles and #EnjoyMore for a chance to be featured.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/justwaffles_enjoymore?igsh=MXZwN3V6bDVkNTk0OA=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-brand-orange text-white rounded-full font-medium hover:shadow-[0_0_30px_rgba(255,122,0,0.3)] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              Follow on Instagram
            </a>
            <a
              href="https://www.facebook.com/share/18nYrz5vDp/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 glass-card-strong text-white rounded-full font-medium hover:bg-white/10 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              Like on Facebook
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
