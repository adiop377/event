"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, HeartPulse, TreePine, Timer, Sparkles, Award } from "lucide-react";
import { FEATURES } from "@/data/marathon";
import RaceWeather from "./RaceWeather";

export default function WhyRun() {
  return (
    <section id="about" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/40">
      {/* Subtle ambient blur */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-champagne/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-champagne" />
              <span className="label-subtle text-champagne">CHAMPIONSHIP STANDARDS</span>
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory">
              MORE THAN <span className="font-accent lowercase text-gold-gradient">a race.</span>
            </h2>
          </div>
          <p className="font-body text-stone text-base max-w-md leading-relaxed">
            A celebration of human grit, civic pride, and environmental preservation along the banks of the sacred Ganges in Patna.
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
              className="luxury-card p-6 sm:p-8 relative overflow-hidden group hover:border-champagne/50 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-numbers text-4xl font-extrabold text-champagne/30 group-hover:text-champagne transition-colors">
                  {feature.id}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-champagne/30 group-hover:bg-champagne group-hover:shadow-[0_0_12px_rgba(223,178,105,0.8)] transition-all" />
              </div>
              <h3 className="font-heading text-2xl uppercase tracking-wide text-ivory mb-3 group-hover:text-champagne transition-colors">
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
          {/* Photo */}
          <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-line shadow-2xl group">
            <Image
              src="/images/why.jpg"
              alt="Community runners in Patna smiling at dawn"
              fill
              className="object-cover photo-grade group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-graphite/90 backdrop-blur-md border border-line text-xs text-ivory font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
                AFI &amp; AIMS Certified Course
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-graphite/90 backdrop-blur-md border border-line text-xs text-ivory font-medium">
                <Timer className="w-3.5 h-3.5 text-champagne" />
                ChronoTrack Split Timing
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-graphite/90 backdrop-blur-md border border-line text-xs text-ivory font-medium">
                <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                Apollo Mobile ICU Patrols
              </span>
            </div>
          </div>

          {/* Community Card */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div className="luxury-card p-8 sm:p-10 bg-gradient-to-br from-graphite via-obsidian to-graphite border-champagne/30 shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-champagne/15 border border-champagne/30 flex items-center justify-center mb-6 text-champagne">
                <TreePine className="w-7 h-7" />
              </div>
              <span className="label-subtle text-champagne block mb-2">
                GREEN GANGA INITIATIVE
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl uppercase text-ivory tracking-tight mb-4">
                15,000 NATIVE TREES PLEDGED
              </h3>
              <p className="font-body text-stone text-sm leading-relaxed mb-6">
                15,000 native peepal, neem, and banyan saplings planted along the JP Ganga Pathway riverfront corridor. One runner = One tree nurtured for 3 years.
              </p>
              <div className="pt-5 border-t border-line/60 flex items-center justify-between text-xs text-stone">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-champagne" />
                  Eco-Certified Green Event
                </span>
                <span className="text-champagne font-bold font-numbers text-sm">2027 Edition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
