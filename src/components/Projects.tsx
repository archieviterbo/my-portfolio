import { Sparkles, Cpu, Code, TerminalSquare } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function Projects() {
  const { projects } = usePortfolio();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AI":
        return <Cpu size={16} className="text-cyber-yellow" />;
      case "Cybersecurity":
        return <TerminalSquare size={16} className="text-cyber-yellow" />;
      default:
        return <Code size={16} className="text-cyber-yellow" />;
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-cyber-dark/40 relative z-10">
      {/* Grid subtle background for layout spacing */}
      <div className="absolute inset-0 pointer-events-none tech-grid-dots opacity-30" />
      
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col mb-12 space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-yellow animate-ping" />
            <span className="font-mono text-xs text-cyber-yellow uppercase tracking-widest font-semibold">
              01 // PROJECT PORTFOLIO LAB
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
            ACADEMIC & PERSONAL <span className="text-cyber-yellow glow-yellow">ENGINES</span>
          </h2>
          <p className="text-zinc-500 font-mono text-xs max-w-xl">
            A showcase of software systems, automation scripts, and cybersecurity frameworks constructed throughout my academic journey.
          </p>
        </div>

        {/* Beautiful responsive cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => {
            return (

              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-lg border border-zinc-800 bg-cyber-dark/40 hover:border-cyber-yellow/40 hover:box-glow-yellow hover:bg-cyber-gray/40 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Visual top border highlight on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-cyber-yellow transition-all duration-300" />

                <div>
                  {/* Category Tag & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-cyber-dark border border-zinc-800 text-[10px] font-mono text-zinc-400">
                      {getCategoryIcon(project.category)}
                      <span className="uppercase tracking-wider">{project.category}</span>
                    </div>
                    <Sparkles size={14} className="text-zinc-700 group-hover:text-cyber-yellow group-hover:animate-spin transition-colors duration-300" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1 font-sans">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-cyber-yellow/80 mb-4">{project.subtitle}</p>
                  
                  {/* Brief description */}
                  <p className="text-xs text-zinc-400 mb-5 leading-relaxed font-sans">{project.description}</p>
                  
                  {/* Project details (bullets from resume) */}
                  <ul className="space-y-2 mb-6 text-[11px] text-zinc-500 list-none pl-0">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-cyber-yellow font-mono text-[10px] mt-0.5 select-none">&raquo;</span>
                        <span className="group-hover:text-zinc-400 transition-colors duration-200">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies list */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-900 font-mono mt-auto">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="text-[9px] px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:border-zinc-800 transition-all duration-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
