import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import imgAlmond from "@/assets/opt-0F0A9306.jpg";
import imgBrownie from "@/assets/opt-0F0A9279.jpg";
import imgBlueberry from "@/assets/opt-0F0A9281.jpg";
import imgKitkat from "@/assets/opt-0F0A9353.jpg";

const products = [
  {
    id: "almond-sundae",
    name: "Delighted Almond Sundae",
    category: "Signature Bowl",
    desc: "Signature warm bubble waffle served with soft-churned vanilla bean ice cream, toasted sliced almonds, and artisanal sea-salt caramel.",
    price: "₹219",
    image: imgAlmond,
    ingredients: ["Eggless Batter", "Toasted Almonds", "Vanilla Bean", "Artisanal Caramel"],
    rating: "5.0",
  },
  {
    id: "brownielicious",
    name: "Brownielicious Waffy Tree",
    category: "Gourmet Wedge",
    desc: "Layers of warm, fudge-rich brownie chunks, crisp waffle wedges, topped with cascaded Belgian dark chocolate ganache.",
    price: "₹189",
    image: imgBrownie,
    ingredients: ["Brownie Fudge", "Waffle Wedges", "Belgian Cocoa", "Chocolate Drizzle"],
    rating: "4.9",
  },
  {
    id: "blueberry",
    name: "Blueberry Waffy Wich",
    category: "Waffle Sandwich",
    desc: "Plump wild blueberry compote folded into a warm waffle sandwich with sweetened whipped double cream.",
    price: "₹169",
    image: imgBlueberry,
    ingredients: ["Blueberry Compote", "Sweetened Cream", "Double Sandwich"],
    rating: "4.8",
  },
  {
    id: "kitkat",
    name: "Kitkat Wonder Waffy Wich",
    category: "Waffle Sandwich",
    desc: "Crushed crunchy KitKat bar pieces paired with a rich milk chocolate ganache nestled inside a golden waffle sandwich.",
    price: "₹179",
    image: imgKitkat,
    ingredients: ["KitKat Bars", "Milk Ganache", "Golden Sandwich"],
    rating: "4.8",
  },
];

export default function SignatureSection() {
  const containerRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  return (
    <section 
      id="signature" 
      ref={containerRef}
      className="bg-bg-primary py-36 px-8 md:px-12 z-20 border-b border-border"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-28">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.4em] text-brand-teal mb-4 block">
            The Collection
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-light text-brown-900 leading-tight tracking-tight">
            Chef's <span className="font-serif italic text-brand-teal">Signatures</span>
          </h2>
          <p className="text-xs font-sans tracking-widest text-text-muted uppercase mt-4">
            Curated dessert concepts, prepared fresh to order
          </p>
        </div>

        {/* 1. Large Asymmetrical Featured Product Showcase */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Framed Portrait Product Image */}
            <div className="lg:col-span-7 flex justify-center lg:justify-start">
              <div className="w-full max-w-[620px] aspect-[3/2] sm:aspect-[16/10] bg-bg-secondary overflow-hidden border border-border rounded-[8px] p-2 relative shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedProduct.id}
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover rounded-[6px] grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Luxury Product Narrative */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-orange mb-3 block">
                    Featured Masterpiece
                  </span>
                  
                  <h3 className="text-3xl md:text-4xl font-display font-light text-brown-900 leading-tight tracking-tight mb-4">
                    {selectedProduct.name}
                  </h3>

                  <div className="flex items-center gap-1.5 mb-6 text-brand-orange">
                    <span className="text-xs font-sans tracking-widest uppercase font-semibold text-brand-teal mr-2">
                      {selectedProduct.category}
                    </span>
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-mono font-medium text-brown-900">{selectedProduct.rating} / 5.0</span>
                  </div>
                  
                  <p className="text-[14px] leading-relaxed text-text-secondary font-sans font-light mb-8">
                    {selectedProduct.desc}
                  </p>
                  
                  {/* Ingredient Chips */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {selectedProduct.ingredients.map((ing) => (
                      <span 
                        key={ing} 
                        className="px-3 py-1 bg-bg-secondary border border-border text-[11px] font-sans font-light tracking-wide text-text-secondary rounded-[4px]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-baseline gap-6 pt-6 border-t border-border">
                    <span className="text-2xl font-display font-light text-brown-900">
                      {selectedProduct.price}
                    </span>
                    
                    <button className="h-[52px] px-8 bg-brand-orange text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:bg-brand-orange-hover rounded-[8px] cursor-pointer">
                      Add to Basket
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* 2. Menu Section Grid */}
        <div id="menu" className="pt-24 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="text-left">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.4em] text-brand-teal mb-3 block">
                Boutique Patisserie
              </span>
              <h3 className="text-3xl md:text-4xl font-display font-light text-brown-900 tracking-tight">
                The Gourmet <span className="font-serif italic text-brand-teal">Menu</span>
              </h3>
            </div>
            
            <p className="text-[13px] text-text-secondary font-light font-sans max-w-xs text-left md:text-right">
              Select any item to feature it above and explore its premium ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              const isSelected = selectedProduct.id === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`group cursor-pointer p-4 bg-surface border transition-all duration-500 rounded-[8px] shadow-sm ${
                    isSelected 
                      ? "border-brand-orange" 
                      : "border-border hover:border-brown-700"
                  }`}
                >
                  {/* Portrait 4:5 framed photography */}
                  <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-bg-secondary rounded-[6px] border border-border">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 rounded-[6px]"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="text-left">
                    <div className="flex justify-between items-baseline gap-2 mb-2">
                      <span className="text-[9px] font-sans tracking-widest uppercase font-semibold text-brand-teal">
                        {product.category}
                      </span>
                      <span className="text-xs font-mono font-medium text-brand-orange flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-brand-orange text-brand-orange" /> {product.rating}
                      </span>
                    </div>

                    <h4 className="text-lg font-display font-light text-brown-900 mb-2 tracking-tight group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h4>

                    <p className="text-[12px] leading-relaxed text-text-secondary font-light font-sans line-clamp-2 mb-4">
                      {product.desc}
                    </p>

                    <div className="pt-3 border-t border-border flex justify-between items-center text-xs font-medium uppercase tracking-wider text-brown-900">
                      <span>{product.price}</span>
                      <span className="text-[10px] text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Details &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}
