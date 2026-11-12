"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight, Zap } from "lucide-react";
import { NAV_LINKS, MARATHON_META } from "@/data/marathon";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
          ? "bg-[#090D14]/92 backdrop-blur-xl border-b border-line/70 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
          : "bg-gradient-to-b from-[#090D14]/95 via-[#090D14]/50 to-transparent py-4 sm:py-5"
      }`}
    >
      {/* Top High-Energy Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-volt via-blaze to-volt transition-all duration-150 z-50 shadow-[0_0_10px_rgba(204,255,0,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-volt/50 p-1 bg-graphite flex items-center justify-center shadow-[0_0_18px_rgba(204,255,0,0.25)] group-hover:border-volt group-hover:shadow-[0_0_22px_rgba(204,255,0,0.4)] transition-all">
              <Image
                src="/pride-patna-marathon-logo-cropped.png"
                alt="Pride Patna Marathon Logo"
                width={40}
                height={40}
                className="object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl tracking-wider text-ivory group-hover:text-volt transition-colors">
                PRIDE PATNA MARATHON
              </span>
              <span className="label-subtle text-[8.5px] sm:text-[9px] tracking-[0.22em] text-volt font-bold flex items-center gap-1.5">
                <span>14 FEB 2027</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blaze" />
                <span>GANDHI MAIDAN</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-heading uppercase tracking-widest text-stone hover:text-volt transition-colors duration-200 relative group py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-volt transition-all duration-200 group-hover:w-full shadow-[0_0_8px_rgba(204,255,0,0.7)]" />
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#register"
              className="hidden sm:inline-flex btn-volt text-xs uppercase tracking-wider !py-2.5 !px-5"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-md text-stone hover:text-ivory bg-graphite/80 border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-volt" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#090D14]/98 border-b border-line backdrop-blur-2xl px-6 py-8 shadow-2xl transition-all">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-heading tracking-widest text-ivory hover:text-volt uppercase py-2 border-b border-line/30 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-stone/50" />
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="#register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-volt text-center text-sm uppercase tracking-wider py-3.5"
              >
                Reserve Your Bib
              </a>
              <p className="text-center text-xs text-stone mt-2">
                Athlete Secretariat: {MARATHON_META.contact.phone}
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
