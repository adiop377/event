"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS, MARATHON_META } from "@/data/marathon";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
          ? "bg-ink/90 backdrop-blur-md border-b border-line/60 py-3.5 shadow-lg shadow-black/40"
          : "bg-gradient-to-b from-ink/80 via-ink/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-champagne/30 p-1 bg-graphite flex items-center justify-center">
              <Image
                src="/pride-patna-marathon-logo-cropped.png"
                alt="Pride Patna Marathon Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl tracking-wider text-ivory group-hover:text-champagne transition-colors">
                PRIDE PATNA MARATHON
              </span>
              <span className="label-subtle text-[9px] tracking-[0.25em] text-champagne/90">
                14 FEB 2027 • GANDHI MAIDAN
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-widest text-stone hover:text-champagne transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#register"
              className="hidden sm:inline-flex btn-champagne text-xs uppercase tracking-wider !py-2.5 !px-5"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone hover:text-ivory hover:bg-graphite transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-champagne" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-ink/98 border-b border-line backdrop-blur-2xl px-6 py-8 shadow-2xl transition-all animate-fadeIn">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-heading tracking-widest text-ivory hover:text-champagne uppercase py-1 border-b border-line/30 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="#register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-champagne text-center text-sm uppercase tracking-wider py-3"
              >
                Reserve Your Bib
              </a>
              <p className="text-center text-xs text-stone mt-2">
                Questions? Call {MARATHON_META.contact.phone}
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

