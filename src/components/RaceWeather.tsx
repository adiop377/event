"use client";

import { CloudSun, Wind, Droplets, Sun, ShieldCheck } from "lucide-react";

export default function RaceWeather() {
  return (
    <div className="w-full my-12 luxury-card p-6 sm:p-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 shadow-lg">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <CloudSun className="w-4 h-4 text-emerald-600 dark:text-volt" />
            <span className="label-subtle text-emerald-700 dark:text-volt font-bold">RACE MORNING CLIMATE INDEX</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl text-slate-900 dark:text-white uppercase font-black">
            IDEAL PERSONAL BEST (PB) CONDITIONS
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-md font-body font-medium">
            JP Ganga Path Vending Zone &amp; Ganga Riverfront historical climate for February 7 dawn flag-off.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          <div className="bg-slate-50 dark:bg-[#0D121C] rounded-lg p-3.5 border border-slate-200 dark:border-white/10 text-center shadow-sm">
            <Sun className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <span className="font-numbers text-xl font-black text-slate-900 dark:text-white block">15°C – 19°C</span>
            <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400 mt-0.5 block font-semibold">TEMP AT DAWN</span>
          </div>

          <div className="bg-slate-50 dark:bg-[#0D121C] rounded-lg p-3.5 border border-slate-200 dark:border-white/10 text-center shadow-sm">
            <Wind className="w-4 h-4 text-sky-500 mx-auto mb-1" />
            <span className="font-numbers text-xl font-black text-slate-900 dark:text-white block">4.2 KM/H</span>
            <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400 mt-0.5 block font-semibold">GANGA BREEZE</span>
          </div>

          <div className="bg-slate-50 dark:bg-[#0D121C] rounded-lg p-3.5 border border-slate-200 dark:border-white/10 text-center shadow-sm">
            <Droplets className="w-4 h-4 text-teal-600 mx-auto mb-1" />
            <span className="font-numbers text-xl font-black text-slate-900 dark:text-white block">64%</span>
            <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400 mt-0.5 block font-semibold">AVG HUMIDITY</span>
          </div>

          <div className="bg-emerald-50 dark:bg-volt/10 rounded-lg p-3.5 border border-emerald-300 dark:border-volt/40 text-center shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-volt mx-auto mb-1" />
            <span className="font-numbers text-xl font-black text-emerald-700 dark:text-volt block">OPTIMAL</span>
            <span className="label-subtle text-[8.5px] text-emerald-800 dark:text-volt font-extrabold mt-0.5 block">RACE GRADE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
