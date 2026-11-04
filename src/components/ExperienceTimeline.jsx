import React from 'react';
import { Briefcase, GraduationCap, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { experience } from '../data/portfolioData';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 relative z-10 border-t-2 border-[#121316] bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border-2 border-[#121316] bg-neo-purple/30 text-xs font-mono font-bold shadow-neo-sm uppercase">
              <span>// 02. PROVEN TRACK RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#121316] mt-3 tracking-tight">
              WORK &amp; ACADEMICS
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600">
            Enterprise Impact &amp; National University of Science
          </span>
        </div>

        {/* Timeline Cards */}
        <div className="space-y-6">
          {experience.map((item, idx) => (
            <div
              key={idx}
              className="neo-card p-6 sm:p-8 bg-white shadow-neo-lg space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b-2 border-[#121316]">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className={`p-2.5 rounded-xl border-2 border-[#121316] font-bold text-lg shadow-neo-sm ${
                      idx === 0 ? 'bg-neo-yellow' : 'bg-neo-cyan'
                    }`}>
                      {idx === 0 ? '💼' : '🎓'}
                    </span>
                    <div>
                      <h3 className="text-2xl font-black text-[#121316]">
                        {item.company}
                      </h3>
                      <p className="text-sm font-mono font-bold text-slate-700">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-slate-600 pl-12 lg:pl-0">
                  <span className="px-3 py-1 rounded-lg border border-[#121316] bg-slate-50">
                    📅 {item.period}
                  </span>
                  <span className="px-3 py-1 rounded-lg border border-[#121316] bg-slate-50">
                    📍 {item.location}
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                {item.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {item.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="p-3.5 rounded-xl border-2 border-[#121316] bg-[#FFFDF7] shadow-neo-sm text-xs sm:text-sm font-medium text-slate-800 flex items-start gap-2.5 leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{ach}</span>
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
