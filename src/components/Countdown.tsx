"use client";

import { useState, useEffect } from "react";
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
    "Six races. Four cities. One unforgettable morning when all of Patna runs together — presented by Pride Patna Marathon.\nReporting: 04:30 AM IST\nVenue: JP Ganga Path, Vending Zone, Patna"
  )}&location=${encodeURIComponent("JP Ganga Path, Vending Zone, Patna")}`;

  const categoryBadges: Record<string, { badge: string; color: string; prize: string; btnClass: string }> = {
    "21k": {
      badge: "FLAGSHIP HALF MARATHON",
      color: "bg-volt text-black shadow-[0_0_15px_rgba(204,255,0,0.45)] font-extrabold",
      prize: "₹3,00,000 Winner Purse",
      btnClass: "btn-volt",
    },
    "10k": {
      badge: "SPEED CHALLENGE",
      color: "bg-sky-400 text-black shadow-[0_0_15px_rgba(56,189,248,0.4)] font-bold",
      prize: "₹1,50,000 Winner Purse",
      btnClass: "btn-ghost-luxury hover:bg-sky-400 hover:text-black hover:border-sky-400 hover:shadow-[0_10px_28px_-4px_rgba(0,0,0,0.6),0_0_28px_rgba(56,189,248,0.4)]",
    },
    "5k": {
      badge: "FITNESS & FAMILY",
      color: "bg-emerald-400 text-black shadow-[0_0_15px_rgba(52,211,153,0.4)] font-bold",
      prize: "All Finishers Medaled",
      btnClass: "btn-ghost-luxury hover:bg-emerald-400 hover:text-black hover:border-emerald-400 hover:shadow-[0_10px_28px_-4px_rgba(0,0,0,0.6),0_0_28px_rgba(52,211,153,0.4)]",
    },
  };

  return (
    <section id="races" className="relative w-full py-24 bg-ink border-t border-line/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Countdown Box with High-Energy Cyber Lighting & Dark Accent Glow */}
        <div className="relative mb-20">
          {/* Subtle Ambient Glow Behind Main Countdown Card */}
          <div className="absolute -inset-2 bg-volt/[0.05] rounded-xl blur-3xl pointer-events-none -z-10" />

          <div className="luxury-card p-6 sm:p-10 bg-gradient-to-br from-[#111827] via-[#0A0F1A] to-[#111827] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left label */}
              <div className="text-center lg:text-left">
                <span className="label-subtle text-volt flex items-center justify-center lg:justify-start gap-1.5 mb-2">
                  <Zap className="w-3.5 h-3.5 text-volt" />
                  OFFICIAL RACE DAY COUNTDOWN
                </span>
                <h2 className="font-heading text-4xl sm:text-5xl uppercase text-ivory tracking-tight">
                  {MARATHON_META.date}
                </h2>
                <p className="text-stone text-xs sm:text-sm mt-1">{MARATHON_META.venue}</p>

                {/* Prize purse pill */}
                <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded bg-blaze/15 border border-blaze/40 text-xs text-blaze font-bold font-numbers">
                  <Flame className="w-3.5 h-3.5 text-blaze" />
                  <span>₹25,00,000 Total Championship Prize Pool</span>
                </div>
              </div>

              {/* Countdown timer numbers - Sharp Edgy 8px athletic counters */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-3 text-stone">
                  <Clock className="w-3.5 h-3.5 text-volt" />
                  <span className="label-subtle text-[10px]">TIME TO FLAG-OFF</span>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center w-full max-w-md">
                  <div className="bg-[#0A0F1A]/90 rounded-lg p-2 sm:p-4 border border-white/[0.08] min-w-0 sm:min-w-[96px] shadow-lg">
                    <span className="font-numbers text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-ivory block leading-none font-extrabold">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="label-subtle text-[7.5px] sm:text-[9.5px] text-stone mt-1.5 sm:mt-2 block">
                      DAYS
                    </span>
                  </div>
                  <div className="bg-[#0A0F1A]/90 rounded-lg p-2 sm:p-4 border border-white/[0.08] min-w-0 sm:min-w-[96px] shadow-lg">
                    <span className="font-numbers text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-ivory block leading-none font-extrabold">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="label-subtle text-[7.5px] sm:text-[9.5px] text-stone mt-1.5 sm:mt-2 block">
                      HOURS
                    </span>
                  </div>
                  <div className="bg-[#0A0F1A]/90 rounded-lg p-2 sm:p-4 border border-white/[0.08] min-w-0 sm:min-w-[96px] shadow-lg">
                    <span className="font-numbers text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-ivory block leading-none font-extrabold">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="label-subtle text-[7.5px] sm:text-[9.5px] text-stone mt-1.5 sm:mt-2 block">
                      MINUTES
                    </span>
                  </div>
                  <div className="bg-[#0A0F1A]/90 rounded-lg p-2 sm:p-4 border border-volt/50 min-w-0 sm:min-w-[96px] shadow-[0_0_20px_rgba(204,255,0,0.18)] bg-volt/[0.06]">
                    <span className="font-numbers text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-volt block leading-none font-extrabold shadow-sm">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="label-subtle text-[7.5px] sm:text-[9.5px] text-volt font-bold mt-1.5 sm:mt-2 block">
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
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-ivory font-black">
            THREE CERTIFIED <span className="text-volt-gradient">RACES.</span>
          </h2>
          <p className="font-body text-stone text-base mt-4 leading-relaxed font-medium">
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
                className="relative group flex flex-col justify-between rounded-lg p-6 sm:p-7 bg-gradient-to-b from-[#111A2B]/85 to-[#0A0F1A]/95 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 shadow-xl"
              >
                {/* Subtle blurred dark glow behind card for atmospheric sports depth */}
                <div
                  className={`absolute -inset-1 rounded-lg blur-2xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none -z-10 ${
                    cat.code === "21k"
                      ? "bg-volt/45"
                      : cat.code === "10k"
                      ? "bg-sky-400/40"
                      : "bg-emerald-400/40"
                  }`}
                />

                {/* Floating Top Badge - Sharp 4px athletic cut */}
                <div
                  className={`absolute -top-3 left-6 text-[9.5px] font-bold uppercase tracking-widest px-3 py-0.5 rounded ${badgeMeta.color}`}
                >
                  {badgeMeta.badge}
                </div>

                <div>
                  <div className="flex items-start justify-between mb-4 mt-2">
                    <div>
                      <span className="font-numbers text-3xl font-extrabold block text-volt">
                        {cat.distance}
                      </span>
                      <h3 className="font-heading text-2xl uppercase text-ivory mt-1">
                        {cat.name}
                      </h3>
                    </div>
                    <span className="label-subtle text-[9px] bg-ink/90 px-2.5 py-1 rounded border border-white/[0.08] text-stone">
                      {cat.tagline}
                    </span>
                  </div>

                  {/* Pricing & Purse */}
                  <div className="my-4 pt-4 border-t border-white/[0.07]">
                    <div className="flex items-baseline justify-between">
                      <span className="font-numbers text-3xl sm:text-4xl font-extrabold text-ivory">
                        {cat.price}
                      </span>
                      <span className="text-[11px] font-bold flex items-center gap-1 text-volt">
                        <Award className="w-3.5 h-3.5" />
                        {badgeMeta.prize}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone mt-1 block">
                      Start {cat.startTime} • Strict Cutoff {cat.cutoffTime}
                    </span>
                  </div>

                  <p className="text-xs text-stone/90 leading-relaxed mb-6 font-body">
                    {cat.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <span className="label-subtle text-[9px] text-stone block mb-2">
                      ATHLETE INCLUSIONS:
                    </span>
                    {cat.inclusions.map((inc) => (
                      <div
                        key={inc}
                        className="flex items-center gap-2 text-xs text-ivory/85"
                      >
                        <Check className="w-3.5 h-3.5 text-volt shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#register"
                  onClick={() => onSelectCategory && onSelectCategory(cat)}
                  className={`w-full py-3.5 rounded-[4px] text-xs uppercase font-extrabold tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.04] ${badgeMeta.btnClass}`}
                >
                  <span>REGISTER NOW — {cat.distance}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
