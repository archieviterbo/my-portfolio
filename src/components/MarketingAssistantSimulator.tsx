import { useState } from "react";
import { Sparkles, Linkedin, Twitter, Instagram, Copy, Check, RefreshCw } from "lucide-react";

interface OptionSet {
  label: string;
  value: string;
}

const TOPICS: OptionSet[] = [
  { label: "React vs Python for IT professionals", value: "react_python" },
  { label: "My top 3 cybersecurity best practices", value: "cyber_tips" },
  { label: "The importance of AI-Assisted prompt design", value: "ai_prompts" }
];

const PLATFORMS = [
  { value: "linkedin", label: "LinkedIn Pro", icon: Linkedin },
  { value: "twitter", label: "Twitter Tech-Short", icon: Twitter },
  { value: "instagram", label: "Instagram Creative", icon: Instagram }
];

const TONES = [
  { value: "hyped", label: "Hyped / Energetic" },
  { value: "tech", label: "Sleek / Cyber Tech" },
  { value: "explainer", label: "Educational Explainer" }
];

export default function MarketingAssistantSimulator() {
  const [selectedPlatform, setSelectedPlatform] = useState("linkedin");
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0].value);
  const [selectedTone, setSelectedTone] = useState("tech");
  const [customTopic, setCustomTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);

  const getCopyTemplate = () => {
    const topicText = customTopic.trim() || TOPICS.find(t => t.value === selectedTopic)?.label || "";
    
    if (selectedPlatform === "linkedin") {
      if (selectedTone === "hyped") {
        return `🔥 ARCHIE LABS REVEAL: Prompt Engineering isn't just about chatting with LLMs—it's an engineering art form!\n\nAs an IT Specialist specializing in AI-assisted development, I've realized that the quality of your inputs completely dictates the security and speed of your code. \n\n🚀 Let's stop typing passive instructions and start building optimized system frameworks! Who is ready to level up?\n\n#PromptEngineering #BSIT #ArtificialIntelligence #SoftwareDev`;
      } else if (selectedTone === "tech") {
        return `⚡ MODULE: AI-Assisted Prompt Matrix.\n\nEvaluating: "${topicText}"\n\nAI isn't replacing engineers, but developers who understand prompt vectors and structured prompt templates are replacing those who don't. By treating prompts as modular JSON structures, we gain total state control.\n\n[Status: Fully Compiled]\n#DeveloperLog #AIMatrix #ReactJS #Python`;
      } else {
        return `As an Information Technology (BSIT) candidate, I believe understanding the relationship between developer instructions and LLM outputs is crucial. \n\nIn my project, Content Marketing AI Assistant, I focused on creating customizable interaction structures. This allows users to obtain reliable, high-quality, professional copy without having to spend hours adjusting their phrasing.\n\nHere's a breakdown of the workflow:\n1. Strict semantic constraints\n2. Tone mapping filters\n3. High-integrity data outputs\n\nWhat are your thoughts on prompt workflows? Let's discuss.`;
      }
    } else if (selectedPlatform === "twitter") {
      if (selectedTone === "hyped") {
        return `🚨 EXCLUSIVE: "${topicText}" is absolutely changing the game. If you're not utilizing advanced prompting protocols in your dev stack right now, you are lagging behind! Let's get to work! 💻🚀\n#AI #WebDev`;
      } else if (selectedTone === "tech") {
        return `system_prompt_init // Topic: "${topicText}"\n\n- Low latency outputs\n- Structured context bounds\n- Pure engineering acceleration\n\nCode faster. Secure better. ⚡🤖\n#CyberTech #JavaScript #Python`;
      } else {
        return `Simple explainer on "${topicText}":\n\n- It bridges the gap between raw data and creative outputs.\n- Standard templates make results consistent.\n- Essential skill for BSIT and computer science candidates in 2026. 📚💻`;
      }
    } else { // instagram
      if (selectedTone === "hyped") {
        return `✨ NEW VIBES ONLY ✨\nDiscussing: ${topicText}\n\nLet's turn ideas into digital realities! High energy, fast iterations, beautiful interfaces! Check out my bio to see my lab! 💥💛\n#Inspiration #AIVibe #TechDeveloper`;
      } else if (selectedTone === "tech") {
        return `• [01] CONFIGURING: ${topicText}\n• [02] RENDERING NEON STYLES\n• [03] ARCHIE_LABS SUCCESSFUL DETECT\n\nCoding is a creative science. 🤖🌙\n#CyberTheme #DarkModeSetup #TechLife`;
      } else {
        return `💡 Tech Tip of the Day:\n\nUnderstanding ${topicText} will save you 10+ hours a week in content generation and coding iterations. Learn to structure your workflows today!\n#LearnCoding #TESDA #BSIT`;
      }
    }
  };

  const handleGenerate = () => {
    setGenerating(true);
    setCopied(false);
    setGeneratedOutput(null);

    setTimeout(() => {
      setGeneratedOutput(getCopyTemplate());
      setGenerating(false);
    }, 1800);
  };

  const handleCopy = () => {
    if (!generatedOutput) return;
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full border border-zinc-800 bg-cyber-dark/80 rounded-lg p-4 sm:p-5 font-sans group">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-cyber-yellow animate-pulse" />
          <span className="font-mono text-xs text-cyber-yellow tracking-wider font-semibold uppercase">AI Copywriting & Marketing System</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-cyber-yellow animate-ping" />
          <span className="text-[10px] font-mono text-zinc-500 uppercase">PROMPT_ENGINE_v1.2</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Side: Parameters Form */}
        <div className="space-y-4">
          {/* Platform selection */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Target Matrix (Platform)</span>
            <div className="grid grid-cols-3 gap-2">
              {PLATFORMS.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.value}
                    onClick={() => { setSelectedPlatform(p.value); setGeneratedOutput(null); }}
                    className={`flex flex-col items-center justify-center p-2 rounded border transition-all duration-200 cursor-pointer ${
                      selectedPlatform === p.value
                        ? "border-cyber-yellow bg-cyber-yellow/5 text-cyber-yellow font-bold"
                        : "border-zinc-800 bg-cyber-gray/45 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    <Icon size={14} className="mb-1" />
                    <span className="text-[9px] font-mono tracking-tight">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic selection */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Select Core Parameter (Topic)</span>
            <select
              value={selectedTopic}
              onChange={(e) => { setSelectedTopic(e.target.value); setCustomTopic(""); setGeneratedOutput(null); }}
              className="w-full p-2 rounded bg-cyber-gray/80 border border-zinc-800 text-xs text-zinc-300 outline-none focus:border-cyber-yellow/40 focus:ring-1 focus:ring-cyber-yellow/20"
            >
              {TOPICS.map((t) => (
                <option key={t.value} value={t.value} className="bg-cyber-dark text-zinc-300">{t.label}</option>
              ))}
            </select>
          </div>

          {/* Custom topic prompt overrides */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Or Custom Context Payload (Prompt Overrides)</span>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => { setCustomTopic(e.target.value); setGeneratedOutput(null); }}
              placeholder="e.g. Benefits of TESDA certifications in computer systems..."
              className="w-full p-2 rounded bg-cyber-gray/80 border border-zinc-800 text-xs text-zinc-300 outline-none focus:border-cyber-yellow/40 focus:ring-1 focus:ring-cyber-yellow/20"
            />
          </div>

          {/* Tone selection */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Vector Tone Matrix</span>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => { setSelectedTone(t.value); setGeneratedOutput(null); }}
                  className={`px-3 py-1.5 rounded text-[10px] border font-mono transition-all duration-200 cursor-pointer ${
                    selectedTone === t.value
                      ? "border-cyber-yellow bg-cyber-yellow/5 text-cyber-yellow font-semibold"
                      : "border-zinc-800 bg-cyber-gray/45 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate trigger */}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-cyber-yellow bg-cyber-yellow text-black font-semibold font-sans text-xs rounded hover:bg-transparent hover:text-cyber-yellow transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {generating ? (
              <>
                <RefreshCw size={13} className="animate-spin" />
                <span>SYNTHESIZING PROMPT RESPONSES...</span>
              </>
            ) : (
              <>
                <Sparkles size={13} />
                <span>GENERATE OPTIMIZED COPY</span>
              </>
            )}
          </button>
        </div>

        {/* Right Side: Generated Output Terminal */}
        <div className="flex flex-col h-full min-h-[220px] border border-zinc-800 bg-cyber-gray/30 rounded-lg overflow-hidden relative">
          <div className="px-3 py-1.5 border-b border-zinc-800 bg-cyber-dark/80 flex items-center justify-between">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">OUTPUT CONSOLE</span>
            {generatedOutput && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[9px] font-mono text-cyber-yellow hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={10} className="text-emerald-400" />
                    <span className="text-emerald-400 font-bold">COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy size={10} />
                    <span>COPY CODE</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex-1 p-3 font-mono text-[11px] text-zinc-300 leading-relaxed overflow-y-auto whitespace-pre-wrap">
            {generating ? (
              <div className="flex flex-col items-center justify-center h-full text-zinc-500 py-6">
                <RefreshCw size={18} className="animate-spin text-cyber-yellow mb-2" />
                <span className="text-[9px] uppercase tracking-widest">Compiling Prompt Tokens...</span>
              </div>
            ) : generatedOutput ? (
              <div className="crt-flicker">
                {generatedOutput}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-zinc-600 text-center py-6">
                <span className="text-[9px] uppercase tracking-widest mb-1">[BUFFER_IDLE]</span>
                <p className="text-[10px] max-w-[180px]">Synthesize optimized copywriting templates using variables on the left panel.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
