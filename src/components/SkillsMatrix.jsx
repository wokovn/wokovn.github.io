import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';
import { skillsData } from '../data/portfolioData';

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'backend', label: 'Backend & Distributed' },
    { id: 'database', label: 'Databases & In-Memory' },
    { id: 'ai', label: 'AI & Multi-Agent' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'devops', label: 'DevOps & QA' },
  ];

  const filteredCategories = activeCategory === 'all'
    ? skillsData.categories
    : skillsData.categories.filter(c => c.id === activeCategory);

  const getCategoryColor = (id) => {
    switch (id) {
      case 'backend': return 'bg-neo-yellow';
      case 'database': return 'bg-neo-cyan';
      case 'ai': return 'bg-neo-pink text-white';
      case 'frontend': return 'bg-neo-purple/40';
      case 'devops': return 'bg-neo-green';
      default: return 'bg-neo-yellow';
    }
  };

  return (
    <section id="skills" className="py-20 relative z-10 border-t-2 border-[#121316] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-[#121316]"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border-2 border-[#121316] bg-neo-yellow text-xs font-mono font-bold shadow-neo-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#121316]" />
              <span>// 03. ENGINEERING ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#121316] mt-3 tracking-tight">
              SKILLS &amp; TECHNOLOGIES
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl border-2 border-[#121316] text-xs font-mono font-bold shadow-neo-sm transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#121316] text-white -translate-y-0.5 shadow-neo'
                    : 'bg-white text-[#121316] hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (idx % 3) * 0.1 }}
              className="neo-card p-6 bg-white shadow-neo-lg space-y-4 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#121316]">
                <h3 className="font-black text-[#121316] text-lg">
                  {cat.name}
                </h3>
                <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded border border-[#121316] ${getCategoryColor(cat.id)}`}>
                  {cat.skills.length} SKILLS
                </span>
              </div>

              <div className="space-y-2.5">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="p-3 rounded-xl border-2 border-[#121316] bg-[#FFFDF7] shadow-neo-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-black text-[#121316]">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#121316] bg-white font-bold text-slate-700">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium mt-1 leading-snug">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
