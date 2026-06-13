import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Navigation, Clock } from "lucide-react";

const locations = [
  {
    name: "Kammanahalli",
    address: "No.1188, Ground Floor, 1st Cross, Ramamurthy St, Keerthi Layout, St Thomas Town, Bengaluru 560084",
    phone: "9980773895",
  },
  {
    name: "Vidyaranyapura",
    address: "Vidyaranyapura Main Road, Bengaluru",
    phone: "9980773895",
  },
  {
    name: "Kothanur",
    address: "Kothanur, Bengaluru",
    phone: "9980773895",
  },
  {
    name: "KR Puram",
    address: "KR Puram, Bengaluru",
    phone: "9980773895",
  },
];

export default function LocationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="locations" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-turquoise/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-orange font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            Find Us
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
            Store <span className="text-brand-turquoise">Locations</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              className="glass-card rounded-2xl p-8 group hover:border-brand-orange/30 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-brand-orange/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-1">{loc.name}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{loc.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Clock className="w-3.5 h-3.5 text-brand-turquoise" />
                  11:00 AM – 12:00 AM
                </div>
                <div className="flex gap-3 ml-auto">
                  <a
                    href={`tel:+91${loc.phone}`}
                    className="w-9 h-9 glass-card rounded-lg flex items-center justify-center hover:bg-brand-orange/20 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-orange" />
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 glass-card rounded-lg flex items-center justify-center hover:bg-brand-turquoise/20 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-brand-turquoise" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
