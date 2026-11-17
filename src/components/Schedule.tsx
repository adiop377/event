"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Calendar, Bell, Flame, Zap } from "lucide-react";
import { SCHEDULE } from "@/data/marathon";

export default function Schedule() {
  const getBadgeStyle = (cat?: string) => {
    if (cat === "21K") return "bg-volt/20 text-volt border-volt/40";
    if (cat === "10K") return "bg-sky-400/20 text-sky-400 border-sky-400/40";
    if (cat === "5K") return "bg-emerald-400/20 text-emerald-400 border-emerald-400/40";
    return "bg-volt/15 text-volt border-volt/30";
  };

  return (
    <section id="schedule" className="relative w-full py-14 sm:py-24 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span className="label-subtle text-emerald-700 font-bold">RACE MORNING ITINERARY</span>
          </div>
          <h2 className="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-slate-900 dark:text-white font-extrabold">
            RACE DAY <span className="text-emerald-600 dark:text-volt">SCHEDULE.</span>
          </h2>
          <p className="font-body text-slate-600 dark:text-slate-300 text-xs sm:text-base mt-2 sm:mt-4 leading-relaxed font-medium">
            All waves depart strictly on schedule from JP Ganga Path, Vending Zone. Please arrive at least 45 minutes prior to your category flag-off for baggage deposit and corral staging.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-4 sm:ml-32 space-y-8">
          {SCHEDULE.map((event, idx) => (
            <motion.div
              key={event.time + event.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Timeline marker node */}
              <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-white dark:bg-[#070A0F] border-2 border-emerald-600 dark:border-volt group-hover:bg-emerald-600 dark:group-hover:bg-volt transition-all shadow-sm" />

              {/* Time pill (on desktop shows to the left of the line) */}
              <div className="sm:absolute sm:-left-32 sm:top-3.5 sm:w-24 sm:text-right">
                <span className="font-numbers text-sm font-black tracking-wider text-slate-900 dark:text-white">
                  {event.time}
                </span>
              </div>

              {/* Event Card */}
              <div className="luxury-card p-5 sm:p-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 shadow-md hover:border-slate-300 dark:hover:border-volt/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="font-heading text-xl sm:text-2xl uppercase tracking-wide text-slate-900 dark:text-white font-bold">
                    {event.title}
                  </h3>
                  {event.category && (
                    <span className={`label-subtle text-[9px] border px-2.5 py-0.5 rounded font-bold ${getBadgeStyle(event.category)}`}>
                      {event.category}
                    </span>
                  )}
                </div>

                <p className="font-body text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 font-medium">
                  {event.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-volt" />
                  <span>{event.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
