"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, ChevronDown, X, Zap, Trophy, ShieldCheck, MapPin, Flame } from "lucide-react";
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
      className="relative min-h-[92vh] w-full flex items-center justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-ink"
    >
      {/* High-Energy Cyber-Athletic Ambient Lights */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-volt/[0.07] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-blaze/[0.08] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-[350px] h-[350px] bg-sky-500/[0.05] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Info */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Top pill with glowing pulse */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 w-fit mb-6 px-4 py-2 rounded-full bg-graphite/90 border border-volt/35 backdrop-blur-xl shadow-[0_0_20px_rgba(204,255,0,0.18)]"
            >
              <span className="label-subtle text-[9.5px] sm:text-[10px] text-volt font-bold tracking-[0.2em] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-volt" />
                PRIDE PATNA MARATHON 2027
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-stone/40" />
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blaze tracking-wider uppercase">
                <Flame className="w-3 h-3 text-blaze animate-pulse" />
                REGISTRATIONS LIVE
              </span>
            </motion.div>

            {/* Oversized High-Impact Athletic Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-7xl sm:text-8xl md:text-9xl xl:text-[9.5rem] 2xl:text-[10.5rem] uppercase tracking-tight text-ivory leading-[0.88] font-black"
            >
              EVERY MILE
              <br />
              <span className="text-volt-gradient drop-shadow-[0_0_35px_rgba(204,255,0,0.35)]">
                MATTERS.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-body text-stone text-base sm:text-lg md:text-xl max-w-xl mt-6 leading-relaxed"
            >
              Six races. Four cities. One unforgettable morning when all of Patna runs together along the sacred Ganges — presented by Pride Patna Marathon. Join 50,000+ runners on 14 Feb 2027.
            </motion.p>

            {/* High-Impact CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <a
                href="#register"
                className="btn-volt text-xs sm:text-sm uppercase tracking-wider group !py-4 !px-9 shadow-[0_0_25px_rgba(204,255,0,0.35)]"
              >
                <span>Reserve your bib</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="btn-ghost-luxury text-xs sm:text-sm !py-3.5 !px-7 group relative"
                aria-label="Watch race preview promo video"
              >
                <div className="w-7 h-7 rounded-full bg-volt/15 border border-volt/35 flex items-center justify-center text-volt group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-volt" />
                </div>
                <span>Watch promo</span>
              </button>
            </motion.div>

            {/* Stat Counter Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-line/80 flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-stone"
            >
              <div>
                <p className="label-subtle mb-1">DATE</p>
                <p className="font-numbers text-base sm:text-lg text-ivory tracking-wide font-extrabold">
                  {MARATHON_META.date}
                </p>
              </div>
              <div className="w-px h-8 bg-line" />
              <div>
                <p className="label-subtle mb-1">VENUE</p>
                <p className="font-numbers text-base sm:text-lg text-ivory tracking-wide font-extrabold">
                  {MARATHON_META.venue}
                </p>
              </div>
              <div className="w-px h-8 bg-line" />
              <div>
                <p className="label-subtle mb-1">RUNNERS</p>
                <p className="font-numbers text-base sm:text-lg text-volt tracking-wide font-extrabold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  {MARATHON_META.stats.runnersCount}
                </p>
              </div>
              <div className="w-px h-8 bg-line" />
              <div>
                <p className="label-subtle mb-1">PRIZE POOL</p>
                <p className="font-numbers text-base sm:text-lg text-blaze tracking-wide font-extrabold flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  ₹25,00,000
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Image with Cyber Volt & Orange Track Ribbon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center lg:justify-end"
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

            {/* Hero Athlete Image Card */}
            <div className="relative w-full max-w-md lg:max-w-none aspect-[3/4] sm:aspect-[4/5] rounded-[28px] overflow-hidden border border-volt/35 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(204,255,0,0.18)] z-10 group bg-graphite">
              <Image
                src="/images/marathon-hero-athlete.jpg"
                alt="Professional marathon athlete sprinting across Patna bridge at sunrise"
                fill
                priority
                unoptimized
                className="object-cover object-center photo-grade transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink via-ink/50 to-transparent pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="absolute top-5 left-5 z-20 bg-graphite/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-volt/40 text-xs font-bold text-ivory flex items-center gap-2 shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-volt" />
                <span>AFI &amp; AIMS Certified Fast Track</span>
              </div>

              {/* Floating Bottom Quote & Landmark Tag */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
                <div className="bg-graphite/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-blaze/40 shadow-lg">
                  <span className="label-subtle text-[8.5px] text-stone block">EVENT MOTTO</span>
                  <span className="font-heading text-sm sm:text-base text-blaze font-black tracking-wider uppercase">
                    “{MARATHON_META.event}”
                  </span>
                </div>

                <div className="bg-graphite/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-line text-right">
                  <span className="label-subtle text-[8.5px] text-stone block">CORRIDOR</span>
                  <span className="font-numbers text-xs text-ivory font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-volt" />
                    Ganga Waterfront
                  </span>
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
                  className="p-1.5 rounded-lg text-stone hover:text-ivory hover:bg-ink transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
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
