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
    <footer id="contact" className="relative w-full bg-[#06090F] text-stone border-t border-line/70 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-line/50">
          {/* Brand info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="#hero" className="flex items-center gap-3 mb-6 group">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-volt/40 p-1 bg-graphite flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.2)]">
                  <Image
                    src="/pride-patna-marathon-logo-cropped.png"
                    alt="Pride Patna Marathon Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-xl tracking-wider text-ivory group-hover:text-volt transition-colors">
                    PRIDE PATNA MARATHON
                  </span>
                  <span className="label-subtle text-[9px] tracking-[0.25em] text-volt font-bold">
                    7 FEB 2027 • JP GANGA PATH, VENDING ZONE
                  </span>
                </div>
              </Link>
              <p className="font-body text-stone text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
                Bihar&apos;s premier community distance-running event uniting elite marathoners, civic pioneers, and families on the banks of the Ganges.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={MARATHON_META.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-graphite border border-line flex items-center justify-center text-stone hover:text-volt hover:border-volt transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={MARATHON_META.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-graphite border border-line flex items-center justify-center text-stone hover:text-volt hover:border-volt transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={MARATHON_META.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-graphite border border-line flex items-center justify-center text-stone hover:text-volt hover:border-volt transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={MARATHON_META.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-graphite border border-line flex items-center justify-center text-stone hover:text-volt hover:border-volt transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3">
            <span className="label-subtle text-ivory block mb-4 font-bold">QUICK NAVIGATION</span>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#hero" className="hover:text-volt transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-volt transition-colors">
                  Why Run With Us
                </a>
              </li>
              <li>
                <a href="#races" className="hover:text-volt transition-colors">
                  Race Distances &amp; Pricing
                </a>
              </li>
              <li>
                <a href="#route" className="hover:text-volt transition-colors">
                  Course Map &amp; Elevation
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-volt transition-colors">
                  Race Day Timeline
                </a>
              </li>
              <li>
                <a href="#kit" className="hover:text-volt transition-colors">
                  Athlete Kit &amp; Inclusions
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-volt transition-colors">
                  Archival Photo Gallery
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-volt transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Event Secretariat */}
          <div className="lg:col-span-4">
            <span className="label-subtle text-ivory block mb-4 font-bold">EVENT SECRETARIAT</span>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-volt shrink-0 mt-0.5" />
                <span>{MARATHON_META.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-volt shrink-0" />
                <a
                  href={`mailto:${MARATHON_META.contact.email}`}
                  className="hover:text-volt transition-colors font-medium"
                >
                  {MARATHON_META.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blaze shrink-0" />
                <a
                  href={`tel:${MARATHON_META.contact.phone.replace(/\s+/g, "")}`}
                  className="hover:text-blaze transition-colors font-medium"
                >
                  {MARATHON_META.contact.phone}
                </a>
              </div>
            </div>

            {/* Emergency Hotline Box - Sharp 8px & Subtle Elevation */}
            <div className="mt-6 p-4 rounded-lg bg-[#0A0F1A]/95 border border-blaze/35 shadow-[0_0_20px_rgba(255,87,34,0.12)]">
              <span className="label-subtle text-[9px] text-blaze block mb-1 font-bold flex items-center gap-1">
                <Flame className="w-3 h-3 text-blaze" />
                RACE DAY EMERGENCY HOTLINE
              </span>
              <span className="font-numbers text-lg font-extrabold text-ivory block">
                {MARATHON_META.contact.tollFree}
              </span>
              <span className="text-[10px] text-stone mt-0.5 block font-body">
                Dedicated Apollo cardiac &amp; trauma dispatch desk.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone">
          <p>© 2027 Pride Patna Marathon. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <button
              type="button"
              onClick={() => setModalType("terms")}
              className="hover:text-volt transition-colors underline-offset-4 hover:underline"
            >
              Terms &amp; Conditions
            </button>
            <button
              type="button"
              onClick={() => setModalType("privacy")}
              className="hover:text-volt transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setModalType("rules")}
              className="hover:text-volt transition-colors underline-offset-4 hover:underline"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/90 backdrop-blur-md"
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
              className="relative w-full max-w-2xl bg-graphite rounded-lg border border-white/10 overflow-hidden shadow-2xl z-10 p-6 sm:p-8 max-h-[85vh] flex flex-col"
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
                      Strict cut-off limits apply: Full Marathon (6 hrs 00 mins), Half Marathon (3 hrs 30 mins), 10K (2 hrs 00 mins), 5K (1 hr 15 mins). Runners behind the pace wagon will be transferred to course shuttles.
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
