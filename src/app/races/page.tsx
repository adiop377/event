"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import RaceKit from "@/components/RaceKit";
import PaceCalculator from "@/components/PaceCalculator";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Trophy, Clock, Mountain, ArrowRight, ShieldCheck, Zap, Award, Flame, Check } from "lucide-react";
import { CATEGORIES, MARATHON_META } from "@/data/marathon";
import { Suspense } from "react";

function RacesContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const [selectedCat, setSelectedCat] = useState<string>("21k");

  useEffect(() => {
    if (catParam && ["21k", "10k", "5k"].includes(catParam)) {
      setSelectedCat(catParam);
    }
  }, [catParam]);

  const activeCategory = CATEGORIES.find((c) => c.code === selectedCat) || CATEGORIES[2];

  return (
    <main className="min-h-screen bg-ink text-ivory flex flex-col selection:bg-volt selection:text-black">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-28 pb-10 sm:pt-36 sm:pb-14 bg-gradient-to-b from-[#111827] via-ink to-ink border-b border-line/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="label-subtle text-emerald-600 dark:text-volt flex items-center justify-center gap-1.5 mb-2 font-bold tracking-widest text-xs uppercase">
            <Trophy className="w-4 h-4 text-emerald-600 dark:text-volt" />
            AFI &amp; AIMS CERTIFIED RACE DISTANCES
          </span>
          <h1 className="font-heading text-3xl xs:text-4xl sm:text-6xl uppercase tracking-tight text-slate-900 dark:text-white font-extrabold">
            RACE <span className="text-volt-gradient">CATEGORIES.</span>
          </h1>
          <p className="font-body text-slate-600 dark:text-slate-300 text-xs sm:text-base mt-3 leading-relaxed max-w-xl mx-auto font-medium">
            Choose your distance for Sunday, 7 Feb 2027 along the Ganges waterfront. All categories feature RFID chip-timing and official finisher medals.
          </p>

          {/* Category Tabs */}
          <div className="inline-flex flex-wrap p-1.5 rounded-lg bg-slate-100 dark:bg-[#182438] border border-slate-200 dark:border-white/10 mt-6 shadow-sm gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.code}
                type="button"
                onClick={() => setSelectedCat(cat.code)}
                className={`px-4 sm:px-6 py-2 rounded text-xs sm:text-sm font-heading uppercase tracking-wider font-extrabold transition-all ${
                  selectedCat === cat.code
                    ? "bg-[#CCFF00] text-black shadow-md font-black"
                    : "text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white font-bold"
                }`}
              >
                {cat.distance} {cat.name.replace(/^[0-9.]+\s*KM?\s*/i, "")}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Category Feature Card */}
      <section className="py-12 sm:py-16 bg-ink">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="luxury-card p-6 sm:p-10 lg:p-12 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 shadow-2xl rounded-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-100 dark:border-white/10 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded bg-[#CCFF00]/20 text-[#6d8a00] dark:text-[#CCFF00] text-[11px] font-heading uppercase tracking-wider font-extrabold">
                    {activeCategory.tagline}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    Min Age: {activeCategory.minAge}+ yrs
                  </span>
                </div>
                <h2 className="font-heading text-3xl sm:text-5xl uppercase font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {activeCategory.name}
                </h2>
                <p className="font-body text-slate-600 dark:text-slate-300 text-xs sm:text-base mt-2 max-w-xl leading-relaxed">
                  {activeCategory.description}
                </p>
              </div>

              <div className="text-left md:text-right shrink-0">
                <span className="label-subtle text-[10px] text-slate-500 dark:text-slate-400 block mb-1">
                  ENTRY FEE (ALL-INCLUSIVE)
                </span>
                <span className="font-numbers text-3xl sm:text-4xl text-slate-900 dark:text-white font-black">
                  {activeCategory.price}
                </span>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  ✓ Chip, Jersey, Kit &amp; Medal included
                </p>
              </div>
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-8 border-b border-slate-100 dark:border-white/10">
              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-lg">
                <span className="label-subtle text-[9px] text-slate-500 dark:text-slate-400 block mb-1 font-bold">
                  FLAG-OFF TIME
                </span>
                <span className="font-numbers text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-volt" />
                  {activeCategory.startTime}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-lg">
                <span className="label-subtle text-[9px] text-slate-500 dark:text-slate-400 block mb-1 font-bold">
                  CUTOFF LIMIT
                </span>
                <span className="font-numbers text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  {activeCategory.cutoffTime}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-lg">
                <span className="label-subtle text-[9px] text-slate-500 dark:text-slate-400 block mb-1 font-bold">
                  ELEVATION GAIN
                </span>
                <span className="font-numbers text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Mountain className="w-4 h-4 text-sky-500" />
                  {activeCategory.elevationGain} (Flat &amp; Fast)
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-lg">
                <span className="label-subtle text-[9px] text-slate-500 dark:text-slate-400 block mb-1 font-bold">
                  OFFICIAL TIMING
                </span>
                <span className="font-numbers text-base sm:text-lg font-extrabold text-emerald-600 dark:text-volt flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  ChronoTrack RFID
                </span>
              </div>
            </div>

            {/* Highlights & Inclusions */}
            <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="label-subtle text-xs font-bold text-slate-800 dark:text-slate-200 uppercase">
                  CATEGORY PRIVILEGES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {activeCategory.routeHighlights.map((hl) => (
                    <div key={hl} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-volt shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/#register`}
                className="btn-volt inline-flex text-xs uppercase tracking-wider py-4 px-8 rounded-[4px] font-extrabold hover:scale-105 transition-all shadow-md items-center justify-center gap-2 shrink-0 text-center"
              >
                <span>REGISTER FOR {activeCategory.distance}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Race Kit Privileges */}
      <RaceKit />

      {/* Performance Lab Pace Calculator */}
      <PaceCalculator />

      <Footer />
    </main>
  );
}

export default function RacesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink" />}>
      <RacesContent />
    </Suspense>
  );
}
