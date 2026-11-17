"use client";

import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { Camera } from "lucide-react";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-ink text-ivory flex flex-col selection:bg-volt selection:text-black">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-28 pb-8 sm:pt-36 sm:pb-12 bg-gradient-to-b from-[#111827] via-ink to-ink border-b border-line/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="label-subtle text-emerald-600 dark:text-volt flex items-center justify-center gap-1.5 mb-2 font-bold tracking-widest text-xs uppercase">
            <Camera className="w-4 h-4 text-emerald-600 dark:text-volt" />
            ARCHIVAL MEDIA &amp; RUNNER STORIES
          </span>
          <h1 className="font-heading text-3xl xs:text-4xl sm:text-6xl uppercase tracking-tight text-slate-900 dark:text-white font-extrabold">
            OFFICIAL <span className="text-volt-gradient">GALLERY.</span>
          </h1>
          <p className="font-body text-slate-600 dark:text-slate-300 text-xs sm:text-base mt-3 leading-relaxed max-w-xl mx-auto font-medium">
            Browse high-resolution photographs from the Ganga riverfront course, dawn start waves, community cheers, and finisher arch milestones.
          </p>
        </div>
      </section>

      {/* Full Media Gallery */}
      <Gallery />

      <Footer />
    </main>
  );
}
