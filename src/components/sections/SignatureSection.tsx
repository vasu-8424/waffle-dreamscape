import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import brownie from "@/assets/brownielicious.jpg";
import blueberry from "@/assets/blueberry-wich.jpg";
import almond from "@/assets/almond-sundae.jpg";
import kitkat from "@/assets/kitkat-wich.jpg";
import { Plus } from "lucide-react";

const products = [
  {
    name: "Brownielicious Waffy Tree",
    desc: "Layers of warm brownie chunks & crisp waffle wedges with dark chocolate drizzle",
    price: "₹189",
    image: brownie,
    tag: "Best Seller",
    color: "orange" as const,
  },
  {
    name: "Blueberry Waffy Wich",
    desc: "Fresh blueberry compote folded into a warm waffle sandwich with whipped cream",
    price: "₹169",
    image: blueberry,
    tag: null,
    color: "turquoise" as const,
  },
  {
    name: "Delighted Almond Bubble Sundae",
    desc: "Signature bubble waffle with vanilla ice cream, toasted almonds & caramel",
    price: "₹219",
    image: almond,
    tag: "Premium",
    color: "orange" as const,
  },
  {
    name: "KitKat Wonder Waffy Wich",
    desc: "Crushed KitKat bars & milk chocolate ganache between golden waffles",
    price: "₹179",
    image: kitkat,
    tag: null,
    color: "turquoise" as const,
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 300, damping: 30 });

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
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 ${
        isHovered ? (product.color === "orange" ? "glow-border-orange" : "glow-border-turquoise") : ""
      }`}>
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            width={800}
            height={1000}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          {product.tag && (
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${
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
        <div className="p-6">
          <h3 className="text-xl font-display font-bold text-white mb-2">{product.name}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">{product.desc}</p>
          <div className="flex justify-between items-center">
            <span className={`text-lg font-bold ${
              product.color === "orange" ? "text-brand-orange" : "text-brand-turquoise"
            }`}>
              {product.price}
            </span>
            <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              product.color === "orange"
                ? "bg-zinc-800 hover:bg-brand-orange text-white"
                : "bg-zinc-800 hover:bg-brand-turquoise text-white"
            }`}>
              <Plus className="w-4 h-4" />
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

  return (
    <section id="menu" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-orange/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-orange font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            Signature Selection
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-turquoise">Icons.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
