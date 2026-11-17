"use client";

import { Zap, Trophy, Flame, ShieldCheck, Flag } from "lucide-react";

export default function MarqueeBanner() {
  const items = [
    { text: "7 FEB 2027 • JP GANGA PATH, VENDING ZONE", icon: Flame, color: "text-blaze" },
    { text: "5,000+ REGISTERED ATHLETES", icon: Zap, color: "text-emerald-600" },
    { text: "AFI & AIMS CERTIFIED FAST COURSE", icon: ShieldCheck, color: "text-emerald-600" },
    { text: "CHRONOTRACK RFID CHIP-TIMED SPLITS", icon: Zap, color: "text-blaze" },
    { text: "GANGA WATERFRONT SUNRISE HIGH-SPEED RUN", icon: Flag, color: "text-emerald-600" },
    { text: "OFFICIAL TIMED FINISHER MEDALS & CERTIFICATES", icon: Trophy, color: "text-emerald-600" },
    { text: "OFFICIAL PACER BUSSES FOR ALL WAVES", icon: Flame, color: "text-blaze" },
  ];

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-[#0D121C] border-y border-slate-200 dark:border-white/10 py-3.5 overflow-hidden select-none relative z-20 transition-colors">
      <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
        {repeated.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <Icon className={`w-3.5 h-3.5 ${item.color} shrink-0`} />
              <span className="font-heading text-xs sm:text-sm tracking-[0.22em] text-slate-900 dark:text-white uppercase font-extrabold">
                {item.text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 ml-4 shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
