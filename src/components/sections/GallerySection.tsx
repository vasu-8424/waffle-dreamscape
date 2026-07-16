import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye } from "lucide-react";
import gal1 from "@/assets/opt-one.jpg";
import gal2 from "@/assets/opt-two.jpg";
import gal3 from "@/assets/opt-three.jpg";
import gal4 from "@/assets/opt-four.jpg";
import gal5 from "@/assets/opt-five.jpg";

const galleryImages = [
  { src: gal1, alt: "Gourmet eggless Belgian waffle plate", className: "col-span-12 md:col-span-7 aspect-[16/10] md:aspect-[3/2]" },
  { src: gal2, alt: "Delicate cocoa ganache detail work", className: "col-span-12 md:col-span-5 aspect-[4/5] md:mt-20" },
  { src: gal3, alt: "The bubble waffle golden iron press", className: "col-span-12 md:col-span-4 aspect-[4/5]" },
  { src: gal4, alt: "Signature waffle wedges with wild toppings", className: "col-span-12 md:col-span-8 aspect-[16/10] md:aspect-[3/2]" },
  { src: gal5, alt: "The curated patisserie plating", className: "col-span-12 aspect-[21/9] md:aspect-[3/1]" },
];

export default function GallerySection() {
  const containerRef = useRef(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section className="bg-bg-primary py-36 px-8 md:px-12 z-20 border-b border-border" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-28">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.4em] text-brand-teal mb-4 block">
            Visual Journal
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-light text-brown-900 leading-tight tracking-tight">
            Artisanal <span className="font-serif italic text-brand-teal">Gallery</span>
          </h2>
          <p className="text-xs font-sans tracking-widest text-text-muted uppercase mt-4">
            A quiet gaze into our gourmet creations
          </p>
        </div>

        {/* Magazine Asymmetrical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden cursor-pointer group border border-border bg-bg-secondary rounded-[8px] p-2 shadow-sm ${img.className}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.8 }}
              onClick={() => setLightbox(img.src)}
            >
              <div className="w-full h-full overflow-hidden rounded-[6px]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-104 grayscale-[20%] group-hover:grayscale-0 rounded-[6px]"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay visual reveal on hover */}
              <div className="absolute inset-2 bg-brown-900/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center rounded-[6px]">
                <div className="w-12 h-12 border border-border bg-surface/90 flex items-center justify-center rounded-full shadow-sm text-brand-teal">
                  <Eye className="w-4 h-4 stroke-[1.2]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[60] bg-bg-primary/98 backdrop-blur-sm flex items-center justify-center p-8 md:p-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-8 right-8 w-12 h-12 border border-border hover:border-brown-700 flex items-center justify-center text-brown-900 hover:bg-bg-secondary transition-all rounded-full"
              onClick={() => setLightbox(null)}
              aria-label="Close image preview"
            >
              <X className="w-4 h-4 stroke-[1.2]" />
            </button>
            
            <motion.div
              className="max-w-5xl w-full max-h-[80vh] border border-border bg-bg-secondary p-2 shadow-lg rounded-[8px]"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={lightbox}
                alt="Artisanal creation detail"
                className="w-full h-full object-contain max-h-[80vh] select-none pointer-events-none rounded-[6px]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
