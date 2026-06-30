import { motion } from "motion/react";
import { TrendingUp, Zap, Target, Smartphone } from "lucide-react";

export default function About() {
  const features = [
    {
      id: "feat-google",
      title: "Built for Better Google Visibility",
      description: "SEO best practices built into every website to improve visibility.",
      icon: TrendingUp,
    },
    {
      id: "feat-speed",
      title: "Loads Under 2 Seconds",
      description: "Optimized for speed to reduce bounce rates and improve user experience.",
      icon: Zap,
    },
    {
      id: "feat-enquiries",
      title: "Generate More Enquiries",
      description: "Conversion-focused layouts designed to turn visitors into customers.",
      icon: Target,
    },
    {
      id: "feat-responsive",
      title: "Win Customers on Every Device",
      description: "Fully responsive experience across mobile, tablet, and desktop.",
      icon: Smartphone,
    },
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 md:px-12 bg-brand-bg border-t border-brand-border"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-32">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
            <span className="text-[11px] font-mono font-medium tracking-widest text-brand-dark/80 uppercase">
              Our Philosophy
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] leading-[1.12] tracking-tight">
            How We Help Your Business Grow.
          </h2>

          <p className="text-[13px] font-normal text-center text-brand-muted leading-relaxed">
            Every website we build is crafted from scratch around your business goals. We focus on speed, usability, and conversion so your website doesn't just look premium—it helps your business grow.
          </p>


        </div>

        {/* Right Column: Six Large Rounded Benefit Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                id={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, boxShadow: "0 12px 30px rgba(23, 23, 23, 0.03)" }}
                className="p-8 bg-white border border-brand-border rounded-[24px] flex flex-col justify-between min-h-[240px] h-auto transition-shadow duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-dark/70 group-hover:text-brand-orange group-hover:bg-brand-orange/5 transition-colors duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-brand-muted/50 font-medium">
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-2 mt-auto">
                  <h3 className="font-display text-lg font-bold text-brand-dark tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
