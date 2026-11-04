import React from 'react';

export default function MarqueeBanner() {
  const items = [
    "⚡ HIGH-THROUGHPUT BACKENDS",
    "✦ 87.2 RPS STRESS-TESTED",
    "👾 MULTI-AGENT AI (MCP)",
    "★ 5,600+ CI/CD TESTS",
    "🚀 KUBERNETES HPA AUTOSCALING",
    "🔥 VAULT WRAPPED DEK PII",
    "🐾 REDIS ATOMIC LUA",
    "💻 VNUHCM - US (HCMUS)",
    "🎯 OPEN FOR SDE ROLES",
  ];

  return (
    <div className="w-full bg-neo-yellow border-y-2 border-[#121316] py-3 overflow-hidden select-none shadow-[0_4px_0px_#121316] relative z-20">
      <div className="flex w-fit animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((text, i) => (
          <span 
            key={i} 
            className="inline-flex items-center text-sm sm:text-base font-black font-mono tracking-tight text-[#121316] mx-4 uppercase"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
