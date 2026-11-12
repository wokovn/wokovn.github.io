import React, { useState, useEffect } from 'react';
import { Mail, ArrowUpRight, Check, Terminal, ArrowUp, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { MagneticButton, SpotlightBentoCard } from './MotionPrimitives';
import { sfx } from '../utils/sfx';

export default function ContactFooter({ onOpenTerminal, onNavigateContact }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Ho_Chi_Minh',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    sfx.playSuccess();
    setCopiedEmail(true);
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.88 },
      colors: ['#FF3B00', '#0C0C0E', '#00B86B', '#0057FF']
    });
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  return (
    <footer
      id="contact"
      className="py-16 sm:py-20 relative z-10 border-t border-[var(--border-hairline)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SpotlightBentoCard className="p-6 sm:p-12" accentGlow>
          <div className="space-y-6 max-w-3xl">
            <span className="swiss-pill text-[var(--signal)]">
              // NEXT STEP FOR HIRING TEAMS
            </span>

            <h2 className="font-display text-3xl sm:text-6xl font-bold tracking-[-0.035em] leading-[1.05]">
              Interested in working together<span className="text-[var(--signal)]">?</span>
            </h2>

            <p className="text-sm sm:text-lg text-[var(--text-muted)] leading-relaxed">
              Reach out by email or LinkedIn, or open the dedicated Contact Page to schedule a call (direct phone numbers are shared privately upon inquiry).
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <MagneticButton>
                <button onClick={onNavigateContact} className="swiss-btn-primary">
                  <MessageSquare className="w-4 h-4" />
                  <span>OPEN CONTACT &amp; CALL REQUEST PAGE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </MagneticButton>

              <MagneticButton>
                <button onClick={handleCopyEmail} className="swiss-btn-secondary">
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>COPIED {personalInfo.email}</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5" />
                      <span>{personalInfo.email}</span>
                    </>
                  )}
                </button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="swiss-btn-secondary"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LINKEDIN</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <button onClick={onOpenTerminal} className="swiss-btn-secondary">
                  <Terminal className="w-3.5 h-3.5 text-[var(--signal)]" />
                  <span>CLI [⌘K]</span>
                </button>
              </MagneticButton>
            </div>
          </div>
        </SpotlightBentoCard>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
          <div className="space-y-2 md:col-span-2">
            <div className="text-base font-display font-bold text-[var(--text-primary)]">
              {personalInfo.name} · @{personalInfo.handle}
            </div>
            <p className="font-sans text-xs max-w-md">
              Built with React 19, Framer Motion, HiDPI Canvas graphics, and a responsive Swiss Editorial design system.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] tabular-nums">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Ho Chi Minh City (GMT+7): {time || '--:--:--'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[var(--text-primary)] font-bold uppercase block">Navigation</span>
            <ul className="space-y-1.5">
              <li>
                <a href="#experience" className="hover:text-[var(--signal)] transition-colors">
                  01. Work &amp; Education
                </a>
              </li>
              <li>
                <a href="#systems" className="hover:text-[var(--signal)] transition-colors">
                  02. Projects &amp; Simulators
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[var(--signal)] transition-colors">
                  03. Core Capabilities
                </a>
              </li>
              <li>
                <button
                  onClick={onNavigateContact}
                  className="hover:text-[var(--signal)] transition-colors"
                >
                  04. Dedicated Contact Page
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between gap-4">
            <div className="flex gap-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <MagneticButton>
              <button
                onClick={() => {
                  sfx.playTick(680);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="swiss-btn-secondary py-1.5 px-3 text-[11px]"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
