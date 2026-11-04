import React, { useState } from 'react';
import { Terminal, Check, Layers, Cpu, Database, Layout, ShieldCheck } from 'lucide-react';
import { skillsData } from '../data/portfolioData';

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'backend', label: 'Backend & Distributed' },
    { id: 'database', label: 'Databases & In-Memory' },
    { id: 'ai', label: 'AI & Multi-Agent' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'devops', label: 'DevOps, Cloud & QA' },
  ];

  const filteredCategories = selectedCategory === 'all'
    ? skillsData.categories
    : skillsData.categories.filter(c => c.id === selectedCategory);

  return (
    <section id="skills" className="py-20 relative z-10 border-t border-surface-border/60 bg-surface-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider">
              <span>// 05. TECHNICAL MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Engineering Skills &amp; Stack Depth
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              Battle-tested tools and frameworks applied in high-throughput and security-sensitive production systems.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-surface-100 border border-surface-border">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-cyan text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-surface-hover'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(cat => (
            <div
              key={cat.id}
              className="p-6 rounded-2xl bg-surface-100/90 border border-surface-border hover:border-slate-500 transition-all shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-border/60">
                <h3 className="font-bold text-white text-base">
                  {cat.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-200 text-brand-cyan">
                  {cat.skills.length} skills
                </span>
              </div>

              <div className="space-y-3">
                {cat.skills.map((skill, idx) => (
                  <div key={idx} className="group p-3 rounded-xl bg-surface-200/60 border border-surface-border/60 hover:border-brand-cyan/40 hover:bg-surface-200 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white group-hover:text-brand-cyan transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
