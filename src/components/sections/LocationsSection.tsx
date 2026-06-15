import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Navigation, Clock, Eye } from "lucide-react";

const locations = [
  {
    id: "kammanahalli",
    name: "Kammanahalli",
    address: "No.1188, Ground Floor, 1st Cross, Ramamurthy St, Keerthi Layout, St Thomas Town, Post, Kammanahalli, Bengaluru, Karnataka 560084",
    phone: "9980773895",
    timing: "11:00 AM – 12:00 AM",
    x: 320, // Grid coordinates matching Blr geography
    y: 240,
    color: "orange" as const
  },
  {
    id: "vidyaranyapura",
    name: "Vidyaranyapura",
    address: "Vidyaranyapura Main Road, Vidyaranyapura, Bengaluru 560097",
    phone: "9980773895",
    timing: "11:00 AM – 12:00 AM",
    x: 160,
    y: 130,
    color: "turquoise" as const
  },
  {
    id: "kothanur",
    name: "Kothanur",
    address: "Kothanur Main Road, near Kothanur Police Station, Bengaluru 560077",
    phone: "9980773895",
    timing: "11:00 AM – 12:00 AM",
    x: 350,
    y: 150,
    color: "orange" as const
  },
  {
    id: "kr-puram",
    name: "KR Puram",
    address: "KR Puram near Railway Station, Bengaluru 560036",
    phone: "9980773895",
    timing: "11:00 AM – 12:00 AM",
    x: 420,
    y: 280,
    color: "turquoise" as const
  },
];

export default function LocationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeLoc, setActiveLoc] = useState(locations[0]);

  return (
    <section id="locations" className="relative py-32 px-6 overflow-hidden bg-luxury-black border-b border-white/5" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-turquoise/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-orange font-mono text-xs uppercase tracking-[0.3em] mb-4 block font-semibold">
            Find Us
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
            Store <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-turquoise">Locations</span>
          </h2>
          <div className="mt-4 w-20 h-0.5 bg-gradient-to-r from-brand-orange to-brand-turquoise mx-auto rounded-full" />
        </motion.div>

        {/* Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Glassmorphic Store Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4 order-2 lg:order-1">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.id}
                className={`glass-card rounded-2xl p-6 cursor-pointer border transition-all duration-500 flex flex-col justify-between ${
                  activeLoc.id === loc.id
                    ? loc.color === "orange"
                      ? "border-brand-orange bg-white/[0.04] glow-border-orange"
                      : "border-brand-turquoise bg-white/[0.04] glow-border-turquoise"
                    : "border-white/5 hover:border-white/20 bg-white/[0.01]"
                }`}
                onClick={() => setActiveLoc(loc)}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    activeLoc.id === loc.id
                      ? loc.color === "orange"
                        ? "bg-brand-orange/20 text-brand-orange"
                        : "bg-brand-turquoise/20 text-brand-turquoise"
                      : "bg-white/5 text-zinc-500"
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white mb-1">{loc.name}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">{loc.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5 text-xs text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-600" />
                    {loc.timing}
                  </div>
                  <div className="flex items-center gap-1 ml-auto text-brand-turquoise text-[10px] uppercase font-mono font-bold tracking-wider">
                    <Eye className="w-3 h-3" /> Selected
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Interactive Google Map */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              className="relative w-full aspect-[5/4] bg-zinc-950 border border-white/5 glass-card rounded-[2rem] overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <iframe
                title={`Google Map for ${activeLoc.name}`}
                width="100%"
                height="100%"
                className="absolute inset-0 border-0 transition-opacity duration-500"
                style={{
                  opacity: 0.85,
                }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(activeLoc.name + " Just Waffles " + activeLoc.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Glowing Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-orange/40 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-turquoise/40 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-turquoise/40 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-orange/40 rounded-br-xl pointer-events-none" />

              {/* Floating Glassmorphic Location Info Card overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLoc.id}
                    className={`glass-card-strong rounded-2xl p-5 border shadow-2xl bg-black/85 backdrop-blur-md flex items-center justify-between gap-6 ${
                      activeLoc.color === "orange" ? "border-brand-orange/30" : "border-brand-turquoise/30"
                    }`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${
                          activeLoc.color === "orange" ? "bg-brand-orange" : "bg-brand-turquoise"
                        }`} />
                        <h4 className="text-base font-display font-bold text-white">{activeLoc.name} Store</h4>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
                        {activeLoc.address}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <a
                        href={`tel:+91${activeLoc.phone}`}
                        className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="Call Store"
                      >
                        <Phone className="w-4 h-4 text-brand-orange" />
                      </a>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(activeLoc.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="Get Directions"
                      >
                        <Navigation className="w-4 h-4 text-brand-turquoise" />
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
