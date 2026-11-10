"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GALLERY } from "@/data/marathon";

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

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
    <section id="gallery" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-champagne" />
              <span className="label-subtle text-champagne">ARCHIVAL MEMORIES</span>
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory">
              RACE DAY <span className="font-accent lowercase text-champagne">gallery.</span>
            </h2>
          </div>
          <p className="font-body text-stone text-base max-w-md leading-relaxed">
            Relive the quiet intensity, grit, and collective joy from previous editions along the historic avenues of Patna.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setActiveIdx(idx)}
              className={`relative rounded-2xl overflow-hidden border border-line cursor-pointer group bg-graphite ${item.aspect}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                unoptimized
                className="object-cover photo-grade group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Hover overlay icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-graphite/80 backdrop-blur-md border border-line flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-champagne" />
              </div>

              {/* Title & Category */}
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <span className="label-subtle text-[8.5px] text-champagne block mb-1">
                  {item.category}
                </span>
                <h4 className="font-heading text-xl uppercase tracking-wide text-ivory">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-ink/95 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-graphite/80 border border-line text-stone hover:text-ivory transition-colors z-20"
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
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-graphite/80 border border-line text-stone hover:text-champagne transition-colors z-20"
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
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-graphite/80 border border-line text-stone hover:text-champagne transition-colors z-20"
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
              <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden border border-line/60 bg-graphite shadow-2xl">
                <Image
                  src={GALLERY[activeIdx].src}
                  alt={GALLERY[activeIdx].title}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="label-subtle text-champagne text-xs block mb-1">
                  {GALLERY[activeIdx].category} • 0{activeIdx + 1} of 0{GALLERY.length}
                </span>
                <h3 className="font-heading text-2xl uppercase tracking-wider text-ivory">
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

