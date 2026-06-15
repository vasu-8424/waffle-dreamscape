import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Plus, Check, Star } from "lucide-react";

const products = [
  {
    id: "almond-sundae",
    name: "Delighted Almond Sundae",
    desc: "Signature bubble waffle with vanilla ice cream, toasted almonds & caramel",
    price: "₹219",
    image: "/Delighted Almond Sundae.jpeg",
    tag: "Premium Selection",
    color: "orange" as const,
    badge: "Signature",
    rating: "5.0",
  },
  {
    id: "brownielicious",
    name: "Brownielicious Waffy Tree",
    desc: "Layers of warm brownie chunks & crisp waffle wedges with dark chocolate drizzle",
    price: "₹189",
    image: "/Brownielicious Waffy Tree.jpeg",
    tag: "Best Seller",
    color: "orange" as const,
    badge: "Indulgent",
    rating: "4.9",
  },
  {
    id: "blueberry",
    name: "Blueberry Waffy Wich",
    desc: "Fresh blueberry compote folded into a warm waffle sandwich with whipped cream",
    price: "₹169",
    image: "/Blueberry Waffy Wich.jpeg",
    tag: "Freshly Made",
    color: "turquoise" as const,
    badge: "Fruity",
    rating: "4.8",
  },
  {
    id: "kitkat",
    name: "Kitkat Wonder Waffy Wich",
    desc: "Crushed KitKat bars & milk chocolate ganache between golden waffles",
    price: "₹179",
    image: "/Kitkat Wonder Waffy Wich.jpeg",
    tag: "Chocolate Lover",
    color: "turquoise" as const,
    badge: "Crunchy",
    rating: "4.8",
  },
];

