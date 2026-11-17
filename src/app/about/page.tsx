"use client";

import Navbar from "@/components/Navbar";
import WhyRun from "@/components/WhyRun";
import Sponsors from "@/components/Sponsors";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, TreePine } from "lucide-react";
import { MARATHON_META } from "@/data/marathon";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ink text-ivory flex flex-col selection:bg-volt selection:text-black">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-gradient-to-b from-[#111827] via-ink to-ink border-b border-line/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="label-subtle text-emerald-600 dark:text-volt flex items-center gap-1.5 mb-3 font-bold tracking-widest text-xs uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-volt" />
              CHAMPIONSHIP HERITAGE &amp; MISSION
            </span>
            <h1 className="font-heading text-3xl xs:text-4xl sm:text-6xl uppercase tracking-tight text-slate-900 dark:text-white font-extrabold">
              ABOUT PRIDE PATNA <span className="text-volt-gradient">MARATHON.</span>
            </h1>
            <p className="font-body text-slate-600 dark:text-slate-300 text-xs sm:text-base mt-4 leading-relaxed font-medium">
              Bihar&apos;s flagship distance running event, celebrating civic pride, health equity, and the sacred Ganges riverfront corridor on 7 Feb 2027.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <Link
                href="/races"
                className="btn-volt inline-flex text-xs uppercase tracking-wider py-3 px-6 rounded-[4px] font-extrabold hover:scale-105 transition-all shadow-md items-center gap-2"
              >
                <span>EXPLORE RACES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/#register"
                className="btn-ghost-luxury inline-flex text-xs uppercase tracking-wider py-3 px-6 rounded-[4px] font-bold hover:scale-105 transition-all items-center gap-2"
              >
                <span>REGISTER NOW</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <WhyRun />
      <Sponsors />
      <Footer />
    </main>
  );
}
