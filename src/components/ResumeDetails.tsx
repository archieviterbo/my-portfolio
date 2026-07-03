import { useState } from "react";
import { Briefcase, GraduationCap, ShieldCheck, Cpu, Code, Layers, Sparkles, Phone, Mail, MapPin } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function ResumeDetails() {
  const { personalInfo, skills, experience, certifications } = usePortfolio();
  const [activeTab, setActiveTab] = useState<"skills" | "experience" | "certifications">("skills");

  return (
    <section id="resume-console" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-cyber-dark/60 relative z-10">
      <div className="absolute inset-0 pointer-events-none tech-grid opacity-10" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col mb-12 space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-yellow animate-ping" />
            <span className="font-mono text-xs text-cyber-yellow uppercase tracking-widest font-semibold">
              02 // METRIC SYSTEM DATABANK
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
            RESUME & TECHNICAL <span className="text-cyber-yellow glow-yellow">LOGS</span>
          </h2>
          <p className="text-zinc-500 font-mono text-xs max-w-xl">
            Detailed matrix parameters containing professional certifications, real-world work histories, and custom technical skill distributions.
          </p>
        </div>

        {/* Tab Selector buttons */}
        <div className="flex flex-wrap border-b border-zinc-800 gap-2 sm:gap-4 mb-8 font-mono text-xs">
          <button
            onClick={() => setActiveTab("skills")}
            className={`px-4 py-3 border-b-2 transition-all duration-300 font-bold uppercase tracking-wider cursor-pointer ${
              activeTab === "skills"
                ? "border-cyber-yellow text-cyber-yellow glow-yellow"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            [01] SKILL_MATRIX
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-4 py-3 border-b-2 transition-all duration-300 font-bold uppercase tracking-wider cursor-pointer ${
              activeTab === "experience"
                ? "border-cyber-yellow text-cyber-yellow glow-yellow"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            [02] EXPERIENCE_TIMELINE
          </button>
          <button
            onClick={() => setActiveTab("certifications")}
            className={`px-4 py-3 border-b-2 transition-all duration-300 font-bold uppercase tracking-wider cursor-pointer ${
              activeTab === "certifications"
                ? "border-cyber-yellow text-cyber-yellow glow-yellow"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            [03] CERTIFICATIONS_&_HONORS
          </button>
        </div>

        {/* TAB 1: Skills Matrix */}
        {activeTab === "skills" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            {skills.map((category, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-lg border border-zinc-800 bg-cyber-dark/40 hover:border-cyber-yellow/20 transition-all duration-300">
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-4">
                  {idx === 0 ? <Code size={15} className="text-cyber-yellow" /> :
                   idx === 1 ? <Cpu size={15} className="text-cyber-yellow" /> :
                   <Layers size={15} className="text-cyber-yellow" />}
                  <h3 className="text-xs uppercase font-bold text-white tracking-wider">{category.title}</h3>
                </div>

                <div className="space-y-2.5">
                  {category.skills.map((sk, sidx) => (
                    <div key={sidx} className="flex items-center gap-2 text-[11px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyber-yellow/40 animate-pulse" />
                      <span className="text-zinc-300">{sk.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Soft Skills Badges Box */}
            <div className="md:col-span-3 p-5 rounded-lg border border-zinc-800 bg-cyber-gray/30 mt-2">
              <h4 className="text-xs text-zinc-500 uppercase tracking-widest mb-3">Core Cognitive Attributes (Soft Skills)</h4>
              <div className="flex flex-wrap gap-2">
                {personalInfo.softSkills.map((sk, idx) => (
                  <span key={idx} className="px-3 py-1 text-[10px] rounded bg-cyber-yellow/5 border border-cyber-yellow/10 text-cyber-yellow uppercase tracking-wider hover:border-cyber-yellow/30 hover:bg-cyber-yellow/10 transition-all">
                    // {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Experience Timeline */}
        {activeTab === "experience" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
            {/* Work Experience */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={16} className="text-cyber-yellow" />
                <h3 className="text-xs font-mono uppercase font-bold text-white tracking-wider">Employment History</h3>
              </div>

              <div className="space-y-6 relative border-l border-zinc-800 pl-4 sm:pl-6 ml-2">
                {experience.map((item) => (
                  <div key={item.id} className="relative group space-y-2">
                    {/* Pulsing timeline point */}
                    <div className="absolute -left-[21px] sm:-left-[29px] top-1 h-3.5 w-3.5 rounded-full bg-cyber-dark border border-cyber-yellow flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyber-yellow group-hover:animate-ping" />
                    </div>

                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h4 className="text-base font-bold text-white group-hover:text-cyber-yellow transition-colors duration-200">
                        {item.role}
                      </h4>
                      <span className="text-xs font-mono text-zinc-500">
                        @ {item.company}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[10px] font-mono text-zinc-500">
                      <span>{item.period}</span>
                      <span>&bull;</span>
                      <span>{item.location}</span>
                    </div>

                    <ul className="space-y-1.5 list-none pl-0 text-xs text-zinc-400">
                      {item.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="flex items-start gap-2">
                          <span className="text-cyber-yellow font-mono">&raquo;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-1 font-mono">
                      {item.skillsGained.map((sk, sidx) => (
                        <span key={sidx} className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 uppercase">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Section */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={16} className="text-cyber-yellow" />
                <h3 className="text-xs font-mono uppercase font-bold text-white tracking-wider">Education Parameters</h3>
              </div>

              <div className="p-5 rounded-lg border border-zinc-800 bg-cyber-gray/30 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-cyber-yellow uppercase tracking-wider">{personalInfo.education.graduation}</span>
                  <h4 className="text-base font-bold text-white leading-tight">{personalInfo.education.degree}</h4>
                  <p className="text-xs font-mono text-zinc-400">{personalInfo.education.institution}</p>
                </div>

                <div className="border-t border-zinc-800 pt-4 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Honor Classifications</span>
                  <div className="space-y-1.5">
                    {personalInfo.education.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <ShieldCheck size={12} className="text-cyber-yellow" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Certifications & Honors */}
        {activeTab === "certifications" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {certifications.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-zinc-800 bg-cyber-gray/30 hover:border-cyber-yellow/40 transition-all duration-300 flex items-start gap-3">
                  <div className="p-2 rounded bg-cyber-yellow/5 border border-cyber-yellow/20 text-cyber-yellow">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white leading-snug">{cert.name}</h4>
                    <p className="text-xs font-mono text-zinc-500">{cert.issuer} &bull; {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info / Areas of Interest */}
            <div className="p-5 rounded-lg border border-zinc-800 bg-cyber-dark/40 font-mono text-xs">
              <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Core Operating Paradigms (Additional Info)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs text-zinc-400">
                {personalInfo.additionalInfo.map((info, idx) => (
                  <div key={idx} className="p-3 border border-zinc-800/60 bg-cyber-gray/20 rounded flex items-start gap-2">
                    <Sparkles size={12} className="text-cyber-yellow mt-0.5" />
                    <span>{info}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
