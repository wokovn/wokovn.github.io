import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo, coreMetrics } from '../data/portfolioData';
import { sfx } from '../utils/sfx';

const QUICK_COMMANDS = ['help', 'about', 'projects', 'telemetry', 'skills', 'contact', 'open-contact', 'theme', 'hire'];

export default function TerminalHUD({ isOpen, onClose, theme, onToggleTheme, onNavigateContact }) {
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histCursor, setHistCursor] = useState(-1);
  const [history, setHistory] = useState([
    { type: 'system', text: '[SYS] wokovn Interactive CLI v4.0' },
    { type: 'system', text: 'Type a command or click any chip below. Tab autocompletes.' }
  ]);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
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
    if (!cleanCmd) return;

    sfx.playTick(740);
    setCmdHistory((prev) => [cmdText.trim(), ...prev]);
    setHistCursor(-1);
    const newHistory = [...history, { type: 'user', text: `$ ${cmdText}` }];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `AVAILABLE COMMANDS:
  • about        : Candidate profile & background
  • projects     : 5 shipped projects & demos
  • telemetry    : Verified impact & benchmark metrics
  • skills       : TypeScript, Node.js, React/Next/Vue, AI & QA stack
  • contact      : Email & LinkedIn / GitHub profiles
  • open-contact : Open Dedicated Contact & Interview Page
  • theme        : Toggle Paper Light / Dark Ink mode
  • hire         : Celebrate & open contact page
  • clear        : Clear output stream
  • exit         : Close CLI palette`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'response',
          text: `[PROFILE] ${personalInfo.name} (@${personalInfo.handle})
Role       : Full-Stack Software Engineer
Education  : ${personalInfo.university} · GPA ${personalInfo.gpa}
Experience : Fullstack Software Engineer Intern @ ISB Vietnam (08–11/2026)
Focus      : TypeScript, Node.js, React 19, Next.js 15, Vue 3, PostgreSQL, K8s, MCP`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'response',
          text: `SHIPPED PROJECTS:
01. ArkNet Social Platform      -> 87.2 RPS @ 350 VUs, Redis Lua, 9 BullMQ queues, K8s HPA
02. ISB Multi-Agent Assistant   -> 1 Orchestrator + 4 Helper Agents, SQLite sandboxes (5.8x rows)
03. Vault PII & ReDoS Tuning    -> Wrapped DEK + HMAC Blind Index, 3–18s delay cut to <200ms
04. EShop QA & PetCareX MSSQL   -> Playwright (117 runs), k6 (500 VUs ~8.5ms), COMB UUIDs
05. News Summary & VieNeu-TTS   -> Puppeteer, Gemini, FFmpeg & real phase3_best audio samples`
        });
        break;

      case 'telemetry':
      case 'metrics':
        newHistory.push({
          type: 'response',
          text: coreMetrics
            .map(
              (m) =>
                `> ${m.label}: ${m.prefix || ''}${m.numericValue}${m.suffix || ''} (${m.detail})`
            )
            .join('\n')
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'response',
          text: `CORE STACK : TypeScript, JavaScript, SQL
FRONTEND   : React 19, Next.js 15, Vue 3, Tailwind CSS, Framer Motion, HiDPI Canvas
BACKEND    : Node.js (Express 5), Socket.IO, Redis Lua, BullMQ, MCP Agents, n8n
DATABASES  : PostgreSQL (Drizzle ORM), SQL Server (MSSQL), In-Memory SQLite
CLOUD / QA : Docker, Kubernetes HPA, HashiCorp Vault, Playwright, Vitest (5,600+), k6`
        });
        break;

      case 'theme':
        onToggleTheme?.();
        newHistory.push({
          type: 'response',
          text: `[THEME] Switched interface theme (current: ${theme === 'dark' ? 'Paper Light' : 'Obsidian Ink'}).`
        });
        break;

      case 'open-contact':
        onClose();
        onNavigateContact?.();
        return;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `EMAIL    : ${personalInfo.email}
GITHUB   : ${personalInfo.github}
LINKEDIN : ${personalInfo.linkedin}
PHONE    : Shared privately via email or Contact Page (run 'open-contact')`
        });
        break;

      case 'hire':
      case 'sudo hire':
        sfx.playSuccess();
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.55 },
          colors: ['#FF3B00', '#0C0C0E', '#00B86B', '#0057FF']
        });
        newHistory.push({
          type: 'response',
          text: `[GRANTED] Thanks for reaching out! Email ${personalInfo.email} or run 'open-contact' to schedule a call.`
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

      default:
        newHistory.push({
          type: 'error',
          text: `command not found: "${cmdText}". Try "help" or click a chip above.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const q = input.trim().toLowerCase();
      if (!q) return;
      const match = QUICK_COMMANDS.find((c) => c.startsWith(q));
      if (match) setInput(match);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cmdHistory.length - 1, histCursor + 1);
      if (cmdHistory[next]) {
        setHistCursor(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histCursor - 1;
      if (next < 0) {
        setHistCursor(-1);
        setInput('');
      } else {
        setHistCursor(next);
        setInput(cmdHistory[next]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl overflow-hidden font-mono flex flex-col max-h-[82vh]"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-hairline)] bg-[var(--bg-well)] text-xs font-bold">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[var(--signal)]" />
                <span>WOKOVN // COMMAND PALETTE</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[var(--text-muted)] hidden sm:inline">
                  TAB autocomplete · ESC close
                </span>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg border border-[var(--border-hairline)] hover:border-[var(--signal)] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="px-4 py-2 border-b border-[var(--border-hairline)] flex flex-wrap gap-1.5 bg-[var(--bg-surface)]">
              {QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="px-2 py-0.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-well)] text-[10px] font-semibold hover:border-[var(--signal)] hover:text-[var(--signal)] transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>

            <div className="p-5 overflow-y-auto space-y-2.5 text-xs flex-1 min-h-[260px] bg-[var(--bg-canvas)]">
              {history.map((h, i) => (
                <div key={i} className="leading-relaxed">
                  {h.type === 'user' && (
                    <div className="font-bold text-[var(--text-primary)]">{h.text}</div>
                  )}
                  {h.type === 'response' && (
                    <pre className="whitespace-pre-wrap pl-3 border-l-2 border-[var(--signal)] my-1 text-[var(--text-primary)]">
                      {h.text}
                    </pre>
                  )}
                  {h.type === 'system' && (
                    <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {h.text}
                    </div>
                  )}
                  {h.type === 'error' && (
                    <div className="text-rose-500 font-semibold">{h.text}</div>
                  )}
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(input);
              }}
              className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)]"
            >
              <span className="text-[var(--signal)] font-black text-sm">$</span>
              <input
                id="cli-command-input"
                name="cliCommand"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type 'projects', 'open-contact', 'theme', or 'hire'..."
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-[var(--text-muted)]"
              />
              <button
                type="submit"
                className="p-1.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg-canvas)] hover:bg-[var(--signal)] transition-colors"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
