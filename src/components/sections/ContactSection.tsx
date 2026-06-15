import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-turquoise/5 blur-[120px] rounded-full" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-orange font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
            Contact <span className="text-brand-turquoise">Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <motion.a
            href="tel:+919980773895"
            className="glass-card rounded-2xl p-8 group hover:border-brand-orange/30 transition-all duration-500 flex items-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-14 h-14 bg-brand-orange/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6 text-brand-orange" />
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-1">Call Us</p>
              <p className="text-2xl font-display font-bold text-white">+91 99807 73895</p>
            </div>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:justwaffles2024@gmail.com"
            className="glass-card rounded-2xl p-8 group hover:border-brand-turquoise/30 transition-all duration-500 flex items-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="w-14 h-14 bg-brand-turquoise/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-brand-turquoise" />
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-1">Email Us</p>
              <p className="text-lg font-display font-bold text-white">justwaffles2024@gmail.com</p>
            </div>
          </motion.a>

          {/* Address */}
          <motion.div
            className="glass-card rounded-2xl p-8 md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-orange/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">Flagship Store</h3>
                </div>
                <p className="text-zinc-400 leading-relaxed mb-4">
                  No.1188, Ground Floor, 1st Cross, Ramamurthy St,
                  <br />
                  Keerthi Layout, St Thomas Town, Post, Kammanahalli,
                  <br />
                  Bengaluru, Karnataka 560084
                </p>
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Clock className="w-4 h-4 text-brand-turquoise" />
                  Monday — Sunday: 11:00 AM – 12:00 AM
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="flex items-center">
                <a
                  href="https://wa.me/919980773895"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-brand-turquoise/20 text-brand-turquoise px-6 py-4 rounded-2xl font-medium hover:bg-brand-turquoise/30 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
