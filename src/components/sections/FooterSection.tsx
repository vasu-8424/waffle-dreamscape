import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Mail, Send, Check } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Menu", href: "#menu" },
  { label: "Team", href: "#team" },
  { label: "Locations", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="relative pt-24 pb-10 px-6 overflow-hidden bg-black/95 z-20">
      
      {/* 1. Shimmering animated top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-brand-orange via-brand-turquoise to-brand-orange bg-[length:200%_auto] animate-shimmer" />
      </div>

      {/* Background glowing particles/circles */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-brand-turquoise/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Sparkles Floating (CSS) */}
      <div className="absolute top-12 left-10 w-2 h-2 bg-brand-orange rounded-full opacity-30 animate-float" style={{ animationDelay: "-2s" }} />
      <div className="absolute bottom-20 left-[15%] w-3 h-3 bg-brand-turquoise rounded-full opacity-20 animate-float" style={{ animationDelay: "-4s" }} />
      <div className="absolute top-1/3 right-12 w-2.5 h-2.5 bg-brand-orange rounded-full opacity-25 animate-float" style={{ animationDelay: "-1s" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Column 1: Large Brand Info & Glowing Logo */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-4 mb-6">
              {/* Floating Large Logo with backlight */}
              <div className="relative">
                <div className="absolute inset-0 bg-brand-orange/20 blur-xl rounded-full scale-110 pointer-events-none" />
                <img
                  src="/logo.png"
                  alt="Just Waffles Logo"
                  className="h-16 w-16 md:h-20 md:w-20 object-contain relative z-10 animate-float"
                />
              </div>
              <h3 className="text-3xl font-display font-extrabold text-white tracking-wide">
                JUST <span className="text-brand-orange">WAFFLES</span>
              </h3>
            </div>
            
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm">
              Bengaluru&apos;s premier destination for premium eggless waffle experiences. Made daily with high-quality ingredients, served warm, and crafted to perfection.
            </p>
            
            {/* Glowing Socials */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/justwaffles_enjoymore?igsh=MXZwN3V6bDVkNTk0OA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 glass-card rounded-full flex items-center justify-center hover:bg-brand-orange/20 hover:text-brand-orange hover:shadow-[0_0_15px_rgba(255,122,0,0.4)] transition-all text-zinc-400 cursor-pointer"
                aria-label="Instagram"
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
                  className="text-brand-orange"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/18nYrz5vDp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 glass-card rounded-full flex items-center justify-center hover:bg-brand-turquoise/20 hover:text-brand-turquoise hover:shadow-[0_0_15px_rgba(76,199,193,0.4)] transition-all text-zinc-400 cursor-pointer"
                aria-label="Facebook"
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
                  className="text-brand-turquoise"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.2em] mb-6 font-mono">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.href === "#") {
                        scrollToTop();
                      } else {
                        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-zinc-400 hover:text-brand-turquoise transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.2em] mb-6 font-mono">
              Get in Touch
            </h4>
            <div className="space-y-3.5 text-sm">
              <p className="text-zinc-400 font-mono font-medium">+91 99807 73895</p>
              <p className="text-zinc-400">justwaffles2024@gmail.com</p>
              <p className="text-zinc-400 leading-relaxed">
                No.1188, Ground Floor, 1st Cross,
                <br />
                Keerthi Layout, St Thomas Town,
                <br />
                Post, Kammanahalli, Bengaluru,
                <br />
                Karnataka 560084
              </p>
              <p className="text-zinc-500 text-xs pt-2 font-mono">
                Open Daily: 11:00 AM – 12:00 AM
              </p>
            </div>
          </div>

          {/* Column 4: Join the Waffle Society (Newsletter) */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.2em] mb-4 font-mono">
              Waffle Society
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed mb-6">
              Subscribe to get exclusive discount codes, seasonal flavors, and store updates.
            </p>
            
            <form onSubmit={handleSubscribe} className="w-full relative flex flex-col gap-2">
              <div className="relative w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full glass-card rounded-full py-3.5 pl-5 pr-12 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-brand-orange/50 focus:border-brand-orange/50 transition-all bg-white/[0.02]"
                  required
                  disabled={subscribed}
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-brand-orange/80 transition-colors cursor-pointer"
                  disabled={subscribed}
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              
              <AnimatePresence>
                {subscribed && (
                  <motion.p
                    className="text-brand-turquoise text-[10px] tracking-wide mt-1 font-semibold"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Successfully joined the Waffle Society! Check your inbox.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        {/* Bottom copyright & back to top button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5 text-center md:text-left">
          <p className="text-zinc-500 text-xs font-mono">
            © 2024 Just Waffles Bengaluru. All rights reserved. Made for waffle lovers.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="w-11 h-11 glass-card rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            whileHover={{ y: -4, shadow: "0px 10px 20px rgba(0,0,0,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-4 h-4 text-brand-orange" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
