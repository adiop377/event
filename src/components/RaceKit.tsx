"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shirt, Sprout, Cpu, Award, Apple, Smartphone, PackageCheck, Zap } from "lucide-react";
import { KIT_ITEMS } from "@/data/marathon";

const icons = [Shirt, Sprout, Cpu, Award, Apple, Smartphone];

export default function RaceKit() {
  return (
    <section id="kit" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <PackageCheck className="w-4 h-4 text-volt" />
            <span className="label-subtle text-volt font-bold">OFFICIAL ATHLETE PRIVILEGES</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-ivory font-black">
            THE RACE <span className="text-volt-gradient">KIT.</span>
          </h2>
          <p className="font-body text-stone text-sm sm:text-base mt-4 leading-relaxed">
            Every registered athlete receives the official cyber-athletic runner collection, engineered for moisture dissipation and commemorative value.
          </p>
        </div>

        {/* 6 Kit items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KIT_ITEMS.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group flex flex-col justify-between rounded-lg p-6 sm:p-8 bg-gradient-to-b from-[#111A2B]/80 to-[#0A0F1A]/95 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 shadow-xl"
              >
                {/* Subtle blurred dark volt glow behind card */}
                <div className="absolute -inset-1 rounded-lg bg-volt/20 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none -z-10" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-md bg-volt/15 border border-volt/30 flex items-center justify-center text-volt group-hover:scale-110 group-hover:bg-volt/25 transition-all shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="label-subtle text-[8.5px] bg-volt/10 text-volt border border-volt/30 px-2.5 py-0.5 rounded font-bold">
                      INCLUDED IN REGISTRATION
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl uppercase tracking-wide text-ivory mb-2 group-hover:text-volt transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body text-stone text-xs sm:text-sm leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-line/40 flex items-center justify-between">
                  <span className="label-subtle text-[9px] text-stone font-semibold">STANDARD ISSUANCE</span>
                  <span className="font-numbers text-sm text-volt font-extrabold">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Official Running Footwear & Apparel Banner with Bottom-to-Top Fade-to-Black */}
        <div className="mt-12 relative rounded-lg overflow-hidden border border-white/[0.08] group min-h-[260px] sm:min-h-[300px] flex items-end p-6 sm:p-10 shadow-2xl">
          <Image
            src="/images/gallery-5.jpg"
            alt="Official championship running footwear on race track"
            fill
            unoptimized
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 photo-grade"
          />
          {/* Seamless bottom-to-top fade-to-black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090D14] via-[#090D14]/85 via-50% to-[#090D14]/30 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#090D14] to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="label-subtle text-volt font-bold flex items-center gap-1.5 mb-2">
              <Zap className="w-3.5 h-3.5 text-volt" />
              CHAMPIONSHIP FOOTWEAR &amp; COMMEMORATIVE GEAR
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl uppercase text-ivory tracking-tight mb-2">
              ENGINEERED FOR EVERY STRIDE ACROSS PATNA
            </h3>
            <p className="font-body text-stone text-xs sm:text-sm leading-relaxed max-w-xl">
              From dawn staging at Gandhi Maidan to the high-cadence sprint on Atal Expressway, our moisture-wicking commemorative jersey and ChronoTrack RFID tags ensure peak race-day performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
