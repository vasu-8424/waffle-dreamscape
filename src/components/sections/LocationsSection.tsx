import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MapPin, Phone, Compass, Clock, Check } from "lucide-react";

const locations = [
  {
    id: "kammanahalli",
    name: "Kammanahalli Store",
    address:
      "No.1188, Ground Floor, 1st Cross, Ramamurthy St, Keerthi Layout, St Thomas Town Post, Kammanahalli, Bengaluru, Karnataka 560084",
    phone: "9980773895",
    timing: "11:00 AM – 12:00 AM",
  },
  {
    id: "vidyaranyapura",
    name: "Vidyaranyapura Store",
    address: "Vidyaranyapura Main Road, Vidyaranyapura, Bengaluru, Karnataka 560097",
    phone: "9980773895",
    timing: "11:00 AM – 12:00 AM",
  },
  {
    id: "kothanur",
    name: "Kothanur Store",
    address: "Kothanur Main Road, near Kothanur Police Station, Bengaluru, Karnataka 560077",
    phone: "9980773895",
    timing: "11:00 AM – 12:00 AM",
  },
  {
    id: "kr-puram",
    name: "KR Puram Store",
    address: "KR Puram near Railway Station, Bengaluru, Karnataka 560036",
    phone: "9980773895",
    timing: "11:00 AM – 12:00 AM",
  },
];

export default function LocationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeLoc, setActiveLoc] = useState(locations[0]);

  return (
    <section
      id="locations"
      className="relative bg-bg-secondary py-20 lg:py-24 px-8 md:px-12 overflow-hidden z-20 border-b border-border"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-16">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.4em] text-brand-teal mb-4 block">
            Store Locator
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-black leading-tight tracking-tight">
            Our <span className="font-serif italic text-brand-teal">Locations</span>
          </h2>
          <p className="text-xs font-sans tracking-widest text-text-muted uppercase mt-4">
            Visit our physical spaces to experience desserts fresh off the iron
          </p>
        </div>

        {/* Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Minimal Store Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4 order-2 lg:order-1">
            {locations.map((loc, i) => {
              const isActive = activeLoc.id === loc.id;
              return (
                <motion.div
                  key={loc.id}
                  className={`p-6 md:p-8 cursor-pointer border rounded-[8px] transition-all duration-500 bg-surface flex flex-col justify-between shadow-sm ${
                    isActive ? "border-brand-orange" : "border-border hover:border-brown-700"
                  }`}
                  onClick={() => setActiveLoc(loc)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.8 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 flex items-center justify-center flex-shrink-0 border rounded-full transition-colors ${
                        isActive
                          ? "border-brand-orange text-brand-orange"
                          : "border-border text-brand-teal"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 stroke-[1.2]" />
                    </div>

                    <div className="text-left">
                      <h3 className="text-lg font-display font-bold text-black mb-2">
                        {loc.name}
                      </h3>
                      <p className="text-[12px] leading-relaxed text-text-secondary font-light font-sans max-w-sm mb-3">
                        {loc.address}
                      </p>
                      {/* Services Offered Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {["Dine-in", "Curbside Pickup", "Swiggy / Zomato", "Live Catering"].map((srv) => (
                          <span
                            key={srv}
                            className="px-2 py-0.5 bg-bg-secondary text-[9px] font-sans font-semibold text-brand-teal tracking-wide rounded-[3px] border border-border"
                          >
                            {srv}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border text-[11px] font-sans font-light text-text-muted">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-brand-teal stroke-[1.2]" />
                      {loc.timing}
                    </div>
                    {isActive && (
                      <span className="flex items-center gap-1 text-[9px] font-sans font-bold tracking-widest text-brand-orange uppercase">
                        <Check className="w-2.5 h-2.5" /> Selected
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Google Map */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-between">
            <motion.div
              className="relative w-full h-[350px] lg:h-full min-h-[380px] bg-bg-secondary border border-border overflow-hidden rounded-[8px] p-2 shadow-sm bg-surface"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full h-full overflow-hidden rounded-[6px]">
                <iframe
                  title={`Google Map for ${activeLoc.name}`}
                  width="100%"
                  height="100%"
                  className="absolute inset-0 border-0 grayscale-[40%] contrast-[110%] opacity-90 transition-opacity duration-500 rounded-[6px]"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(activeLoc.name + " Just Waffles " + activeLoc.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Minimal floating store detail overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLoc.id}
                    className="p-5 border border-border bg-surface flex items-center justify-between gap-6 shadow-md rounded-[8px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                        <h4 className="text-sm font-sans font-semibold text-brown-900 uppercase tracking-wider">
                          {activeLoc.name}
                        </h4>
                      </div>
                      <p className="text-[11px] leading-normal text-text-secondary max-w-sm font-sans font-light">
                        {activeLoc.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:+91${activeLoc.phone}`}
                        className="w-10 h-10 border border-border hover:border-brown-700 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-all"
                        title="Call Store"
                      >
                        <Phone className="w-3.5 h-3.5 text-brand-teal stroke-[1.2]" />
                      </a>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(activeLoc.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border border-border hover:border-brown-700 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-all"
                        title="Get Directions"
                      >
                        <Compass className="w-3.5 h-3.5 text-brand-teal stroke-[1.2]" />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
