"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  X,
  FileText,
  ShieldCheck,
  Scale,
  Zap,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import { MARATHON_META, NAV_LINKS } from "@/data/marathon";

type ModalType = "terms" | "privacy" | "rules" | null;

export default function Footer() {
  const [modalType, setModalType] = useState<ModalType>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalType(null);
    };
    if (modalType) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [modalType]);

  return (
    <footer id="contact" className="relative w-full bg-slate-100 dark:bg-[#070A0F] text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-white/10 pt-8 sm:pt-10 pb-5 sm:pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 pb-6 sm:pb-8 border-b border-slate-200 dark:border-white/10">
          {/* Brand info */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-3 group">
                <Image
                  src="/pride-patna-marathon-logo-cropped.png"
                  alt="Pride Patna Marathon Logo"
                  width={200}
                  height={85}
                  className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_2px_12px_rgba(204,255,0,0.2)] group-hover:scale-105 transition-transform"
                />
              </Link>
              <div className="text-[10px] sm:text-xs font-heading font-extrabold uppercase tracking-widest text-emerald-700 dark:text-volt mb-2">
                7 FEB 2027 • JP GANGA PATH, VENDING ZONE
              </div>
              <p className="font-body text-slate-600 dark:text-slate-400 text-xs leading-relaxed max-w-sm mb-3 font-medium">
                Bihar&apos;s premier community distance-running event uniting elite marathoners, civic pioneers, and families on the banks of the Ganges.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href={MARATHON_META.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white dark:bg-[#182438] border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white hover:border-slate-400 dark:hover:border-volt/40 transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={MARATHON_META.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white dark:bg-[#182438] border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white hover:border-slate-400 dark:hover:border-volt/40 transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={MARATHON_META.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white dark:bg-[#182438] border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white hover:border-slate-400 dark:hover:border-volt/40 transition-colors shadow-sm"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={MARATHON_META.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white dark:bg-[#182438] border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white hover:border-slate-400 dark:hover:border-volt/40 transition-colors shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (2 Compact Columns) */}
          <div className="md:col-span-3">
            <span className="label-subtle text-slate-900 dark:text-white block mb-2 font-bold text-[10px] tracking-widest uppercase">
              QUICK NAVIGATION
            </span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-medium">
              <Link href="/" className="hover:text-emerald-700 dark:hover:text-volt transition-colors">
                Home
              </Link>
              <Link href="/about" className="hover:text-emerald-700 dark:hover:text-volt transition-colors">
                About Us
              </Link>
              <Link href="/races" className="hover:text-emerald-700 dark:hover:text-volt transition-colors">
                Race Categories
              </Link>
              <Link href="/route" className="hover:text-emerald-700 dark:hover:text-volt transition-colors">
                Course Map
              </Link>
              <Link href="/schedule" className="hover:text-emerald-700 dark:hover:text-volt transition-colors">
                Timeline
              </Link>
              <Link href="/gallery" className="hover:text-emerald-700 dark:hover:text-volt transition-colors">
                Media Gallery
              </Link>
              <Link href="/contact" className="hover:text-emerald-700 dark:hover:text-volt transition-colors">
                Contact &amp; FAQ
              </Link>
              <Link href="/#register" className="text-emerald-700 dark:text-volt font-bold hover:underline">
                Register Now
              </Link>
            </div>
          </div>

          {/* Event Secretariat */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="label-subtle text-slate-900 dark:text-white block mb-2 font-bold text-[10px] tracking-widest uppercase">
                EVENT SECRETARIAT
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-volt shrink-0 mt-0.5" />
                  <span className="truncate">{MARATHON_META.venue}, Patna</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-volt shrink-0" />
                  <a
                    href={`mailto:${MARATHON_META.contact.email}`}
                    className="hover:text-volt transition-colors font-medium truncate"
                  >
                    {MARATHON_META.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blaze shrink-0" />
                  <a
                    href={`tel:${MARATHON_META.contact.phone.replace(/\s+/g, "")}`}
                    className="hover:text-blaze transition-colors font-medium"
                  >
                    {MARATHON_META.contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Compact Emergency Hotline Pill */}
            <div className="mt-3 px-3 py-2 rounded-md bg-white dark:bg-[#111827] border border-orange-200 dark:border-orange-500/30 shadow-sm flex items-center justify-between">
              <span className="label-subtle text-[9px] text-orange-600 dark:text-orange-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                EMERGENCY HOTLINE
              </span>
              <span className="font-numbers text-sm font-black text-slate-900 dark:text-white">
                {MARATHON_META.contact.tollFree}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <p>© 2027 Pride Patna Marathon. All Rights Reserved.</p>
          <div className="flex items-center gap-4 sm:gap-5 text-[11px]">
            <Link
              href="/admin"
              className="text-emerald-700 dark:text-volt font-bold hover:underline inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
            <button
              type="button"
              onClick={() => setModalType("terms")}
              className="hover:text-slate-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Terms &amp; Conditions
            </button>
            <button
              type="button"
              onClick={() => setModalType("privacy")}
              className="hover:text-slate-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setModalType("rules")}
              className="hover:text-slate-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Race Regulations
            </button>
          </div>
        </div>
      </div>

      {/* Legal & Policy Modals */}
      <AnimatePresence>
        {modalType && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalType(null)}
              className="absolute inset-0"
            />
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#111827] rounded-lg border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl z-10 p-6 sm:p-8 max-h-[85vh] flex flex-col text-slate-900 dark:text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                <div className="flex items-center gap-2.5">
                  {modalType === "terms" && <Scale className="w-5 h-5 text-volt" />}
                  {modalType === "privacy" && <ShieldCheck className="w-5 h-5 text-volt" />}
                  {modalType === "rules" && <FileText className="w-5 h-5 text-volt" />}
                  <h3 className="font-heading text-2xl uppercase tracking-wide text-ivory">
                    {modalType === "terms" && "Terms & Conditions"}
                    {modalType === "privacy" && "Privacy & Athlete Data Policy"}
                    {modalType === "rules" && "Official Race Regulations"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="p-1.5 rounded-lg text-stone hover:text-ivory hover:bg-ink transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto space-y-4 text-xs sm:text-sm text-stone leading-relaxed pr-2 font-body">
                {modalType === "terms" && (
                  <>
                    <p className="text-ivory font-medium">
                      1. Registration &amp; Transfer Policy:
                    </p>
                    <p>
                      All registrations are strictly non-refundable and non-transferable to another individual under any circumstances, as chest bibs are encoded with participant medical info.
                    </p>
                    <p className="text-ivory font-medium">
                      2. Medical Deferral:
                    </p>
                    <p>
                      A one-time medical deferral to the 2028 edition is granted upon submission of a certified government medical practitioner certificate at least 10 calendar days prior to race day.
                    </p>
                    <p className="text-ivory font-medium">
                      3. Force Majeure &amp; Route Alterations:
                    </p>
                    <p>
                      The organizing committee reserves the right to adjust race routes, flag-off timings, or event logistics in response to adverse meteorological forecasts, civic guidelines, or public safety instructions.
                    </p>
                  </>
                )}

                {modalType === "privacy" && (
                  <>
                    <p className="text-ivory font-medium">
                      1. Information Collection:
                    </p>
                    <p>
                      We collect participant name, email, phone number, medical emergency contact, and timing data exclusively for the purpose of race verification, timing result publication, and emergency coordination.
                    </p>
                    <p className="text-ivory font-medium">
                      2. Real-Time Tracking &amp; WhatsApp Alerts:
                    </p>
                    <p>
                      Registered WhatsApp numbers will receive instant split timing notifications across 5 km checkpoints and downloadable finisher certificate links.
                    </p>
                    <p className="text-ivory font-medium">
                      3. Media &amp; Photography:
                    </p>
                    <p>
                      Event photographers document the route. By participating, you grant Pride Patna Marathon license to publish race imagery for non-commercial editorial archives.
                    </p>
                  </>
                )}

                {modalType === "rules" && (
                  <>
                    <p className="text-ivory font-medium">
                      1. Official Chest Bib &amp; RFID Timing Chip:
                    </p>
                    <p>
                      The official bib must remain clearly visible, pinned horizontally on the front chest of your running shirt throughout the race. Running with someone else&apos;s bib results in immediate disqualification.
                    </p>
                    <p className="text-ivory font-medium">
                      2. Cut-off Timings &amp; Course Closure:
                    </p>
                    <p>
                      Strict cut-off limits apply: Half Marathon (3 hrs 30 mins), 10K (2 hrs 00 mins), 5K (1 hr 15 mins). Runners behind the pace wagon will be transferred to course shuttles.
                    </p>
                    <p className="text-ivory font-medium">
                      3. Medical Discretion:
                    </p>
                    <p>
                      Apollo paramedical officers and race marshals possess absolute authority to withdraw any athlete displaying severe symptoms of heat exhaustion, cardiac fatigue, or distress.
                    </p>
                  </>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-line/60 flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="btn-volt text-xs uppercase tracking-wider py-2.5 px-6 font-extrabold"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
