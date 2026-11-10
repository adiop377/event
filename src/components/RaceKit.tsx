"use client";

import { motion } from "framer-motion";
import { Shirt, Sprout, Cpu, Award, Apple, Smartphone, PackageCheck } from "lucide-react";
import { KIT_ITEMS } from "@/data/marathon";

const icons = [Shirt, Sprout, Cpu, Award, Apple, Smartphone];

export default function RaceKit() {
  return (
    <section id="kit" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <PackageCheck className="w-4 h-4 text-champagne" />
            <span className="label-subtle text-champagne">OFFICIAL ATHLETE PRIVILEGES</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory">
            THE RACE <span className="font-accent lowercase text-champagne">kit.</span>
          </h2>
          <p className="font-body text-stone text-sm sm:text-base mt-4 leading-relaxed">
            Every registered athlete receives the official luxury runner collection, engineered for performance and keepsake value.
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
                className="luxury-card p-6 sm:p-8 flex flex-col justify-between hover:border-champagne/40 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne group-hover:scale-110 group-hover:bg-champagne/20 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="label-subtle text-[8.5px] bg-ink/70 px-2.5 py-1 rounded-full border border-line text-stone">
                      INCLUDED IN REGISTRATION
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl uppercase tracking-wide text-ivory mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-stone text-xs sm:text-sm leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-line/40 flex items-center justify-between">
                  <span className="label-subtle text-[9px] text-stone">STANDARD ISSUANCE</span>
                  <span className="font-numbers text-xs text-champagne font-semibold">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

