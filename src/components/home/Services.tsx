"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Code,
  Smartphone,
  Paintbrush2,
  Megaphone,
  Settings,
} from "lucide-react";
import MeteorShower from "../MeteorShower";
import ServiceBlob, { ServiceData } from "./ServiceBlob";


// Background floating particles
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  radius: number;
}

function Particles({ count = 60 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 12;
      arr.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.floor(Math.random() * 3) + 2,
        delay: Math.random() * 4,
        duration: 8 + Math.random() * 6,
        opacity: 0.08 + Math.random() * 0.12,
        radius,
      });
    }
    setParticles(arr);
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => {
        const keyframesX = [0, p.radius, 0, -p.radius, 0];
        const keyframesY = [-p.radius, 0, p.radius, 0, -p.radius];
        return (
          <motion.span
            key={p.id}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            } as React.CSSProperties}
            className="absolute rounded-full bg-white"
            initial={{ x: 0, y: 0 }}
            animate={{ x: keyframesX, y: keyframesY }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}

interface CenterBubbleProps {
  service: ServiceData | null;
  isVisible: boolean;
  originPosition?: { x: number; y: number };
}

// Center bubble component that animates from the split blob to the center
function CenterBubble({ service, isVisible, originPosition }: CenterBubbleProps) {
  if (!service) return null;

  return (
    <motion.div
      key={`center-${service.id}`}
      initial={{
        opacity: 0,
        scale: 0.8,
        x: originPosition?.x || 0,
        y: originPosition?.y || 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        x: originPosition?.x || 0,
        y: originPosition?.y || 0,
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      className="absolute w-80 z-50 pointer-events-auto"
      style={{
        left: "50%",
        top: "50%",
        marginLeft: "-160px",
        marginTop: "-160px",
      }}
    >
      <motion.div
        style={{
          borderRadius: "32px",
          boxShadow: `inset 0 10px 30px rgba(0,0,0,0.35), 0 0 40px ${service.color}40, 0 12px 40px ${service.color}30`,
        }}
        className="relative bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] backdrop-blur-sm border border-[#3a4f6a]/70 p-8"
      >
        <div
          style={{
            borderRadius: "32px",
            background: `linear-gradient(135deg, ${service.color}20, transparent)`,
            opacity: 0.2,
          }}
          className="absolute inset-0"
        />

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            style={{
              filter: `drop-shadow(0 0 10px ${service.color})`,
              color: service.color,
            }}
            className="mx-auto mb-4 flex justify-center"
          >
            {React.cloneElement(service.icon as React.ReactElement, {
              className: "w-10 h-10",
            })}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            style={{ color: service.color }}
            className="text-2xl font-semibold mb-4 text-center font-poppins"
          >
            {service.title}
          </motion.h3>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="space-y-2 mb-6 border-t border-[#3a4f6a]/70 pt-4"
          >
            {service.items.map((item, idx) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + idx * 0.05, duration: 0.3 }}
                className="flex items-center text-sm text-[#b0c4de]"
              >
                <span
                  style={{ backgroundColor: service.color }}
                  className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.4 }}
            className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-medium rounded-full border transition-colors"
            style={{ borderColor: service.color, color: service.color }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = `${service.color}20`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            Learn More →
          </motion.button> */}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [blobPosition, setBlobPosition] = useState<{ x: number; y: number } | null>(null);
  const circleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);

  // Calculate container-relative position
  const getContainerRelativePosition = (viewportPos: { x: number; y: number }) => {
    if (!circleContainerRef.current) return { x: 0, y: 0 };
    const rect = circleContainerRef.current.getBoundingClientRect();
    const containerCenterX = rect.width / 2;
    const containerCenterY = rect.height / 2;
    
    return {
      x: viewportPos.x - rect.left - containerCenterX,
      y: viewportPos.y - rect.top - containerCenterY,
    };
  };

  const services: ServiceData[] = useMemo(
    () => [
      {
        id: "erp",
        title: "ERP Implementation",
        color: "#22d3ee",
        icon: <Users className="w-8 h-8" />,
        items: ["Zoho One", "Zoho CRM Plus", "Zoho People Plus", "Odoo", "Monday.com"],
        position: { x: 18, y: 30 },
      },
      {
        id: "automation",
        title: "Automation",
        color: "#f97316",
        icon: <Settings className="w-8 h-8" />,
        items: ["Zapier workflows", "API integrations", "Dashboards", "Chatbots", "Webhook Integration"],
        position: { x: 65, y: 24 },
      },
      {
        id: "marketing",
        title: "Digital Marketing",
        color: "#ef4444",
        icon: <Megaphone className="w-8 h-8" />,
        items: ["SEO", "Social media", "Paid ads", "Email campaigns", "Analytics"],
        position: { x: 82, y: 60 },
      },
      {
        id: "apps",
        title: "App Development",
        color: "#a855f7",
        icon: <Smartphone className="w-8 h-8" />,
        items: ["Zoho Creator", "Android & iOS apps"],
        position: { x: 40, y: 70 },
      },
      {
        id: "design",
        title: "Graphic Design",
        color: "#fb923c",
        icon: <Paintbrush2 className="w-8 h-8" />,
        items: ["Figma", "Canva", "Branding & logos"],
        position: { x: 32, y: 42 },
      },
      {
        id: "web",
        title: "Web Development",
        color: "#3b82f6",
        icon: <Code className="w-8 h-8" />,
        items: ["WordPress", "Wix", "Zoho Sites", "Shopify", "Full-stack from scratch"],
        position: { x: 55, y: 80 },
      },
    ],
    []
  );

  // Default to an expanded card on mobile and reset on desktop
  useEffect(() => {
    if (!isDesktop) {
      setHovered((prev) => prev ?? services[0].id);
    } else {
      setHovered(null);
    }
  }, [isDesktop]);

  return (
    <section id="services" ref={ref} className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E293B]/50 to-transparent" />
      <Particles count={80} />
      <MeteorShower />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Core Services</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-60">
            We provide a range of IT services to help your business thrive in the digital age.
          </p>
        </motion.div>

        <div className="relative lg:min-h-[600px] mb-60">
          <div className="hidden lg:block relative w-full h-[600px]" ref={circleContainerRef}>
            {services.map((s, idx) => (
              <ServiceBlob
                key={s.id}
                {...s}
                index={idx}
                isVisible={isInView}
                hoveredId={hovered}
                setHovered={setHovered}
                desktop={true}
                onBlobRef={(pos) => {
                  if (hovered === s.id && pos) {
                    setBlobPosition(pos);
                  }
                }}
              />
            ))}

            {/* Center Bubble that appears on hover */}
            {hovered && blobPosition && (
              <CenterBubble
                service={services.find((s) => s.id === hovered)!}
                isVisible={true}
                originPosition={getContainerRelativePosition(blobPosition)}
              />
            )}
          </div>

          <div className="flex flex-col items-center gap-6 lg:hidden">
            {services.map((s, idx) => (
              <ServiceBlob
                key={s.id}
                {...s}
                index={idx}
                isVisible={isInView}
                hoveredId={hovered}
                setHovered={setHovered}
                desktop={false}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
