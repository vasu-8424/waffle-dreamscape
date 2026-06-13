import { motion } from "framer-motion";
import { Instagram, Facebook, ArrowUp } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Menu", href: "#menu" },
  { label: "Locations", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/justwaffles", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/justwaffles", label: "Facebook" },
];

export default function FooterSection() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative pt-20 pb-10 px-6 overflow-hidden">
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-display font-bold text-white mb-4">
              JUST <span className="text-brand-orange">WAFFLES</span>
            </h3>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Bengaluru&apos;s premier destination for premium eggless waffle experiences.
              Taste the innovation. Enjoy More.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-brand-orange/20 hover:text-brand-orange transition-all text-zinc-400"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium text-sm uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-3">
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
                    className="text-zinc-400 hover:text-brand-turquoise transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium text-sm uppercase tracking-widest mb-6">Contact</h4>
            <div className="space-y-3 text-sm">
              <p className="text-zinc-400">+91 99807 73895</p>
              <p className="text-zinc-400">justwaffles2024@gmail.com</p>
              <p className="text-zinc-400">
                Kammanahalli, Bengaluru
                <br />
                Karnataka 560084
              </p>
              <p className="text-zinc-500 text-xs mt-4">Open Daily: 11:00 AM – 12:00 AM</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
          <p className="text-zinc-500 text-xs">
            © 2024 Just Waffles Bengaluru. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
