import React from 'react';
import { Zap, Activity, Bot, Flame, Shield, Server, Terminal, Sparkles, Database } from 'lucide-react';

export default function MarqueeBanner() {
  const items = [
    { text: "HIGH-THROUGHPUT BACKENDS", icon: Server },
    { text: "87.2 RPS STRESS-TESTED", icon: Zap },
    { text: "MULTI-AGENT AI (MCP)", icon: Bot },
    { text: "5,600+ CI/CD TESTS", icon: Shield },
    { text: "KUBERNETES HPA AUTOSCALING", icon: Activity },
    { text: "VAULT WRAPPED DEK PII", icon: Flame },
    { text: "REDIS ATOMIC LUA", icon: Database },
    { text: "VNUHCM - US (HCMUS)", icon: Terminal },
    { text: "OPEN FOR SDE ROLES", icon: Sparkles },
  ];

  return (
    <div className="w-full bg-neo-yellow border-y-2 border-[#121316] py-3 overflow-hidden select-none shadow-[0_4px_0px_#121316] relative z-20">
      <div className="flex w-fit animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => {
          const Icon = item.icon;
          return (
            <span 
              key={i} 
              className="inline-flex items-center gap-2 text-sm sm:text-base font-black font-mono tracking-tight text-[#121316] mx-6 uppercase"
            >
              <Icon className="w-4 h-4 text-[#121316] flex-shrink-0" />
              <span>{item.text}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
