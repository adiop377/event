"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, Check, ArrowRight, Trophy } from "lucide-react";
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

  return (
    <section id="races" className="relative w-full py-20 bg-ink border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Countdown Box */}
        <div className="luxury-card p-6 sm:p-10 mb-20 bg-graphite/80 backdrop-blur-xl border-champagne/20 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left label */}
            <div className="text-center lg:text-left">
              <span className="label-subtle text-champagne block mb-2">
                OFFICIAL RACE DAY
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl uppercase text-ivory tracking-tight">
                {MARATHON_META.date}
              </h2>
              <p className="text-stone text-sm mt-1">{MARATHON_META.venue}</p>
            </div>

            {/* Countdown timer numbers */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-3 text-stone">
                <Clock className="w-3.5 h-3.5 text-champagne" />
                <span className="label-subtle text-[10px]">TIME TO FLAG-OFF</span>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="bg-ink/80 rounded-xl p-3 sm:p-4 border border-line min-w-[70px] sm:min-w-[90px]">
                  <span className="font-numbers text-3xl sm:text-4xl text-ivory block leading-none">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="label-subtle text-[9px] text-stone mt-1.5 block">
                    DAYS
                  </span>
                </div>
                <div className="bg-ink/80 rounded-xl p-3 sm:p-4 border border-line min-w-[70px] sm:min-w-[90px]">
                  <span className="font-numbers text-3xl sm:text-4xl text-ivory block leading-none">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="label-subtle text-[9px] text-stone mt-1.5 block">
                    HRS
                  </span>
                </div>
                <div className="bg-ink/80 rounded-xl p-3 sm:p-4 border border-line min-w-[70px] sm:min-w-[90px]">
                  <span className="font-numbers text-3xl sm:text-4xl text-ivory block leading-none">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="label-subtle text-[9px] text-stone mt-1.5 block">
                    MINS
                  </span>
                </div>
                <div className="bg-ink/80 rounded-xl p-3 sm:p-4 border border-line min-w-[70px] sm:min-w-[90px]">
                  <span className="font-numbers text-3xl sm:text-4xl text-champagne block leading-none">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="label-subtle text-[9px] text-stone mt-1.5 block">
                    SECS
                  </span>
                </div>
              </div>
            </div>

            {/* Calendar CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-luxury text-xs uppercase tracking-wider py-3 px-5 text-center flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-champagne" />
                <span>Add to Google Calendar</span>
              </a>
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
            FOUR CERTIFIED <span className="font-accent lowercase text-champagne">races.</span>
          </h2>
          <p className="font-body text-stone text-base mt-4">
            From beginners to seasoned endurance champions, choose your challenge along
            Patna’s historic avenues and the serene Ganga waterfront.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="luxury-card p-6 flex flex-col justify-between hover:border-champagne/40 transition-all duration-300 relative group"
            >
              {/* Highlight ribbon for 21K */}
              {cat.code === "21k" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-champagne text-ink text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md">
                  MOST POPULAR
                </div>
              )}

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="font-numbers text-2xl font-bold text-champagne block">
                      {cat.distance}
                    </span>
                    <h3 className="font-heading text-xl uppercase text-ivory mt-1">
                      {cat.name}
                    </h3>
                  </div>
                  <span className="label-subtle text-[9px] bg-ink/70 px-2.5 py-1 rounded-full border border-line">
                    {cat.tagline}
                  </span>
                </div>

                <div className="my-4 pt-4 border-t border-line/60">
                  <span className="font-numbers text-3xl font-extrabold text-ivory block">
                    {cat.price}
                  </span>
                  <span className="text-[11px] text-stone mt-0.5 block">
                    Starting {cat.startTime} • Cutoff {cat.cutoffTime}
                  </span>
                </div>

                <p className="text-xs text-stone/90 leading-relaxed mb-6">
                  {cat.description}
                </p>

                <div className="space-y-2 mb-6">
                  <span className="label-subtle text-[9px] text-stone block mb-2">
                    INCLUSIONS:
                  </span>
                  {cat.inclusions.slice(0, 4).map((inc) => (
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
                className={`w-full py-3 rounded-full text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all ${
                  cat.code === "21k"
                    ? "btn-champagne"
                    : "btn-ghost-luxury hover:bg-champagne hover:text-ink hover:border-champagne"
                }`}
              >
                <span>Register for {cat.distance}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

