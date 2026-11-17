"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Zap } from "lucide-react";
import { GALLERY } from "@/data/marathon";

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Atmosphere", "Race Action", "Course", "Community", "Athletes", "Moments"];

  const filteredItems =
    activeFilter === "All"
      ? GALLERY
      : GALLERY.filter((item) => item.category.toLowerCase() === activeFilter.toLowerCase());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx !== null) {
        if (e.key === "Escape") setActiveIdx(null);
        if (e.key === "ArrowRight")
          setActiveIdx((prev) => (prev !== null ? (prev + 1) % GALLERY.length : 0));
        if (e.key === "ArrowLeft")
          setActiveIdx((prev) =>
            prev !== null ? (prev - 1 + GALLERY.length) % GALLERY.length : 0
          );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    if (activeIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeIdx]);

  return (
    <section id="gallery" className="relative w-full py-14 sm:py-24 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <Camera className="w-4 h-4 text-volt" />
              <span className="label-subtle text-volt font-bold">ARCHIVAL MEDIA GALLERY</span>
            </div>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-ivory font-extrabold">
              RACE DAY <span className="text-volt-gradient">MOMENTS.</span>
            </h2>
          </div>
          <p className="font-body text-stone text-xs sm:text-base max-w-md leading-relaxed font-medium">
            Relive the quiet dawn intensity, adrenaline at the flag-off line, and finisher arch jubilation from previous editions in Patna.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-6 sm:mb-10 pb-3 sm:pb-4 border-b border-line/60 overflow-x-auto scrollbar-none sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-md text-xs font-heading uppercase tracking-wider font-extrabold transition-all ${
                activeFilter === cat
                  ? "bg-[#CCFF00] text-black shadow-sm font-black"
                  : "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white border border-slate-200 dark:border-white/15"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Sharp 8px athlete photo frames & subtle borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setActiveIdx(item.id - 1)}
              className={`relative rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 cursor-pointer group bg-slate-100 dark:bg-[#111827] shadow-md hover:border-slate-300 dark:hover:border-volt/40 transition-all ${item.aspect}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                unoptimized
                className="object-cover photo-grade group-hover:scale-108 transition-transform duration-700"
              />

              {/* Bottom-to-top gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/90" />

              {/* Hover overlay icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-md bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 z-20 shadow-md">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>

              {/* Title & Category with high-contrast text pop */}
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[9.5px] text-[#CCFF00] font-extrabold uppercase tracking-widest mb-2 shadow-md">
                  <Zap className="w-2.5 h-2.5 text-[#CCFF00]" />
                  <span>{item.category}</span>
                </div>
                <h4 className="font-heading text-xl sm:text-2xl uppercase tracking-wide text-white drop-shadow-md group-hover:text-[#CCFF00] transition-colors font-black">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-ink/95 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-graphite/80 border border-line text-stone hover:text-ivory transition-colors z-20"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={() =>
                setActiveIdx((prev) =>
                  prev !== null ? (prev - 1 + GALLERY.length) % GALLERY.length : 0
                )
              }
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-graphite/80 border border-line text-stone hover:text-volt transition-colors z-20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={() =>
                setActiveIdx((prev) =>
                  prev !== null ? (prev + 1) % GALLERY.length : 0
                )
              }
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-graphite/80 border border-line text-stone hover:text-volt transition-colors z-20"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image & Caption */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
            >
              <div className="relative w-full h-[65vh] rounded-lg overflow-hidden border border-white/20 bg-graphite shadow-2xl">
                <Image
                  src={GALLERY[activeIdx].src}
                  alt={GALLERY[activeIdx].title}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="label-subtle text-volt text-xs block mb-1 font-bold">
                  {GALLERY[activeIdx].category} • Archival Frame 0{activeIdx + 1} of 0{GALLERY.length}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl uppercase tracking-wider text-ivory">
                  {GALLERY[activeIdx].title}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
