import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Signature", href: "#signature" },
  { label: "Menu", href: "#menu" },
  { label: "Journey", href: "#journey" },
  { label: "Locations", href: "#locations" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-bg-primary border-b border-border py-3 shadow-sm" : "bg-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/logo.png"
              alt="Just Waffles Logo"
              className={`w-auto object-contain filter drop-shadow-md transition-all duration-500 ${
                scrolled ? "h-16 md:h-20" : "h-28 md:h-36"
              }`}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className={`text-[13px] font-sans font-bold tracking-widest uppercase transition-colors duration-300 relative py-1 group ${
                  scrolled
                    ? "text-brand-orange-dark hover:text-brand-orange"
                    : "text-brand-orange hover:text-brand-orange-dark"
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-orange group-hover:w-full transition-all duration-300 ease-out" />
              </button>
            ))}
            <a
              href="https://wa.me/919980773895"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[50px] px-8 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs uppercase tracking-widest font-semibold inline-flex items-center justify-center transition-all duration-300 rounded-[8px]"
            >
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-1 transition-colors duration-300 ${
              scrolled ? "text-brown-900" : "text-[#FCFBF8]"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg-primary flex flex-col justify-between px-8 py-24 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-8 mt-10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="text-left text-3xl font-display font-bold text-brand-orange-dark hover:text-brand-orange transition-colors tracking-wide"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="h-px bg-border" />
              <a
                href="https://wa.me/919980773895"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="w-full h-[52px] bg-brand-orange hover:bg-brand-orange-hover text-white text-xs uppercase tracking-widest font-semibold inline-flex items-center justify-center transition-all duration-300 rounded-[8px]"
              >
                Book Now
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
