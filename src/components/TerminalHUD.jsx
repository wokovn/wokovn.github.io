import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { personalInfo, coreMetrics, projects } from '../data/portfolioData';
import confetti from 'canvas-confetti';

export default function TerminalHUD({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: '[SYS] wokovn Retro Terminal v3.0 [NEOBRUTAL EDITION]' },
    { type: 'system', text: 'Type "help" to view commands or "hire" for celebration.' }
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
    const newHistory = [...history, { type: 'user', text: `> ${cmdText}` }];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `COMMAND CHEAT SHEET:
  • help       : View all commands
  • about      : Learn about Nguyễn Anh Khoa
  • projects   : View 4 core systems (ArkNet, TTS, ISB, PetCareX)
  • telemetry  : View 350 VUs stress test numbers
  • skills     : View full technical arsenal
  • contact    : View direct phone & email
  • hire       : Trigger confetti & contact info
  • clear      : Clear terminal screen
  • exit       : Close terminal`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'response',
          text: `[PROFILE] ${personalInfo.name} (@${personalInfo.handle})
Target Role : Software Engineer
University  : VNUHCM - University of Science (HCMUS) • GPA: ${personalInfo.gpa}
Experience  : Fullstack Software Engineer Intern @ ISB Vietnam
Specialties : Distributed Systems, Multi-Agent AI (MCP), Redis Lua, BullMQ, K8s HPA`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'response',
          text: `CORE SYSTEMS:
1. ArkNet: High-concurrency social media platform (87.2 RPS, 350 VUs, Redis Lua, BullMQ, K8s HPA)
   -> https://github.com/wokovn/SocialMediaProject
2. News Summary & Regional TTS: Multi-dialect voice synthesis (vnTTS, PyTorch CUDA, Gemini)
   -> https://github.com/wokovn/Project-LT-ML-23KHDL1-HCMUS
3. ISB Multi-Agent & Security: Vault wrapped DEK, blind indexing, ReDoS fix (<200ms)
4. PetCareX: Advanced 3NF schema, Sequential UUID index optimization`
        });
        break;

      case 'telemetry':
      case 'metrics':
        newHistory.push({
          type: 'response',
          text: coreMetrics.map(m => `> ${m.label}: ${m.value} (${m.detail})`).join('\n')
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'response',
          text: `LANGUAGES : TypeScript, JavaScript, SQL, Python, Java 21
BACKEND   : Node.js (Express 5), Spring Boot 4, FastAPI, WebSockets
FRONTEND  : React 19, Next.js 15, Vue 3, Tailwind CSS, Vite
DATABASES : PostgreSQL, Redis (Lua/PubSub), BullMQ, MSSQL
DEVOPS/QA : Docker, Kubernetes HPA, Vitest (5,600+ tests), HashiCorp Vault`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `EMAIL    : ${personalInfo.email}
PHONE    : ${personalInfo.phone}
LINKEDIN : ${personalInfo.linkedin}
GITHUB   : ${personalInfo.github}`
        });
        break;

      case 'hire':
      case 'sudo hire':
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#FFE600', '#FF6584', '#00F0FF', '#4ECCA3', '#A388EE']
        });
        newHistory.push({
          type: 'response',
          text: `[SUCCESS] ACCESS GRANTED! Let's build together:
Drop an email to ${personalInfo.email} or call ${personalInfo.phone}.`
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
          text: `bash: command not found: "${cmdText}". Type "help" for a list of commands.`
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl rounded-2xl border-2 border-[#121316] bg-white shadow-neo-2xl overflow-hidden font-mono flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-neo-yellow border-b-2 border-[#121316] text-xs font-bold text-[#121316]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>WOKOVN-RETRO-CLI</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-700 hidden sm:inline">Press ESC to close</span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg border border-[#121316] bg-white hover:bg-neo-pink hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Output area */}
        <div className="p-5 overflow-y-auto space-y-2 text-xs flex-1 min-h-[320px] bg-[#FFFDF7]">
          {history.map((h, i) => (
            <div key={i} className="leading-relaxed">
              {h.type === 'user' && (
                <div className="text-black font-black font-mono">{h.text}</div>
              )}
              {h.type === 'response' && (
                <pre className="text-slate-800 whitespace-pre-wrap font-mono pl-3 border-l-2 border-neo-yellow my-1 font-medium">
                  {h.text}
                </pre>
              )}
              {h.type === 'system' && (
                <div className="text-emerald-700 font-bold">{h.text}</div>
              )}
              {h.type === 'error' && (
                <div className="text-neo-pink font-bold">{h.text}</div>
              )}
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        {/* Input prompt */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 bg-white border-t-2 border-[#121316]">
          <span className="text-neo-pink font-black text-sm">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'projects', 'telemetry', or 'hire'..."
            className="flex-1 bg-transparent text-[#121316] text-xs outline-none placeholder:text-slate-400 font-mono font-bold"
          />
          <button type="submit" className="p-1.5 rounded-lg border border-[#121316] bg-neo-yellow hover:bg-neo-cyan transition-colors">
            <CornerDownLeft className="w-3.5 h-3.5 text-[#121316]" />
          </button>
        </form>

      </div>
    </div>
  );
}
