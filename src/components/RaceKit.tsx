"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shirt, Sprout, Cpu, Award, Apple, Smartphone, PackageCheck, Zap } from "lucide-react";
import { KIT_ITEMS } from "@/data/marathon";

const icons = [Shirt, Sprout, Cpu, Award, Apple, Smartphone];

export default function RaceKit() {
  return (
    <section id="kit" className="relative w-full py-14 sm:py-24 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <PackageCheck className="w-4 h-4 text-volt" />
            <span className="label-subtle text-volt font-bold">OFFICIAL ATHLETE PRIVILEGES</span>
          </div>
          <h2 className="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-ivory font-extrabold">
            THE RACE <span className="text-volt-gradient">KIT.</span>
          </h2>
          <p className="font-body text-stone text-xs sm:text-base mt-2 sm:mt-4 leading-relaxed font-medium">
            Every registered athlete receives the official cyber-athletic runner collection, engineered for moisture dissipation and commemorative value.
          </p>
        </div>

        {/* 6 Kit items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {KIT_ITEMS.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group flex flex-col justify-between rounded-lg p-6 sm:p-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-volt/40 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-700 dark:text-volt group-hover:scale-110 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="label-subtle text-[8.5px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-volt border border-emerald-200 dark:border-volt/30 px-2.5 py-0.5 rounded font-bold">
                      INCLUDED IN REGISTRATION
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl uppercase tracking-wide text-slate-900 dark:text-white mb-2 font-black group-hover:text-emerald-700 dark:group-hover:text-volt transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <span className="label-subtle text-[9px] text-slate-400 dark:text-slate-500 font-bold">STANDARD ISSUANCE</span>
                  <span className="font-numbers text-sm text-emerald-700 dark:text-volt font-black">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Official Running Footwear & Apparel Banner */}
        <div className="mt-12 relative rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 group min-h-[260px] sm:min-h-[300px] flex items-end p-6 sm:p-10 shadow-xl">
          <Image
            src="/images/gallery-5.jpg"
            alt="Official championship running footwear on race track"
            fill
            unoptimized
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 photo-grade"
          />
          {/* High-contrast gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="label-subtle text-[#CCFF00] font-bold flex items-center gap-1.5 mb-2">
              <Zap className="w-3.5 h-3.5 text-[#CCFF00]" />
              CHAMPIONSHIP FOOTWEAR &amp; COMMEMORATIVE GEAR
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl uppercase text-white tracking-tight mb-2 font-black">
              ENGINEERED FOR EVERY STRIDE ACROSS PATNA
            </h3>
            <p className="font-body text-slate-200 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
              From dawn staging at JP Ganga Path, Vending Zone to the high-cadence sprint on Atal Expressway, our moisture-wicking commemorative jersey and ChronoTrack RFID tags ensure peak race-day performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
