"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Calendar, Bell } from "lucide-react";
import { SCHEDULE } from "@/data/marathon";

export default function Schedule() {
  return (
    <section id="schedule" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-champagne" />
            <span className="label-subtle text-champagne">RACE MORNING ITINERARY</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory">
            RACE DAY <span className="font-accent lowercase text-champagne">schedule.</span>
          </h2>
          <p className="font-body text-stone text-sm sm:text-base mt-4 leading-relaxed">
            All waves depart strictly on schedule from Gandhi Maidan. Please arrive at least 45 minutes prior to your category flag-off for baggage deposit and corral staging.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-line/70 ml-4 sm:ml-32 space-y-8">
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
              <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-graphite border-2 border-champagne group-hover:scale-125 group-hover:bg-champagne transition-all" />

              {/* Time pill (on desktop shows to the left of the line) */}
              <div className="sm:absolute sm:-left-32 sm:top-3.5 sm:w-24 sm:text-right">
                <span className="font-numbers text-sm font-bold text-champagne tracking-wider">
                  {event.time}
                </span>
              </div>

              {/* Event Card */}
              <div className="luxury-card p-5 sm:p-6 bg-graphite/80 hover:border-champagne/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="font-heading text-xl sm:text-2xl uppercase tracking-wide text-ivory">
                    {event.title}
                  </h3>
                  {event.category && (
                    <span className="label-subtle text-[9px] bg-champagne/20 text-champagne border border-champagne/30 px-2 py-0.5 rounded-full font-bold">
                      {event.category}
                    </span>
                  )}
                </div>

                <p className="font-body text-stone text-xs sm:text-sm leading-relaxed mb-3">
                  {event.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-stone/80">
                  <MapPin className="w-3.5 h-3.5 text-champagne" />
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

