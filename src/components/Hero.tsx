import { motion } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import heroImg from "../assets/images/Gemini_Generated_Image_8sb3sm8sb3sm8sb3.png";

interface HeroProps {
  onNavClick: (sectionId: string) => void;
}

export default function Hero({ onNavClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="min-h-screen pt-32 pb-20 px-6 md:px-12 flex items-center justify-center relative overflow-hidden bg-brand-bg"
    >
      {/* Soft grain/ambient layer for an expensive, timeless design feel */}
      <div className="absolute inset-0 bg-radial-[circle_at_top,_var(--tw-gradient-stops)] from-[#FAF9F5] via-brand-bg to-brand-bg -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Headline and Info */}
        <motion.div
          id="hero-left-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start space-y-8"
        >
          <h1
            id="hero-headline"
            className="font-sans text-4xl sm:text-5xl md:text-[63px] font-bold text-[#171717] leading-[1.05] tracking-tight text-left"
          >
            Premium Websites <br className="hidden sm:inline" />Built To Grow <br className="hidden sm:inline" />Your <span className="text-brand-orange">Business</span>
          </h1>

          <p
            id="hero-subtext"
            className="text-base sm:text-lg text-brand-muted max-w-md leading-relaxed text-left"
          >
            We design fast, custom websites that build trust, generate more enquiries, and help your business grow online.
          </p>

          <div id="hero-actions" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            {/* Primary Action Button */}
            <motion.button
              id="hero-primary-btn"
              onClick={() => onNavClick("book")}
              whileHover={{ scale: 1.02, backgroundColor: "#F26A00" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-brand-dark text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-lg shadow-brand-dark/5"
            >
              Book a Call
            </motion.button>

            {/* Secondary Action Button */}
            <motion.button
              id="hero-secondary-btn"
              onClick={() => onNavClick("work")}
              whileHover={{ scale: 1.02, backgroundColor: "#ECE8E1" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white border border-brand-border text-brand-dark font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
            >
              View Our Work
            </motion.button>
          </div>
        </motion.div>

        {/* Right Column: Beautiful Abstract Mockup */}
        <motion.div
          id="hero-right-visual"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ perspective: 1200 }}
          className="lg:col-span-5 flex flex-col items-center justify-center w-full relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [2, 1, 2] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.02, rotate: 0 }}
            className="relative z-10 w-full max-w-[460px] bg-white pt-10 p-3 rounded-[28px] border border-brand-border shadow-2xl shadow-brand-dark/5 transition-all duration-500 cursor-pointer"
          >
            <div className="absolute top-4 left-5 flex gap-1.5 z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/30"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/30"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/30"></span>
            </div>
            
            <img
              src={heroImg}
              alt="Premium abstract website design by Zonyn.in"
              referrerPolicy="no-referrer"
              className="w-full aspect-[1.717] object-cover rounded-[16px] border border-brand-border/40 mx-auto"
            />
          </motion.div>

          {/* 3D Floating Revolving Card 1: Page Speed 98 (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -15, 0],
              x: [0, 8, 0],
              rotate: [1, -3, 1],
            }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 30 }}
            className="hidden sm:flex absolute -top-6 left-2 sm:-left-8 md:-left-16 z-20 bg-white border border-brand-border/80 p-3 rounded-2xl shadow-xl shadow-brand-dark/5 items-center gap-2.5 select-none pointer-events-auto transition-shadow hover:shadow-2xl hover:border-brand-border duration-300 w-[155px] sm:w-[170px]"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-50 text-amber-500 text-sm shrink-0">
              ⚡
            </div>
            <div className="text-left">
              <span className="block text-[9px] font-mono tracking-wider text-brand-muted uppercase leading-none">Speed</span>
              <p className="text-[11px] sm:text-xs font-bold text-brand-dark mt-0.5">
                Page Speed <span className="text-emerald-500 font-mono font-black text-xs sm:text-[13px]">98</span>
              </p>
            </div>
          </motion.div>

          {/* 3D Floating Revolving Card 2: 100% Custom Design (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -12, 0],
              x: [0, -10, 0],
              rotate: [-1, 2, -1],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.15 },
              scale: { duration: 0.6, delay: 0.15 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 30 }}
            className="hidden sm:flex absolute top-4 right-2 sm:-right-8 md:-right-16 z-20 bg-white border border-brand-border/80 p-3 rounded-2xl shadow-xl shadow-brand-dark/5 items-center gap-2.5 select-none pointer-events-auto transition-shadow hover:shadow-2xl hover:border-brand-border duration-300 w-[165px] sm:w-[180px]"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-violet-50 text-violet-500 text-sm shrink-0">
              🎨
            </div>
            <div className="text-left">
              <span className="block text-[9px] font-mono tracking-wider text-brand-muted uppercase leading-none">Artistry</span>
              <p className="text-[11px] sm:text-xs font-bold text-brand-dark mt-0.5">
                100% Custom Design
              </p>
            </div>
          </motion.div>

          {/* 3D Floating Revolving Card 3: +42% More Leads (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, 12, 0],
              x: [0, -8, 0],
              rotate: [2, -2, 2],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.3 },
              scale: { duration: 0.6, delay: 0.3 },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 30 }}
            className="hidden sm:flex absolute top-[42%] right-2 sm:-right-10 md:-right-20 z-20 bg-white border border-brand-border/80 p-3 rounded-2xl shadow-xl shadow-brand-dark/5 items-center gap-2.5 select-none pointer-events-auto transition-shadow hover:shadow-2xl hover:border-brand-border duration-300 w-[160px] sm:w-[180px]"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-50 text-emerald-500 text-sm shrink-0">
              📈
            </div>
            <div className="text-left w-full">
              <span className="block text-[9px] font-mono tracking-wider text-brand-muted uppercase leading-none">Growth</span>
              <p className="text-[11px] sm:text-xs font-bold text-brand-dark mt-0.5">
                <span className="text-emerald-500 font-mono font-black text-xs sm:text-[13px]">+42%</span> More Leads
              </p>
            </div>
          </motion.div>

          {/* 3D Floating Revolving Card 4: SEO Optimized (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0],
              x: [0, 6, 0],
              rotate: [-2, 1, -2],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.45 },
              scale: { duration: 0.6, delay: 0.45 },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 30 }}
            className="hidden sm:flex absolute bottom-12 left-2 sm:-left-10 md:-left-18 z-20 bg-white border border-brand-border/80 p-3 rounded-2xl shadow-xl shadow-brand-dark/5 items-center gap-2.5 select-none pointer-events-auto transition-shadow hover:shadow-2xl hover:border-brand-border duration-300 w-[145px] sm:w-[160px]"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 text-blue-500 text-sm shrink-0">
              🔍
            </div>
            <div className="text-left">
              <span className="block text-[9px] font-mono tracking-wider text-brand-muted uppercase leading-none">Traffic</span>
              <p className="text-[11px] sm:text-xs font-bold text-brand-dark mt-0.5">
                SEO Optimized
              </p>
            </div>
          </motion.div>

          {/* 3D Floating Revolving Card 5: Mobile First (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, 14, 0],
              x: [0, -6, 0],
              rotate: [1, -2, 1],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.6 },
              scale: { duration: 0.6, delay: 0.6 },
              y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 30 }}
            className="hidden sm:flex absolute -bottom-6 right-6 sm:right-12 z-20 bg-white border border-brand-border/80 p-3 rounded-2xl shadow-xl shadow-brand-dark/5 items-center gap-2.5 select-none pointer-events-auto transition-shadow hover:shadow-2xl hover:border-brand-border duration-300 w-[140px] sm:w-[155px]"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-rose-50 text-rose-500 text-sm shrink-0">
              📱
            </div>
            <div className="text-left">
              <span className="block text-[9px] font-mono tracking-wider text-brand-muted uppercase leading-none">UX Design</span>
              <p className="text-[11px] sm:text-xs font-bold text-brand-dark mt-0.5">
                Mobile First
              </p>
            </div>
          </motion.div>

          {/* Mobile-Only Clean Bento-style Grid (Hidden on desktop) */}
          <div className="sm:hidden grid grid-cols-2 gap-3 mt-8 w-full">
            {/* Speed */}
            <div className="bg-white border border-brand-border/60 p-3 rounded-[18px] flex items-center gap-2.5 shadow-sm">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-50 text-amber-500 text-xs shrink-0 select-none">
                ⚡
              </div>
              <div className="text-left">
                <span className="block text-[8px] font-mono tracking-wider text-brand-muted uppercase leading-none">Speed</span>
                <p className="text-[10px] font-bold text-brand-dark mt-0.5">
                  Page Speed <span className="text-emerald-500 font-mono font-black">98</span>
                </p>
              </div>
            </div>

            {/* Leads */}
            <div className="bg-white border border-brand-border/60 p-3 rounded-[18px] flex items-center gap-2.5 shadow-sm">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-500 text-xs shrink-0 select-none">
                📈
              </div>
              <div className="text-left">
                <span className="block text-[8px] font-mono tracking-wider text-brand-muted uppercase leading-none">Leads</span>
                <p className="text-[10px] font-bold text-brand-dark mt-0.5">
                  <span className="text-emerald-500 font-mono font-black">+42%</span> Growth
                </p>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white border border-brand-border/60 p-3 rounded-[18px] flex items-center gap-2.5 shadow-sm">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-500 text-xs shrink-0 select-none">
                🔍
              </div>
              <div className="text-left">
                <span className="block text-[8px] font-mono tracking-wider text-brand-muted uppercase leading-none">Traffic</span>
                <p className="text-[10px] font-bold text-brand-dark mt-0.5">
                  SEO Optimized
                </p>
              </div>
            </div>

            {/* Mobile First */}
            <div className="bg-white border border-brand-border/60 p-3 rounded-[18px] flex items-center gap-2.5 shadow-sm">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-rose-50 text-rose-500 text-xs shrink-0 select-none">
                📱
              </div>
              <div className="text-left">
                <span className="block text-[8px] font-mono tracking-wider text-brand-muted uppercase leading-none">UX Design</span>
                <p className="text-[10px] font-bold text-brand-dark mt-0.5">
                  Mobile First
                </p>
              </div>
            </div>

            {/* 100% Custom Design - Col span 2 for clean balance */}
            <div className="col-span-2 bg-white border border-brand-border/60 p-3 rounded-[18px] flex items-center justify-center gap-3 shadow-sm">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-violet-50 text-violet-500 text-xs shrink-0 select-none">
                🎨
              </div>
              <div className="text-left">
                <span className="block text-[8px] font-mono tracking-wider text-brand-muted uppercase leading-none text-center">Artistry</span>
                <p className="text-[10px] font-bold text-brand-dark mt-0.5">
                  100% Custom Tailored Layout
                </p>
              </div>
            </div>
          </div>

          {/* Decorative background visual elements */}
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-brand-orange/5 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute top-1/2 -right-6 w-12 h-12 border-2 border-brand-border rounded-full pointer-events-none hidden sm:block" />
        </motion.div>
      </div>

      {/* Micro-scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-3 h-3 text-brand-dark" />
        </motion.div>
      </div>
    </section>
  );
}
