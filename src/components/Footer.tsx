"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, AlertCircle, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { MARATHON_META, NAV_LINKS } from "@/data/marathon";

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-[#050608] text-stone border-t border-line/60 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-line/50">
          {/* Brand info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="#hero" className="flex items-center gap-3 mb-6 group">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-champagne/30 p-1 bg-graphite flex items-center justify-center">
                  <Image
                    src="/pride-patna-marathon-logo-cropped.png"
                    alt="Pride Patna Marathon Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-xl tracking-wider text-ivory group-hover:text-champagne transition-colors">
                    PRIDE PATNA MARATHON
                  </span>
                  <span className="label-subtle text-[9px] tracking-[0.25em] text-champagne/90">
                    14 FEB 2027 • GANDHI MAIDAN
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
                className="w-9 h-9 rounded-full bg-graphite border border-line flex items-center justify-center text-stone hover:text-champagne hover:border-champagne transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={MARATHON_META.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-graphite border border-line flex items-center justify-center text-stone hover:text-champagne hover:border-champagne transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={MARATHON_META.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-graphite border border-line flex items-center justify-center text-stone hover:text-champagne hover:border-champagne transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={MARATHON_META.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-graphite border border-line flex items-center justify-center text-stone hover:text-champagne hover:border-champagne transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3">
            <span className="label-subtle text-ivory block mb-4">QUICK NAVIGATION</span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-champagne transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-champagne transition-colors">
                  Why Run With Us
                </a>
              </li>
              <li>
                <a href="#races" className="hover:text-champagne transition-colors">
                  Race Distances &amp; Pricing
                </a>
              </li>
              <li>
                <a href="#route" className="hover:text-champagne transition-colors">
                  Course Map &amp; Elevation
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-champagne transition-colors">
                  Race Day Timeline
                </a>
              </li>
              <li>
                <a href="#kit" className="hover:text-champagne transition-colors">
                  Athlete Kit &amp; Inclusions
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-champagne transition-colors">
                  Archival Photo Gallery
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-champagne transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Event Secretariat */}
          <div className="lg:col-span-4">
            <span className="label-subtle text-ivory block mb-4">EVENT SECRETARIAT</span>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span>{MARATHON_META.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-champagne shrink-0" />
                <a
                  href={`mailto:${MARATHON_META.contact.email}`}
                  className="hover:text-champagne transition-colors"
                >
                  {MARATHON_META.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-champagne shrink-0" />
                <a
                  href={`tel:${MARATHON_META.contact.phone.replace(/\s+/g, "")}`}
                  className="hover:text-champagne transition-colors"
                >
                  {MARATHON_META.contact.phone}
                </a>
              </div>
            </div>

            {/* Emergency Hotline Box */}
            <div className="mt-6 p-4 rounded-xl bg-graphite/70 border border-line">
              <span className="label-subtle text-[9px] text-rose-400 block mb-1">
                RACE DAY EMERGENCY HOTLINE
              </span>
              <span className="font-numbers text-lg font-bold text-ivory block">
                {MARATHON_META.contact.tollFree}
              </span>
              <span className="text-[10px] text-stone mt-0.5 block">
                Dedicated Apollo cardiac &amp; trauma dispatch desk.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone">
          <p>© 2027 Pride Patna Marathon. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#terms" className="hover:text-ivory transition-colors">
              Terms &amp; Conditions
            </a>
            <a href="#privacy" className="hover:text-ivory transition-colors">
              Privacy Policy
            </a>
            <a href="#rules" className="hover:text-ivory transition-colors">
              Race Regulations
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

