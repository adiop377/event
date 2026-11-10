"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, ChevronDown, X, Sparkles } from "lucide-react";
import { MARATHON_META } from "@/data/marathon";

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    if (videoOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [videoOpen]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-ink"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-ember/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Info */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Top pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 w-fit mb-6 px-3.5 py-1.5 rounded-full bg-graphite/80 border border-line backdrop-blur-md"
            >
              <span className="label-subtle text-[9.5px] sm:text-[10px] text-champagne font-bold tracking-[0.2em] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-champagne" />
                PRIDE PATNA MARATHON PRESENTS
              </span>
              <span className="w-1 h-1 rounded-full bg-stone/40" />
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                REGISTRATION OPEN
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-6xl sm:text-7xl md:text-8xl xl:text-9xl uppercase tracking-tight text-ivory leading-[0.92]"
            >
              EVERY MILE
              <br />
              <span className="font-accent lowercase text-champagne tracking-normal">
                matters.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-body text-stone text-base sm:text-lg md:text-xl max-w-xl mt-6 leading-relaxed"
            >
              {MARATHON_META.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <a
                href="#register"
                className="btn-champagne text-sm uppercase tracking-wider group !py-3.5 !px-8"
              >
                <span>Reserve your bib</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="btn-ghost-luxury text-sm !py-3.5 !px-7 group"
                aria-label="Watch race preview promo video"
              >
                <div className="w-6 h-6 rounded-full bg-champagne/15 flex items-center justify-center text-champagne group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch promo</span>
              </button>
            </motion.div>

            {/* Meta Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-line flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-stone"
            >
              <div>
                <p className="label-subtle mb-1">DATE</p>
                <p className="font-numbers text-base text-ivory tracking-wide">
                  {MARATHON_META.date}
                </p>
              </div>
              <div className="w-px h-8 bg-line" />
              <div>
                <p className="label-subtle mb-1">VENUE</p>
                <p className="font-numbers text-base text-ivory tracking-wide">
                  {MARATHON_META.venue}
                </p>
              </div>
              <div className="w-px h-8 bg-line" />
              <div>
                <p className="label-subtle mb-1">RUNNERS</p>
                <p className="font-numbers text-base text-champagne tracking-wide">
                  {MARATHON_META.stats.runnersCount}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Image with SVG glow ribbon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center lg:justify-end"
          >
            {/* Glowing Track Ribbon SVG */}
            <svg
              className="absolute -inset-10 w-[125%] h-[125%] pointer-events-none z-0 overflow-visible"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="champagneRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DFB269" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#F0C987" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#DFB269" stopOpacity="0.15" />
                </linearGradient>
                <filter id="ribbonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <motion.path
                d="M 40,420 C 120,380 200,450 320,360 C 440,270 420,120 300,70 C 180,20 120,160 210,240 C 300,320 460,260 480,180"
                stroke="url(#champagneRibbon)"
                strokeWidth="2"
                strokeDasharray="5 3"
                filter="url(#ribbonGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </svg>

            {/* Hero Image Card */}
            <div className="relative w-full max-w-md lg:max-w-none aspect-[3/4] sm:aspect-[4/5] rounded-[24px] overflow-hidden border border-champagne/25 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(223,178,105,0.15)] z-10 group bg-graphite">
              <Image
                src="/images/marathon-hero-athlete.jpg"
                alt="Professional marathon athlete sprinting across Patna bridge at sunrise"
                fill
                priority
                unoptimized
                className="object-cover object-center photo-grade transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ink via-ink/40 to-transparent pointer-events-none" />

              {/* Floating quote label */}
              <div className="absolute bottom-6 left-6 z-20 bg-graphite/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-champagne/30 shadow-lg">
                <span className="font-accent text-sm sm:text-base text-champagne font-semibold tracking-wide">
                  “{MARATHON_META.event}”
                </span>
              </div>
            </div>

            {/* Side vertical badge */}
            <div className="hidden xl:flex absolute -right-12 top-1/2 -translate-y-1/2 rotate-90 origin-center items-center gap-3">
              <span className="w-8 h-px bg-champagne/40" />
              <span className="label-subtle text-[10px] text-stone tracking-[0.3em]">
                EDITION 2027
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
        <span className="label-subtle text-[9px] text-stone tracking-[0.28em]">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-champagne/70" />
        </motion.div>
      </div>

      {/* Video Promo Modal */}
      <AnimatePresence>
        {videoOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Pride Patna Marathon Video Promo"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVideoOpen(false)}
              className="absolute inset-0 bg-ink/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-graphite rounded-2xl border border-line overflow-hidden shadow-2xl z-10 p-2 sm:p-4"
            >
              <div className="flex items-center justify-between pb-3 px-2 border-b border-line mb-3">
                <span className="font-heading text-base tracking-wider uppercase text-ivory">
                  {MARATHON_META.event} • Official Preview
                </span>
                <button
                  type="button"
                  onClick={() => setVideoOpen(false)}
                  className="p-1.5 rounded-lg text-stone hover:text-ivory hover:bg-ink transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-ink">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
                  title="Marathon promo video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

