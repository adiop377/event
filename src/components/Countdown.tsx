"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, Check, ArrowRight, Trophy, Zap, Sparkles, Award } from "lucide-react";
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
  )}&dates=20270213T233000Z/20270214T063000Z&details=${encodeURIComponent(
    "Six races. Four cities. One unforgettable morning when all of Patna runs together — presented by Pride Patna Marathon.\nReporting: 04:30 AM IST\nVenue: Gandhi Maidan, Patna"
  )}&location=${encodeURIComponent("Gandhi Maidan, Patna")}`;

  const categoryBadges: Record<string, { badge: string; color: string; prize: string }> = {
    "42k": {
      badge: "FLAGSHIP CHAMPIONSHIP",
      color: "bg-gradient-to-r from-amber-500 to-yellow-600 text-ink shadow-[0_0_15px_rgba(245,158,11,0.4)]",
      prize: "₹5,00,000 Winner Purse",
    },
    "21k": {
      badge: "MOST POPULAR",
      color: "bg-champagne text-ink shadow-[0_0_15px_rgba(223,178,105,0.4)]",
      prize: "₹3,00,000 Winner Purse",
    },
    "10k": {
      badge: "SPEED CHALLENGE",
      color: "bg-sky-500/90 text-ink shadow-[0_0_15px_rgba(14,165,233,0.4)]",
      prize: "₹1,50,000 Winner Purse",
    },
    "5k": {
      badge: "COMMUNITY & FAMILY",
      color: "bg-emerald-500/90 text-ink shadow-[0_0_15px_rgba(16,185,129,0.4)]",
      prize: "All Finishers Medaled",
    },
  };

  return (
    <section id="races" className="relative w-full py-24 bg-ink border-t border-line/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Countdown Box with Luxury Glow */}
        <div className="luxury-card p-6 sm:p-10 mb-20 bg-gradient-to-br from-graphite via-obsidian to-graphite border-champagne/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(223,178,105,0.12)]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left label */}
            <div className="text-center lg:text-left">
              <span className="label-subtle text-champagne flex items-center justify-center lg:justify-start gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-champagne" />
                OFFICIAL RACE DAY COUNTDOWN
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl uppercase text-ivory tracking-tight">
                {MARATHON_META.date}
              </h2>
              <p className="text-stone text-xs sm:text-sm mt-1">{MARATHON_META.venue}</p>

              {/* Prize purse pill */}
              <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-champagne/10 border border-champagne/30 text-xs text-champagne font-semibold font-numbers">
                <Trophy className="w-3.5 h-3.5 text-champagne" />
                <span>₹25,00,000 Total Championship Prize Pool</span>
              </div>
            </div>

            {/* Countdown timer numbers */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-3 text-stone">
                <Clock className="w-3.5 h-3.5 text-champagne" />
                <span className="label-subtle text-[10px]">TIME TO FLAG-OFF</span>
              </div>
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
                <div className="bg-ink/90 rounded-2xl p-3 sm:p-4 border border-line/80 min-w-[72px] sm:min-w-[96px] shadow-lg">
                  <span className="font-numbers text-3xl sm:text-4xl lg:text-5xl text-ivory block leading-none font-extrabold">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="label-subtle text-[8.5px] sm:text-[9.5px] text-stone mt-2 block">
                    DAYS
                  </span>
                </div>
                <div className="bg-ink/90 rounded-2xl p-3 sm:p-4 border border-line/80 min-w-[72px] sm:min-w-[96px] shadow-lg">
                  <span className="font-numbers text-3xl sm:text-4xl lg:text-5xl text-ivory block leading-none font-extrabold">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="label-subtle text-[8.5px] sm:text-[9.5px] text-stone mt-2 block">
                    HOURS
                  </span>
                </div>
                <div className="bg-ink/90 rounded-2xl p-3 sm:p-4 border border-line/80 min-w-[72px] sm:min-w-[96px] shadow-lg">
                  <span className="font-numbers text-3xl sm:text-4xl lg:text-5xl text-ivory block leading-none font-extrabold">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="label-subtle text-[8.5px] sm:text-[9.5px] text-stone mt-2 block">
                    MINUTES
                  </span>
                </div>
                <div className="bg-ink/90 rounded-2xl p-3 sm:p-4 border border-champagne/40 min-w-[72px] sm:min-w-[96px] shadow-lg bg-champagne/[0.05]">
                  <span className="font-numbers text-3xl sm:text-4xl lg:text-5xl text-champagne block leading-none font-extrabold">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="label-subtle text-[8.5px] sm:text-[9.5px] text-champagne/90 mt-2 block">
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
                className="btn-ghost-luxury text-xs uppercase tracking-wider py-3.5 px-6 text-center flex items-center justify-center gap-2 group hover:border-champagne"
              >
                <Calendar className="w-4 h-4 text-champagne group-hover:scale-110 transition-transform" />
                <span>Add to Google Calendar</span>
              </a>
              <span className="text-[11px] text-stone text-center">
                Reporting: 04:30 AM IST • Gate No. 1
              </span>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-champagne" />
            <span className="label-subtle text-champagne">CHOOSE YOUR DISTANCE</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory">
            FOUR CERTIFIED <span className="font-accent lowercase text-gold-gradient">races.</span>
          </h2>
          <p className="font-body text-stone text-base mt-4 leading-relaxed">
            From first-time 5K sprinters to seasoned marathon endurance titans, test your limits on Patna’s fastest AIMS-certified flat asphalt.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const badgeMeta = categoryBadges[cat.code] || {
              badge: "CERTIFIED",
              color: "bg-ink text-stone",
              prize: "Medal Included",
            };

            const isHighlighted = cat.code === "21k" || cat.code === "42k";

            return (
              <motion.div
                key={cat.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`luxury-card p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group ${
                  cat.code === "42k"
                    ? "border-champagne/50 shadow-[0_0_30px_rgba(223,178,105,0.18)]"
                    : cat.code === "21k"
                    ? "border-champagne/40"
                    : "border-line"
                }`}
              >
                {/* Floating Top Badge */}
                <div
                  className={`absolute -top-3 left-6 text-[9.5px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${badgeMeta.color}`}
                >
                  {badgeMeta.badge}
                </div>

                <div>
                  <div className="flex items-start justify-between mb-4 mt-2">
                    <div>
                      <span className="font-numbers text-3xl font-extrabold text-champagne block">
                        {cat.distance}
                      </span>
                      <h3 className="font-heading text-2xl uppercase text-ivory mt-1">
                        {cat.name}
                      </h3>
                    </div>
                    <span className="label-subtle text-[9px] bg-ink/80 px-2.5 py-1 rounded-full border border-line">
                      {cat.tagline}
                    </span>
                  </div>

                  {/* Pricing & Purse */}
                  <div className="my-4 pt-4 border-t border-line/60">
                    <div className="flex items-baseline justify-between">
                      <span className="font-numbers text-3xl sm:text-4xl font-extrabold text-ivory">
                        {cat.price}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        {badgeMeta.prize}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone mt-1 block">
                      Start {cat.startTime} • Strict Cutoff {cat.cutoffTime}
                    </span>
                  </div>

                  <p className="text-xs text-stone/90 leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <span className="label-subtle text-[9px] text-stone block mb-2">
                      ATHLETE INCLUSIONS:
                    </span>
                    {cat.inclusions.map((inc) => (
                      <div
                        key={inc}
                        className="flex items-center gap-2 text-xs text-ivory/80"
                      >
                        <Check className="w-3.5 h-3.5 text-champagne shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#register"
                  onClick={() => onSelectCategory && onSelectCategory(cat)}
                  className={`w-full py-3.5 rounded-full text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isHighlighted
                      ? "btn-champagne"
                      : "btn-ghost-luxury hover:bg-champagne hover:text-ink hover:border-champagne"
                  }`}
                >
                  <span>Register for {cat.distance}</span>
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
