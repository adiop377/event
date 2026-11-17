"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Zap, ShieldCheck, AlertTriangle, Bell, Info } from "lucide-react";
import { NAV_LINKS, MARATHON_META } from "@/data/marathon";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveAlert, setLiveAlert] = useState<{
    active: boolean;
    type: "info" | "warning" | "alert";
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchStatus = () => {
      fetch("/api/event-status")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.emergencyAlert?.active) {
            setLiveAlert(data.emergencyAlert);
          } else {
            setLiveAlert(null);
          }
        })
        .catch(() => {});
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-[#070A0F]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          : "bg-white/90 dark:bg-[#070A0F]/90 backdrop-blur-md border-b border-slate-100 dark:border-white/10 py-4 sm:py-5"
      }`}
    >
      {/* Live Race Director Alert Broadcast Banner */}
      {liveAlert && (
        <div
          className={`px-3 py-1.5 text-center text-[11px] sm:text-xs font-heading uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 border-b mb-2 ${
            liveAlert.type === "alert"
              ? "bg-red-600 text-white border-red-700"
              : liveAlert.type === "warning"
              ? "bg-amber-400 text-black border-amber-500"
              : "bg-volt text-black border-[#b0dc00]"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-ping shrink-0" />
          <span className="truncate max-w-[90vw]">{liveAlert.message}</span>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Logo & Brand */}
          <Link href="#hero" className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-1">
            <div className="relative w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-slate-200 dark:border-white/20 p-1 bg-white dark:bg-[#111827] flex items-center justify-center shrink-0 shadow-sm group-hover:border-volt group-hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all">
              <Image
                src="/pride-patna-marathon-logo-cropped.png"
                alt="Pride Patna Marathon Logo"
                width={40}
                height={40}
                className="object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0 overflow-hidden">
              <span className="font-heading text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl tracking-wider text-slate-900 dark:text-white group-hover:text-black dark:group-hover:text-volt transition-colors font-extrabold truncate">
                PRIDE PATNA MARATHON
              </span>
              <span className="label-subtle text-[7px] xs:text-[7.5px] sm:text-[9px] tracking-[0.12em] sm:tracking-[0.22em] text-slate-600 dark:text-slate-400 font-bold flex items-center gap-1 sm:gap-1.5 truncate">
                <span>7 FEB 2027</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blaze shrink-0" />
                <span>JP GANGA PATH</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-heading uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors duration-200 relative group py-1 font-bold"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black dark:bg-volt transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Theme Toggle, CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            <ThemeToggle />

            {/* REGISTER NOW button: ONLY on desktop (lg:), never on mobile/tablet to avoid header clutter */}
            <div className="hidden lg:block">
              <a
                href="/#register"
                className="btn-volt inline-flex text-xs uppercase tracking-wider !py-2.5 !px-5 rounded-[4px] font-extrabold hover:scale-105 transition-all duration-300 shadow-md whitespace-nowrap"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 rounded-md text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-black dark:text-white" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Frosted Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 top-[60px] sm:top-[72px] bg-black/60 backdrop-blur-sm z-40"
              aria-hidden="true"
            />

            {/* Slide-down Drawer Panel directly attached beneath the header */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="lg:hidden absolute top-full left-0 right-0 z-50 bg-white dark:bg-[#0D121C] border-b border-slate-200 dark:border-white/10 shadow-2xl px-5 sm:px-8 py-6 max-h-[calc(100dvh-75px)] overflow-y-auto"
            >
              <nav className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-2">
                  <span className="text-xs font-heading uppercase tracking-wider text-slate-800 dark:text-slate-200 font-extrabold">
                    THEME MODE
                  </span>
                  <ThemeToggle />
                </div>

                {NAV_LINKS.map((link) => (
                  <div key={link.label} className="border-b border-slate-100 dark:border-white/10 last:border-b-0">
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-heading tracking-wider text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-volt uppercase py-3 px-2 rounded-md hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center justify-between font-bold"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Quick Category Badges under Races */}
                    {link.label === "Races" && (
                      <div className="flex items-center gap-2 pb-2.5 px-2">
                        <Link
                          href="/races?cat=21k"
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-2.5 py-1 rounded bg-[#CCFF00]/15 dark:bg-[#CCFF00]/10 border border-[#CCFF00]/40 text-[10px] font-heading font-extrabold text-slate-900 dark:text-volt hover:scale-105 transition-all"
                        >
                          21 KM HALF
                        </Link>
                        <Link
                          href="/races?cat=10k"
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-2.5 py-1 rounded bg-sky-500/15 dark:bg-sky-500/10 border border-sky-500/40 text-[10px] font-heading font-extrabold text-sky-700 dark:text-sky-300 hover:scale-105 transition-all"
                        >
                          10 KM SPEED
                        </Link>
                        <Link
                          href="/races?cat=5k"
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-2.5 py-1 rounded bg-emerald-500/15 dark:bg-emerald-500/10 border border-emerald-500/40 text-[10px] font-heading font-extrabold text-emerald-700 dark:text-emerald-300 hover:scale-105 transition-all"
                        >
                          5 KM FUN
                        </Link>
                      </div>
                    )}
                  </div>
                ))}

                {/* Admin Panel Link */}
                <div className="border-b border-slate-100 dark:border-white/10 last:border-b-0">
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-heading tracking-wider text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-volt uppercase py-3 px-2 rounded-md hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center justify-between font-bold"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-volt" />
                      ADMIN PANEL
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="pt-3 mt-1 flex flex-col gap-2.5">
                  <Link
                    href="/#register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-volt inline-flex text-center text-xs uppercase tracking-wider py-3.5 rounded-[4px] font-black hover:scale-[1.02] transition-all shadow-md items-center justify-center gap-2"
                  >
                    <span>REGISTER NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <div className="flex items-center justify-between px-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>Secretariat: {MARATHON_META.contact.phone}</span>
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-volt font-bold flex items-center gap-1 transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-volt" />
                      <span>Admin Login</span>
                    </Link>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
