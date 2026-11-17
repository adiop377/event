"use client";

import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Calendar, HelpCircle, ShieldAlert } from "lucide-react";
import { MARATHON_META } from "@/data/marathon";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-ink text-ivory flex flex-col selection:bg-volt selection:text-black">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-28 pb-10 sm:pt-36 sm:pb-14 bg-gradient-to-b from-[#111827] via-ink to-ink border-b border-line/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="label-subtle text-emerald-600 dark:text-volt flex items-center justify-center gap-1.5 mb-2 font-bold tracking-widest text-xs uppercase">
            <Mail className="w-4 h-4 text-emerald-600 dark:text-volt" />
            ATHLETE HELPDESK &amp; SECRETARIAT
          </span>
          <h1 className="font-heading text-3xl xs:text-4xl sm:text-6xl uppercase tracking-tight text-slate-900 dark:text-white font-extrabold">
            CONTACT &amp; <span className="text-volt-gradient">FAQ.</span>
          </h1>
          <p className="font-body text-slate-600 dark:text-slate-300 text-xs sm:text-base mt-3 leading-relaxed max-w-xl mx-auto font-medium">
            Reach out to our organizing team for bib distribution inquiries, corporate bulk entries, or medical corridor assistance.
          </p>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="py-12 bg-ink border-b border-line/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="luxury-card p-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-700/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-lg uppercase font-bold text-slate-900 dark:text-white">
                Helpline &amp; WhatsApp
              </h2>
              <p className="font-numbers text-base font-extrabold text-slate-900 dark:text-volt mt-1">
                {MARATHON_META.contact.phone}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Toll Free: {MARATHON_META.contact.tollFree}
              </p>
            </div>

            <div className="luxury-card p-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-700/50 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-lg uppercase font-bold text-slate-900 dark:text-white">
                Official Email
              </h2>
              <p className="font-numbers text-base font-extrabold text-slate-900 dark:text-white mt-1">
                {MARATHON_META.contact.email}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                24/7 Athlete response desk
              </p>
            </div>

            <div className="luxury-card p-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-xl shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-blaze/15 border border-orange-200 dark:border-blaze/40 flex items-center justify-center text-orange-600 dark:text-blaze mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-lg uppercase font-bold text-slate-900 dark:text-white">
                Race Venue &amp; Expo
              </h2>
              <p className="font-numbers text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-1">
                {MARATHON_META.contact.address}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Expo: {MARATHON_META.contact.expoDates}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FAQ />

      <Footer />
    </main>
  );
}
