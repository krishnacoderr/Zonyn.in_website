import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface CardData {
  id: string;
  emoji: string;
  label: string;
  title: string;
  description: string;
  colorClass: string;
  bgLightClass: string;
  delay: number;
  duration: number;
  desktopCoords: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  initialRotate: number;
}

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse move states for global stage tilt
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePosition({ x, y });
  };

  const cards: CardData[] = [
    {
      id: "wcu-businesses",
      emoji: "🏪",
      label: "Client Trust",
      title: "Worked with 25+ Businesses",
      description: "Partnering with leading local firms to deliver modern digital solutions.",
      colorClass: "text-amber-500",
      bgLightClass: "bg-amber-50",
      delay: 0,
      duration: 7,
      desktopCoords: { top: "8%", left: "6%" },
      initialRotate: -3,
    },
    {
      id: "wcu-custom",
      emoji: "✏",
      label: "Artistry",
      title: "100% Custom Design",
      description: "Zero pre-made templates. Handcrafted layouts uniquely tailored to your brand.",
      colorClass: "text-violet-500",
      bgLightClass: "bg-violet-50",
      delay: 0.15,
      duration: 8.5,
      desktopCoords: { top: "15%", right: "8%" },
      initialRotate: 4,
    },
    {
      id: "wcu-pagespeed",
      emoji: "🔃",
      label: "Performance",
      title: "Avg PageSpeed 95+",
      description: "Engineered for speed to boost Google rankings and drive high customer engagement.",
      colorClass: "text-emerald-500",
      bgLightClass: "bg-emerald-50",
      delay: 0.3,
      duration: 8,
      desktopCoords: { top: "45%", left: "28%" },
      initialRotate: -1,
    },
    {
      id: "wcu-seo",
      emoji: "📈",
      label: "Traffic",
      title: "Built-in SEO",
      description: "Coded with semantic structural integrity so your business is easily discovered.",
      colorClass: "text-blue-500",
      bgLightClass: "bg-blue-50",
      delay: 0.45,
      duration: 9.5,
      desktopCoords: { bottom: "10%", left: "8%" },
      initialRotate: 2,
    },
    {
      id: "wcu-mobile",
      emoji: "📱",
      label: "UX Engineering",
      title: "Mobile First",
      description: "Responsively optimized layouts rendering flawlessly on any hand-held screen.",
      colorClass: "text-rose-500",
      bgLightClass: "bg-rose-50",
      delay: 0.6,
      duration: 7.5,
      desktopCoords: { bottom: "15%", right: "12%" },
      initialRotate: -4,
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-brand-border overflow-hidden relative"
    >
      {/* Dynamic decorative backdrop grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ECE8E1_1px,transparent_1px),linear-gradient(to_bottom,#ECE8E1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Context Narrative */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
            <span className="text-[11px] font-mono font-medium tracking-widest text-brand-dark/80 uppercase">
              Proven Performance
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark leading-[1.12] tracking-tight">
            Why Choose Us?
          </h2>

          <p className="text-brand-muted text-base sm:text-lg leading-relaxed font-light">
            We deliver highly optimized website infrastructures that set your business apart. By combining speed, SEO efficiency, and personalized design architecture, we convert standard traffic into dedicated customers.
          </p>


        </div>

        {/* Right Column: Interactive 3D floating stage */}
        <div className="lg:col-span-7 w-full">
          {/* Mobile Grid Layout (Pure, clean, structured stack) */}
          <div className="sm:hidden grid grid-cols-1 gap-4 mt-4 w-full">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-brand-bg/60 border border-brand-border/80 p-5 rounded-2xl flex items-start gap-4 shadow-sm"
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${card.bgLightClass} ${card.colorClass} text-lg shrink-0 select-none`}>
                  {card.emoji}
                </div>
                <div className="text-left">
                  <span className="block text-[9px] font-mono tracking-wider text-brand-muted uppercase leading-none">
                    {card.label}
                  </span>
                  <p className="text-sm font-bold text-brand-dark mt-1">
                    {card.title}
                  </p>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop 3D Interactive Float Stage */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setMousePosition({ x: 0, y: 0 });
            }}
            style={{ perspective: 1400 }}
            className="hidden sm:block relative h-[580px] w-full border border-brand-border/60 rounded-[32px] bg-brand-bg/20 backdrop-blur-xs overflow-hidden select-none"
          >
            {/* Soft decorative background circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-brand-border/40 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] border border-brand-border/20 rounded-full pointer-events-none" />

            {/* Stage motion layer linked to container-wide mouse coordinates */}
            <motion.div
              animate={{
                rotateX: isHovered ? mousePosition.y * -15 : 0,
                rotateY: isHovered ? mousePosition.x * 15 : 0,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 25 }}
              className="absolute inset-0 w-full h-full p-6 transform-style-3d pointer-events-none"
            >
              {cards.map((card) => (
                <FloatingCard key={card.id} card={card} parentMouse={mousePosition} isParentHovered={isHovered} />
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

// Subcomponent for each floating 3D card
interface FloatingCardProps {
  key?: string | number;
  card: CardData;
  parentMouse: { x: number; y: number };
  isParentHovered: boolean;
}

function FloatingCard({ card, parentMouse, isParentHovered }: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Individual card tilt state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out spring variables for high-end micro-interactions
  const tiltX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 200, damping: 20 });
  const tiltY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 20 });
  const zSpring = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMoveLocal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnterLocal = () => {
    zSpring.set(40);
  };

  const handleMouseLeaveLocal = () => {
    x.set(0);
    y.set(0);
    zSpring.set(0);
  };

  // Construct absolute layout style from coordinates
  const absoluteStyle: React.CSSProperties = {
    position: "absolute",
    top: card.desktopCoords.top,
    bottom: card.desktopCoords.bottom,
    left: card.desktopCoords.left,
    right: card.desktopCoords.right,
    zIndex: 10,
  };

  // Generate responsive orbital drifts for 3D Cards
  // Different cards drift differently for organic flow
  const getFloatingPath = () => {
    switch (card.id) {
      case "wcu-businesses":
        return {
          y: [0, -18, -4, 12, 0],
          x: [0, 10, -14, 6, 0],
          rotate: [card.initialRotate, card.initialRotate - 3, card.initialRotate + 2, card.initialRotate - 1, card.initialRotate],
        };
      case "wcu-custom":
        return {
          y: [0, 15, -10, -5, 0],
          x: [0, -15, 10, -8, 0],
          rotate: [card.initialRotate, card.initialRotate + 4, card.initialRotate - 2, card.initialRotate + 1, card.initialRotate],
        };
      case "wcu-pagespeed":
        return {
          y: [0, -10, 12, -8, 0],
          x: [0, 12, -10, 8, 0],
          rotate: [card.initialRotate, card.initialRotate - 2, card.initialRotate + 3, card.initialRotate - 1, card.initialRotate],
        };
      case "wcu-seo":
        return {
          y: [0, 14, -8, 10, 0],
          x: [0, -10, 12, -6, 0],
          rotate: [card.initialRotate, card.initialRotate + 2, card.initialRotate - 3, card.initialRotate + 1, card.initialRotate],
        };
      default:
        return {
          y: [0, -12, 14, -6, 0],
          x: [0, -14, 8, -10, 0],
          rotate: [card.initialRotate, card.initialRotate - 4, card.initialRotate + 2, card.initialRotate - 2, card.initialRotate],
        };
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMoveLocal}
      onMouseEnter={handleMouseEnterLocal}
      onMouseLeave={handleMouseLeaveLocal}
      style={{
        ...absoluteStyle,
        rotateX: tiltX,
        rotateY: tiltY,
        z: zSpring,
      }}
      animate={getFloatingPath()}
      transition={{
        duration: card.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: card.delay,
      }}
      whileHover={{
        scale: 1.05,
        zIndex: 40,
        boxShadow: "0 20px 45px rgba(23, 23, 23, 0.08)",
        transition: { duration: 0.3 }
      }}
      className="w-[245px] bg-white border border-brand-border/95 p-5 rounded-2xl shadow-lg shadow-brand-dark/3 flex flex-col gap-3 select-none pointer-events-auto cursor-grab active:cursor-grabbing transition-colors duration-300 hover:border-brand-border/100"
    >
      <div className="flex items-center gap-3">
        <div className={`flex items-center justify-center w-8.5 h-8.5 rounded-xl ${card.bgLightClass} ${card.colorClass} text-sm shrink-0 shadow-xs`}>
          {card.emoji}
        </div>
        <div className="text-left">
          <span className="block text-[8px] font-mono tracking-wider text-brand-muted uppercase leading-none">
            {card.label}
          </span>
          <p className="text-xs font-bold text-brand-dark mt-1">
            {card.title}
          </p>
        </div>
      </div>
      <p className="text-[10px] text-brand-muted leading-normal text-left font-light">
        {card.description}
      </p>
    </motion.div>
  );
}
