"use client";

import { CloudSun, Wind, Droplets, Compass, Sun, ShieldCheck } from "lucide-react";

export default function RaceWeather() {
  return (
    <div className="w-full my-12 luxury-card p-6 sm:p-8 bg-gradient-to-r from-[#0C0F15] via-graphite to-[#0C0F15] border-line">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <CloudSun className="w-4 h-4 text-champagne" />
            <span className="label-subtle text-champagne">RACE MORNING CLIMATE INDEX</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl text-ivory uppercase">
            IDEAL PERSONAL BEST (PB) CONDITIONS
          </h3>
          <p className="text-xs text-stone mt-1 max-w-md">
            Gandhi Maidan &amp; Ganga Riverfront historical climate for February 14 dawn flag-off.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          <div className="bg-ink/80 rounded-xl p-3.5 border border-line text-center">
            <Sun className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="font-numbers text-xl font-bold text-ivory block">15°C – 19°C</span>
            <span className="label-subtle text-[8.5px] text-stone mt-0.5 block">TEMP AT DAWN</span>
          </div>

          <div className="bg-ink/80 rounded-xl p-3.5 border border-line text-center">
            <Wind className="w-4 h-4 text-sky-400 mx-auto mb-1" />
            <span className="font-numbers text-xl font-bold text-ivory block">4.2 KM/H</span>
            <span className="label-subtle text-[8.5px] text-stone mt-0.5 block">GANGA BREEZE</span>
          </div>

          <div className="bg-ink/80 rounded-xl p-3.5 border border-line text-center">
            <Droplets className="w-4 h-4 text-teal-400 mx-auto mb-1" />
            <span className="font-numbers text-xl font-bold text-ivory block">64%</span>
            <span className="label-subtle text-[8.5px] text-stone mt-0.5 block">AVG HUMIDITY</span>
          </div>

          <div className="bg-ink/80 rounded-xl p-3.5 border border-line text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="font-numbers text-xl font-bold text-champagne block">OPTIMAL</span>
            <span className="label-subtle text-[8.5px] text-stone mt-0.5 block">RACE GRADE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

