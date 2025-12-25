import React, { memo, useEffect, useMemo, useRef, ReactNode } from "react";
import { motion } from "framer-motion";

export interface ServiceData {
  id: string;
  title: string;
  color: string;
  icon: ReactNode;
  items: string[];
  position?: { x: number; y: number };
}

interface BlobProps extends ServiceData {
  index: number;
  isVisible: boolean;
  hoveredId: string | null;
  setHovered: (id: string | null) => void;
  desktop: boolean;
  onBlobRef?: (ref: { x: number; y: number } | null) => void;
}

function ServiceBlobComponent(props: BlobProps) {
  const { id, title, color, icon, items, index, isVisible, hoveredId, setHovered, desktop, onBlobRef } = props;
  const isHovered = hoveredId === id;
  const blobRef = useRef<HTMLDivElement>(null);

  const baseSize = desktop ? 200 : 180;

  const angle = useMemo(() => (index * 360) / 6, [index]);
  const radius = 320;

  const x = Math.round(Math.cos((angle * Math.PI) / 180) * radius * 100) / 100;
  const y = Math.round(Math.sin((angle * Math.PI) / 180) * radius * 100) / 100;

  useEffect(() => {
    if (isHovered && blobRef.current) {
      const rect = blobRef.current.getBoundingClientRect();
      onBlobRef?.({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, [isHovered, onBlobRef]);

  if (desktop) {
    return (
      <div
        className="absolute left-1/2 top-1/2"
        style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
        ref={blobRef}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95], delay: index * 0.25 }}
        >
          <div
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setHovered(isHovered ? null : id)}
            className={`cursor-pointer relative transition-all duration-700 ease-out ${
              isVisible ? (isHovered ? "scale-110" : "scale-100") : "scale-0"
            }`}
            style={{ width: `${baseSize}px`, height: `${baseSize}px` }}
          >
            <motion.div
              animate={{ scale: isHovered ? 1 : 1, x: isHovered ? -40 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                borderRadius: "52% 48% 58% 42% / 48% 54% 46% 52%",
                boxShadow: `inset 0 10px 30px rgba(0,0,0,0.35), 0 0 ${isHovered ? 30 : 22}px ${color}40, 0 12px ${
                  isHovered ? 30 : 24
                }px ${color}30`,
              }}
              className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] backdrop-blur-sm border border-[#3a4f6a]/70 transition-all duration-500 ease-out"
            >
              <div
                style={{
                  borderRadius: "52% 48% 58% 42% / 48% 54% 46% 52%",
                  background: `linear-gradient(135deg, ${color}20, transparent)`,
                  opacity: isHovered ? 0.2 : 0.1,
                }}
                className="absolute inset-0 transition-opacity duration-500"
              />

              <div className="relative z-10 text-center h-full flex flex-col items-center justify-center p-6">
                <div
                  style={{
                    filter: `drop-shadow(0 0 10px ${color})`,
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                    color,
                  }}
                  className="mb-2 transition-transform duration-300"
                >
                  {icon}
                </div>
                <h3
                  style={{ color: isHovered ? color : "#ffffff" }}
                  className="text-sm font-semibold font-poppins transition-colors duration-300"
                >
                  {title}
                </h3>
              </div>
            </motion.div>

            {isHovered && (
              <motion.div
                initial={{ scale: 1, x: 0, opacity: 1 }}
                animate={{ scale: 1, x: 80, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  borderRadius: "52% 48% 58% 42% / 48% 54% 46% 52%",
                  boxShadow: `inset 0 10px 30px rgba(0,0,0,0.35), 0 0 30px ${color}40, 0 12px 30px ${color}30`,
                  pointerEvents: "none",
                }}
                className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] backdrop-blur-sm border border-[#3a4f6a]/70"
              >
                <div
                  style={{
                    borderRadius: "52% 48% 58% 42% / 48% 54% 46% 52%",
                    background: `linear-gradient(135deg, ${color}20, transparent)`,
                    opacity: 0.2,
                  }}
                  className="absolute inset-0"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => setHovered(isHovered ? null : id)}
      className={`relative cursor-pointer transition-all duration-700 ease-out mx-auto ${
        isVisible ? (isHovered ? "scale-[1.03]" : "scale-100") : "scale-95"
      }`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95], delay: index * 0.25 }}
      style={{ width: isHovered ? 280 : 180, height: isHovered ? 260 : 180, zIndex: isHovered ? 50 : 10 }}
    >
      <div
        style={{
          borderRadius: isHovered ? "32px" : "52% 48% 58% 42% / 48% 54% 46% 52%",
          boxShadow: `inset 0 10px 30px rgba(0,0,0,0.35), 0 0 ${isHovered ? 40 : 22}px ${color}40, 0 12px ${
            isHovered ? 40 : 24
          }px ${color}30`,
        }}
        className="relative h-full w-full bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] backdrop-blur-sm border border-[#3a4f6a]/70 p-6 transition-all duration-500 ease-out"
      >
        <div
          style={{
            borderRadius: isHovered ? "32px" : "52% 48% 58% 42% / 48% 54% 46% 52%",
            background: `linear-gradient(135deg, ${color}20, transparent)`,
            opacity: isHovered ? 0.2 : 0.1,
          }}
          className="absolute inset-0 transition-opacity duration-500"
        />

        <div className="relative z-10 text-center">
          <div
            style={{
              filter: `drop-shadow(0 0 10px ${color})`,
              transform: isHovered ? "scale(1.06)" : "scale(1)",
              color,
            }}
            className="mx-auto mb-3 transition-transform duration-300"
          >
            {icon}
          </div>
          <h3
            style={{ color: isHovered ? color : "#ffffff" }}
            className="text-lg font-semibold mb-2 font-poppins transition-colors duration-300"
          >
            {title}
          </h3>

          <div
            style={{ maxHeight: isHovered ? 220 : 0, opacity: isHovered ? 1 : 0 }}
            className="overflow-hidden transition-all duration-500 ease-out"
          >
            <div
              style={{ transform: isHovered ? "translateY(0)" : "translateY(-10px)" }}
              className="pt-3 border-t border-[#3a4f6a]/70 transition-transform duration-300 text-left"
            >
              <ul className="space-y-2 mb-4">
                {items.map((item) => (
                  <li key={item} className="flex items-center text-sm text-[#b0c4de]">
                    <span
                      style={{ backgroundColor: color }}
                      className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const ServiceBlob = memo(ServiceBlobComponent);

export default ServiceBlob;
