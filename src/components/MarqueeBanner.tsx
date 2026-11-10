"use client";

import { Sparkles, Trophy, Zap, ShieldCheck } from "lucide-react";

export default function MarqueeBanner() {
  const items = [
    { text: "14 FEB 2027 • GANDHI MAIDAN", icon: Sparkles },
    { text: "₹25,00,000 TOTAL PRIZE PURSE", icon: Trophy },
    { text: "50,000+ REGISTERED ATHLETES", icon: Zap },
    { text: "AFI & AIMS CERTIFIED COURSE", icon: ShieldCheck },
    { text: "CHRONOTRACK HIGH-PRECISION RFID TIMING", icon: Sparkles },
    { text: "GANGA WATERFRONT SUNRISE EXPRESSWAY", icon: Zap },
    { text: "OFFICIAL CHIP-TIMED PACERS FOR ALL CATEGORIES", icon: Trophy },
  ];

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-[#0B0D12] border-y border-line/60 py-3 overflow-hidden select-none relative z-20">
      <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
        {repeated.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <Icon className="w-3.5 h-3.5 text-champagne shrink-0" />
              <span className="font-heading text-xs sm:text-sm tracking-[0.2em] text-ivory/90 uppercase font-semibold">
                {item.text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-champagne/40 ml-4 shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

