import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  MapPin
} from 'lucide-react';
import { experience } from '../data/portfolioData';
import { ScrambleText, SpotlightBentoCard } from './MotionPrimitives';
import { sfx } from '../utils/sfx';

export default function ExperienceTimeline() {
  const [showCourses, setShowCourses] = useState(false);

  return (
    <section
      id="experience"
      className="py-16 sm:py-20 relative z-10 border-t border-[var(--border-hairline)] scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--border-hairline)]"
        >
          <div className="space-y-2">
            <div className="text-[11px] font-mono font-bold text-[var(--signal)] tracking-wider uppercase">
              <ScrambleText text="SECTION 01 // BACKGROUND & EXPERIENCE" />
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em]">
              Work &amp; Education.
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Clear track record at ISB Vietnam &amp; HCMUS Computer Science
          </span>
        </motion.div>

        {/* Timeline Cards */}
        <div className="space-y-6">
          {experience.map((item, idx) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <SpotlightBentoCard className="p-5 sm:p-7 space-y-5">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-[var(--border-hairline)]">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl border border-[var(--border-hairline)] flex items-center justify-center shrink-0 ${
                        idx === 0
                          ? 'bg-[var(--signal)] text-white border-[var(--signal)]'
                          : 'bg-[var(--bg-well)] text-[var(--text-primary)]'
                      }`}
                    >
                      {idx === 0 ? (
                        <Briefcase className="w-5 h-5" />
                      ) : (
                        <GraduationCap className="w-5 h-5" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] tracking-widest">
                        {item.index} // {item.kind}
                      </span>
                      <h3 className="font-display text-2xl font-bold tracking-tight">
                        {item.company}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono font-semibold text-[var(--text-muted)]">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
                    <span className="swiss-pill">
                      <Calendar className="w-3 h-3 text-[var(--signal)]" />
                      <span>{item.period}</span>
                    </span>
                    <span className="swiss-pill">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                {/* Concise 1-Line Impact Summary */}
                <p className="text-sm sm:text-base font-medium leading-snug text-[var(--text-primary)] px-3.5 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/55">
                  <span className="font-mono text-[10px] font-bold text-[var(--signal)] mr-2">SUMMARY</span>
                  {item.plainEnglish}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {item.achievements.map((ach, aIdx) => (
                    <div
                      key={aIdx}
                      className="bento-well px-3.5 py-3 text-xs sm:text-[13px] leading-snug flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Coursework Benchmark Matrix for HCMUS */}
                {item.coursework && (
                  <div className="pt-4 border-t border-[var(--border-hairline)] space-y-3">
                    <button
                      onClick={() => {
                        sfx.playTick(700);
                        setShowCourses((prev) => !prev);
                      }}
                      className="flex items-center justify-between w-full text-left text-xs font-mono font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <span>COURSEWORK SCORES (HCMUS 10-POINT SCALE)</span>
                      <motion.span
                        animate={{ rotate: showCourses ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {showCourses && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                            {item.coursework.map((c, cIdx) => (
                              <div
                                key={c.code}
                                className="p-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-1.5 font-mono"
                              >
                                <div className="flex items-center justify-between text-[10px]">
                                  <span className="text-[var(--text-muted)]">{c.code}</span>
                                  <span className="font-bold text-[var(--signal)] tabular-nums">
                                    {c.score.toFixed(1)} / 10
                                  </span>
                                </div>
                                <div className="text-xs font-sans font-semibold truncate">
                                  {c.name}
                                </div>
                                <div className="h-1.5 rounded-full bg-[var(--bg-well)] overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${(c.score / 10) * 100}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: cIdx * 0.05 }}
                                    className="h-full bg-[var(--text-primary)] rounded-full"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </SpotlightBentoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
