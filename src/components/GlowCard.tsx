import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function GlowCard({
  children,
  className = "",
  glowColor = "orange",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: "orange" | "turquoise";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const glowClass = glowColor === "orange" ? "glow-border-orange" : "glow-border-turquoise";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`glass-card rounded-3xl p-1 transition-all duration-500 hover:${glowClass} ${className}`}
    >
      <div className="relative rounded-[20px] overflow-hidden bg-luxury-black/50 p-6 h-full">
        {children}
      </div>
    </motion.div>
  );
}
