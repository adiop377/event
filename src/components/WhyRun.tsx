"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, HeartPulse, TreePine, Timer, Zap, Award, Flame } from "lucide-react";
import { FEATURES } from "@/data/marathon";
import RaceWeather from "./RaceWeather";

export default function WhyRun() {
  return (
    <section id="about" className="relative w-full py-14 sm:py-24 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/60">
      {/* Subtle ambient blur */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-volt/[0.04] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-blaze/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <Zap className="w-4 h-4 text-volt" />
              <span className="label-subtle text-volt font-bold">CHAMPIONSHIP STANDARDS</span>
            </div>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-ivory font-extrabold">
              MORE THAN <span className="text-volt-gradient">A RACE.</span>
            </h2>
          </div>
          <p className="font-body text-stone text-xs sm:text-base max-w-md leading-relaxed font-medium">
            A high-energy celebration of athletic grit, civic pride, and environmental action along the sacred Ganges riverfront in Patna.
          </p>
        </div>

        {/* Top 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="luxury-card p-5 sm:p-8 relative overflow-hidden group hover:border-volt/50 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-numbers text-4xl font-extrabold text-volt/30 group-hover:text-volt transition-colors">
                  {feature.id}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-volt/40 group-hover:bg-volt group-hover:shadow-[0_0_12px_rgba(204,255,0,0.8)] transition-all" />
              </div>
              <h3 className="font-heading text-2xl uppercase tracking-wide text-ivory mb-3 group-hover:text-volt transition-colors">
                {feature.title}
              </h3>
              <p className="font-body text-stone text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Historical Climate Widget */}
        <RaceWeather />

        {/* Middle Feature Banner: Photo + Community Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
          {/* Photo with 8px Sharp Corners & Dark Ambient Glow */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-2 bg-volt/[0.04] rounded-lg blur-2xl pointer-events-none -z-10" />
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border border-white/[0.08] shadow-2xl group">
              <Image
                src="/images/why.jpg"
                alt="Community runners in Patna smiling at dawn"
                fill
                className="object-cover photo-grade group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle gradient overlay so text badges pop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white font-bold shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  AFI &amp; AIMS Certified Course
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white font-bold shadow-lg">
                  <Timer className="w-3.5 h-3.5 text-emerald-400" />
                  ChronoTrack Split Timing
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white font-bold shadow-lg">
                  <HeartPulse className="w-3.5 h-3.5 text-orange-400" />
                  Apollo Mobile ICU Patrols
                </span>
              </div>
            </div>
          </div>

          {/* Community Card */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 relative">
            <div className="luxury-card p-8 sm:p-10 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 shadow-xl">
              <div className="w-12 h-12 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-700/50 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                <TreePine className="w-6 h-6" />
              </div>
              <span className="label-subtle text-emerald-700 dark:text-emerald-400 block mb-2 font-bold">
                GREEN GANGA INITIATIVE
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl uppercase text-slate-900 dark:text-white tracking-tight mb-4 font-black">
                15,000 NATIVE TREES PLEDGED
              </h3>
              <p className="font-body text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 font-medium">
                15,000 native peepal, neem, and banyan saplings planted along the JP Ganga Pathway riverfront corridor. One runner = One tree nurtured for 3 years.
              </p>
              <div className="pt-5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Eco-Certified Green Event
                </span>
                <span className="text-emerald-700 dark:text-volt font-black font-numbers text-sm">2027 Edition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
