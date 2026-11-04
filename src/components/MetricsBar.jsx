import React from 'react';
import { Zap, CheckCircle2, Cpu, ShieldCheck, TrendingUp } from 'lucide-react';
import { coreMetrics } from '../data/portfolioData';

export default function MetricsBar() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'check-circle': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'cpu': return <Cpu className="w-5 h-5 text-brand-cyan" />;
      case 'shield': return <ShieldCheck className="w-5 h-5 text-brand-violet" />;
      default: return <TrendingUp className="w-5 h-5 text-brand-cyan" />;
    }
  };

  return (
    <section id="benchmarks" className="py-12 relative z-10 border-y border-surface-border/60 bg-surface-200/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider">
              <span>// 02. VERIFIED ENGINEERING METRICS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Performance Under Real Load &amp; Production Scale
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Backed by k6 stress testing &amp; CI/CD telemetry
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="group relative rounded-xl bg-surface-100/80 border border-surface-border p-5 hover:border-slate-500 hover:bg-surface-100 transition-all shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-lg bg-surface-200 border border-surface-border group-hover:border-slate-600 transition-colors">
                  {getIcon(metric.icon)}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface-200 border border-surface-border/80 text-slate-300">
                  {metric.badge}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight group-hover:text-brand-cyan transition-colors">
                {metric.value}
              </div>

              <div className="text-sm font-semibold text-slate-200 mt-1">
                {metric.label}
              </div>

              <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
