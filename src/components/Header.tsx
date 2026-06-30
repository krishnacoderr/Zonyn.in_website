import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logoImg from "../assets/images/logo.png";

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavClick, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Selected Work", id: "work" },
    { name: "Book a Call", id: "book" },
  ];

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-[#d2d2d2]/90 backdrop-blur-md border-brand-border py-2"
            : "bg-[#d2d2d2] border-transparent py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Logo */}
          <a
            id="logo-brand"
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavClick("hero");
            }}
            className="flex items-center gap-2 group select-none"
          >
            <img
              src={logoImg}
              alt="Zonyn.in Logo"
              referrerPolicy="no-referrer"
              className="w-[38px] h-[38px] rounded-md object-cover shadow-sm group-hover:rotate-6 transition-transform duration-300 bg-[#d2d2d2]"
            />
            <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-brand-dark">
              Zonyn<span className="text-[#000000]">.in</span>
            </span>
          </a>

          {/* Center: Desktop Nav */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                id={`nav-link-${item.id}`}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(item.id);
                }}
                className={`text-xs md:text-sm font-normal tracking-tight transition-colors duration-200 relative py-1 ${
                  activeSection === item.id
                    ? "text-brand-orange"
                    : "text-brand-dark hover:text-brand-orange"
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right: CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              id="header-cta"
              onClick={() => onNavClick("book")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-1.5 bg-brand-orange text-white font-medium text-xs md:text-sm rounded-full flex items-center gap-1.5 transition-colors duration-200 hover:bg-brand-orange/95 cursor-pointer shadow-sm shadow-brand-orange/10"
            >
              Let's Connect
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 md:hidden text-brand-dark hover:text-brand-orange transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 z-40 bg-brand-bg/95 backdrop-blur-md pt-20 pb-8 px-6 flex flex-col md:hidden border-b border-brand-border shadow-lg"
          >
            <div className="flex flex-col gap-2 text-center mt-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  id={`mobile-link-${item.id}`}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onNavClick(item.id);
                  }}
                  className={`text-base font-bold py-2.5 border-b border-brand-border/30 transition-colors duration-200 ${
                    activeSection === item.id ? "text-brand-orange" : "text-brand-dark/90 active:text-brand-orange"
                  }`}
                >
                  {item.name}
                </a>
              ))}

              <motion.button
                id="mobile-drawer-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavClick("book");
                }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-5 py-2.5 bg-brand-orange text-white font-bold text-sm rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-brand-orange/10"
              >
                Let's Connect
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
