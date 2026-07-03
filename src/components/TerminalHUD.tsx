import React, { useState, useRef, useEffect, FormEvent } from "react";
import { Terminal, CornerDownLeft, CircleDot } from "lucide-react";
import { personalInfo, skillsData } from "../data";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "info";
}

export default function TerminalHUD() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "ARCHIE_OS v1.1.4 [SECURE TERMINAL CONSOLE]", type: "info" },
    { text: "SYSTEM DIAGNOSTICS: COMPILING SUCCESSFUL // ONLINE", type: "success" },
    { text: "Type 'help' to view available system protocols.", type: "output" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Safely scroll only the terminal logs container to the bottom on history changes
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    // Only focus if the user is not actively selecting text
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandHistory.length) {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  const handleCommandSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    // Add command to history array for up/down arrow recall
    if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== inputVal) {
      setCommandHistory((prev) => [...prev, inputVal]);
    }
    setHistoryIndex(-1);

    // Add input to history
    const newHistory: TerminalLine[] = [...history, { text: `user@archie-viterbo:~$ ${inputVal}`, type: "input" }];

    // Command parser
    switch (cmd) {
      case "help":
        newHistory.push(
          { text: "--- AVAILABLE PROTOCOLS ---", type: "info" },
          { text: "  summary    - Outputs professional mission statement", type: "output" },
          { text: "  skills     - Generates core technical matrix", type: "output" },
          { text: "  education  - Lists degree parameters and achievements", type: "output" },
          { text: "  contact    - Prints secure correspondence coordinates", type: "output" },
          { text: "  clear      - Flushes the buffer logs", type: "output" }
        );
        break;

      case "summary":
        newHistory.push(
          { text: "--- ARCHIE D. VITERBO // SUMMARY ---", type: "info" },
          { text: personalInfo.summary, type: "output" }
        );
        break;

      case "skills":
        newHistory.push({ text: "--- TECHNICAL METRIC SYSTEM ---", type: "info" });
        skillsData.forEach((cat) => {
          newHistory.push({ text: `[${cat.title.toUpperCase()}]`, type: "info" });
          cat.skills.forEach((sk) => {
            const barsCount = Math.floor(sk.level / 10);
            const barsStr = "█".repeat(barsCount) + "░".repeat(10 - barsCount);
            newHistory.push({ text: `  ${sk.name.padEnd(20)} [${barsStr}] ${sk.level}%`, type: "output" });
          });
        });
        break;

      case "education":
        newHistory.push(
          { text: "--- ACADEMIC TIMELINE STRUCTURE ---", type: "info" },
          { text: `DEGREE:      ${personalInfo.education.degree}`, type: "output" },
          { text: `INSTITUTION: ${personalInfo.education.institution}`, type: "output" },
          { text: `GRADUATION:  ${personalInfo.education.graduation}`, type: "output" },
          { text: `ACHIEVEMENTS:`, type: "info" },
          ...personalInfo.education.highlights.map((h) => ({ text: `  • ${h}`, type: "output" as const }))
        );
        break;

      case "contact":
        newHistory.push(
          { text: "--- ENCRYPTED MAILBOX ACCESS ---", type: "info" },
          { text: `  EMAIL:   ${personalInfo.email}`, type: "success" },
          { text: `  PHONE:   ${personalInfo.phone}`, type: "output" },
          { text: `  LOCATION: ${personalInfo.location}`, type: "output" }
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newHistory.push({
          text: `Error: Command protocol '${cmd}' not recognized. Type 'help' for valid parameters.`,
          type: "error",
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <div
      onClick={focusInput}
      id="retro-terminal-hub"
      className="relative flex flex-col h-[340px] md:h-[400px] w-full border border-cyber-yellow/20 bg-cyber-dark/85 backdrop-blur-md rounded-lg overflow-hidden font-mono text-xs text-zinc-300 shadow-xl transition-all duration-300 hover:border-cyber-yellow/40 hover:box-glow-yellow group"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-cyber-yellow/10 bg-cyber-gray/90">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-cyber-yellow animate-pulse" />
          <span className="text-[10px] tracking-wider text-cyber-yellow/85 uppercase">ArchieOS // Secure CLI v1.0.3</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CircleDot size={8} className="text-red-500 fill-current" />
          <CircleDot size={8} className="text-cyber-yellow fill-current" />
          <CircleDot size={8} className="text-emerald-500 fill-current" />
        </div>
      </div>

      {/* Screen/Logs area */}
      <div 
        ref={logsContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 select-text scroll-smooth"
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`leading-relaxed whitespace-pre-wrap ${
              line.type === "input"
                ? "text-white font-medium"
                : line.type === "error"
                ? "text-red-400"
                : line.type === "success"
                ? "text-cyber-yellow font-bold"
                : line.type === "info"
                ? "text-cyber-yellow/70 border-l border-cyber-yellow/30 pl-2"
                : "text-zinc-400"
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Command input form */}
      <form
        onSubmit={handleCommandSubmit}
        className="flex items-center gap-2 px-4 py-3 border-t border-cyber-yellow/10 bg-cyber-gray/50"
      >
        <span className="text-cyber-yellow select-none">$&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help' and press Enter..."
          className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-zinc-600 focus:ring-0"
          autoComplete="off"
          autoCapitalize="none"
        />
        <button
          type="submit"
          aria-label="Submit command"
          className="p-1 rounded bg-cyber-yellow/5 text-cyber-yellow/60 border border-cyber-yellow/20 hover:bg-cyber-yellow hover:text-black hover:border-cyber-yellow transition-all duration-200"
        >
          <CornerDownLeft size={12} />
        </button>
      </form>
    </div>
  );
}
