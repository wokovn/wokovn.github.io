import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { ScrambleText } from './MotionPrimitives';
import ArkNetStressLab from './systems/ArkNetStressLab';
import MultiAgentVaultLab from './systems/MultiAgentVaultLab';
import EshopQALab from './systems/EshopQALab';
import DatabaseOptimizationCard from './systems/DatabaseOptimizationCard';
import RealTtsAudioLab from './systems/RealTtsAudioLab';
import { sfx } from '../utils/sfx';

const CHAPTERS = [
  {
    id: 0,
    num: '01',
    tag: 'SCALABILITY PROJECT',
    title: 'ArkNet: Scalable Social Media Platform',
    plainSummary:
      'Built a fast social feed backend so heavy traffic surges do not crash the site or slow down uploads.',
    problem:
      'With 350 people online at once, 2 fixed servers hit 100% load and failed nearly 1 in 3 requests.',
    solution:
      'Configured Kubernetes to auto-scale up to 10 servers during bursts and moved heavy media/ranking tasks to background workers.',
    outcome: '2.4x higher throughput · Error rate cut from 28.4% to 0.8%',
    repo: 'https://github.com/wokovn/SocialMediaProject'
  },
  {
    id: 1,
    num: '02',
    tag: 'AI WORKFLOW · ISB VIETNAM',
    title: 'Multi-Agent Company Data Assistant',
    plainSummary:
      'Built a team of collaborating AI agents that read company documents and analyze spreadsheets automatically.',
    problem:
      'Checking dozens of internal tables and policy documents manually took ~8 hours per request.',
    solution:
      'Designed 1 Orchestrator splitting tasks across 4 specialized Helper Agents working safely in read-only memory sandboxes.',
    outcome: 'Cut ~8h manual analysis down to ~5 minutes (5.8x data rows)',
    repo: null
  },
  {
    id: 2,
    num: '03',
    tag: 'SECURITY & SPEED · ISB VIETNAM',
    title: 'Enterprise HR Security & Contract Speedup',
    plainSummary:
      'Protected sensitive employee contract details with encryption while fixing multi-second page freezes.',
    problem:
      'HR data had to be searchable without exposing plaintext PII, and slow contract text parsers stalled pages for 3–18 seconds.',
    solution:
      'Integrated HashiCorp Vault encryption with searchable blind hashes and rewrote slow regex logic to run linearly.',
    outcome: '23/24 security fixes · Delays cut from 3–18s down to <0.2s',
    repo: null
  },
  {
    id: 3,
    num: '04',
    tag: 'TESTING & DATABASES',
    title: 'EShop Automated QA & PetCareX Database',
    plainSummary:
      'Created automated test suites catching bugs early, plus a fast multi-branch veterinary database.',
    problem:
      'Manual checks missed concurrency bugs, and random database IDs slowed down storage inserts.',
    solution:
      'Built 117 cross-browser Playwright runs + 150+ API checks + 500-user k6 load curves alongside 5,600+ Vitest Docker CI tests.',
    outcome: 'Caught 7 real bugs · Cut CI wait time by 54% (352s → 162s)',
    repo: 'https://github.com/wokovn/Group06_HW2_Testing'
  },
  {
    id: 4,
    num: '05',
    tag: 'AI VOICE & NEWS PIPELINE',
    title: 'Vietnamese News Reader & AI Voice (Listen Live)',
    plainSummary:
      'Collects daily news, summarizes key points with Gemini AI, and reads them aloud using trained Vietnamese AI voices.',
    problem:
      'Generating realistic regional Vietnamese speech takes time and would stall normal web requests if run synchronously.',
    solution:
      'Used background job polling so users never hit timeouts, backed by real Phase 3 VieNeu-TTS audio samples you can listen to on the right.',
    outcome: 'Real Phase 3 AI voice outputs trained on 27.1h Vietnamese speech',
    repo: 'https://github.com/wokovn/Project-LT-ML-23KHDL1-HCMUS'
  }
];

