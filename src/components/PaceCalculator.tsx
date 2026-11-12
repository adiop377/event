"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Timer, Zap, Flag, Droplets, ArrowRight, Gauge, Trophy, Flame } from "lucide-react";

export default function PaceCalculator() {
  const [distanceCode, setDistanceCode] = useState<"5k" | "10k" | "21k" | "42k">("21k");
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(50);

  const distances = {
    "5k": { name: "5K Fun Run", km: 5.0, defaultH: 0, defaultM: 28 },
    "10k": { name: "10K Challenge", km: 10.0, defaultH: 0, defaultM: 55 },
    "21k": { name: "21.1K Half Marathon", km: 21.097, defaultH: 1, defaultM: 50 },
    "42k": { name: "42.2K Full Marathon", km: 42.195, defaultH: 3, defaultM: 45 },
  };

  const handleDistanceChange = (code: "5k" | "10k" | "21k" | "42k") => {
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
    } else if (distanceCode === "42k") {
      if (totalMinutes <= 210) return { corral: "Corral A (Sub-3:30)", flag: "Volt Elite Flag", pacer: "Elite Bus 1" };
      if (totalMinutes <= 240) return { corral: "Corral B (4:00 Pacer)", flag: "Blaze Flag", pacer: "Sub-4 Pace Group" };
      return { corral: "Corral C (4:30+ Pacer)", flag: "Cobalt Flag", pacer: "Marathon Finisher Bus" };
    } else if (distanceCode === "10k") {
      if (totalMinutes <= 50) return { corral: "Corral A (Sub-50)", flag: "Volt Flag", pacer: "Speed Bus" };
      return { corral: "Corral B (60m Pacer)", flag: "Blaze Flag", pacer: "Cruiser Bus" };
    }
    return { corral: "Community Wave", flag: "Volt Flag", pacer: "Fun Parade" };
  };

  const pacerInfo = getPacerDetails();

  return (
    <section className="relative w-full py-24 bg-[#090D14] text-ivory overflow-hidden border-t border-line/60">
      {/* High-Tech Background Accent */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-volt/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4 text-volt" />
            <span className="label-subtle text-volt">ATHLETE PERFORMANCE LAB</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory font-black">
            RACE PACE <span className="text-volt-gradient">CALCULATOR.</span>
          </h2>
          <p className="font-body text-stone text-sm sm:text-base mt-4 leading-relaxed">
            Dial in your target finish time to reveal required split times and match with your official race morning pacer bus.
          </p>
        </div>

        <div className="luxury-card p-6 sm:p-10 lg:p-12 bg-graphite/95 border-volt/25 shadow-2xl">
          {/* Distance Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 pb-8 border-b border-line">
            {(["5k", "10k", "21k", "42k"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => handleDistanceChange(code)}
                className={`px-6 py-2.5 rounded-full text-xs font-heading uppercase tracking-wider font-extrabold transition-all ${
                  distanceCode === code
                    ? "bg-volt text-black shadow-[0_0_20px_rgba(204,255,0,0.4)]"
                    : "bg-ink/80 text-stone hover:text-ivory border border-line"
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
                <span className="label-subtle block mb-2">TARGET FINISH TIME</span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-stone block mb-1">HOURS</label>
                    <input
                      type="number"
                      min={0}
                      max={7}
                      value={hours}
                      onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-4 py-3 rounded-xl bg-ink border border-line text-ivory font-numbers text-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone block mb-1">MINUTES</label>
                    <input
                      type="number"
                      min={0}
                      max={59}
                      value={minutes}
                      onChange={(e) =>
                        setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-ink border border-line text-ivory font-numbers text-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
                    />
                  </div>
                </div>
              </div>

              {/* Slider representation */}
              <div>
                <div className="flex justify-between text-xs text-stone mb-2">
                  <span>Fast Pace</span>
                  <span className="text-volt font-numbers font-bold">
                    {hours}h {minutes}m total
                  </span>
                  <span>Relaxed Pace</span>
                </div>
                <input
                  type="range"
                  min={distanceCode === "5k" ? 15 : distanceCode === "10k" ? 35 : distanceCode === "21k" ? 75 : 150}
                  max={distanceCode === "5k" ? 60 : distanceCode === "10k" ? 110 : distanceCode === "21k" ? 210 : 360}
                  value={totalMinutes}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setHours(Math.floor(val / 60));
                    setMinutes(val % 60);
                  }}
                  className="w-full accent-volt cursor-pointer"
                />
              </div>

              {/* Nutrition Tip */}
              <div className="p-4 rounded-xl bg-ink/80 border border-line flex items-center gap-3 text-xs text-stone">
                <Droplets className="w-5 h-5 text-sky-400 shrink-0" />
                <span>
                  Hydration Plan: Take 120ml electrolyte sip every 2.5 km at official Apollo aid stations.
                </span>
              </div>
            </div>

            {/* Right Display: Split Metrics */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-ink/90 border border-volt/35 text-center flex flex-col justify-center shadow-lg">
                <span className="label-subtle text-volt block mb-1 font-bold">REQUIRED PACE</span>
                <span className="font-numbers text-4xl sm:text-5xl font-extrabold text-ivory">
                  {paceMinutes}:{String(paceSeconds).padStart(2, "0")}
                </span>
                <span className="text-xs text-stone mt-1">minutes per kilometer</span>
              </div>

              <div className="p-6 rounded-2xl bg-ink/90 border border-blaze/35 text-center flex flex-col justify-center shadow-lg">
                <span className="label-subtle text-blaze block mb-1 font-bold">AVERAGE SPEED</span>
                <span className="font-numbers text-4xl sm:text-5xl font-extrabold text-blaze">
                  {speedKmh}
                </span>
                <span className="text-xs text-stone mt-1">km / hour</span>
              </div>

              <div className="sm:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-graphite via-ink to-graphite border border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-volt/15 border border-volt/35 flex items-center justify-center text-volt shrink-0">
                    <Flag className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="label-subtle text-[9px] text-volt block">
                      RECOMMENDED PACER CORRAL
                    </span>
                    <h4 className="font-heading text-xl text-ivory uppercase">
                      {pacerInfo.corral}
                    </h4>
                    <span className="text-xs text-stone">
                      Flag: {pacerInfo.flag} • Group: {pacerInfo.pacer}
                    </span>
                  </div>
                </div>

                <a
                  href="#register"
                  className="btn-volt text-xs uppercase tracking-wider py-3 px-6 whitespace-nowrap"
                >
                  <span>Train For This</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
