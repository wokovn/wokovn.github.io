import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, UserCheck } from 'lucide-react';
import { projects } from '../data/portfolioData';
import ArkNetStressLab from './systems/ArkNetStressLab';
import NewsAiPipeline from './systems/NewsAiPipeline';
import VaultSecurityCard from './systems/VaultSecurityCard';
import DatabaseOptimizationCard from './systems/DatabaseOptimizationCard';

export default function NeobrutalSystems() {
  const arknet = projects.find(p => p.id === 'arknet');
  const tts = projects.find(p => p.id === 'vietnamese-tts');
  const isb = projects.find(p => p.id === 'isb-systems');
  const petcarex = projects.find(p => p.id === 'petcarex');

  return (
    <section id="systems" className="relative z-10 scroll-mt-16">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-[#121316]"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border-2 border-[#121316] bg-neo-cyan text-xs font-mono font-bold shadow-neo-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#121316]" />
              <span>// 01. PRODUCTION RESILIENCE &amp; BENCHMARKS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#121316] mt-3 tracking-tight">
              HIGH-CONCURRENCY ARCHITECTURE LAB
            </h2>
            <p className="text-sm sm:text-base text-slate-700 mt-2 max-w-3xl font-medium">
              Investigating system resilience under 350 concurrent users: Resource saturation limits vs. automated Kubernetes HPA self-healing.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#121316] bg-neo-yellow font-mono text-xs font-black shadow-neo-sm">
              <UserCheck className="w-4 h-4 text-[#121316]" />
              <span>PRODUCTION BENCHMARK</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* System 1: ArkNet High-Load Stress Lab (Sticky Scrollytelling on Desktop, Responsive on Mobile) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ArkNetStressLab arknet={arknet} />
      </div>

      {/* Systems 2, 3, 4: AI News Pipeline, ISB Vault Security & PetCareX Database */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-16 pb-12">
        <NewsAiPipeline tts={tts} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VaultSecurityCard isb={isb} />
          <DatabaseOptimizationCard petcarex={petcarex} />
        </div>
      </div>

    </section>
  );
}
