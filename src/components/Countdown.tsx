"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Calendar, Check, ArrowRight, Trophy, Zap, Sparkles, Award, Flame } from "lucide-react";
import { CATEGORIES, MARATHON_META, MarathonCategory } from "@/data/marathon";

interface CountdownProps {
  onSelectCategory?: (category: MarathonCategory) => void;
}

export default function Countdown({ onSelectCategory }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(MARATHON_META.dateTimeISO).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Patna Runs Together - Pride Patna Marathon"
  )}&dates=20270206T233000Z/20270207T063000Z&details=${encodeURIComponent(
    "Three certified race categories (5KM, 10KM, 21KM). One unforgettable morning when all of Patna runs together — presented by Pride Patna Marathon.\nReporting: 04:30 AM IST\nVenue: JP Ganga Path, Vending Zone, Patna"
  )}&location=${encodeURIComponent("JP Ganga Path, Vending Zone, Patna")}`;

  const categoryBadges: Record<string, { badge: string; color: string; prize: string; btnClass: string }> = {
    "21k": {
      badge: "MOST POPULAR",
      color: "bg-[#CCFF00] text-black shadow-sm font-black",
      prize: "Timed Finisher Medal & Certificate",
      btnClass: "bg-[#CCFF00] hover:bg-[#b8e600] text-black font-extrabold shadow-sm",
    },
    "10k": {
      badge: "SPEED CHALLENGE",
      color: "bg-sky-500 text-white shadow-sm font-bold",
      prize: "Timed Finisher Medal & Certificate",
      btnClass: "bg-slate-900 hover:bg-black text-white font-extrabold shadow-sm",
    },
    "5k": {
      badge: "FITNESS & FAMILY",
      color: "bg-emerald-600 text-white shadow-sm font-bold",
      prize: "All Finishers Medaled",
      btnClass: "bg-slate-900 hover:bg-black text-white font-extrabold shadow-sm",
    },
  };

  return (
    <section id="races" className="relative w-full py-12 sm:py-20 lg:py-24 bg-ink border-t border-line/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Countdown Box with High-Energy Cyber Lighting & Dark Accent Glow */}
        <div className="relative mb-12 sm:mb-16 lg:mb-20">
          {/* Subtle Ambient Glow Behind Main Countdown Card */}
          <div className="absolute -inset-2 bg-volt/[0.05] rounded-xl blur-3xl pointer-events-none -z-10" />

          <div className="luxury-card p-4 sm:p-8 lg:p-10 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 shadow-xl transition-colors">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left label */}
              <div className="text-center lg:text-left">
                <span className="label-subtle text-emerald-600 dark:text-volt flex items-center justify-center lg:justify-start gap-1.5 mb-2 font-bold">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-volt" />
                  OFFICIAL RACE DAY COUNTDOWN
                </span>
                <h2 className="font-heading text-4xl sm:text-5xl uppercase text-slate-900 dark:text-white tracking-tight font-black">
                  {MARATHON_META.date}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 font-medium">{MARATHON_META.venue}</p>

                {/* Certified runners pill */}
                <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-700/50 text-xs text-emerald-700 dark:text-emerald-400 font-bold font-numbers">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>5,000+ Registered Athletes</span>
                </div>
              </div>

              {/* Countdown timer numbers - Sharp Edgy 8px athletic counters */}
              <div className="flex flex-col items-center shrink-0">
                <div className="flex items-center gap-2 mb-2.5 text-slate-600 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-800 dark:text-volt" />
                  <span className="label-subtle text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-400 font-bold tracking-wider">
                    TIME TO FLAG-OFF
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center w-full max-w-[340px] xs:max-w-[380px] sm:max-w-md">
                  <div className="bg-slate-50 dark:bg-[#0D121C] rounded-lg px-2 py-2.5 sm:px-3.5 sm:py-3.5 border border-slate-200 dark:border-white/10 min-w-[62px] xs:min-w-[72px] sm:min-w-[80px] shadow-sm flex flex-col items-center justify-center">
                    <span className="font-numbers text-2xl xs:text-3xl sm:text-3xl xl:text-4xl text-slate-900 dark:text-white block leading-none font-black tracking-tight whitespace-nowrap tabular-nums">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="label-subtle text-[7px] xs:text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 mt-1.5 block font-bold tracking-wider">
                      DAYS
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-[#0D121C] rounded-lg px-2 py-2.5 sm:px-3.5 sm:py-3.5 border border-slate-200 dark:border-white/10 min-w-[62px] xs:min-w-[72px] sm:min-w-[80px] shadow-sm flex flex-col items-center justify-center">
                    <span className="font-numbers text-2xl xs:text-3xl sm:text-3xl xl:text-4xl text-slate-900 dark:text-white block leading-none font-black tracking-tight whitespace-nowrap tabular-nums">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="label-subtle text-[7px] xs:text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 mt-1.5 block font-bold tracking-wider">
                      HOURS
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-[#0D121C] rounded-lg px-2 py-2.5 sm:px-3.5 sm:py-3.5 border border-slate-200 dark:border-white/10 min-w-[62px] xs:min-w-[72px] sm:min-w-[80px] shadow-sm flex flex-col items-center justify-center">
                    <span className="font-numbers text-2xl xs:text-3xl sm:text-3xl xl:text-4xl text-slate-900 dark:text-white block leading-none font-black tracking-tight whitespace-nowrap tabular-nums">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="label-subtle text-[7px] xs:text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 mt-1.5 block font-bold tracking-wider">
                      MINUTES
                    </span>
                  </div>
                  <div className="bg-volt/20 dark:bg-volt/10 rounded-lg px-2 py-2.5 sm:px-3.5 sm:py-3.5 border border-volt/80 dark:border-volt/50 min-w-[62px] xs:min-w-[72px] sm:min-w-[80px] shadow-sm flex flex-col items-center justify-center">
                    <span className="font-numbers text-2xl xs:text-3xl sm:text-3xl xl:text-4xl text-slate-900 dark:text-volt block leading-none font-black tracking-tight whitespace-nowrap tabular-nums">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="label-subtle text-[7px] xs:text-[8px] sm:text-[9px] text-slate-900 dark:text-volt font-black mt-1.5 block tracking-wider">
                      SECONDS
                    </span>
                  </div>
                </div>
              </div>

              {/* Calendar CTA */}
              <div className="flex flex-col gap-3">
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-luxury text-xs uppercase tracking-wider py-3.5 px-6 text-center flex items-center justify-center gap-2 group hover:border-volt hover:text-volt"
                >
                  <Calendar className="w-4 h-4 text-volt group-hover:scale-110 transition-transform" />
                  <span>Add to Google Calendar</span>
                </a>
                <span className="text-[11px] text-stone text-center font-medium">
                  Reporting: 04:30 AM IST • JP Ganga Path Vending Zone
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-volt" />
            <span className="label-subtle text-volt">CHOOSE YOUR DISTANCE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-ivory font-extrabold">
            THREE CERTIFIED <span className="text-volt-gradient">RACES.</span>
          </h2>
          <p className="font-body text-stone text-sm sm:text-base mt-4 leading-relaxed font-medium">
            From first-time 5K sprinters to dedicated half marathon athletes, test your limits on Patna’s fastest AIMS-certified flat asphalt.
          </p>
        </div>

        {/* Categories Grid - Elevated Seamless athletic cards with subtle background difference and dark accent glow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {CATEGORIES.map((cat, idx) => {
            const badgeMeta = categoryBadges[cat.code] || {
              badge: "CERTIFIED",
              color: "bg-ink text-stone",
              prize: "Medal Included",
              btnClass: "btn-ghost-luxury",
            };

            return (
              <motion.div
                key={cat.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group flex flex-col justify-between rounded-lg p-6 sm:p-7 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-volt/50 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                {/* Subtle blurred dark glow behind card for atmospheric sports depth */}
                <div
                  className={`absolute -inset-1 rounded-lg blur-2xl opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none -z-10 ${
                    cat.code === "21k"
                      ? "bg-volt/45"
                      : cat.code === "10k"
                      ? "bg-sky-400/40"
                      : "bg-emerald-400/40"
                  }`}
                />

                {/* Floating Top Badge - Sharp 4px athletic cut */}
                <div
                  className={`absolute -top-3 left-6 text-[9.5px] font-bold uppercase tracking-widest px-3 py-0.5 rounded shadow-sm ${badgeMeta.color}`}
                >
                  {badgeMeta.badge}
                </div>

                <div>
                  <div className="flex items-start justify-between mb-4 mt-2">
                    <div>
                      <span className="font-numbers text-3xl font-black block text-slate-900 dark:text-white">
                        {cat.distance}
                      </span>
                      <h3 className="font-heading text-2xl uppercase text-slate-900 dark:text-white mt-1 font-black">
                        {cat.name.replace(/^[0-9.]+\s*k\s*/i, "")}
                      </h3>
                    </div>
                    <span className="label-subtle text-[9px] bg-slate-100 dark:bg-white/10 px-2.5 py-1 rounded border border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-300 font-bold">
                      {cat.tagline}
                    </span>
                  </div>

                  {/* Pricing & Purse */}
                  <div className="my-4 pt-4 border-t border-slate-100 dark:border-white/10">
                    <div className="flex items-baseline justify-between">
                      <span className="font-numbers text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                        {cat.price}
                      </span>
                      <span className="text-[11px] font-bold flex items-center gap-1 text-emerald-700 dark:text-volt">
                        <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-volt" />
                        {badgeMeta.prize}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block font-medium">
                      Start {cat.startTime} • Strict Cutoff {cat.cutoffTime}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-body font-medium">
                    {cat.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <span className="label-subtle text-[9px] text-slate-500 dark:text-slate-400 block mb-2 font-bold">
                      ATHLETE INCLUSIONS:
                    </span>
                    {cat.inclusions.map((inc) => (
                      <div
                        key={inc}
                        className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-volt shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <a
                    href="#register"
                    onClick={() => onSelectCategory && onSelectCategory(cat)}
                    className={`w-full py-3 rounded-[4px] text-xs uppercase font-extrabold tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] ${badgeMeta.btnClass}`}
                  >
                    <span>REGISTER NOW — {cat.distance}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href={`/races?cat=${cat.code}`}
                    className="text-center text-[11px] font-heading uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-volt py-1 font-bold transition-colors"
                  >
                    View {cat.distance} Route &amp; Kit Details →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Races Architecture */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/races"
            className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-volt font-bold py-2.5 px-5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-volt/50 transition-all shadow-sm"
          >
            <span>EXPLORE FULL RACE ARCHITECTURE &amp; PACER LAB</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-volt" />
          </Link>
        </div>
      </div>
    </section>
  );
}
