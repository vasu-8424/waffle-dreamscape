import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Menu", href: "#menu" },
  { label: "Journey", href: "#journey" },
  { label: "Locations", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-luxury-black/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-xl font-semibold tracking-tight text-white font-display">
            JUST <span className="text-brand-orange">WAFFLES</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-orange group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <button
              onClick={() => handleClick("#contact")}
              className="bg-brand-orange text-white px-5 py-2 rounded-full text-sm font-medium ring-1 ring-brand-orange ring-offset-2 ring-offset-luxury-black transition-transform hover:scale-105 active:scale-95"
            >
              Order Now
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-luxury-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-2xl font-display text-white hover:text-brand-orange transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => handleClick("#contact")}
              className="mt-4 bg-brand-orange text-white px-8 py-3 rounded-full text-lg font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Order Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
