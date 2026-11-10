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
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.email.trim() || !formData.email.includes("@"))
      errs.email = "Valid email is required";
    if (!formData.phone.trim() || formData.phone.length < 10)
      errs.phone = "Valid 10-digit phone number is required";
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
          // Pre-fill bib name from first name
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
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C8A86B", "#D9BC83", "#F4EFE6", "#D9532B"],
        });
      } catch (err) {
        // Confetti fallback
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

  return (
    <section id="register" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-champagne" />
            <span className="label-subtle text-champagne">OFFICIAL ATHLETE PORTAL</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory leading-none">
            RESERVE YOUR <span className="font-accent lowercase text-champagne">bib.</span>
          </h2>
          <p className="font-body text-base text-stone mt-4 leading-relaxed max-w-lg mx-auto">
            Secure your chip-timed entry for the {MARATHON_META.shortTitle}. Instant confirmation and digital race kit issuance.
          </p>
        </div>

        {/* Wizard Form Container */}
        <div className="luxury-card p-6 sm:p-10 lg:p-12 relative overflow-hidden bg-graphite/90 backdrop-blur-xl">
          {confirmation ? (
            /* Success Confirmation Card */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/60 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <Check className="w-8 h-8" />
                </div>
                <span className="label-subtle text-emerald-400">REGISTRATION CONFIRMED</span>
                <h3 className="font-heading text-3xl sm:text-4xl uppercase text-ivory mt-1">
                  Welcome to the Pride Patna Marathon
                </h3>
                <p className="font-body text-stone text-xs sm:text-sm mt-1">
                  A receipt & race day passport have been logged under your name.
                </p>
              </div>

              {/* Digital Bib Card */}
              <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-graphite via-ink to-graphite border-2 border-champagne/40 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-champagne/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-6 border-b border-line/60">
                  <div>
                    <span className="label-subtle text-[9px] text-champagne">OFFICIAL BIB NUMBER</span>
                    <h4 className="font-numbers text-4xl sm:text-5xl font-extrabold text-ivory tracking-wider mt-1">
                      {confirmation.bibNumber}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="label-subtle text-[9px] text-stone">RACE CATEGORY</span>
                    <span className="font-heading text-xl text-champagne block mt-0.5">
                      {selectedCat.name}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 text-xs text-stone">
                  <div>
                    <span className="label-subtle text-[8.5px]">ATHLETE</span>
                    <p className="font-medium text-ivory mt-0.5">{confirmation.fullName}</p>
                  </div>
                  <div>
                    <span className="label-subtle text-[8.5px]">BIB NAME</span>
                    <p className="font-medium text-champagne mt-0.5">{confirmation.bibName}</p>
                  </div>
                  <div>
                    <span className="label-subtle text-[8.5px]">JERSEY SIZE</span>
                    <p className="font-medium text-ivory mt-0.5">{confirmation.tShirtSize}</p>
                  </div>
                  <div>
                    <span className="label-subtle text-[8.5px]">REPORTING</span>
                    <p className="font-medium text-ivory mt-0.5">{confirmation.reportingTime}</p>
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
                  className="btn-ghost-luxury flex-1 text-center justify-center text-xs uppercase tracking-wider py-3.5"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print / Save Pass
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-champagne flex-1 text-center justify-center text-xs uppercase tracking-wider py-3.5"
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
                  { stepNum: 2, title: "Category & Apparel" },
                  { stepNum: 3, title: "Review & Terms" },
                ].map((s) => (
                  <div key={s.stepNum} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-numbers font-bold transition-all ${
                        step === s.stepNum
                          ? "bg-champagne text-ink shadow-[0_0_12px_rgba(200,168,107,0.4)]"
                          : step > s.stepNum
                          ? "bg-champagne/20 text-champagne border border-champagne/40"
                          : "bg-ink text-stone border border-line"
                      }`}
                    >
                      {step > s.stepNum ? <Check className="w-4 h-4" /> : s.stepNum}
                    </div>
                    <span
                      className={`hidden sm:inline-block text-xs font-semibold uppercase tracking-wider ${
                        step === s.stepNum ? "text-ivory" : "text-stone"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Form level error */}
              {errors.form && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-sm flex items-center gap-3">
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
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
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
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
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
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
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
                            className={`py-3 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                              formData.gender === g
                                ? "bg-champagne text-ink border-champagne"
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
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
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
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
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
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
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
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
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
                      className="btn-champagne text-xs uppercase tracking-wider py-3.5 px-8"
                    >
                      <span>Proceed to Category & Apparel</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Category & Apparel */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="label-subtle block mb-3">SELECT RACE DISTANCE CATEGORY *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CATEGORIES.map((c) => (
                        <div
                          key={c.code}
                          onClick={() => updateField("categoryCode", c.code)}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                            formData.categoryCode === c.code
                              ? "bg-champagne/10 border-champagne shadow-[0_0_15px_rgba(223,178,105,0.15)]"
                              : "bg-ink border-line hover:border-line/80"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-heading text-lg uppercase text-ivory">
                              {c.name}
                            </span>
                            <span className="font-numbers text-lg font-bold text-champagne">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    <div>
                      <label className="label-subtle block mb-2">NAME PRINTED ON BIB *</label>
                      <input
                        type="text"
                        value={formData.bibName}
                        onChange={(e) => updateField("bibName", e.target.value.toUpperCase())}
                        placeholder="e.g. VIKRAM"
                        maxLength={16}
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory text-sm uppercase font-numbers tracking-widest focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
                          errors.bibName ? "border-rose-500" : "border-line"
                        }`}
                      />
                      <span className="text-[10px] text-stone mt-1 block">
                        Max 16 characters. Will appear on your official chest bib.
                      </span>
                      {errors.bibName && (
                        <p className="text-xs text-rose-400 mt-1">{errors.bibName}</p>
                      )}
                    </div>

                    <div>
                      <label className="label-subtle block mb-2">OFFICIAL JERSEY SIZE *</label>
                      <div className="grid grid-cols-6 gap-2">
                        {(["XS", "S", "M", "L", "XL", "XXL"] as const).map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => updateField("tShirtSize", size)}
                            className={`py-3 rounded-xl text-xs font-numbers font-bold border transition-all ${
                              formData.tShirtSize === size
                                ? "bg-champagne text-ink border-champagne"
                                : "bg-ink border-line text-stone hover:text-ivory"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <span className="text-[10px] text-stone mt-1 block">
                        Unisex athletic dry-fit fit. Refer to size guide at expo.
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-line flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn-ghost-luxury text-xs uppercase tracking-wider py-3.5 px-6"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-champagne text-xs uppercase tracking-wider py-3.5 px-8"
                    >
                      <span>Review & Confirm</span>
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
                  <div className="p-6 rounded-2xl bg-ink/70 border border-line space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-line">
                      <div>
                        <span className="label-subtle text-[9px]">SELECTED CATEGORY</span>
                        <h4 className="font-heading text-2xl text-champagne uppercase mt-0.5">
                          {selectedCat.name}
                        </h4>
                      </div>
                      <span className="font-numbers text-3xl font-bold text-ivory">
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
                        <p className="text-ivory font-medium mt-0.5">{formData.bibName}</p>
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
                        className="mt-1 w-4 h-4 rounded border-line text-champagne focus:ring-champagne"
                      />
                      <span className="text-xs text-stone leading-relaxed">
                        I confirm that I am medically fit to participate in the{" "}
                        <strong className="text-ivory">{selectedCat.name}</strong>. I have read
                        and agree to the official race rules, refund policy, and release
                        organizers from liability under the standard athletic indemnity waiver.
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
                      className="btn-ghost-luxury text-xs uppercase tracking-wider py-3.5 px-6"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-champagne text-xs uppercase tracking-wider py-3.5 px-8 disabled:opacity-50"
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
    </section>
  );
}

