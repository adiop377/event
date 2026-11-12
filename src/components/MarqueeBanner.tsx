"use client";

import { Zap, Trophy, Flame, ShieldCheck, Flag } from "lucide-react";

export default function MarqueeBanner() {
  const items = [
    { text: "7 FEB 2027 • JP GANGA PATH, VENDING ZONE", icon: Flame, color: "text-blaze" },
    { text: "₹25,00,000 TOTAL PRIZE PURSE", icon: Trophy, color: "text-volt" },
    { text: "50,000+ REGISTERED ATHLETES", icon: Zap, color: "text-volt" },
    { text: "AFI & AIMS CERTIFIED FAST COURSE", icon: ShieldCheck, color: "text-emerald-400" },
    { text: "CHRONOTRACK RFID CHIP-TIMED SPLITS", icon: Zap, color: "text-blaze" },
    { text: "GANGA WATERFRONT SUNRISE HIGH-SPEED RUN", icon: Flag, color: "text-volt" },
    { text: "OFFICIAL PACER BUSSES FOR ALL WAVES", icon: Flame, color: "text-blaze" },
  ];

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-[#0D131F] border-y border-line/70 py-3.5 overflow-hidden select-none relative z-20">
      <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
        {repeated.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <Icon className={`w-3.5 h-3.5 ${item.color} shrink-0`} />
              <span className="font-heading text-xs sm:text-sm tracking-[0.22em] text-ivory uppercase font-bold">
                {item.text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-volt/50 ml-4 shrink-0 shadow-[0_0_6px_rgba(204,255,0,0.8)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