function ProductCard({ product, index, onSelect }: { product: typeof products[0]; index: number; onSelect: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
    >
      <div className={`glass-card rounded-3xl overflow-hidden p-4 transition-all duration-500 min-h-[380px] flex flex-col justify-between ${
        isHovered ? (product.color === "orange" ? "glow-border-orange bg-white/[0.04]" : "glow-border-turquoise bg-white/[0.04]") : "bg-white/[0.02]"
      }`}>
        {/* Elevated Image Container with dynamic glow */}
        <div className="relative aspect-[16/11] rounded-2xl overflow-hidden mb-4 border border-white/5" style={{ transformStyle: "preserve-3d" }}>
          {/* Backlight glow */}
          <div className={`absolute -inset-6 bg-${
            product.color === "orange" ? "brand-orange" : "brand-turquoise"
          }/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`} />
          
          <motion.img
            src={product.image}
            alt={product.name}
            className="relative z-10 w-full h-full object-cover rounded-2xl"
            animate={{ 
              rotate: isHovered ? 4 : 0,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            style={{ transform: "translateZ(30px)" }}
            loading="lazy"
          />

          {product.tag && (
            <div className="absolute top-3 left-3 z-20">
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-widest ${
                product.color === "orange"
                  ? "bg-brand-orange/20 text-brand-orange border border-brand-orange/30"
                  : "bg-brand-turquoise/20 text-brand-turquoise border border-brand-turquoise/30"
              }`}>
                {product.tag}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-mono font-semibold tracking-wider text-zinc-500">
                {product.badge}
              </span>
              <div className="flex items-center gap-0.5 text-amber-500 text-[10px]">
                <Star className="w-2.5 h-2.5 fill-current" />
                {product.rating}
              </div>
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2 leading-tight group-hover:text-zinc-200 transition-colors">
              {product.name}
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4 line-clamp-2">
              {product.desc}
            </p>
          </div>

          <div className="flex justify-end items-center pt-2 border-t border-white/5">
            <button className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              product.color === "orange"
                ? "bg-zinc-800 hover:bg-brand-orange text-white"
                : "bg-zinc-800 hover:bg-brand-turquoise text-white"
            }`}>
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SignatureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  
  // Custom tilt values for the featured card
  const fX = useMotionValue(0.5);
  const fY = useMotionValue(0.5);
  const fRotateX = useSpring(useTransform(fY, [0, 1], [6, -6]), { stiffness: 150, damping: 20 });
  const fRotateY = useSpring(useTransform(fX, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 });

  const handleFeaturedMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    fX.set((e.clientX - rect.left) / rect.width);
    fY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section id="menu" className="relative py-32 px-6 overflow-hidden bg-luxury-black/95 border-b border-white/5" ref={ref}>
      {/* Cinematic glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-orange/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-orange font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-4 block font-semibold">
            Signature Selection
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-turquoise">Icons.</span>
          </h2>
          <div className="mt-4 w-20 h-0.5 bg-gradient-to-r from-brand-orange to-brand-turquoise mx-auto rounded-full" />
        </motion.div>

        {/* 1. Large Immersive Featured Waffle Showcase */}
        <div className="mb-20">
          <motion.div
            className="glass-card rounded-[2.5rem] overflow-hidden p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[480px] hover:glow-border-orange transition-all duration-700 bg-white/[0.01]"
            onMouseMove={handleFeaturedMove}
            onMouseLeave={() => { fX.set(0.5); fY.set(0.5); }}
            style={{
              rotateX: fRotateX,
              rotateY: fRotateY,
              transformStyle: "preserve-3d",
              perspective: 1000
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Left Column: Rotating Interactive Product Visual */}
            <div className="lg:col-span-6 flex items-center justify-center relative h-[300px] lg:h-[400px]">
              
              {/* Backlight halo spinning slowly */}
              <div 
                className={`absolute w-72 h-72 rounded-full blur-[80px] opacity-30 animate-spin-slow transition-colors duration-700 ${
                  selectedProduct.color === "orange" ? "bg-brand-orange" : "bg-brand-turquoise"
                }`} 
              />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProduct.id}
                  className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-[90%] h-[90%] object-cover rounded-full border-2 border-white/10 drop-shadow-[0_25px_60px_rgba(255,122,0,0.35)] select-none pointer-events-none"
                    style={{ transform: "translateZ(50px)" }}
                  />
                  
                  {/* Floating crumbs */}
                  <div className="absolute top-1/4 left-1/10 w-2.5 h-2.5 bg-brand-orange rounded-full opacity-60 animate-float" style={{ animationDelay: "-1s" }} />
                  <div className="absolute bottom-1/4 right-1/10 w-3 h-3 bg-brand-turquoise rounded-full opacity-40 animate-float" style={{ animationDelay: "-3s" }} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Premium Slogan, Details & Pricing */}
            <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left" style={{ transform: "translateZ(30px)" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-widest mb-4 ${
                    selectedProduct.color === "orange"
                      ? "bg-brand-orange/20 text-brand-orange border border-brand-orange/30"
                      : "bg-brand-turquoise/20 text-brand-turquoise border border-brand-turquoise/30"
                  }`}>
                    {selectedProduct.tag}
                  </span>
                  
                  <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight mb-4 tracking-wide">
                    {selectedProduct.name}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                    {selectedProduct.desc}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs mb-8 text-zinc-400">
                    <span className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full">
                      <Check className="w-3.5 h-3.5 text-brand-turquoise" /> 100% Eggless
                    </span>
                    <span className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full">
                      <Check className="w-3.5 h-3.5 text-brand-turquoise" /> Freshly Baked
                    </span>
                    <span className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full">
                      <Check className="w-3.5 h-3.5 text-brand-turquoise" /> Gourmet Drizzle
                    </span>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-white/5">
                    <button className={`px-8 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                      selectedProduct.color === "orange"
                        ? "bg-brand-orange hover:bg-brand-orange/80 hover:shadow-[0_0_30px_rgba(255,122,0,0.3)]"
                        : "bg-brand-turquoise hover:bg-brand-turquoise/80 hover:shadow-[0_0_30px_rgba(76,199,193,0.3)]"
                    } text-white cursor-pointer`}>
                      Add to Basket <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* 2. Menu Supporting Items Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={i} 
              onSelect={() => setSelectedProduct(product)} 
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