export default function NeobrutalSystems() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [lab04View, setLab04View] = useState('eshop');
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const arknet = projects.find((p) => p.id === 'arknet');
  const eshop = projects.find((p) => p.id === 'eshop-qa-testing');
  const petcarex = projects.find((p) => p.id === 'petcarex');
  const tts = projects.find((p) => p.id === 'vietnamese-tts');

  useEffect(() => {
    const onScroll = () => {
      const trackEl = trackRef.current;
      // Desktop dual-sticky runway (~340vh): holds both left & right steady with generous dwell per project
      if (trackEl && trackEl.offsetHeight > 0) {
        const rect = trackEl.getBoundingClientRect();
        const total = Math.max(1, trackEl.offsetHeight - window.innerHeight * 0.9);
        const passed = Math.min(total, Math.max(0, 80 - rect.top));
        const ratio = passed / total;
        setScrollProgress(Math.round(ratio * 100));
        const idx = Math.min(CHAPTERS.length - 1, Math.floor(ratio * CHAPTERS.length));
        setActiveChapter(idx);
        return;
      }

      // Mobile fallback scroll percentage
      const secEl = sectionRef.current;
      if (!secEl) return;
      const rect = secEl.getBoundingClientRect();
      const total = Math.max(1, secEl.offsetHeight - window.innerHeight * 0.75);
      const passed = Math.min(total, Math.max(0, -rect.top + window.innerHeight * 0.25));
      setScrollProgress(Math.round((passed / total) * 100));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jumpToChapter = (idx) => {
    sfx.playTick(720);
    setActiveChapter(idx);
    const trackEl = trackRef.current;
    if (trackEl && trackEl.offsetHeight > 0) {
      const trackTop = trackEl.getBoundingClientRect().top + window.scrollY;
      const total = Math.max(1, trackEl.offsetHeight - window.innerHeight * 0.9);
      const targetY = trackTop - 80 + ((idx + 0.12) / CHAPTERS.length) * total;
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  };

  const renderStickyStage = (chapterIdx) => {
    switch (chapterIdx) {
      case 0:
        return <ArkNetStressLab arknet={arknet} />;
      case 1:
        return <MultiAgentVaultLab initialTab="agents" lockedMode />;
      case 2:
        return <MultiAgentVaultLab initialTab="vault" lockedMode />;
      case 3:
        return (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  sfx.playTick(740);
                  setLab04View('eshop');
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold ${
                  lab04View === 'eshop'
                    ? 'tactile-chip-active'
                    : 'tactile-chip text-[var(--text-muted)]'
                }`}
              >
                04A · EShop k6 &amp; Playwright QA
              </button>
              <button
                onClick={() => {
                  sfx.playTick(740);
                  setLab04View('petcarex');
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold ${
                  lab04View === 'petcarex'
                    ? 'tactile-chip-active'
                    : 'tactile-chip text-[var(--text-muted)]'
                }`}
              >
                04B · PetCareX B-Tree &amp; 5.6K Vitest
              </button>
            </div>
            {lab04View === 'eshop' ? (
              <EshopQALab eshop={eshop} />
            ) : (
              <DatabaseOptimizationCard petcarex={petcarex} />
            )}
          </div>
        );
      case 4:
        return <RealTtsAudioLab tts={tts} />;
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="systems"
      className="py-16 sm:py-20 relative z-10 border-t border-[var(--border-hairline)] scroll-mt-16 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Clear Dual-Audience Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border-hairline)]"
        >
          <div className="space-y-2">
            <div className="text-[11px] font-mono font-bold text-[var(--signal)] tracking-wider uppercase">
              <ScrambleText text="SECTION 02 // SELECTED PROJECTS & ARCHITECTURE" />
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em]">
              Selected Projects &amp; Interactive Simulators.
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-2xl">
              Read the short summary cards on the left for business impact, or test the pinned simulators on the right to see how each system works under the hood.
            </p>
          </div>

          <span className="swiss-pill self-start md:self-auto whitespace-nowrap shrink-0">
            <span>5 PROJECTS · INTERACTIVE</span>
          </span>
        </motion.div>

        {/* DESKTOP (lg+): Dual Pinned Sticky Scrollytelling Runway */}
        <div ref={trackRef} className="hidden lg:block relative h-[340vh]">
          <div className="sticky top-20 h-[calc(100vh-5.75rem)] grid grid-cols-12 gap-7 items-stretch">
            {/* Left Sticky Story Panel (stays pinned steady alongside the simulator) */}
            <div className="col-span-5 flex flex-col justify-between min-h-0">
              <div className="space-y-3 overflow-y-auto pr-1">
                {/* Chapter Selector List */}
                <div className="p-2 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]/95 space-y-1.5">
                  <div className="flex items-center justify-between px-1.5 text-[10px] font-mono">
                    <span className="font-bold text-[var(--text-muted)]">PROJECT INDEX (PINNED)</span>
                    <span className="font-bold text-[var(--signal)]">0{activeChapter + 1} / 0{CHAPTERS.length}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {CHAPTERS.map((ch, idx) => {
                      const active = activeChapter === idx;
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => jumpToChapter(idx)}
                          className={`py-1.5 rounded-xl text-[11px] font-mono font-bold text-center ${
                            active ? 'tactile-chip-active' : 'tactile-chip text-[var(--text-muted)]'
                          }`}
                        >
                          {ch.num}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pinned Active Project Story Card */}
                <AnimatePresence mode="wait">
                  {(() => {
                    const ch = CHAPTERS[activeChapter];
                    return (
                      <motion.article
                        key={`left-story-${ch.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="p-5 rounded-2xl border border-[var(--signal)] bg-[var(--bg-surface)] shadow-md space-y-3.5"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                          <span className="text-[var(--signal)]">
                            PROJECT {ch.num} // {ch.tag}
                          </span>
                          {ch.repo && (
                            <a
                              href={ch.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tactile-chip px-2 py-0.5 rounded-lg inline-flex items-center gap-1 hover:text-[var(--signal)]"
                            >
                              <span>GitHub</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <h3 className="font-display text-2xl font-bold tracking-tight leading-snug">
                            {ch.title}
                          </h3>
                          <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed">
                            {ch.plainSummary}
                          </p>
                        </div>

                        <div className="space-y-2 text-xs leading-relaxed">
                          <div className="bento-well p-3">
                            <span className="font-mono text-[9px] font-bold text-[var(--text-muted)] block uppercase mb-1">
                              CHALLENGE
                            </span>
                            <p className="text-[var(--text-muted)]">{ch.problem}</p>
                          </div>

                          <div className="bento-well p-3">
                            <span className="font-mono text-[9px] font-bold text-[var(--text-muted)] block uppercase mb-1">
                              WHAT I BUILT
                            </span>
                            <p className="text-[var(--text-primary)]">{ch.solution}</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center gap-2 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>{ch.outcome}</span>
                        </div>
                      </motion.article>
                    );
                  })()}
                </AnimatePresence>

                <div className="px-3 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/50 flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                  <span>Scroll slowly or click 01–05 to jump</span>
                  <span className="text-[var(--text-primary)] font-bold">{scrollProgress}%</span>
                </div>
              </div>
            </div>

            {/* Right Pinned Sticky Workbench */}
            <div className="col-span-7 flex flex-col min-h-0 space-y-2">
              <div className="shrink-0 px-3 py-2 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]/95 backdrop-blur-md space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                  <span className="font-bold text-[var(--signal)]">
                    SIMULATOR 0{activeChapter + 1} // AUTO-STATE ACTIVE
                  </span>
                  <span className="text-[var(--text-muted)] tabular-nums">
                    RUNWAY SCROLL: {scrollProgress}%
                  </span>
                </div>
                <div className="h-1 rounded-full bg-[var(--bg-well)] overflow-hidden">
                  <div
                    className="h-full bg-[var(--signal)] transition-all duration-150"
                    style={{ width: `${Math.max(8, scrollProgress)}%` }}
                  />
                </div>
              </div>

            <div className="lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-0.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`sticky-panel-${activeChapter}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  {renderStickyStage(activeChapter)}
                </motion.div>
              </AnimatePresence>
            </div>
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET (< lg): Compact Single-Row Sticky Project Selector */}
        <div className="lg:hidden space-y-4">
          <div className="sticky top-[56px] z-30 p-1.5 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)]/95 backdrop-blur-md shadow-sm flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => {
                sfx.playTick(680);
                setActiveChapter((prev) => (prev - 1 + CHAPTERS.length) % CHAPTERS.length);
              }}
              className="tactile-chip px-2 py-1.5 rounded-xl text-[10px] font-mono font-bold shrink-0"
            >
              ←
            </button>

            <div className="grid grid-cols-5 gap-1 flex-1 min-w-0">
              {CHAPTERS.map((ch, idx) => {
                const active = activeChapter === idx;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      sfx.playTick(720);
                      setActiveChapter(idx);
                    }}
                    className={`py-1.5 px-1 rounded-xl text-[10px] font-mono font-bold text-center ${
                      active
                        ? 'tactile-chip-active'
                        : 'tactile-chip text-[var(--text-muted)]'
                    }`}
                  >
                    {ch.num}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next project"
              onClick={() => {
                sfx.playTick(740);
                setActiveChapter((prev) => (prev + 1) % CHAPTERS.length);
              }}
              className="tactile-chip px-2 py-1.5 rounded-xl text-[10px] font-mono font-bold shrink-0"
            >
              →
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-lab-${activeChapter}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="bento-card p-4 space-y-2.5">
                <div className="text-[10px] font-mono font-bold text-[var(--signal)]">
                  PROJECT {CHAPTERS[activeChapter].num} // {CHAPTERS[activeChapter].tag}
                </div>
                <h3 className="font-display text-lg font-bold">
                  {CHAPTERS[activeChapter].title}
                </h3>
                <p className="text-xs font-medium text-[var(--text-primary)] leading-relaxed">
                  {CHAPTERS[activeChapter].plainSummary}
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {CHAPTERS[activeChapter].solution}
                </p>
                <div className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {CHAPTERS[activeChapter].outcome}
                </div>
              </div>

              {renderStickyStage(activeChapter)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
