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
    <section id="gallery" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-volt" />
              <span className="label-subtle text-volt font-bold">ARCHIVAL MEDIA GALLERY</span>
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory">
              RACE DAY <span className="font-accent lowercase text-volt-gradient">moments.</span>
            </h2>
          </div>
          <p className="font-body text-stone text-sm sm:text-base max-w-md leading-relaxed">
            Relive the quiet dawn intensity, adrenaline at the flag-off line, and finisher arch jubilation from previous editions in Patna.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-line/60">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider font-bold transition-all ${
                activeFilter === cat
                  ? "bg-volt text-black shadow-[0_0_12px_rgba(204,255,0,0.4)]"
                  : "bg-graphite text-stone hover:text-ivory border border-line"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setActiveIdx(item.id - 1)}
              className={`relative rounded-3xl overflow-hidden border border-line/80 cursor-pointer group bg-graphite shadow-xl hover:border-volt/50 transition-all ${item.aspect}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                unoptimized
                className="object-cover photo-grade group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Hover overlay icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-graphite/90 backdrop-blur-md border border-volt/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <Maximize2 className="w-4 h-4 text-volt" />
              </div>

              {/* Title & Category */}
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-graphite/90 backdrop-blur-md border border-volt/30 text-[9px] text-volt font-extrabold uppercase tracking-widest mb-2">
                  <Zap className="w-2.5 h-2.5 text-volt" />
                  <span>{item.category}</span>
                </div>
                <h4 className="font-heading text-xl uppercase tracking-wide text-ivory group-hover:text-volt transition-colors">
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
              <div className="relative w-full h-[65vh] rounded-3xl overflow-hidden border border-volt/35 bg-graphite shadow-2xl">
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
