"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Timer, Zap, Flag, Droplets, ArrowRight, Gauge, Trophy, Flame } from "lucide-react";

export default function PaceCalculator() {
  const [distanceCode, setDistanceCode] = useState<"5k" | "10k" | "21k">("21k");
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(50);

  const distances = {
    "5k": { name: "5K Fun Run", km: 5.0, defaultH: 0, defaultM: 28 },
    "10k": { name: "10K Challenge", km: 10.0, defaultH: 0, defaultM: 55 },
    "21k": { name: "21K Half Marathon", km: 21.0, defaultH: 1, defaultM: 50 },
  };

  const handleDistanceChange = (code: "5k" | "10k" | "21k") => {
    setDistanceCode(code);
    setHours(distances[code].defaultH);
    setMinutes(distances[code].defaultM);
  };

  const totalMinutes = hours * 60 + minutes || 1;
  const currentKm = distances[distanceCode].km;
  const pacePerKmDecimal = totalMinutes / currentKm;
  const paceMinutes = Math.floor(pacePerKmDecimal);
  const paceSeconds = Math.round((pacePerKmDecimal - paceMinutes) * 60);

  // Speed in km/h
  const speedKmh = ((currentKm / totalMinutes) * 60).toFixed(1);

  // Pacer Flag Color based on pace
  const getPacerDetails = () => {
    if (distanceCode === "21k") {
      if (totalMinutes <= 105) return { corral: "Corral A (Sub-1:45)", flag: "Volt Green Flag", pacer: "Speed Bus 1" };
      if (totalMinutes <= 120) return { corral: "Corral B (2:00 Pacer)", flag: "Neon Blaze Flag", pacer: "Speed Bus 2" };
      if (totalMinutes <= 135) return { corral: "Corral C (2:15 Pacer)", flag: "Cobalt Blue Flag", pacer: "Endurance Bus 3" };
      return { corral: "Corral D (2:30+ Pacer)", flag: "Ruby Flag", pacer: "Finisher Party Bus" };
    } else if (distanceCode === "10k") {
      if (totalMinutes <= 50) return { corral: "Corral A (Sub-50)", flag: "Volt Flag", pacer: "Speed Bus" };
      return { corral: "Corral B (60m Pacer)", flag: "Blaze Flag", pacer: "Cruiser Bus" };
    }
    return { corral: "Community Wave", flag: "Volt Flag", pacer: "Fun Parade" };
  };

  const pacerInfo = getPacerDetails();

  return (
    <section className="relative w-full py-14 sm:py-24 bg-white dark:bg-[#070A0F] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <Gauge className="w-4 h-4 text-emerald-600 dark:text-volt" />
            <span className="label-subtle text-emerald-700 dark:text-volt font-bold">ATHLETE PERFORMANCE LAB</span>
          </div>
          <h2 className="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-slate-900 dark:text-white font-extrabold">
            RACE PACE <span className="text-emerald-600 dark:text-volt">CALCULATOR.</span>
          </h2>
          <p className="font-body text-slate-600 dark:text-slate-400 text-xs sm:text-base mt-2 sm:mt-4 leading-relaxed font-medium">
            Dial in your target finish time to reveal required split times and match with your official race morning pacer bus.
          </p>
        </div>

        {/* Main Performance Lab Card */}
        <div className="relative">
          <div className="luxury-card p-4 sm:p-10 lg:p-12 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 shadow-xl">
            {/* Distance Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 pb-6 sm:pb-8 border-b border-slate-100 dark:border-white/10">
              {(["5k", "10k", "21k"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleDistanceChange(code)}
                  className={`px-6 py-2.5 rounded-md text-xs font-heading uppercase tracking-wider font-extrabold transition-all ${
                    distanceCode === code
                      ? "bg-[#CCFF00] text-black shadow-sm font-black"
                      : "bg-slate-100 dark:bg-[#182438] text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white border border-slate-200 dark:border-white/10"
                  }`}
                >
                  {distances[code].name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Inputs: Target Time */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="label-subtle block mb-2 text-slate-700 dark:text-slate-300 font-bold">TARGET FINISH TIME</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1 font-semibold">HOURS</label>
                      <input
                        type="number"
                        min={0}
                        max={7}
                        value={hours}
                        onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-4 py-3 rounded-md bg-slate-50 dark:bg-[#0D121C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-numbers text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1 font-semibold">MINUTES</label>
                      <input
                        type="number"
                        min={0}
                        max={59}
                        value={minutes}
                        onChange={(e) =>
                          setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))
                        }
                        className="w-full px-4 py-3 rounded-md bg-slate-50 dark:bg-[#0D121C] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-numbers text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Slider representation */}
                <div>
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                    <span>Fast Pace</span>
                    <span className="text-emerald-700 dark:text-volt font-numbers font-black">
                      {hours}h {minutes}m total
                    </span>
                    <span>Relaxed Pace</span>
                  </div>
                  <input
                    type="range"
                    min={distanceCode === "5k" ? 15 : distanceCode === "10k" ? 35 : 75}
                    max={distanceCode === "5k" ? 60 : distanceCode === "10k" ? 110 : 210}
                    value={totalMinutes}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setHours(Math.floor(val / 60));
                      setMinutes(val % 60);
                    }}
                    className="w-full accent-emerald-600 dark:accent-volt cursor-pointer"
                  />
                </div>

                {/* Nutrition Tip */}
                <div className="p-4 rounded-md bg-sky-50 dark:bg-[#0D121C] border border-sky-100 dark:border-white/10 flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <Droplets className="w-5 h-5 text-sky-600 shrink-0" />
                  <span>
                    Hydration Plan: Take 120ml electrolyte sip every 2.5 km at official Apollo aid stations.
                  </span>
                </div>
              </div>

              {/* Right Display: Split Metrics */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-lg bg-slate-50 dark:bg-[#0D121C] border border-slate-200 dark:border-white/10 text-center flex flex-col justify-center shadow-sm">
                  <span className="label-subtle text-emerald-700 dark:text-volt block mb-1 font-bold">REQUIRED PACE</span>
                  <span className="font-numbers text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                    {paceMinutes}:{String(paceSeconds).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">minutes per kilometer</span>
                </div>

                <div className="p-6 rounded-lg bg-slate-50 dark:bg-[#0D121C] border border-slate-200 dark:border-white/10 text-center flex flex-col justify-center shadow-sm">
                  <span className="label-subtle text-orange-600 dark:text-blaze block mb-1 font-bold">AVERAGE SPEED</span>
                  <span className="font-numbers text-4xl sm:text-5xl font-black text-orange-600 dark:text-blaze">
                    {speedKmh}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">km / hour</span>
                </div>

                <div className="sm:col-span-2 relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 group text-white">
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-[#CCFF00] shrink-0">
                      <Flag className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="label-subtle text-[9px] text-[#CCFF00] block font-bold">
                        RECOMMENDED PACER CORRAL
                      </span>
                      <h4 className="font-heading text-xl text-white uppercase font-bold">
                        {pacerInfo.corral}
                      </h4>
                      <span className="text-xs text-slate-300">
                        Flag: {pacerInfo.flag} • Group: {pacerInfo.pacer}
                      </span>
                    </div>
                  </div>

                  <a
                    href="#register"
                    className="relative z-10 bg-[#CCFF00] hover:bg-[#b8e600] text-black text-xs uppercase tracking-wider py-3 px-6 whitespace-nowrap rounded-[4px] font-black hover:scale-105 transition-all duration-300 shadow-md"
                  >
                    <span>REGISTER NOW</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
