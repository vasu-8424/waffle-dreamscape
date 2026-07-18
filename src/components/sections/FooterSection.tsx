import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Send, Check } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Experience", href: "#experience" },
  { label: "Signature Collection", href: "#signature" },
  { label: "Gourmet Menu", href: "#menu" },
  { label: "Our Journey", href: "#journey" },
  { label: "Locations", href: "#locations" },
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
    <footer className="relative bg-bg-primary pt-28 pb-12 px-8 md:px-12 z-20 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Just Waffles Logo" className="h-10 w-10 object-contain" />
              <h3 className="text-xl font-display font-medium tracking-[0.15em] text-brown-900">
                JUST <span className="font-light text-brand-orange">WAFFLES</span>
              </h3>
            </div>

            <p className="text-[13px] leading-relaxed text-text-secondary font-sans font-light max-w-xs mb-8">
              Bengaluru's premier dessert brand crafting gourmet eggless waffles. Prepared fresh off
              the iron with pure ingredients and absolute precision.
            </p>

            {/* Social Icons (Outline) */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/justwaffles_enjoymore?igsh=MXZwN3V6bDVkNTk0OA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border hover:border-brown-700 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-all text-brown-900 hover:text-brand-orange"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                className="w-10 h-10 border border-border hover:border-brown-700 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-all text-brown-900 hover:text-brand-orange"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-brand-teal mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-left">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href !== "#") {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                      } else {
                        e.preventDefault();
                        scrollToTop();
                      }
                    }}
                    className="text-[13px] text-text-secondary hover:text-brand-orange transition-colors font-sans font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-brand-teal mb-6">
              Store Info
            </h4>
            <div className="space-y-3.5 text-left text-[13px] text-text-secondary font-sans font-light">
              <p className="font-mono text-brown-900">+91 99807 73895</p>
              <p>justwaffles2024@gmail.com</p>
              <p className="leading-relaxed">
                No.1188, Ground Floor, 1st Cross,
                <br />
                Keerthi Layout, St Thomas Town Post,
                <br />
                Kammanahalli, Bengaluru, 560084
              </p>
              <p className="text-[11px] text-text-muted mt-2">Open Daily: 11:00 AM – 12:00 AM</p>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 flex flex-col items-start w-full">
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-brand-teal mb-4">
              Waffle Society
            </h4>
            <p className="text-[12px] leading-relaxed text-text-secondary font-sans font-light mb-6 text-left">
              Subscribe to receive private invitations, menu releases, and seasonal flavor
              highlights.
            </p>

            <form onSubmit={handleSubscribe} className="w-full relative flex flex-col gap-2">
              <div className="relative w-full flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full h-[52px] bg-surface border border-border px-5 pr-14 text-xs text-brown-900 placeholder-text-muted focus:outline-none focus:border-brand-teal transition-all rounded-[8px]"
                  required
                  disabled={subscribed}
                />
                <button
                  type="submit"
                  className="absolute right-[6px] top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-orange text-white flex items-center justify-center hover:bg-brand-orange-hover transition-colors cursor-pointer rounded-[8px]"
                  disabled={subscribed}
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>

              <AnimatePresence>
                {subscribed && (
                  <motion.p
                    className="text-brand-teal text-[11px] tracking-wide mt-1 text-left font-light"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Invitation sent. Check your inbox.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-border text-center sm:text-left">
          <p className="text-[11px] font-mono text-text-muted tracking-wider">
            © 2024 Just Waffles. All rights reserved. Designed for dessert purists.
          </p>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 border border-border hover:border-brown-700 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-all text-brown-900 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 stroke-[1.2]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
