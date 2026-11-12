"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Check,
  User,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Printer,
  RotateCcw,
  ShieldCheck,
  Trophy,
  Info,
  X,
  CreditCard,
  QrCode,
  Tag,
  Zap,
} from "lucide-react";
import { CATEGORIES, MARATHON_META, MarathonCategory } from "@/data/marathon";

interface RegisterFormProps {
  initialCategory?: MarathonCategory | null;
}

interface RegistrationDetails {
  bibNumber: string;
  transactionId: string;
  fullName: string;
  bibName: string;
  email: string;
  phone: string;
  categoryCode: string;
  tShirtSize: string;
  registeredAt: string;
  venue: string;
  reportingTime: string;
  raceDate: string;
}

export default function RegisterForm({ initialCategory }: RegisterFormProps) {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState<RegistrationDetails | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "male" as "male" | "female" | "other",
    dob: "",
    city: "Patna",
    emergencyContactName: "",
    emergencyContactPhone: "",
    categoryCode: initialCategory ? initialCategory.code : "21k",
    bibName: "",
    tShirtSize: "L" as "XS" | "S" | "M" | "L" | "XL" | "XXL",
    acceptTerms: false,
  });

  useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({ ...prev, categoryCode: initialCategory.code }));
    }
  }, [initialCategory]);

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full athlete name is required";
    if (!formData.email.trim() || !formData.email.includes("@"))
      errs.email = "Valid email address is required";
    if (!formData.phone.trim() || formData.phone.length < 10)
      errs.phone = "Valid 10-digit mobile number is required";
    if (!formData.dob.trim()) errs.dob = "Date of birth is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.emergencyContactName.trim())
      errs.emergencyContactName = "Emergency contact name is required";
    if (!formData.emergencyContactPhone.trim() || formData.emergencyContactPhone.length < 10)
      errs.emergencyContactPhone = "Valid emergency phone is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.bibName.trim()) {
      errs.bibName = "Name to print on bib is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        if (!formData.bibName) {
          const first = formData.fullName.trim().split(" ")[0] || "";
          updateField("bibName", first.toUpperCase());
        }
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      setErrors({ acceptTerms: "You must accept the race rules and indemnity waiver" });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrors(json.errors || { form: json.message || "Registration failed" });
        setLoading(false);
        return;
      }

      setConfirmation(json.details);
      setLoading(false);

      try {
        confetti({
          particleCount: 150,
          spread: 85,
          origin: { y: 0.6 },
          colors: ["#CCFF00", "#FF5722", "#FFFFFF", "#38BDF8", "#10B981"],
        });
      } catch (err) {
        // Fallback
      }
    } catch (err) {
      console.error(err);
      setErrors({ form: "Network error communicating with the registration server." });
      setLoading(false);
    }
  };

  const resetForm = () => {
    setConfirmation(null);
    setStep(1);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      gender: "male",
      dob: "",
      city: "Patna",
      emergencyContactName: "",
      emergencyContactPhone: "",
      categoryCode: "21k",
      bibName: "",
      tShirtSize: "L",
      acceptTerms: false,
    });
  };

  const selectedCat =
    CATEGORIES.find((c) => c.code === formData.categoryCode) || CATEGORIES[2];

  const sizeChart = [
    { size: "XS", chest: "36 in", length: "26 in" },
    { size: "S", chest: "38 in", length: "27 in" },
    { size: "M", chest: "40 in", length: "28 in" },
    { size: "L", chest: "42 in", length: "29 in" },
    { size: "XL", chest: "44 in", length: "30 in" },
    { size: "XXL", chest: "46 in", length: "31 in" },
  ];

  return (
    <section id="register" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/60">
      {/* Background High-Energy Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-volt/[0.06] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[400px] h-[400px] bg-blaze/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-volt" />
            <span className="label-subtle text-volt font-bold">OFFICIAL ATHLETE PORTAL</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory leading-none">
            RESERVE YOUR <span className="font-accent lowercase text-volt-gradient">bib.</span>
          </h2>
          <p className="font-body text-base text-stone mt-4 leading-relaxed max-w-lg mx-auto">
            Secure your chip-timed entry for the {MARATHON_META.shortTitle}. Instant confirmation, official bib reservation, and digital kit passport.
          </p>
        </div>

        {/* Wizard Form Container */}
        <div className="luxury-card p-6 sm:p-10 lg:p-12 relative overflow-hidden bg-gradient-to-br from-[#121824] via-[#0D131F] to-[#121824] border-volt/30 shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
          {confirmation ? (
            /* Success Confirmation Card */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-volt/20 border-2 border-volt/70 flex items-center justify-center mx-auto mb-4 text-volt shadow-[0_0_25px_rgba(204,255,0,0.4)]">
                  <Check className="w-8 h-8" />
                </div>
                <span className="label-subtle text-volt font-bold">REGISTRATION CONFIRMED</span>
                <h3 className="font-heading text-3xl sm:text-4xl uppercase text-ivory mt-1">
                  Welcome to the Pride Patna Marathon
                </h3>
                <p className="font-body text-stone text-xs sm:text-sm mt-1">
                  A receipt &amp; race day digital pass have been recorded in the central timing database.
                </p>
              </div>

              {/* Digital Bib Card (Realistic Chest Bib Layout) */}
              <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#161F30] via-[#0F1624] to-[#161F30] border-2 border-volt/50 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-volt/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Bib Header */}
                <div className="flex items-center justify-between pb-5 border-b border-line">
                  <div>
                    <span className="label-subtle text-[9px] text-volt font-bold block">
                      PRIDE PATNA MARATHON 2027
                    </span>
                    <span className="text-xs text-stone">Gandhi Maidan, Patna • 14 Feb 2027</span>
                  </div>
                  <div className="text-right">
                    <span className="label-subtle text-[8.5px] text-stone">CATEGORY</span>
                    <span className="font-heading text-xl text-volt block font-extrabold">
                      {selectedCat.name}
                    </span>
                  </div>
                </div>

                {/* Center Giant Bib Number */}
                <div className="my-8 text-center py-4 bg-ink/80 rounded-2xl border border-line shadow-inner">
                  <span className="label-subtle text-[9px] text-stone block mb-1 font-bold">
                    OFFICIAL ATHLETE BIB
                  </span>
                  <h4 className="font-numbers text-5xl sm:text-6xl font-extrabold text-ivory tracking-widest">
                    {confirmation.bibNumber}
                  </h4>
                  <span className="font-heading text-2xl uppercase tracking-wider text-volt mt-2 block font-extrabold">
                    {confirmation.bibName}
                  </span>
                </div>

                {/* Athlete Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 text-xs text-stone">
                  <div>
                    <span className="label-subtle text-[8.5px]">ATHLETE</span>
                    <p className="font-medium text-ivory mt-0.5">{confirmation.fullName}</p>
                  </div>
                  <div>
                    <span className="label-subtle text-[8.5px]">JERSEY SIZE</span>
                    <p className="font-medium text-ivory mt-0.5">{confirmation.tShirtSize}</p>
                  </div>
                  <div>
                    <span className="label-subtle text-[8.5px]">REPORTING</span>
                    <p className="font-medium text-ivory mt-0.5">{confirmation.reportingTime}</p>
                  </div>
                  <div>
                    <span className="label-subtle text-[8.5px]">CORRAL</span>
                    <p className="font-medium text-volt mt-0.5 font-bold">Corral Gate 1</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-line/60 flex flex-wrap items-center justify-between text-[11px] text-stone">
                  <span>Venue: {confirmation.venue}</span>
                  <span className="font-numbers">Txn: {confirmation.transactionId}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-ghost-luxury flex-1 text-center justify-center text-xs uppercase tracking-wider py-4 font-bold"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print / Save Pass
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-volt flex-1 text-center justify-center text-xs uppercase tracking-wider py-4 font-extrabold"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Register Another Runner
                </button>
              </div>
            </motion.div>
          ) : (
            /* Multi-step Form */
            <form onSubmit={handleSubmit}>
              {/* Stepper Header */}
              <div className="flex items-center justify-between pb-8 mb-8 border-b border-line">
                {[
                  { stepNum: 1, title: "Runner Details" },
                  { stepNum: 2, title: "Category & Bib" },
                  { stepNum: 3, title: "Review & Confirm" },
                ].map((s) => (
                  <div key={s.stepNum} className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-numbers font-extrabold transition-all ${
                        step === s.stepNum
                          ? "bg-volt text-black shadow-[0_0_18px_rgba(204,255,0,0.5)]"
                          : step > s.stepNum
                          ? "bg-volt/20 text-volt border border-volt/40"
                          : "bg-ink text-stone border border-line"
                      }`}
                    >
                      {step > s.stepNum ? <Check className="w-4 h-4" /> : s.stepNum}
                    </div>
                    <span
                      className={`hidden sm:inline-block text-xs font-heading uppercase tracking-wider ${
                        step === s.stepNum ? "text-ivory font-bold" : "text-stone"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Form level error */}
              {errors.form && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Step 1: Runner Details */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="label-subtle block mb-2">FULL ATHLETE NAME *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="e.g. Vikram Singh"
                        className={`w-full px-4 py-3.5 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt transition-colors ${
                          errors.fullName ? "border-rose-500" : "border-line"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="label-subtle block mb-2">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="vikram@example.com"
                        className={`w-full px-4 py-3.5 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt transition-colors ${
                          errors.email ? "border-rose-500" : "border-line"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="label-subtle block mb-2">WHATSAPP / MOBILE NUMBER *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="10-digit mobile number"
                        className={`w-full px-4 py-3.5 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt transition-colors ${
                          errors.phone ? "border-rose-500" : "border-line"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="label-subtle block mb-2">GENDER *</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["male", "female", "other"] as const).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => updateField("gender", g)}
                            className={`py-3.5 rounded-xl text-xs font-heading uppercase tracking-wider font-bold border transition-all ${
                              formData.gender === g
                                ? "bg-volt text-black border-volt shadow-md"
                                : "bg-ink border-line text-stone hover:text-ivory"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="label-subtle block mb-2">DATE OF BIRTH *</label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => updateField("dob", e.target.value)}
                        className={`w-full px-4 py-3.5 rounded-xl bg-ink border text-ivory text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt transition-colors ${
                          errors.dob ? "border-rose-500" : "border-line"
                        }`}
                      />
                      {errors.dob && (
                        <p className="text-xs text-rose-400 mt-1">{errors.dob}</p>
                      )}
                    </div>

                    <div>
                      <label className="label-subtle block mb-2">CITY OF RESIDENCE *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        placeholder="Patna, Muzaffarpur, Gaya, etc."
                        className={`w-full px-4 py-3.5 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt transition-colors ${
                          errors.city ? "border-rose-500" : "border-line"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-xs text-rose-400 mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="label-subtle block mb-2">EMERGENCY CONTACT PERSON *</label>
                      <input
                        type="text"
                        value={formData.emergencyContactName}
                        onChange={(e) => updateField("emergencyContactName", e.target.value)}
                        placeholder="Kin / Family member name"
                        className={`w-full px-4 py-3.5 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt transition-colors ${
                          errors.emergencyContactName ? "border-rose-500" : "border-line"
                        }`}
                      />
                      {errors.emergencyContactName && (
                        <p className="text-xs text-rose-400 mt-1">
                          {errors.emergencyContactName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="label-subtle block mb-2">EMERGENCY PHONE *</label>
                      <input
                        type="tel"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => updateField("emergencyContactPhone", e.target.value)}
                        placeholder="10-digit emergency phone"
                        className={`w-full px-4 py-3.5 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt transition-colors ${
                          errors.emergencyContactPhone ? "border-rose-500" : "border-line"
                        }`}
                      />
                      {errors.emergencyContactPhone && (
                        <p className="text-xs text-rose-400 mt-1">
                          {errors.emergencyContactPhone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-line flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-volt text-xs uppercase tracking-wider py-4 px-9 font-extrabold"
                    >
                      <span>Proceed to Category &amp; Bib Design</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Category & Apparel with Live Bib Preview */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  {/* Category Selection */}
                  <div>
                    <label className="label-subtle block mb-3">SELECT RACE DISTANCE CATEGORY *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CATEGORIES.map((c) => (
                        <div
                          key={c.code}
                          onClick={() => updateField("categoryCode", c.code)}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                            formData.categoryCode === c.code
                              ? "bg-volt/10 border-volt shadow-[0_0_20px_rgba(204,255,0,0.25)]"
                              : "bg-ink border-line hover:border-line/80"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-heading text-lg uppercase text-ivory">
                              {c.name}
                            </span>
                            <span className={`font-numbers text-xl font-extrabold ${
                              c.code === "42k" ? "text-blaze" : "text-volt"
                            }`}>
                              {c.price}
                            </span>
                          </div>
                          <p className="text-xs text-stone">{c.tagline}</p>
                          <div className="mt-3 text-[11px] text-stone/80 flex items-center justify-between pt-2 border-t border-line/40">
                            <span>Start {c.startTime}</span>
                            <span>Cutoff {c.cutoffTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live Bib Simulator & Apparel Fields */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-line">
                    {/* Left: Input controls */}
                    <div className="lg:col-span-6 space-y-6">
                      <div>
                        <label className="label-subtle block mb-2">NAME PRINTED ON CHEST BIB *</label>
                        <input
                          type="text"
                          value={formData.bibName}
                          onChange={(e) => updateField("bibName", e.target.value.toUpperCase())}
                          placeholder="e.g. VIKRAM"
                          maxLength={16}
                          className={`w-full px-4 py-3.5 rounded-xl bg-ink border text-ivory text-base uppercase font-numbers tracking-widest focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt transition-colors ${
                            errors.bibName ? "border-rose-500" : "border-line"
                          }`}
                        />
                        <span className="text-[10px] text-stone mt-1 block">
                          Watch the live bib preview update on the right! Max 16 characters.
                        </span>
                        {errors.bibName && (
                          <p className="text-xs text-rose-400 mt-1">{errors.bibName}</p>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="label-subtle">OFFICIAL ATHLETE JERSEY SIZE *</label>
                          <button
                            type="button"
                            onClick={() => setSizeGuideOpen(true)}
                            className="inline-flex items-center gap-1 text-[11px] text-volt hover:underline font-semibold"
                          >
                            <Info className="w-3 h-3" />
                            <span>Size Guide</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                          {(["XS", "S", "M", "L", "XL", "XXL"] as const).map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => updateField("tShirtSize", size)}
                              className={`py-3 rounded-xl text-xs font-numbers font-bold border transition-all ${
                                formData.tShirtSize === size
                                  ? "bg-volt text-black border-volt shadow-md"
                                  : "bg-ink border-line text-stone hover:text-ivory"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Simulated Real-Time Cyber Bib Card */}
                    <div className="lg:col-span-6">
                      <span className="label-subtle block mb-2 text-stone">
                        LIVE BIB PREVIEW
                      </span>
                      <div className="relative rounded-2xl p-5 bg-gradient-to-b from-[#182338] to-[#0E1522] border-2 border-volt/45 shadow-xl overflow-hidden text-center">
                        {/* Top Bib Punch Holes */}
                        <div className="flex justify-between items-center mb-3 px-2">
                          <div className="w-3.5 h-3.5 rounded-full bg-ink border border-line" />
                          <span className="font-heading text-xs tracking-wider text-stone/90 uppercase font-bold">
                            PATNA 2027 • OFFICIAL TIMED ATHLETE
                          </span>
                          <div className="w-3.5 h-3.5 rounded-full bg-ink border border-line" />
                        </div>

                        {/* Category Banner */}
                        <div className="py-1 px-4 rounded-full bg-volt text-black text-[11px] font-extrabold uppercase tracking-widest inline-block mb-3 shadow-md">
                          {selectedCat.name} • {selectedCat.distance}
                        </div>

                        {/* Bib Number */}
                        <div className="font-numbers text-5xl font-extrabold text-ivory tracking-widest">
                          {selectedCat.code.toUpperCase()}-2027
                        </div>

                        {/* Live Bib Name */}
                        <div className="font-heading text-2xl uppercase tracking-wider text-volt mt-1 font-extrabold min-h-[32px]">
                          {formData.bibName || "ATHLETE NAME"}
                        </div>

                        {/* Bottom Tag */}
                        <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-[10px] text-stone">
                          <span>Jersey: {formData.tShirtSize}</span>
                          <span className="flex items-center gap-1 text-blaze font-bold">
                            <QrCode className="w-3.5 h-3.5" />
                            ChronoTrack RFID Sensor
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-line flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn-ghost-luxury text-xs uppercase tracking-wider py-3.5 px-6 font-semibold"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-volt text-xs uppercase tracking-wider py-3.5 px-8 font-extrabold"
                    >
                      <span>Review &amp; Confirm</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review & Terms */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Summary Card */}
                  <div className="p-6 rounded-2xl bg-ink/90 border border-line space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-line">
                      <div>
                        <span className="label-subtle text-[9px]">SELECTED CATEGORY</span>
                        <h4 className="font-heading text-2xl text-volt uppercase mt-0.5 font-extrabold">
                          {selectedCat.name}
                        </h4>
                      </div>
                      <span className="font-numbers text-3xl font-extrabold text-ivory">
                        {selectedCat.price}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone">
                      <div>
                        <span className="label-subtle text-[8.5px]">ATHLETE</span>
                        <p className="text-ivory font-medium mt-0.5">{formData.fullName}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px]">BIB NAME</span>
                        <p className="text-volt font-bold mt-0.5">{formData.bibName}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px]">JERSEY SIZE</span>
                        <p className="text-ivory font-medium mt-0.5">{formData.tShirtSize}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px]">PHONE</span>
                        <p className="text-ivory font-medium mt-0.5">{formData.phone}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px]">EMAIL</span>
                        <p className="text-ivory font-medium mt-0.5">{formData.email}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px]">EMERGENCY</span>
                        <p className="text-ivory font-medium mt-0.5">
                          {formData.emergencyContactName} ({formData.emergencyContactPhone})
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Indemnity Waiver */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => updateField("acceptTerms", e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-line text-volt focus:ring-volt accent-volt"
                      />
                      <span className="text-xs text-stone leading-relaxed font-body">
                        I confirm that I am medically fit to participate in the{" "}
                        <strong className="text-ivory">{selectedCat.name}</strong>. I have read
                        and agree to the official race regulations, refund terms, and release
                        organizers from liability under standard athletic indemnity waiver.
                      </span>
                    </label>
                    {errors.acceptTerms && (
                      <p className="text-xs text-rose-400 mt-2">{errors.acceptTerms}</p>
                    )}
                  </div>

                  <div className="pt-6 border-t border-line flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn-ghost-luxury text-xs uppercase tracking-wider py-3.5 px-6 font-semibold"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-volt text-xs uppercase tracking-wider py-4 px-9 disabled:opacity-50 font-extrabold"
                    >
                      {loading ? (
                        <span>Processing Bib Issuance...</span>
                      ) : (
                        <span>Complete Registration ({selectedCat.price})</span>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSizeGuideOpen(false)}
              className="absolute inset-0"
            />
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="relative w-full max-w-md bg-graphite rounded-2xl border border-line p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
                <h4 className="font-heading text-xl uppercase text-ivory">
                  Official Jersey Size Chart
                </h4>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(false)}
                  className="p-1 rounded text-stone hover:text-ivory"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-line text-volt label-subtle font-bold">
                      <th className="py-2">SIZE</th>
                      <th className="py-2">CHEST</th>
                      <th className="py-2">LENGTH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/40 text-stone">
                    {sizeChart.map((row) => (
                      <tr key={row.size} className="hover:text-ivory">
                        <td className="py-2.5 font-bold font-numbers">{row.size}</td>
                        <td className="py-2.5">{row.chest}</td>
                        <td className="py-2.5">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-stone mt-4 leading-relaxed font-body">
                T-shirts are crafted from technical moisture-wicking dry-fit athletic polyester. In case of size exchange, visit the Expo Helpdesk between Feb 11–13, 2027.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
