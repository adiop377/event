"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Mail, Phone, Zap } from "lucide-react";
import { FAQS, MARATHON_META } from "@/data/marathon";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="relative w-full py-14 sm:py-24 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <HelpCircle className="w-4 h-4 text-volt" />
            <span className="label-subtle text-volt font-bold">ATHLETE BRIEFING</span>
          </div>
          <h2 className="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-ivory font-extrabold">
            FREQUENTLY ASKED <span className="text-volt-gradient">QUESTIONS.</span>
          </h2>
          <p className="font-body text-stone text-xs sm:text-base mt-2 sm:mt-4 leading-relaxed max-w-lg mx-auto font-medium">
            Everything you need to prepare for race weekend, bib verification, and timing regulations.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="luxury-card overflow-hidden transition-colors border-line"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-lg sm:text-xl uppercase tracking-wide text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-volt font-bold">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-md bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm font-body text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/10 font-medium">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Help Contact Banner */}
        <div className="mt-8 p-4 sm:p-5 rounded-lg bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-sm">
          <div>
            <h4 className="font-heading text-base uppercase text-slate-900 dark:text-white font-bold">Still have questions?</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Our race coordination desk is active 7 days a week.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={`mailto:${MARATHON_META.contact.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-[#182438] border border-slate-200 dark:border-white/15 text-xs text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-volt/40 transition-colors font-bold shadow-sm"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-volt" />
              <span>{MARATHON_META.contact.email}</span>
            </a>
            <a
              href={`tel:${MARATHON_META.contact.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-[#182438] border border-slate-200 dark:border-white/15 text-xs text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-volt/40 transition-colors font-bold shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-orange-600 dark:text-amber-400" />
              <span>{MARATHON_META.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
