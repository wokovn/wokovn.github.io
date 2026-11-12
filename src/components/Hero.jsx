import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDownRight,
  Mail,
  Terminal,
  MapPin,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { personalInfo, coreMetrics } from '../data/portfolioData';
import HeroCanvasMatrix from './HeroCanvasMatrix';
import HeroArchitectureStage from './HeroArchitectureStage';
import {
  MaskReveal,
  MagneticButton,
  SpotlightBentoCard,
  AnimatedNumber
} from './MotionPrimitives';
import { sfx } from '../utils/sfx';

export default function Hero({ onOpenTerminal, onNavigateContact, theme }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [clockStr, setClockStr] = useState('');

  useEffect(() => {
    const t = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % personalInfo.roles.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      setClockStr(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Ho_Chi_Minh',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative pt-20 pb-8 md:pt-28 md:pb-12 overflow-x-clip">
      <HeroCanvasMatrix theme={theme} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Metadata Telemetry Bar */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-5 md:pb-5 md:mb-7 border-b border-[var(--border-hairline)] text-[11px] font-mono text-[var(--text-muted)]"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="swiss-pill text-[var(--text-primary)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>OPEN FOR FULL-STACK / SWE ROLES</span>
            </span>
            <span className="swiss-pill">
              <Briefcase className="w-3 h-3 text-[var(--signal)]" />
              <span>ISB VIETNAM INTERN</span>
            </span>
            <span className="swiss-pill">
              <GraduationCap className="w-3 h-3" />
              <span>HCMUS IT · GPA {personalInfo.gpa}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 tabular-nums">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[var(--signal)]" />
              <span>Ho Chi Minh City · {clockStr || 'GMT+7'}</span>
            </span>
          </div>
        </motion.div>

        {/* Main Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                <span>SOFTWARE ENGINEER //</span>
                <div className="h-5 relative overflow-hidden inline-flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIdx}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[var(--signal)] font-bold"
                    >
                      {personalInfo.roles[roleIdx]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl xl:text-[64px] font-bold tracking-[-0.03em] leading-[1.12] pt-1">
                <MaskReveal delay={0.05}>NGUYỄN</MaskReveal>
                <br />
                <MaskReveal delay={0.14}>
                  <span>ANH KHOA</span>
                  <span className="text-[var(--signal)]">.</span>
                </MaskReveal>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl"
              >
                {personalInfo.summary}
              </motion.p>
            </div>

            {/* 2x2 Plain-English Business Impact Cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="grid grid-cols-2 gap-2.5 sm:gap-3"
            >
              {coreMetrics.map((metric) => (
                <SpotlightBentoCard key={metric.id} className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold text-[var(--signal)] tracking-wide">
                      {metric.label}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-well)] text-[var(--text-primary)] border border-[var(--border-hairline)] hidden sm:inline">
                      {metric.badge}
                    </span>
                  </div>

                  <div className="mt-1.5 sm:mt-2 flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xl sm:text-3xl font-display font-bold tracking-tight">
                        <AnimatedNumber
                          value={metric.numericValue}
                          decimals={metric.decimals}
                          prefix={metric.prefix || ''}
                          suffix={metric.suffix || ''}
                        />
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-snug">
                        {metric.detail}
                      </p>
                    </div>

                    <div className="hidden sm:flex items-end gap-[3px] h-7 pb-0.5 shrink-0">
                      {metric.spark.map((val, i) => (
                        <span
                          key={i}
                          style={{ height: `${Math.max(18, Math.min(100, val))}%` }}
                          className={`w-[3px] rounded-full transition-colors duration-300 ${
                            i === metric.spark.length - 1
                              ? 'bg-[var(--signal)]'
                              : 'bg-[var(--border-strong)] group-hover:bg-[var(--text-primary)]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </SpotlightBentoCard>
              ))}
            </motion.div>

            {/* Crystal-clear Guided Reading CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 pt-1"
            >
              <MagneticButton>
                <a
                  href="#experience"
                  onClick={() => sfx.playTick(700)}
                  className="swiss-btn-primary w-full sm:w-auto justify-center"
                >
                  <span>START: WORK &amp; EDUCATION</span>
                  <ArrowDownRight className="w-4 h-4" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={() => {
                    sfx.playTick(760);
                    onNavigateContact();
                  }}
                  className="swiss-btn-secondary w-full sm:w-auto justify-center"
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--signal)]" />
                  <span>CONTACT / INTERVIEW</span>
                </button>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={() => {
                    sfx.playTick(780);
                    onOpenTerminal();
                  }}
                  className="swiss-btn-secondary"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>CLI [⌘K]</span>
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <HeroArchitectureStage onNavigateContact={onNavigateContact} />
          </motion.div>
        </div>

        {/* Clear 3-Step Reading Guide Strip for Non-Tech HR & Engineering Managers */}
        <div className="mt-8 pt-6 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <a
            href="#experience"
            onClick={() => sfx.playTick(680)}
            className="bento-card p-3.5 hover:border-[var(--signal)] transition-colors flex items-center justify-between gap-2"
          >
            <div>
              <span className="font-mono text-[10px] font-bold text-[var(--signal)] block">
                STEP 01 · FOR RECRUITERS
              </span>
              <span className="font-bold">Work Experience &amp; Education</span>
            </div>
            <ArrowDownRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
          </a>

          <a
            href="#systems"
            onClick={() => sfx.playTick(700)}
            className="bento-card p-3.5 hover:border-[var(--signal)] transition-colors flex items-center justify-between gap-2"
          >
            <div>
              <span className="font-mono text-[10px] font-bold text-[var(--signal)] block">
                STEP 02 · STICKY SHOWCASE
              </span>
              <span className="font-bold">5 Interactive Architecture Labs</span>
            </div>
            <ArrowDownRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
          </a>

          <button
            type="button"
            onClick={() => {
              sfx.playTick(740);
              onNavigateContact();
            }}
            className="bento-card p-3.5 hover:border-[var(--signal)] transition-colors flex items-center justify-between gap-2 text-left"
          >
            <div>
              <span className="font-mono text-[10px] font-bold text-[var(--signal)] block">
                STEP 03 · DEDICATED PAGE
              </span>
              <span className="font-bold">Schedule Call &amp; Contact</span>
            </div>
            <ArrowDownRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
}
