import React from 'react';
import { Briefcase, GraduationCap, CheckCircle2, Calendar, MapPin, Building2 } from 'lucide-react';
import { experience } from '../data/portfolioData';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 relative z-10 border-t border-surface-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-emerald uppercase tracking-wider">
            <span>// 04. EXPERIENCE &amp; EDUCATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Professional Track Record &amp; Education
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            Hands-on software engineering experience delivering enterprise architectures and academic rigor.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8">
          {experience.map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-8 rounded-2xl bg-surface-100/80 border border-surface-border hover:border-slate-500 transition-all shadow-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-6 border-b border-surface-border/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {idx === 0 ? (
                      <div className="p-2 rounded-lg bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/30">
                        <Briefcase className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg bg-brand-violet/10 text-brand-violet border border-brand-violet/30">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                    )}
                    <span className="text-lg sm:text-xl font-bold text-white">
                      {item.company}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-brand-cyan pl-8">
                    {item.role}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pl-8 lg:pl-0">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                {item.summary}
              </p>

              {/* Key Achievements Bullets */}
              <div className="mt-5 space-y-2.5">
                {item.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
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
