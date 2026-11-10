"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import WhyRun from "@/components/WhyRun";
import CourseMap from "@/components/CourseMap";
import Schedule from "@/components/Schedule";
import RaceKit from "@/components/RaceKit";
import Sponsors from "@/components/Sponsors";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import RegisterForm from "@/components/RegisterForm";
import Footer from "@/components/Footer";
import { MarathonCategory } from "@/data/marathon";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<MarathonCategory | null>(null);

  const handleSelectCategory = (cat: MarathonCategory) => {
    setSelectedCategory(cat);
    const regSection = document.getElementById("register");
    if (regSection) {
      regSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-ink text-ivory flex flex-col selection:bg-champagne selection:text-ink">
      <Navbar />
      <Hero />
      <Countdown onSelectCategory={handleSelectCategory} />
      <WhyRun />
      <CourseMap />
      <Schedule />
      <RaceKit />
      <Sponsors />
      <Gallery />
      <FAQ />
      <RegisterForm initialCategory={selectedCategory} />
      <Footer />
    </main>
  );
}

