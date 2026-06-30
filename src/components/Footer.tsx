import { motion } from "motion/react";

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  return (
    <footer id="app-footer" className="bg-brand-bg border-t border-brand-border py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-medium text-brand-muted uppercase tracking-[0.2em] select-none text-center md:text-left">
        
        {/* Left block */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-brand-dark/90 font-bold tracking-normal uppercase-none text-xs">
            © Zonyn.in
          </span>
        </div>

        {/* Right block: Socials and Links */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8 w-full sm:w-auto">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavClick("hero");
            }}
            className="hover:text-brand-orange transition-colors py-3 px-4 sm:p-0 flex items-center justify-center w-full sm:w-auto text-center"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onNavClick("about");
            }}
            className="hover:text-brand-orange transition-colors py-3 px-4 sm:p-0 flex items-center justify-center w-full sm:w-auto text-center"
          >
            About
          </a>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              onNavClick("work");
            }}
            className="hover:text-brand-orange transition-colors py-3 px-4 sm:p-0 flex items-center justify-center w-full sm:w-auto text-center"
          >
            Selected Work
          </a>
          <a
            href="https://www.instagram.com/zonyn.in/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-orange transition-colors py-3 px-4 sm:p-0 flex items-center justify-center w-full sm:w-auto text-center"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/919691529501?text=Hi!%20I%20visited%20your%20website%20and%20would%20like%20to%20inquire%20about%20your%20web%20design%20and%20development%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-orange transition-colors py-3 px-4 sm:p-0 flex items-center justify-center w-full sm:w-auto text-center"
          >
            WhatsApp
          </a>
          <a
            href="mailto:zonyn.in@gmail.com"
            className="hover:text-brand-orange transition-colors font-sans tracking-tight lowercase font-normal py-3 px-4 sm:p-0 flex items-center justify-center w-full sm:w-auto text-center text-[12px]"
          >
            zonyn.in@gmail.com
          </a>
        </div>

      </div>
    </footer>
  );
}
