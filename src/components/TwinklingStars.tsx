import { useMemo } from "react";
import { motion } from "framer-motion";

type Star = {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

type Props = {
  count?: number;
  className?: string;
};

export default function TwinklingStars({ count = 120, className }: Props) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() < 0.85 ? 1 + Math.floor(Math.random() * 2) : 3,
      duration: 2.5 + Math.random() * 3.5,
      delay: Math.random() * 4,
      opacity: 0.25 + Math.random() * 0.5,
    }));
  }, [count]);

  return (
    <div className={className}>
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
          } as React.CSSProperties}
          initial={{ opacity: s.opacity * 0.4, scale: 1 }}
          animate={{ opacity: [s.opacity * 0.5, 1, s.opacity * 0.5], scale: [1, 1.35, 1] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
