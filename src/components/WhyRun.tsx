"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, HeartPulse, TreePine, Timer, Sparkles } from "lucide-react";
import { FEATURES } from "@/data/marathon";

export default function WhyRun() {
  return (
    <section id="about" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-champagne" />
              <span className="label-subtle text-champagne">WHY RUN WITH US</span>
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory">
              MORE THAN <span className="font-accent lowercase text-champagne">a race.</span>
            </h2>
          </div>
          <p className="font-body text-stone text-base max-w-md leading-relaxed">
            We are building a celebration of endurance, civic pride, and environmental action on the historic soil of Patna.
          </p>
        </div>

        {/* Top 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="luxury-card p-6 sm:p-7 relative overflow-hidden group hover:border-champagne/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-numbers text-3xl font-bold text-champagne/40 group-hover:text-champagne transition-colors">
                  {feature.id}
                </span>
                <span className="w-2 h-2 rounded-full bg-champagne/30 group-hover:bg-champagne transition-colors" />
              </div>
              <h3 className="font-heading text-2xl uppercase tracking-wide text-ivory mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-stone text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Middle Feature Banner: Photo + Community Impact + Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Photo */}
          <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-line shadow-2xl group">
            <Image
              src="/images/why.jpg"
              alt="Community runners in Patna smiling at dawn"
              fill
              className="object-cover photo-grade group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-graphite/90 backdrop-blur-md border border-line text-xs text-ivory font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
                AFI & AIMS Certified Course
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-graphite/90 backdrop-blur-md border border-line text-xs text-ivory font-medium">
                <Timer className="w-3.5 h-3.5 text-champagne" />
                RFID Split Timing Mats
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-graphite/90 backdrop-blur-md border border-line text-xs text-ivory font-medium">
                <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                Paramedic & Mobile ICU Support
              </span>
            </div>
          </div>

          {/* Community Card */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div className="luxury-card p-8 bg-gradient-to-br from-graphite to-ink border-champagne/30">
              <div className="w-12 h-12 rounded-2xl bg-champagne/15 border border-champagne/30 flex items-center justify-center mb-6">
                <TreePine className="w-6 h-6 text-champagne" />
              </div>
              <span className="label-subtle text-champagne block mb-2">
                COMMUNITY IMPACT
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl uppercase text-ivory tracking-tight mb-4">
                15,000 NATIVE TREES PLEDGED
              </h3>
              <p className="font-body text-stone text-sm leading-relaxed mb-6">
                15,000 native trees pledged along the Ganga riverfront corridor in celebration of every runner. Run for your personal best, run for a greener Bihar.
              </p>
              <div className="pt-4 border-t border-line/50 flex items-center justify-between text-xs text-stone">
                <span>Green Riverfront Initiative</span>
                <span className="text-champagne font-semibold font-numbers">2027 Edition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

