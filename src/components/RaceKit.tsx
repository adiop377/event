"use client";

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
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory">
            THE RACE <span className="font-accent lowercase text-volt-gradient">kit.</span>
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
                className="luxury-card p-6 sm:p-8 flex flex-col justify-between hover:border-volt/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-volt/15 border border-volt/35 flex items-center justify-center text-volt group-hover:scale-110 group-hover:bg-volt/25 transition-all shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="label-subtle text-[8.5px] bg-volt/10 text-volt border border-volt/30 px-2.5 py-1 rounded-full font-bold">
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
      </div>
    </section>
  );
}
