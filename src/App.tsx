import { useState, useEffect } from "react";
import { Terminal, Shield, Sparkles, User, ExternalLink, Lock } from "lucide-react";
import { PortfolioProvider } from "./context/PortfolioContext";
import ParticleGridBackground from "./components/ParticleGridBackground";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ResumeDetails from "./components/ResumeDetails";
import ContactConsole from "./components/ContactConsole";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section highlighters
      const sections = ["hero", "projects", "resume-console", "contact"];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PortfolioProvider>
      <div className="relative min-h-screen bg-cyber-dark text-zinc-300 font-sans selection:bg-cyber-yellow selection:text-black">
        {/* 1. Interactive canvas grid background */}
        <ParticleGridBackground />

        {/* Global CRT overlay filter to add a vintage cyber monitor vibe */}
        <div className="scanlines fixed inset-0 pointer-events-none z-40 opacity-15" />

        {/* 2. Top Navigation HUD */}
        <nav
          id="cyber-navbar"
          className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
            scrolled
              ? "bg-cyber-dark/90 backdrop-blur-md py-3.5 border-cyber-yellow/20 shadow-lg shadow-cyber-yellow/5"
              : "bg-transparent py-5 border-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between font-mono">
            {/* Logo Brand */}
            <div 
              onClick={() => handleScrollTo("hero")}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="h-7 w-7 rounded bg-cyber-yellow/5 border border-cyber-yellow/30 flex items-center justify-center group-hover:border-cyber-yellow group-hover:box-glow-yellow transition-all duration-300">
                <Terminal size={14} className="text-cyber-yellow animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] sm:text-xs font-black tracking-tight text-white uppercase block leading-none">
                  ARCHIE D. <span className="text-cyber-yellow glow-yellow font-black">VITERBO</span>
                </span>
                <span className="text-[8px] text-zinc-500 uppercase tracking-widest block leading-none">
                  BSIT // DEV PORTFOLIO
                </span>
              </div>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6 text-[10px] tracking-wider uppercase font-semibold">
              <button
                onClick={() => handleScrollTo("hero")}
                className={`hover:text-cyber-yellow transition-colors cursor-pointer ${
                  activeSection === "hero" ? "text-cyber-yellow font-bold" : "text-zinc-400"
                }`}
              >
                01 // HOME
              </button>
              <button
                onClick={() => handleScrollTo("projects")}
                className={`hover:text-cyber-yellow transition-colors cursor-pointer ${
                  activeSection === "projects" ? "text-cyber-yellow font-bold" : "text-zinc-400"
                }`}
              >
                02 // PROJECTS
              </button>
              <button
                onClick={() => handleScrollTo("resume-console")}
                className={`hover:text-cyber-yellow transition-colors cursor-pointer ${
                  activeSection === "resume-console" ? "text-cyber-yellow font-bold" : "text-zinc-400"
                }`}
              >
                03 // METRIC_RESUME
              </button>
              <button
                onClick={() => handleScrollTo("contact")}
                className={`hover:text-cyber-yellow transition-colors cursor-pointer ${
                  activeSection === "contact" ? "text-cyber-yellow font-bold" : "text-zinc-400"
                }`}
              >
                04 // CONTACT
              </button>
            </div>

            {/* Quick Active Status Badge */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-cyber-yellow/5 border border-cyber-yellow/20 text-[9px] text-cyber-yellow">
              <Shield size={11} className="animate-spin" style={{ animationDuration: '4s' }} />
              <span className="uppercase tracking-widest font-bold">PORTFOLIO_LIVE_v1.0</span>
            </div>
          </div>
        </nav>

        {/* 3. Main content blocks */}
        <main className="relative">
          {/* Hero Section */}
          <Hero onExploreProjects={() => handleScrollTo("projects")} />

          {/* Projects Section (Bento Hub with tabbed simulators) */}
          <Projects />

          {/* Resume Details Section (Skills, Experience, Certifications) */}
          <ResumeDetails />

          {/* Contact Console Section */}
          <ContactConsole />
        </main>

        {/* 4. Footer */}
        <footer className="py-12 border-t border-zinc-900 bg-cyber-dark relative z-10 font-mono text-[10px] text-zinc-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyber-yellow" />
              <p className="uppercase tracking-wide">
                &copy; {new Date().getFullYear()} ARCHIE D. VITERBO. ALL DATA ENCRYPTED.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="uppercase text-[9px] tracking-widest text-zinc-600">
                BUILT WITH REACT.JS & TAILWIND CSS
              </span>
              <span>//</span>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-cyber-yellow hover:text-white hover:glow-yellow transition-all duration-300 flex items-center gap-1 cursor-pointer uppercase text-[9px] font-bold"
              >
                <Lock size={10} className="text-cyber-yellow/70 shrink-0" />
                <span>BSIT LAB GATEWAY</span>
              </button>
            </div>
          </div>
        </footer>

        {/* Admin Dashboard Configuration Overlay Modal */}
        <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </div>
    </PortfolioProvider>
  );
}
