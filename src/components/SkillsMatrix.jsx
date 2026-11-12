import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, FolderGit2, Search } from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { ScrambleText, SpotlightBentoCard } from './MotionPrimitives';
import { sfx } from '../utils/sfx';

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai', label: 'AI & Agents' },
    { id: 'database', label: 'Databases & Sec' },
    { id: 'devops', label: 'Cloud & QA' }
  ];

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skillsData.categories
      .filter((c) => activeCategory === 'all' || c.id === activeCategory)
      .map((c) => ({
        ...c,
        skills: q
          ? c.skills.filter(
              (s) =>
                s.name.toLowerCase().includes(q) ||
                s.desc.toLowerCase().includes(q) ||
                s.project.toLowerCase().includes(q) ||
                s.tag.toLowerCase().includes(q)
            )
          : c.skills
      }))
      .filter((c) => c.skills.length > 0);
  }, [activeCategory, query]);

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 relative z-10 border-t border-[var(--border-hairline)] scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header + Controls */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pb-6 border-b border-[var(--border-hairline)]"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-[11px] font-mono font-bold text-[var(--signal)] tracking-wider uppercase">
                <ScrambleText text="SECTION 03 // TECHNICAL ARSENAL" />
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em]">
                Core Capabilities.
              </h2>
              <p className="text-sm text-[var(--text-muted)] max-w-2xl">
                Every capability mapped directly to shipped systems at ISB Vietnam and high-concurrency architectures.
              </p>
            </div>

            {/* Instant Search Filter */}
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="skills-filter-input"
                name="skillsFilter"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter stack (e.g. Redis, k6)..."
                aria-label="Filter technical capabilities"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs font-mono outline-none focus:border-[var(--signal)] transition-colors"
              />
            </div>
          </div>

          {/* Animated layoutId Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sfx.playTick(720);
                    setActiveCategory(cat.id);
                  }}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-colors z-10 border ${
                    active
                      ? 'text-[var(--bg-canvas)] border-transparent'
                      : 'text-[var(--text-muted)] border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="skillCategoryPill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-[var(--text-primary)] -z-10"
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Bento Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <SpotlightBentoCard className="p-5 sm:p-6 h-full space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline)]">
                    <h3 className="font-display font-bold text-lg tracking-tight">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--bg-well)] border border-[var(--border-hairline)]">
                      {cat.skills.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="bento-well p-3.5 space-y-2 hover:border-[var(--border-strong)] transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <span className="text-xs sm:text-sm font-bold">{skill.name}</span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-hairline)]">
                            <FolderGit2 className="w-3 h-3 text-[var(--signal)]" />
                            <span>{skill.project}</span>
                          </span>
                        </div>

                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                          {skill.desc}
                        </p>

                        <div className="pt-0.5 flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{skill.tag}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </SpotlightBentoCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCategories.length === 0 && (
          <div className="bento-well p-8 text-center font-mono text-xs text-[var(--text-muted)]">
            No capabilities matched &ldquo;{query}&rdquo;. Clear search to view all modules.
          </div>
        )}
      </div>
    </section>
  );
}
