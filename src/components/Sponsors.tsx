"use client";

import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import { SPONSORS } from "@/data/marathon";

export default function Sponsors() {
  return (
    <section className="relative w-full py-24 bg-ink text-ivory overflow-hidden border-t border-line/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Handshake className="w-4 h-4 text-volt" />
            <span className="label-subtle text-volt font-bold">PATRONS &amp; STATE PARTNERS</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-ivory font-black">
            OUR ESTEEMED <span className="text-volt-gradient">PARTNERS.</span>
          </h2>
          <p className="font-body text-stone text-xs sm:text-sm mt-3">
            Committed to building civic health and athletic infrastructure across Bihar.
          </p>
        </div>

        {/* Sponsor Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPONSORS.map((sponsor, idx) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="luxury-card p-6 flex flex-col items-center justify-center text-center hover:border-volt/50 transition-all group min-h-[130px]"
            >
              <span className="font-heading text-lg sm:text-xl tracking-wider text-ivory font-bold group-hover:text-volt transition-colors">
                {sponsor.logoText}
              </span>
              <span className="label-subtle text-[8.5px] text-stone mt-1.5 block tracking-[0.2em] font-semibold">
                {sponsor.role}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
