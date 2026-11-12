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
    <section id="faq" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-volt" />
            <span className="label-subtle text-volt font-bold">ATHLETE BRIEFING</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-ivory font-black">
            FREQUENTLY ASKED <span className="text-volt-gradient">QUESTIONS.</span>
          </h2>
          <p className="font-body text-stone text-sm sm:text-base mt-4 leading-relaxed max-w-lg mx-auto">
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
                  <span className="font-heading text-lg sm:text-xl uppercase tracking-wide text-ivory group-hover:text-volt">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-ink flex items-center justify-center text-volt shrink-0 transition-transform duration-300 ${
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
                      <div className="px-6 pb-6 pt-1 text-sm font-body text-stone leading-relaxed border-t border-line/40">
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
        <div className="mt-12 p-6 rounded-2xl bg-graphite/90 border border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-heading text-lg uppercase text-ivory">Still have questions?</h4>
            <p className="text-xs text-stone mt-0.5">
              Our race coordination desk is active 7 days a week.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${MARATHON_META.contact.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink border border-line text-xs text-volt hover:border-volt transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{MARATHON_META.contact.email}</span>
            </a>
            <a
              href={`tel:${MARATHON_META.contact.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink border border-line text-xs text-blaze hover:border-blaze transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{MARATHON_META.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
