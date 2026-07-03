import { Mail, Phone, MapPin, Calendar, Award, Sparkles, ChevronDown } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import TerminalHUD from "./TerminalHUD";

interface HeroProps {
  onExploreProjects: () => void;
}

export default function Hero({ onExploreProjects }: HeroProps) {
  const { personalInfo } = usePortfolio();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 z-10">
      {/* Decorative Scanline Overlays */}
      <div className="absolute inset-0 pointer-events-none tech-grid opacity-30" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Developer Intro */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-yellow/20 bg-cyber-yellow/5 w-fit">
            <Sparkles size={14} className="text-cyber-yellow animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-[10px] sm:text-xs font-mono text-cyber-yellow uppercase tracking-widest font-semibold">
              IT SPECIALIST PORTFOLIO // System Online
            </span>
          </div>

          {/* Name Header with Cyber Glowing Neon Yellow Text */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-sans tracking-tight text-white leading-none text-flicker">
              <span className="block text-zinc-400 font-light text-2xl sm:text-3xl font-mono tracking-wider mb-2">HELLO, I AM</span>
              ARCHIE D. <span className="text-cyber-yellow glow-yellow font-black">VITERBO</span>
            </h1>
          </div>

          {/* Dynamic Role & Core Mission */}
          <div className="border-l-2 border-cyber-yellow/40 pl-4 py-1">
            <h2 className="text-lg sm:text-xl font-mono text-zinc-300 font-semibold mb-2">
              {personalInfo.title}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
              {personalInfo.summary}
            </p>
          </div>

          {/* Contact Details Dock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg pt-2 font-mono text-xs text-zinc-400">
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="flex items-center gap-3 px-3 py-2.5 rounded-md border border-zinc-800 bg-cyber-dark/50 hover:border-cyber-yellow/40 hover:text-white hover:bg-cyber-yellow/5 transition-all duration-300"
            >
              <Mail size={14} className="text-cyber-yellow" />
              <span className="truncate">{personalInfo.email}</span>
            </a>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-md border border-zinc-800 bg-cyber-dark/50">
              <Phone size={14} className="text-cyber-yellow" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-md border border-zinc-800 bg-cyber-dark/50">
              <MapPin size={14} className="text-cyber-yellow" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-md border border-zinc-800 bg-cyber-dark/50">
              <Calendar size={14} className="text-cyber-yellow" />
              <span>BSIT Candidate (2027)</span>
            </div>
          </div>

          {/* Key Quick Achievements Panel (Bento Grid Style) */}
          <div className="grid grid-cols-2 gap-4 max-w-lg pt-2">
            <div className="flex items-start gap-3 p-3 rounded-lg border border-zinc-800 bg-cyber-dark/30 hover:border-cyber-yellow/20 transition-all duration-300 group">
              <div className="p-2 rounded bg-cyber-yellow/5 border border-cyber-yellow/20 text-cyber-yellow group-hover:bg-cyber-yellow group-hover:text-black transition-all duration-300">
                <Award size={16} />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Honors</p>
                <p className="text-xs font-semibold text-zinc-200">President's & Dean's Lister</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border border-zinc-800 bg-cyber-dark/30 hover:border-cyber-yellow/20 transition-all duration-300 group">
              <div className="p-2 rounded bg-cyber-yellow/5 border border-cyber-yellow/20 text-cyber-yellow group-hover:bg-cyber-yellow group-hover:text-black transition-all duration-300">
                <Sparkles size={16} />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Focus</p>
                <p className="text-xs font-semibold text-zinc-200">Cybersecurity & AI Dev</p>
              </div>
            </div>
          </div>

          {/* CTA Trigger */}
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              onClick={onExploreProjects}
              id="cta-explore-projects"
              className="px-6 py-3 rounded border border-cyber-yellow bg-cyber-yellow text-black font-semibold font-sans tracking-wide text-sm hover:bg-transparent hover:text-cyber-yellow shadow-lg shadow-cyber-yellow/10 hover:box-glow-yellow transition-all duration-300 cursor-pointer"
            >
              EXPLORE CYBER LAB
            </button>
            <a
              href="#resume-console"
              className="px-6 py-3 rounded border border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:border-zinc-700 font-mono tracking-wide text-sm transition-all duration-300"
            >
              &lt; VIEW_CV /&gt;
            </a>
          </div>
        </div>

        {/* Right Side: Interactive HUD (Terminal OS) */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div className="w-full max-w-md lg:max-w-none">
            <div className="text-center lg:text-left mb-3">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Interactive Terminal HUD // Live Simulator</span>
            </div>
            <TerminalHUD />
          </div>
        </div>
      </div>

      {/* Bounce Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer" onClick={onExploreProjects}>
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">SCROLL PROTOCOL</span>
        <ChevronDown size={14} className="text-cyber-yellow animate-bounce" />
      </div>
    </section>
  );
}
