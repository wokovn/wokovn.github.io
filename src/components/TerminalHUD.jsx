import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { personalInfo, coreMetrics, projects } from '../data/portfolioData';
import confetti from 'canvas-confetti';

export default function TerminalHUD({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: '⚡ wokovn Terminal Environment v2.5' },
    { type: 'system', text: 'Type "help" to view available commands or "hire" to trigger confetti.' }
  ]);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Handle hotkeys (Esc to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    const newHistory = [...history, { type: 'user', text: `$ ${cmdText}` }];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `Available commands:
  • help       : Display this cheat sheet
  • about      : Learn about Nguyễn Anh Khoa
  • projects   : View core distributed & AI systems
  • metrics    : Check stress test telemetry
  • skills     : View full technical stack
  • contact    : Get contact email & phone
  • hire       : Trigger recruitment confetti
  • clear      : Clear terminal screen
  • exit       : Close this terminal`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'response',
          text: `[Profile] ${personalInfo.name} (@${personalInfo.handle})
Target Role : ${personalInfo.targetTitle}
Education   : ${personalInfo.university} (GPA: ${personalInfo.gpa})
Experience  : Fullstack Software Engineer Intern @ ISB Vietnam
Specialties : Distributed Systems, Multi-Agent AI (MCP), Redis Lua, BullMQ, K8s HPA`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'response',
          text: `Core Featured Projects:
1. ArkNet: High-concurrency social platform (87.2 RPS under 350 VUs, Redis Lua, BullMQ, K8s HPA)
   -> https://github.com/wokovn/SocialMediaProject
2. News Summary & Vietnamese TTS: Multi-dialect voice synthesis (vnTTS, PyTorch CUDA, Gemini)
   -> https://github.com/wokovn/Project-LT-ML-23KHDL1-HCMUS
3. ISB Multi-Agent & HR: Vault wrapped DEK, blind indexing, ReDoS fix (<200ms)
4. PetCareX: Advanced 3NF database, Sequential UUID index optimization`
        });
        break;

      case 'metrics':
        newHistory.push({
          type: 'response',
          text: coreMetrics.map(m => `• ${m.label}: ${m.value} (${m.detail})`).join('\n')
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'response',
          text: `Languages : TypeScript, JavaScript, SQL, Python, Java 21
Backend   : Node.js (Express 5), Spring Boot 4, FastAPI, WebSockets
Frontend  : React 19, Next.js 15, Vue 3, Tailwind CSS
Databases : PostgreSQL, Redis (Lua/PubSub), BullMQ, MSSQL
DevOps/QA : Docker, Kubernetes HPA, Vitest (5,600+ tests), HashiCorp Vault`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `Email    : ${personalInfo.email}
Phone    : ${personalInfo.phone}
LinkedIn : ${personalInfo.linkedin}
GitHub   : ${personalInfo.github}`
        });
        break;

      case 'hire':
      case 'sudo hire':
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#00f7f7', '#10b981', '#8b5cf6', '#f59e0b']
        });
        newHistory.push({
          type: 'response',
          text: `🎉 Congratulations! Access granted.
Let's talk! Drop an email to ${personalInfo.email} or call ${personalInfo.phone}.`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      case '':
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `zsh: command not found: ${cmdText}. Type "help" for a list of commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-2xl rounded-2xl bg-surface-100 border border-brand-cyan/40 shadow-[0_0_50px_rgba(0,247,247,0.2)] overflow-hidden font-mono flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-surface-200 border-b border-surface-border text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-cyan" />
            <span className="font-semibold text-white">wokovn-interactive-cli</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-500 hidden sm:inline">Press ESC or type 'exit' to close</span>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-surface-hover text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Output area */}
        <div className="p-4 overflow-y-auto space-y-2 text-xs flex-1 min-h-[300px]">
          {history.map((h, i) => (
            <div key={i} className="leading-relaxed">
              {h.type === 'user' && (
                <div className="text-brand-cyan font-bold">{h.text}</div>
              )}
              {h.type === 'response' && (
                <pre className="text-slate-200 whitespace-pre-wrap font-mono pl-2 border-l border-brand-cyan/30 mt-1">
                  {h.text}
                </pre>
              )}
              {h.type === 'system' && (
                <div className="text-brand-emerald">{h.text}</div>
              )}
              {h.type === 'error' && (
                <div className="text-rose-400">{h.text}</div>
              )}
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        {/* Input prompt */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 bg-surface-200/80 border-t border-surface-border">
          <span className="text-brand-emerald font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'projects', 'metrics', or 'hire'..."
            className="flex-1 bg-transparent text-white text-xs outline-none placeholder:text-slate-600 font-mono"
          />
          <button type="submit" className="text-slate-500 hover:text-brand-cyan">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
}

