import { Mail, Phone, MapPin } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function ContactConsole() {
  const { personalInfo } = usePortfolio();

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-cyber-dark/80 relative z-10">
      <div className="absolute inset-0 pointer-events-none tech-grid-dots opacity-20" />

      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col mb-12 space-y-2 text-center items-center">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-yellow animate-ping" />
            <span className="font-mono text-xs text-cyber-yellow uppercase tracking-widest font-semibold">
              03 // GET IN TOUCH
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
            CONTACT <span className="text-cyber-yellow glow-yellow">ME</span>
          </h2>
          <p className="text-zinc-500 font-mono text-xs max-w-lg">
            Direct communication channels. Reach out using any of the active coordinate channels below.
          </p>
        </div>

        {/* Beautiful responsive centered cards */}
        <div className="border border-zinc-800 bg-cyber-gray/40 rounded-lg p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-8">
          <div className="space-y-2 text-center">
            <h3 className="text-base font-bold text-white uppercase font-sans tracking-wide">
              Direct Coordinates
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-md mx-auto">
              These communication channels are fully active. Feel free to contact me directly using any of the paths below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs text-zinc-300">
            {/* Email Card */}
            <div className="flex flex-col items-center text-center gap-3 p-5 rounded bg-cyber-dark/60 border border-zinc-800 hover:border-cyber-yellow/30 transition-all duration-300">
              <div className="p-3 rounded-full bg-cyber-yellow/5 border border-cyber-yellow/15 text-cyber-yellow">
                <Mail size={18} />
              </div>
              <div className="w-full overflow-hidden">
                <p className="text-[9px] text-zinc-500 uppercase font-mono mb-1">Email Address</p>
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="font-semibold text-white truncate text-xs hover:text-cyber-yellow hover:underline transition-all block"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex flex-col items-center text-center gap-3 p-5 rounded bg-cyber-dark/60 border border-zinc-800 hover:border-cyber-yellow/30 transition-all duration-300">
              <div className="p-3 rounded-full bg-cyber-yellow/5 border border-cyber-yellow/15 text-cyber-yellow">
                <Phone size={18} />
              </div>
              <div className="w-full overflow-hidden">
                <p className="text-[9px] text-zinc-500 uppercase font-mono mb-1">Phone Number</p>
                <a 
                  href={`tel:${personalInfo.phone}`} 
                  className="font-semibold text-white text-xs hover:text-cyber-yellow hover:underline transition-all block"
                >
                  {personalInfo.phone}
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="flex flex-col items-center text-center gap-3 p-5 rounded bg-cyber-dark/60 border border-zinc-800 hover:border-cyber-yellow/30 transition-all duration-300">
              <div className="p-3 rounded-full bg-cyber-yellow/5 border border-cyber-yellow/15 text-cyber-yellow">
                <MapPin size={18} />
              </div>
              <div className="w-full overflow-hidden">
                <p className="text-[9px] text-zinc-500 uppercase font-mono mb-1">Location</p>
                <p className="font-semibold text-white text-xs">{personalInfo.location}</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-2 border-t border-zinc-900/60">
            <p className="text-[10px] text-zinc-600 font-mono">
              * Direct line active & validated.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
