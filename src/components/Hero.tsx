"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, ChevronDown, X, Zap, Trophy, ShieldCheck, MapPin, Flame, Sparkles, Film } from "lucide-react";
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
      className="relative min-h-[90vh] w-full flex items-center justify-center pt-20 pb-10 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 overflow-hidden bg-ink"
    >
      {/* High-Energy Cyber-Athletic Ambient Lights */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-volt/[0.07] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-blaze/[0.08] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-[350px] h-[350px] bg-sky-500/[0.05] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Headline & Info */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Top pill with glowing pulse - Sharp 4px Corner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 sm:gap-3 w-fit mb-4 sm:mb-6 px-3 py-1.5 sm:px-4 sm:py-2 rounded-[4px] bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 shadow-sm"
            >
              <span className="label-subtle text-[8px] xs:text-[9.5px] sm:text-[10px] text-slate-800 dark:text-slate-200 font-extrabold tracking-[0.14em] sm:tracking-[0.2em] flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blaze" />
                PRIDE PATNA MARATHON 2027
              </span>
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-300 dark:bg-white/20 shrink-0" />
              <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[8.5px] xs:text-[10px] font-bold text-blaze tracking-wider uppercase whitespace-nowrap">
                <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blaze animate-pulse" />
                REGISTRATIONS LIVE
              </span>
            </motion.div>

            {/* Oversized High-Impact Athletic Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-tight text-ivory leading-[1.0] sm:leading-[0.92] font-extrabold"
            >
              EVERY MILE
              <br />
              <span className="text-volt-gradient drop-shadow-[0_0_20px_rgba(204,255,0,0.22)]">
                MATTERS.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-body text-stone text-xs sm:text-base md:text-lg max-w-xl mt-3 sm:mt-5 leading-relaxed text-stone/90"
            >
              Three certified race categories (5KM, 10KM, 21KM). One unforgettable morning when all of Patna runs together along the sacred Ganges — presented by Pride Patna Marathon. Join 5,000+ runners on 7 Feb 2027.
            </motion.p>

            {/* High-Impact CTAs - Side-by-side on mobile, elegant & compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-row items-center gap-2.5 sm:gap-4 mt-5 sm:mt-8 w-full sm:w-auto"
            >
              <a
                href="#register"
                className="btn-volt text-xs sm:text-sm uppercase tracking-wider group !py-3 !px-4 sm:!py-4 sm:!px-9 rounded-[4px] font-extrabold hover:scale-105 transition-all duration-300 flex-1 sm:flex-initial text-center justify-center whitespace-nowrap shadow-md"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="btn-ghost-luxury text-xs sm:text-sm !py-2.5 !px-3 sm:!py-3.5 sm:!px-7 group relative rounded-[4px] font-bold hover:scale-105 transition-all duration-300 flex-1 sm:flex-initial text-center justify-center whitespace-nowrap"
                aria-label="Watch race preview promo video"
              >
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded bg-volt/15 border border-volt/35 flex items-center justify-center text-volt group-hover:scale-110 transition-transform shrink-0">
                  <Play className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current ml-0.5 text-volt" />
                </div>
                <span>Watch promo</span>
              </button>
            </motion.div>

            {/* Stat Counter Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 sm:mt-12 pt-4 sm:pt-8 border-t border-line/60 flex items-center flex-wrap gap-4 sm:gap-8 lg:gap-10 text-xs text-stone"
            >
              <div>
                <p className="label-subtle mb-0.5 sm:mb-1 text-[8px] sm:text-[10px]">DATE</p>
                <p className="font-numbers text-xs xs:text-sm sm:text-lg text-ivory tracking-wide font-extrabold">
                  {MARATHON_META.date}
                </p>
              </div>
              <div className="w-px h-7 sm:h-8 bg-line" />
              <div>
                <p className="label-subtle mb-0.5 sm:mb-1 text-[8px] sm:text-[10px]">VENUE</p>
                <p className="font-numbers text-xs xs:text-sm sm:text-lg text-ivory tracking-wide font-extrabold">
                  {MARATHON_META.venue}
                </p>
              </div>
              <div className="w-px h-7 sm:h-8 bg-line" />
              <div>
                <p className="label-subtle mb-0.5 sm:mb-1 text-[8px] sm:text-[10px]">RUNNERS</p>
                <p className="font-numbers text-xs xs:text-sm sm:text-lg text-emerald-700 dark:text-emerald-400 tracking-wide font-extrabold flex items-center gap-1">
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  {MARATHON_META.stats.runnersCount}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Image with Cyber Volt & Orange Track Ribbon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center lg:justify-end mt-6 sm:mt-10 lg:mt-0"
          >
            {/* Glowing Dual Electric Track Ribbon SVG */}
            <svg
              className="absolute -inset-10 w-[125%] h-[125%] pointer-events-none z-0 overflow-visible"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="cyberRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#FF5722" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#CCFF00" stopOpacity="0.2" />
                </linearGradient>
                <filter id="ribbonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <motion.path
                d="M 40,420 C 120,380 200,450 320,360 C 440,270 420,120 300,70 C 180,20 120,160 210,240 C 300,320 460,260 480,180"
                stroke="url(#cyberRibbon)"
                strokeWidth="3"
                strokeDasharray="6 3"
                filter="url(#ribbonGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </svg>

            {/* Hero Athlete Image Card with Sharp Athletic Edges & Ambient Accent Glow */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto">
              {/* Subtle ambient dark glow behind athlete card */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-volt/25 via-blaze/20 to-transparent rounded-xl blur-3xl opacity-60 pointer-events-none -z-10" />

              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-lg overflow-hidden border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10 group bg-graphite">
                <Image
                  src="/images/marathon-hero-athlete.jpg"
                  alt="Professional marathon athlete sprinting across Patna bridge at sunrise"
                  fill
                  priority
                  unoptimized
                  className="object-cover object-center photo-grade transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle gradient overlays so pure text pops cleanly */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

                {/* Floating Top Badge - Clean text without background box */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 text-[10px] sm:text-xs font-semibold text-white/90 flex items-center gap-1.5 sm:gap-2 drop-shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-volt" />
                  <span className="tracking-wide">AFI &amp; AIMS Certified Fast Track</span>
                </div>

                {/* Floating Bottom Quote & Landmark Tag - Clean text without background box */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex items-end justify-between gap-3 sm:gap-4">
                  <div className="drop-shadow-md">
                    <span className="label-subtle text-[7.5px] sm:text-[8.5px] text-white/75 block font-bold tracking-wider">EVENT MOTTO</span>
                    <span className="font-heading text-sm sm:text-lg text-blaze font-bold tracking-wider uppercase">
                      “{MARATHON_META.event}”
                    </span>
                  </div>

                  <div className="text-right drop-shadow-md">
                    <span className="label-subtle text-[7.5px] sm:text-[8.5px] text-white/75 block font-bold tracking-wider">CORRIDOR</span>
                    <span className="font-numbers text-[11px] sm:text-sm text-white font-bold flex items-center justify-end gap-1">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-volt" />
                      Ganga Waterfront
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side vertical badge */}
            <div className="hidden xl:flex absolute -right-12 top-1/2 -translate-y-1/2 rotate-90 origin-center items-center gap-3">
              <span className="w-8 h-px bg-volt/50" />
              <span className="label-subtle text-[10px] text-stone tracking-[0.3em]">
                EDITION 2027
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
        <span className="label-subtle text-[9px] text-stone tracking-[0.28em]">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-volt/80" />
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#111827] rounded-lg border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl z-10 p-2 sm:p-4"
            >
              <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-200 dark:border-white/10 mb-3">
                <span className="font-heading text-base tracking-wider uppercase text-slate-900 dark:text-white font-bold">
                  {MARATHON_META.event} • Official Preview
                </span>
                <button
                  type="button"
                  onClick={() => setVideoOpen(false)}
                  className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative aspect-video w-full rounded-md overflow-hidden bg-slate-50 dark:bg-[#070A0F] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center p-6 sm:p-10">
                {/* Background ambient lighting */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-volt/25 via-slate-50 dark:via-[#070A0F] to-transparent pointer-events-none" />

                <div className="relative z-10 max-w-md mx-auto space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-volt/20 border border-volt/60 flex items-center justify-center text-slate-900 dark:text-volt shadow-md">
                    <Film className="w-7 h-7 text-slate-900 dark:text-volt" />
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-volt/30 border border-volt/60 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-volt font-bold">
                    <span className="w-2 h-2 rounded-full bg-slate-900 dark:bg-volt animate-ping" />
                    Official Teaser Releasing Soon
                  </div>

                  <h3 className="font-heading text-lg sm:text-2xl text-slate-900 dark:text-white tracking-wide uppercase font-black">
                    Patna Runs Together
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    The official cinematic race promo for the 7 Feb 2027 edition at {MARATHON_META.venue} is currently in final production and will premiere shortly.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href="#routes"
                      onClick={() => setVideoOpen(false)}
                      className="btn-volt !py-2.5 !px-5 text-xs font-bold rounded shadow-sm"
                    >
                      EXPLORE RACE ROUTES
                    </a>
                    <button
                      type="button"
                      onClick={() => setVideoOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
