import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2
} from 'lucide-react';

export default function VaultSecurityCard({ isb }) {
  const [isEncrypted, setIsEncrypted] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="neo-card p-5 sm:p-7 bg-white shadow-neo-xl border-2 border-[#121316] space-y-6 flex flex-col justify-between"
    >
      <div className="space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#121316]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl border-2 border-[#121316] bg-neo-purple/40 font-bold flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#121316]" />
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#121316] tracking-tight">
                Multi-Agent &amp; Enterprise Security
              </h3>
              <p className="text-xs font-mono font-bold text-slate-600">ISB Vietnam Production Systems</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded border border-[#121316] bg-neo-green font-mono text-[10px] font-black">
            ENTERPRISE
          </span>
        </div>

        {/* Architecture Impact Box */}
        <div className="p-3 rounded-xl border-2 border-[#121316] bg-neo-purple/10 space-y-1">
          <span className="text-[10px] font-mono font-black text-[#121316] uppercase block">
            ENTERPRISE SECURITY &amp; QUERY OPTIMIZATION:
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            Protects sensitive data (PII) using HashiCorp Vault wrapped Data Encryption Keys (DEK), coupled with Catastrophic Backtracking regex tuning (ReDoS fix) dropping execution latency from <strong>3-18 seconds down to &lt;200ms</strong>.
          </p>
        </div>

        {/* Interactive Vault DEK Sandbox */}
        <div className="p-3.5 rounded-xl border-2 border-[#121316] bg-[#FFFDF7] shadow-neo-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#121316]">
              <Lock className="w-3.5 h-3.5 text-neo-pink" />
              <span>HASHICORP VAULT DEK &amp; BLIND INDEX</span>
            </div>
            <button
              onClick={() => setIsEncrypted(!isEncrypted)}
              className="px-2.5 py-1 rounded-lg border border-[#121316] bg-neo-yellow text-[10px] font-mono font-bold shadow-neo-xs hover:bg-yellow-300 transition-colors"
            >
              {isEncrypted ? 'View Plaintext' : 'Enable Vault Encryption'}
            </button>
          </div>

          <div className="p-2.5 rounded-lg border border-[#121316] bg-white font-mono text-xs space-y-1">
            <div className="text-slate-500 text-[10px] font-bold">DATABASE ROW STORAGE:</div>
            <div className="font-bold text-[#121316] text-[11px] break-all">
              {isEncrypted ? 'vault:v1:7kX9q2pL0m... (Wrapped DEK)' : 'email: "khoa@isb.com", ssn: "079205..."'}
            </div>
            <div className="text-[10px] text-emerald-800 font-bold pt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Exact search executed directly on HMAC Blind Index without decrypting entire table.</span>
            </div>
          </div>
        </div>

        {/* Performance Badges */}
        <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
          <div className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo-xs space-y-0.5">
            <span className="text-[9px] text-slate-500 font-bold block uppercase">ANALYSIS VOLUME</span>
            <span className="text-sm font-black text-[#121316] block">5.8x Row Volume Boost</span>
            <span className="text-[10px] text-slate-600 block">Hours down to ~5 mins</span>
          </div>

          <div className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo-xs space-y-0.5">
            <span className="text-[9px] text-slate-500 font-bold block uppercase">LATENCY TUNING</span>
            <span className="text-sm font-black text-[#121316] block">3-18s → &lt;200ms</span>
            <span className="text-[10px] text-slate-600 block">Catastrophic ReDoS Solved</span>
          </div>
        </div>

      </div>

      {/* Tech Tags */}
      <div className="pt-3 border-t-2 border-[#121316] flex flex-wrap gap-1.5">
        {['TypeScript', 'Next.js 15', 'Java 21', 'Spring Boot 4', 'Vault', 'n8n'].map((t, i) => (
          <span key={i} className="neo-tag text-[10px]">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
