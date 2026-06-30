import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import cbcImg from "./cbc.png";
import fitrangerImg from "./fitranger.png";
import clinicImg from "./clinic.png";

interface WorkProps {
  onProjectClick: (projectName: string) => void;
}

export default function Work({ onProjectClick }: WorkProps) {
  const projects = [
    {
      id: "project-veratech",
      name: "Chhota Bheem Café",
      industry: "Café",
      imageUrl: cbcImg,
      description: "A delightful culinary experience bringing nostalgic themes, fresh recipes, and lively branding to life.",
      tags: ["Brand Identity", "UX Design", "Web Design"],
      launchYear: "2026",
      websiteUrl: "https://www.chhotabheemcafe.com/",
    },
    {
      id: "project-northhaus",
      name: "FitRanger",
      industry: "Gym",
      imageUrl: fitrangerImg,
      description: "A premium, athletic training community with interactive member dashboards and session tracking.",
      tags: ["UX Design", "Member Portal", "Web App"],
      launchYear: "2026",
      websiteUrl: "https://www.fitranger.com/",
    },
    {
      id: "project-luminary",
      name: "Octor",
      industry: "Clinic",
      imageUrl: clinicImg,
      description: "An intuitive patient care experience platform designed for a modern multi-specialty healthcare clinic.",
      tags: ["Healthcare UI", "Patient Portal", "Visual Design"],
      launchYear: "2025",
      websiteUrl: "https://octor.co/",
    },
  ];

  return (
    <section
      id="work"
      className="py-24 md:py-32 px-6 md:px-12 bg-brand-bg border-t border-brand-border"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
              <span className="text-[11px] font-mono font-medium tracking-widest text-brand-dark/80 uppercase">
                Portfolio
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight">
              Selected Work
            </h2>
          </div>
          <p className="text-brand-muted max-w-sm text-sm sm:text-base leading-relaxed font-light">
            A small, highly curated selection of recent client websites we designed and engineered from the ground up.
          </p>
        </div>

        {/* Project Cards Grid - exactly 3 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              id={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onProjectClick(project.name)}
              className="group flex flex-col h-full bg-white border border-brand-border rounded-[24px] overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_40px_rgba(23,23,23,0.04)] transition-all duration-500"
            >
              {/* Image Preview Container with Hover Zoom in a premium framed container */}
              <div className="p-3 bg-white">
                <div className="aspect-[4/3] overflow-hidden relative rounded-[18px] border border-brand-border/60 bg-brand-bg">
                  <img
                    src={project.imageUrl}
                    alt={`${project.name} - ${project.industry}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Micro Hover indicator */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm border border-brand-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-sm text-brand-dark">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Text Info block */}
              <div className="p-6 md:p-8 pt-2 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-brand-orange uppercase tracking-wider">
                      {project.industry}
                    </span>
                    <span className="text-xs font-mono text-brand-muted/60 font-light">
                      {project.launchYear}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-dark group-hover:text-brand-orange transition-colors duration-300 tracking-tight">
                    {project.name}
                  </h3>

                  <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>



                 {/* Visit Site Button */}
                <div className="pt-4">
                  <button
                    id={`visit-project-${project.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.websiteUrl, "_blank", "noopener,noreferrer");
                    }}
                    className="w-full py-3 px-4 bg-brand-dark hover:bg-brand-orange text-white text-xs font-mono font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm shadow-brand-dark/5"
                  >
                    <span className="font-sans text-[17px]">Visit Site</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
