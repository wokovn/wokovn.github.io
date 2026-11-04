import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, CheckCircle2, FolderGit2 } from 'lucide-react';
import { skillsData } from '../data/portfolioData';

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tất cả công nghệ' },
    { id: 'backend', label: 'Backend & Phân tán' },
    { id: 'database', label: 'Cơ sở dữ liệu & Bảo mật' },
    { id: 'ai', label: 'AI & Multi-Agent' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'devops', label: 'DevOps & Testing' },
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
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border-2 border-[#121316] bg-neo-yellow text-xs font-mono font-bold shadow-neo-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#121316]" />
              <span>// 03. THỰC CHIẾN &amp; CÔNG NGHỆ ÁP DỤNG</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#121316] tracking-tight">
              KỸ NĂNG &amp; KINH NGHIỆM THỰC TẾ
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 max-w-2xl font-medium">
              Các công nghệ được áp dụng trực tiếp trong dự án thực tế và quá trình thực tập tại ISB Vietnam.
            </p>
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
                  {cat.skills.length} TECHS
                </span>
              </div>

              <div className="space-y-3">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-xl border-2 border-[#121316] bg-[#FFFDF7] shadow-neo-sm space-y-2">
                    
                    {/* Header: Skill Name & Verified Project Pill */}
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span className="text-xs sm:text-sm font-black text-[#121316]">
                        {skill.name}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md border border-[#121316] bg-neo-yellow/40 font-bold text-[#121316]">
                        <FolderGit2 className="w-3 h-3 text-[#121316]" />
                        <span>{skill.project}</span>
                      </span>
                    </div>

                    {/* Practical Work Description */}
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      {skill.desc}
                    </p>

                    {/* Role / Practical Tag */}
                    <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-500 font-bold">
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{skill.tag}</span>
                      </span>
                    </div>

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
