import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Work from "./components/Work";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isAtFooter, setIsAtFooter] = useState(false);

  // Custom smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  // Scroll to booking form if a card is clicked
  const handleProjectClick = (projectName: string) => {
    // Smooth scroll to booking form without auto-filling any text
    handleScrollToSection("book");
  };

  // Robust scroll spy to track active section and footer presence during scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "work", "book"];
      let currentSection = "hero";
      
      // We trigger the active state when a section's top is less than 280px from the top of the viewport
      const triggerThreshold = 280;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerThreshold) {
            currentSection = id;
          }
        }
      }

      // If we are near the bottom of the page, force "book" to be active
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        currentSection = "book";
      }

      setActiveSection(currentSection);

      // Check if we reached the footer section to hide the WhatsApp button
      const footer = document.getElementById("app-footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        // If the top of the footer starts entering the viewport, mark isAtFooter as true
        setIsAtFooter(footerRect.top <= window.innerHeight);
      } else {
        const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
        setIsAtFooter(isNearBottom);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="zonyn-app-root" className="min-h-screen bg-brand-bg text-brand-dark selection:bg-brand-orange/20 selection:text-brand-orange overflow-x-hidden antialiased">
      {/* Dynamic Header */}
      <Header onNavClick={handleScrollToSection} activeSection={activeSection} />

      {/* Main Sections */}
      <main id="app-main-content">
        {/* 1. Hero */}
        <Hero onNavClick={handleScrollToSection} />

        {/* 2. About */}
        <About />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* 3. Selected Work */}
        <Work onProjectClick={handleProjectClick} />

        {/* 4. Book a Call */}
        <Booking />
      </main>

      {/* 5. Footer */}
      <Footer onNavClick={handleScrollToSection} />

      {/* Floating WhatsApp Chat Button */}
      <WhatsAppButton isBookingPage={activeSection === "book"} isAtFooter={isAtFooter} />
    </div>
  );
}
