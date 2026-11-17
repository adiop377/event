"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import Countdown from "@/components/Countdown";
import WhyRun from "@/components/WhyRun";
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
    <main className="min-h-screen bg-ink text-ivory flex flex-col selection:bg-volt selection:text-black">
      <Navbar />
      <Hero />
      <MarqueeBanner />
      <Countdown onSelectCategory={handleSelectCategory} />
      <WhyRun />
      <RegisterForm initialCategory={selectedCategory} />
      <Footer />
    </main>
  );
}
