"use client";

import { useState, useEffect, useMemo } from "react";
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
  Copy,
  Smartphone,
  CheckCircle2,
  Wallet,
  ExternalLink,
  Lock,
  Clock,
  Calendar,
} from "lucide-react";
import { CATEGORIES, MARATHON_META, MarathonCategory } from "@/data/marathon";
import { generateQRCodeSVG } from "@/utils/qr";

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
  const [registrationsOpen, setRegistrationsOpen] = useState(true);
  const [registrationNotice, setRegistrationNotice] = useState("");

  const [paymentSettings, setPaymentSettings] = useState({
    upiId: "patnamarathon@upi",
    merchantName: "Pride Patna Marathon 2027",
    accountNumber: "50200084729103",
    ifscCode: "HDFC0001234",
    enableCards: true,
  });
  const [utrNumber, setUtrNumber] = useState("");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [paymentMethodTab, setPaymentMethodTab] = useState<"upi" | "bank">("upi");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "male" as "male" | "female" | "other",
    dob: "",
    city: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    categoryCode: initialCategory ? initialCategory.code : "21k",
    bibName: "",
    tShirtSize: "L" as "XS" | "S" | "M" | "L" | "XL" | "XXL",
    acceptTerms: false,
  });

  useEffect(() => {
    fetch("/api/event-status")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRegistrationsOpen(data.registrationsOpen);
          setRegistrationNotice(data.registrationNotice);
          if (data.paymentSettings) {
            setPaymentSettings(data.paymentSettings);
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({ ...prev, categoryCode: initialCategory.code }));
    }
  }, [initialCategory]);

  const numericAmount = useMemo(() => {
    return formData.categoryCode === "21k" ? 1299 : formData.categoryCode === "10k" ? 799 : 499;
  }, [formData.categoryCode]);

  const upiPayUrl = useMemo(() => {
    return `upi://pay?pa=${paymentSettings.upiId}&pn=${encodeURIComponent(
      paymentSettings.merchantName
    )}&am=${numericAmount}&cu=INR&tn=${encodeURIComponent(
      "Pride Patna Marathon 2027 Registration " + (formData.fullName || "Runner")
    )}`;
  }, [paymentSettings, numericAmount, formData.fullName]);

  const qrSvgString = useMemo(() => {
    try {
      return generateQRCodeSVG(upiPayUrl, { size: 210, margin: 1 });
    } catch {
      return "";
    }
  }, [upiPayUrl]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(paymentSettings.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 3000);
  };

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
    if (!formData.dob.trim()) {
      errs.dob = "Date of birth is required";
    } else {
      const year = parseInt(formData.dob.split("-")[0], 10);
      if (year < 1995 || year > 2026) {
        errs.dob = "Year of birth must be between 1995 and 2026";
      }
    }
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.emergencyContactName.trim())
      errs.emergencyContactName = "Emergency contact name is required";
    if (!formData.emergencyContactPhone.trim() || formData.emergencyContactPhone.length < 10)
      errs.emergencyContactPhone = "Valid emergency phone is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        const autoName = formData.fullName.trim().toUpperCase();
        setFormData((prev) => ({ ...prev, bibName: autoName }));
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    } else if (step === 3) {
      if (!formData.acceptTerms) {
        setErrors({ acceptTerms: "You must accept the race rules and indemnity waiver before proceeding to payment" });
        return;
      }
      setErrors({});
      setStep(4);
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
      const payload = {
        ...formData,
        bibName: (formData.bibName || formData.fullName).trim().toUpperCase(),
        utrNumber: utrNumber.trim() || undefined,
        paymentStatus: "confirmed",
        amountPaid: numericAmount,
      };
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      city: "",
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
    <section id="register" className="relative w-full py-14 sm:py-24 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/60">
      {/* Background High-Energy Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-volt/[0.06] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[400px] h-[400px] bg-blaze/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <Zap className="w-4 h-4 text-volt" />
            <span className="label-subtle text-volt font-bold">OFFICIAL ATHLETE PORTAL</span>
          </div>
          <h2 className="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-ivory leading-tight font-extrabold">
            RESERVE YOUR <span className="text-volt-gradient">BIB.</span>
          </h2>
          <p className="font-body text-xs sm:text-base text-stone mt-2 sm:mt-4 leading-relaxed max-w-lg mx-auto font-medium">
            Secure your chip-timed entry for the {MARATHON_META.shortTitle}. Instant confirmation, official bib reservation, and digital kit passport.
          </p>
        </div>

        {/* Wizard Form Container */}
        <div className="relative">
          <div className="luxury-card p-4 sm:p-8 lg:p-12 relative overflow-hidden bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 shadow-xl">
            {confirmation ? (
              /* Waiting for Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center"
              >
                {/* Status Icon */}
                <div className="relative w-20 h-20 mx-auto mb-2 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-amber-500/15 border-2 border-amber-500/40 animate-pulse" />
                  <Clock className="w-10 h-10 text-amber-500 relative z-10" />
                  <span className="absolute top-0 right-0 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
                  </span>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-heading uppercase tracking-widest text-amber-600 dark:text-amber-400 font-extrabold mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    WAITING FOR CONFIRMATION
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl uppercase text-slate-900 dark:text-white font-black tracking-tight">
                    Payment Verification Underway
                  </h3>
                  <p className="font-body text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1.5 font-medium max-w-lg mx-auto">
                    Your athlete registration &amp; transaction reference have been received by the Pride Patna Marathon race secretariat.
                  </p>
                </div>

                {/* The Required Highlight Notice */}
                <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center justify-center gap-2 max-w-md mx-auto shadow-sm">
                  <Clock className="w-4 h-4 shrink-0 text-amber-500" />
                  <span>It usually takes 10–30 min to verify your payment.</span>
                </div>

                {/* Digital Provisional Bib Pass */}
                <div className="relative rounded-lg p-6 sm:p-8 bg-slate-50 dark:bg-[#0D121C] border border-slate-200 dark:border-white/10 shadow-lg overflow-hidden text-left">
                  {/* Top Bib Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                    <div>
                      <span className="label-subtle text-[9px] text-amber-600 dark:text-amber-400 font-bold block">
                        PRIDE PATNA MARATHON 2027 • PROVISIONAL ALLOTMENT
                      </span>
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        JP Ganga Path, Vending Zone • 7 Feb 2027
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400">CATEGORY</span>
                      <span className="font-heading text-lg sm:text-xl text-slate-900 dark:text-white block font-black uppercase">
                        {selectedCat.name}
                      </span>
                    </div>
                  </div>

                  {/* Center Provisional Bib Number */}
                  <div className="my-6 text-center py-4 bg-white dark:bg-[#182438] rounded-md border border-slate-200 dark:border-white/10 shadow-sm">
                    <span className="label-subtle text-[9px] text-slate-500 dark:text-slate-400 block mb-1 font-bold">
                      RESERVED ATHLETE BIB
                    </span>
                    <h4 className="font-numbers text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-widest">
                      {confirmation.bibNumber}
                    </h4>
                    <span className="font-heading text-xl sm:text-2xl uppercase tracking-wider text-emerald-700 dark:text-volt mt-1 block font-black">
                      {confirmation.bibName}
                    </span>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
                      ● Status: Awaiting Payment Verification
                    </span>
                  </div>

                  {/* Athlete Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 text-xs text-slate-600 dark:text-slate-300">
                    <div>
                      <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400">ATHLETE</span>
                      <p className="font-bold text-slate-900 dark:text-white mt-0.5">{confirmation.fullName}</p>
                    </div>
                    <div>
                      <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400">JERSEY SIZE</span>
                      <p className="font-bold text-slate-900 dark:text-white mt-0.5">{confirmation.tShirtSize}</p>
                    </div>
                    <div>
                      <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400">REPORTING</span>
                      <p className="font-bold text-slate-900 dark:text-white mt-0.5">{confirmation.reportingTime}</p>
                    </div>
                    <div>
                      <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400">VERIFICATION TIME</span>
                      <p className="font-bold text-amber-600 dark:text-amber-400 mt-0.5">10–30 Minutes</p>
                    </div>
                  </div>

                  {/* Verification Next Steps Notice */}
                  <div className="p-3.5 rounded bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/05 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-volt" />
                      What happens next?
                    </p>
                    <p className="text-[11px] leading-relaxed text-slate-500 dark:text-stone">
                      Once our finance team verifies your transaction reference against banking records, your final race pass &amp; expo QR code will be dispatched via SMS &amp; WhatsApp to <strong>+91 {confirmation.phone}</strong>.
                    </p>
                  </div>

                  {/* Footer details */}
                  <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between text-[11px] text-slate-600 dark:text-slate-300 font-medium gap-2">
                    <span>Venue: {confirmation.venue}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">Ref: {confirmation.transactionId}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn-ghost-luxury flex-1 text-center justify-center text-xs uppercase tracking-wider py-4 font-bold border border-slate-300 dark:border-white/15"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print / Save Acknowledgment Pass
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-slate-900 hover:bg-black text-white flex-1 text-center justify-center text-xs uppercase tracking-wider py-4 font-black rounded-[4px] shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Register Another Runner
                  </button>
                </div>
              </motion.div>
          ) : !registrationsOpen ? (
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center mx-auto text-amber-500">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl uppercase text-slate-900 dark:text-white font-black">
                Registrations Paused
              </h3>
              <p className="text-sm text-slate-600 dark:text-stone max-w-md mx-auto leading-relaxed font-body">
                {registrationNotice ||
                  "Online athlete bib registration is currently closed or paused by the Race Director. Please check back shortly or contact the Athlete Secretariat."}
              </p>
              <div className="pt-2">
                <span className="inline-block px-4 py-2 rounded-full bg-slate-100 dark:bg-white/[0.06] text-xs font-mono text-slate-700 dark:text-stone border border-slate-200 dark:border-white/10">
                  Official Secretariat Hotline: +91 94310 88200
                </span>
              </div>
            </div>
          ) : (
            /* Multi-step Form */
            <form onSubmit={handleSubmit}>
              {/* Stepper Header */}
              <div className="flex items-center justify-between pb-8 mb-8 border-b border-slate-200 dark:border-white/10">
                {[
                  { stepNum: 1, title: "Runner Details" },
                  { stepNum: 2, title: "Category & Bib" },
                  { stepNum: 3, title: "Review & Waiver" },
                  { stepNum: 4, title: "Pay & Confirm" },
                ].map((s) => (
                  <div key={s.stepNum} className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-numbers font-black transition-all ${
                        step === s.stepNum
                          ? "bg-[#CCFF00] text-black shadow-sm"
                          : step > s.stepNum
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-volt border border-emerald-300 dark:border-volt/30"
                          : "bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/10"
                      }`}
                    >
                      {step > s.stepNum ? <Check className="w-4 h-4" /> : s.stepNum}
                    </div>
                    <span
                      className={`hidden md:inline-block text-xs font-heading uppercase tracking-wider ${
                        step === s.stepNum ? "text-slate-900 dark:text-white font-black" : "text-slate-500 dark:text-slate-400 font-semibold"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Form level error */}
              {errors.form && (
                <div className="mb-6 p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
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
                      <label className="label-subtle block mb-2 text-slate-700 dark:text-slate-300 font-bold">FULL ATHLETE NAME *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="Enter full name"
                        className={`w-full px-4 py-3 rounded-md bg-slate-50 dark:bg-[#0D121C] border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors font-medium ${
                          errors.fullName ? "border-rose-500" : "border-slate-200 dark:border-white/10"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="label-subtle block mb-2 text-slate-700 dark:text-slate-300 font-bold">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="Enter email address"
                        className={`w-full px-4 py-3 rounded-md bg-slate-50 dark:bg-[#0D121C] border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors font-medium ${
                          errors.email ? "border-rose-500" : "border-slate-200 dark:border-white/10"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="label-subtle block mb-2 text-slate-700 dark:text-slate-300 font-bold">WHATSAPP / MOBILE NUMBER *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        className={`w-full px-4 py-3 rounded-md bg-slate-50 dark:bg-[#0D121C] border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors font-medium ${
                          errors.phone ? "border-rose-500" : "border-slate-200 dark:border-white/10"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="label-subtle block mb-2 text-slate-700 dark:text-slate-300 font-bold">GENDER *</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["male", "female", "other"] as const).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => updateField("gender", g)}
                            className={`py-3 rounded-md text-xs font-heading uppercase tracking-wider font-extrabold border transition-all ${
                              formData.gender === g
                                ? "bg-slate-900 dark:bg-volt text-white dark:text-black border-slate-900 dark:border-volt shadow-sm"
                                : "bg-slate-100 dark:bg-[#182438] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="label-subtle block mb-2 text-slate-700 dark:text-slate-300 font-bold">
                        DATE OF BIRTH *
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type="date"
                          min="1995-01-01"
                          max="2026-12-31"
                          value={formData.dob}
                          onChange={(e) => updateField("dob", e.target.value)}
                          onClick={(e) => {
                            try {
                              (e.currentTarget as any).showPicker?.();
                            } catch {}
                          }}
                          className={`w-full pl-4 pr-11 py-3 rounded-md bg-slate-50 dark:bg-[#0D121C] border text-slate-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors font-medium cursor-pointer [color-scheme:light] dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-12 [&::-webkit-calendar-picker-indicator]:h-full ${
                            errors.dob ? "border-rose-500" : "border-slate-200 dark:border-white/10"
                          }`}
                        />
                        <div className="absolute right-3.5 pointer-events-none flex items-center justify-center text-emerald-600 dark:text-volt">
                          <Calendar className="w-5 h-5 drop-shadow-[0_0_8px_rgba(204,255,0,0.35)]" />
                        </div>
                      </div>
                      {errors.dob && (
                        <p className="text-xs text-rose-500 mt-1">{errors.dob}</p>
                      )}
                    </div>

                    <div>
                      <label className="label-subtle block mb-2 text-slate-700 dark:text-slate-300 font-bold">CITY OF RESIDENCE *</label>
                      <input
                        type="text"
                        name="city"
                        autoComplete="off"
                        value={formData.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        placeholder="Enter city"
                        className={`w-full px-4 py-3 rounded-md bg-slate-50 dark:bg-[#0D121C] border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors font-medium ${
                          errors.city ? "border-rose-500" : "border-slate-200 dark:border-white/10"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-xs text-rose-500 mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="label-subtle block mb-2 text-slate-700 dark:text-slate-300 font-bold">EMERGENCY CONTACT PERSON *</label>
                      <input
                        type="text"
                        value={formData.emergencyContactName}
                        onChange={(e) => updateField("emergencyContactName", e.target.value)}
                        placeholder="Contact person name"
                        className={`w-full px-4 py-3 rounded-md bg-slate-50 dark:bg-[#0D121C] border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors font-medium ${
                          errors.emergencyContactName ? "border-rose-500" : "border-slate-200 dark:border-white/10"
                        }`}
                      />
                      {errors.emergencyContactName && (
                        <p className="text-xs text-rose-500 mt-1">
                          {errors.emergencyContactName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="label-subtle block mb-2 text-slate-700 dark:text-slate-300 font-bold">EMERGENCY PHONE *</label>
                      <input
                        type="tel"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => updateField("emergencyContactPhone", e.target.value)}
                        placeholder="Emergency contact phone"
                        className={`w-full px-4 py-3 rounded-md bg-slate-50 dark:bg-[#0D121C] border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors font-medium ${
                          errors.emergencyContactPhone ? "border-rose-500" : "border-slate-200 dark:border-white/10"
                        }`}
                      />
                      {errors.emergencyContactPhone && (
                        <p className="text-xs text-rose-500 mt-1">
                          {errors.emergencyContactPhone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#CCFF00] hover:bg-[#b8e600] text-black text-xs uppercase tracking-wider py-4 px-9 font-black rounded-[4px] hover:scale-105 transition-all duration-300 shadow-md"
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
                    <label className="label-subtle block mb-3 text-slate-700 dark:text-slate-300 font-bold">SELECT RACE DISTANCE CATEGORY *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CATEGORIES.map((c) => (
                        <div
                          key={c.code}
                          onClick={() => updateField("categoryCode", c.code)}
                          className={`p-5 rounded-lg border cursor-pointer transition-all ${
                            formData.categoryCode === c.code
                              ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                              : "bg-slate-50 dark:bg-[#0D121C] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-volt/30"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-heading text-lg uppercase text-slate-900 dark:text-white font-black">
                              {c.name}
                            </span>
                            <span className="font-numbers text-xl font-black text-emerald-700 dark:text-volt">
                              {c.price}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{c.tagline}</p>
                          <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10">
                            <span>Start {c.startTime}</span>
                            <span>Cutoff {c.cutoffTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live Bib Simulator & Apparel Fields */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-slate-200 dark:border-white/10">
                    {/* Left: Input controls */}
                    <div className="lg:col-span-6 space-y-6">
                      <div>
                        <label className="label-subtle block mb-2 text-slate-700 dark:text-slate-300 font-bold">ATHLETE BIB ALLOTMENT</label>
                        <div className="px-4 py-3 rounded-md bg-slate-50 dark:bg-[#0D121C] border border-slate-200 dark:border-white/10 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold uppercase tracking-wider">
                              Assigned Participant Name
                            </span>
                            <span className="font-heading text-lg uppercase text-slate-900 dark:text-white font-black tracking-wider">
                              {formData.fullName || "ATHLETE NAME"}
                            </span>
                          </div>
                          <span className="label-subtle text-[9px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-volt px-2.5 py-1 rounded border border-emerald-300 dark:border-volt/30 font-bold">
                            AUTO-ASSIGNED
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="label-subtle text-slate-700 dark:text-slate-300 font-bold">OFFICIAL ATHLETE JERSEY SIZE *</label>
                          <button
                            type="button"
                            onClick={() => setSizeGuideOpen(true)}
                            className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-volt hover:underline font-bold"
                          >
                            <Info className="w-3 h-3" />
                            <span>Size Guide</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {(["XS", "S", "M", "L", "XL", "XXL"] as const).map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => updateField("tShirtSize", size)}
                              className={`py-2.5 rounded-md text-xs font-numbers font-black border transition-all ${
                                formData.tShirtSize === size
                                  ? "bg-slate-900 dark:bg-volt text-white dark:text-black border-slate-900 dark:border-volt shadow-sm"
                                  : "bg-slate-100 dark:bg-[#182438] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white"
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
                      <span className="label-subtle block mb-2 text-slate-500 dark:text-slate-400 font-bold">
                        LIVE BIB PREVIEW
                      </span>
                      <div className="relative rounded-lg p-5 bg-white dark:bg-[#0D121C] border-2 border-slate-300 dark:border-white/15 shadow-md overflow-hidden text-center">
                        {/* Top Bib Punch Holes */}
                        <div className="flex justify-between items-center mb-3 px-2">
                          <div className="w-3.5 h-3.5 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20" />
                          <span className="font-heading text-xs tracking-wider text-slate-500 dark:text-slate-400 uppercase font-black">
                            PATNA 2027 • OFFICIAL TIMED ATHLETE
                          </span>
                          <div className="w-3.5 h-3.5 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20" />
                        </div>

                        {/* Category Banner */}
                        <div className="py-1 px-4 rounded bg-[#CCFF00] text-black text-[11px] font-black uppercase tracking-widest inline-block mb-3 shadow-sm">
                          {selectedCat.name} • {selectedCat.distance}
                        </div>

                        {/* Bib Number */}
                        <div className="font-numbers text-5xl font-black text-slate-900 dark:text-white tracking-widest">
                          {selectedCat.code.toUpperCase()}-2027
                        </div>

                        {/* Live Bib Name */}
                        <div className="font-heading text-2xl uppercase tracking-wider text-emerald-700 dark:text-volt mt-1 font-black min-h-[32px]">
                          {formData.fullName ? formData.fullName.toUpperCase() : "ATHLETE NAME"}
                        </div>

                        {/* Bottom Tag */}
                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                          <span>Jersey: {formData.tShirtSize}</span>
                          <span className="flex items-center gap-1 text-orange-600 dark:text-amber-400 font-bold">
                            <QrCode className="w-3.5 h-3.5" />
                            ChronoTrack RFID Sensor
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn-ghost-luxury text-xs uppercase tracking-wider py-3.5 px-6 font-bold border border-slate-300 dark:border-white/15"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#CCFF00] hover:bg-[#b8e600] text-black text-xs uppercase tracking-wider py-3.5 px-8 font-black rounded-[4px] shadow-sm hover:scale-105 transition-all"
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
                  <div className="p-6 rounded-lg bg-slate-50 dark:bg-[#0D121C] border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                      <div>
                        <span className="label-subtle text-[9px] text-slate-500 dark:text-slate-400 font-bold">SELECTED CATEGORY</span>
                        <h4 className="font-heading text-2xl text-slate-900 dark:text-white uppercase mt-0.5 font-black">
                          {selectedCat.name}
                        </h4>
                      </div>
                      <span className="font-numbers text-3xl font-black text-emerald-700 dark:text-volt">
                        {selectedCat.price}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
                      <div>
                        <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400 font-bold">PARTICIPANT</span>
                        <p className="text-slate-900 dark:text-white font-bold mt-0.5">{formData.fullName}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400 font-bold">JERSEY SIZE</span>
                        <p className="text-emerald-700 dark:text-volt font-black mt-0.5">{formData.tShirtSize}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400 font-bold">CITY</span>
                        <p className="text-slate-900 dark:text-white font-bold mt-0.5">{formData.city || "—"}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400 font-bold">PHONE</span>
                        <p className="text-slate-900 dark:text-white font-bold mt-0.5">{formData.phone}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400 font-bold">EMAIL</span>
                        <p className="text-slate-900 dark:text-white font-bold mt-0.5">{formData.email}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px] text-slate-500 dark:text-slate-400 font-bold">EMERGENCY CONTACT</span>
                        <p className="text-slate-900 dark:text-white font-bold mt-0.5">
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
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                      />
                      <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-body font-medium">
                        I confirm that I am medically fit to participate in the{" "}
                        <strong className="text-slate-900 dark:text-white">{selectedCat.name}</strong>. I have read
                        and agree to the official race regulations, refund terms, and release
                        organizers from liability under standard athletic indemnity waiver.
                      </span>
                    </label>
                    {errors.acceptTerms && (
                      <p className="text-xs text-rose-500 mt-2">{errors.acceptTerms}</p>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn-ghost-luxury text-xs uppercase tracking-wider py-3.5 px-6 font-bold border border-slate-300 dark:border-white/15"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#CCFF00] hover:bg-[#b8e600] text-black text-xs uppercase tracking-wider py-4 px-9 font-black rounded-[4px] hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2"
                    >
                      <span>Proceed to Payment ({selectedCat.price})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Official Payment Gateway Desk */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Total Fee Banner */}
                  <div className="p-5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-volt/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="label-subtle text-[9px] text-emerald-800 dark:text-volt font-bold block">
                        TOTAL REGISTRATION FEE PAYABLE
                      </span>
                      <h4 className="font-heading text-xl sm:text-2xl uppercase text-slate-900 dark:text-white font-black mt-0.5">
                        {selectedCat.name} ({selectedCat.distance})
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Athlete: <strong className="text-slate-900 dark:text-white">{formData.fullName}</strong> • Size: {formData.tShirtSize}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="font-numbers text-3xl sm:text-4xl font-black text-emerald-700 dark:text-volt">
                        ₹{numericAmount.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-stone block font-medium">
                        (Includes Timing Chip + Official Kit)
                      </span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethodTab("upi")}
                      className={`px-4 py-2 rounded-t-md text-xs font-heading uppercase tracking-wider font-extrabold flex items-center gap-2 border-b-2 transition-all ${
                        paymentMethodTab === "upi"
                          ? "border-emerald-600 dark:border-volt text-emerald-800 dark:text-volt bg-emerald-50/50 dark:bg-white/[0.04]"
                          : "border-transparent text-slate-500 dark:text-stone hover:text-black dark:hover:text-white"
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Instant UPI QR &amp; Apps</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethodTab("bank")}
                      className={`px-4 py-2 rounded-t-md text-xs font-heading uppercase tracking-wider font-extrabold flex items-center gap-2 border-b-2 transition-all ${
                        paymentMethodTab === "bank"
                          ? "border-emerald-600 dark:border-volt text-emerald-800 dark:text-volt bg-emerald-50/50 dark:bg-white/[0.04]"
                          : "border-transparent text-slate-500 dark:text-stone hover:text-black dark:hover:text-white"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Direct Bank Transfer</span>
                    </button>
                  </div>

                  {/* TAB 1: UPI SCAN & PAY */}
                  {paymentMethodTab === "upi" && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* Left: Dynamic QR Box */}
                      <div className="md:col-span-5 p-5 rounded-lg bg-slate-50 dark:bg-[#070B12] border border-slate-200 dark:border-white/10 text-center flex flex-col items-center shadow-sm">
                        <span className="label-subtle text-[9px] text-slate-500 dark:text-stone font-bold block mb-2">
                          SCAN &amp; PAY VIA ANY UPI APP
                        </span>

                        <div className="p-3 bg-white rounded-lg shadow-md border border-slate-200 inline-block">
                          {qrSvgString ? (
                            <div
                              dangerouslySetInnerHTML={{ __html: qrSvgString }}
                              className="w-[190px] h-[190px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                            />
                          ) : (
                            <div className="w-[190px] h-[190px] flex items-center justify-center text-xs text-stone">
                              Generating QR...
                            </div>
                          )}
                        </div>

                        <div className="mt-3 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                          Google Pay • PhonePe • Paytm • BHIM
                        </div>

                        {/* Mobile Direct Pay Button */}
                        <a
                          href={upiPayUrl}
                          className="mt-3 w-full py-2.5 rounded bg-slate-900 dark:bg-volt text-white dark:text-black text-xs font-heading font-extrabold uppercase tracking-wider hover:opacity-95 transition-all shadow-sm flex items-center justify-center gap-1.5"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Tap to Pay on Mobile</span>
                        </a>
                      </div>

                      {/* Right: UPI ID & UTR Verification */}
                      <div className="md:col-span-7 space-y-4">
                        {/* Copyable UPI ID Box */}
                        <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#070B12] border border-slate-200 dark:border-white/10">
                          <span className="label-subtle text-[9px] text-slate-500 dark:text-stone font-bold block mb-1">
                            OFFICIAL RACE RECEIVING UPI ID
                          </span>
                          <div className="flex items-center justify-between gap-2 mt-1">
                            <span className="font-mono text-sm sm:text-base font-black text-emerald-800 dark:text-volt truncate">
                              {paymentSettings.upiId}
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyUpi}
                              className="px-3 py-1.5 rounded bg-emerald-600 dark:bg-volt text-white dark:text-black text-xs font-bold flex items-center gap-1 shrink-0 hover:opacity-90 transition-opacity"
                            >
                              {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedUpi ? "Copied!" : "Copy ID"}</span>
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-500 dark:text-stone mt-1.5 block">
                            Account: {paymentSettings.merchantName}
                          </span>
                        </div>

                        {/* Step Instructions */}
                        <div className="p-4 rounded-lg bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/05 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                          <div className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-emerald-600 dark:bg-volt text-white dark:text-black text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              1
                            </span>
                            <span>Open your UPI app, scan the QR code or transfer <strong>₹{numericAmount}</strong> to the UPI ID above.</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-emerald-600 dark:bg-volt text-white dark:text-black text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              2
                            </span>
                            <span>Enter the 12-digit UPI Reference / UTR Number below to claim your official bib instantly.</span>
                          </div>
                        </div>

                        {/* UTR Input */}
                        <div>
                          <label className="label-subtle block mb-1.5 text-slate-700 dark:text-slate-300 font-bold">
                            12-DIGIT UPI REFERENCE / UTR NO. (OPTIONAL / VERIFICATION)
                          </label>
                          <input
                            type="text"
                            maxLength={16}
                            value={utrNumber}
                            onChange={(e) => setUtrNumber(e.target.value)}
                            placeholder="e.g. 432109876543 (from your UPI receipt)"
                            className="w-full px-4 py-3 rounded-md bg-slate-50 dark:bg-[#0D121C] border border-slate-200 dark:border-white/10 font-mono text-sm text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                          />
                          <p className="text-[10px] text-slate-500 dark:text-stone mt-1">
                            Available in your payment receipt under &quot;UPI Ref No.&quot; or &quot;UTR&quot;.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: BANK TRANSFER */}
                  {paymentMethodTab === "bank" && (
                    <div className="p-6 rounded-lg bg-slate-50 dark:bg-[#070B12] border border-slate-200 dark:border-white/10 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="label-subtle text-[9px] text-slate-500 dark:text-stone block font-bold">BENEFICIARY ACCOUNT NAME</span>
                          <span className="text-slate-900 dark:text-white font-bold text-sm block mt-0.5">
                            {paymentSettings.merchantName}
                          </span>
                        </div>
                        <div>
                          <span className="label-subtle text-[9px] text-slate-500 dark:text-stone block font-bold">ACCOUNT NUMBER</span>
                          <span className="font-mono text-sm sm:text-base font-black text-emerald-800 dark:text-volt block mt-0.5">
                            {paymentSettings.accountNumber || "50200084729103"}
                          </span>
                        </div>
                        <div>
                          <span className="label-subtle text-[9px] text-slate-500 dark:text-stone block font-bold">IFSC CODE</span>
                          <span className="font-mono text-sm font-bold text-slate-900 dark:text-white block mt-0.5">
                            {paymentSettings.ifscCode || "HDFC0001234"}
                          </span>
                        </div>
                        <div>
                          <span className="label-subtle text-[9px] text-slate-500 dark:text-stone block font-bold">BANK &amp; BRANCH</span>
                          <span className="text-slate-900 dark:text-white font-medium block mt-0.5">
                            HDFC Bank, Exhibition Road Branch, Patna
                          </span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="label-subtle block mb-1.5 text-slate-700 dark:text-slate-300 font-bold">
                          BANK TRANSACTION / IMPS REFERENCE NO.
                        </label>
                        <input
                          type="text"
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          placeholder="Enter NEFT / IMPS reference number"
                          className="w-full px-4 py-3 rounded-md bg-white dark:bg-[#0D121C] border border-slate-200 dark:border-white/10 font-mono text-sm text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Trust Banner */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-stone pt-2">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-volt" />
                      <span>100% Secure Athletics Federation Verified Portal</span>
                    </span>
                    <span>Instant Digital Pass Generation</span>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn-ghost-luxury text-xs uppercase tracking-wider py-3.5 px-6 font-bold border border-slate-300 dark:border-white/15"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#CCFF00] hover:bg-[#b8e600] text-black text-xs uppercase tracking-wider py-4 px-9 disabled:opacity-50 font-black rounded-[4px] hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <RotateCcw className="w-4 h-4 animate-spin" />
                          <span>Verifying Payment &amp; Issuing Bib...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>I Have Paid • Claim Official Bib</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
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
              className="relative w-full max-w-md bg-white rounded-lg border border-slate-200 p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h4 className="font-heading text-xl uppercase text-slate-900 font-bold">
                  Official Jersey Size Chart
                </h4>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(false)}
                  className="p-1 rounded text-slate-500 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-900 label-subtle font-bold">
                      <th className="py-2">SIZE</th>
                      <th className="py-2">CHEST</th>
                      <th className="py-2">LENGTH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {sizeChart.map((row) => (
                      <tr key={row.size} className="hover:text-slate-900 font-medium">
                        <td className="py-2.5 font-bold font-numbers text-slate-900">{row.size}</td>
                        <td className="py-2.5">{row.chest}</td>
                        <td className="py-2.5">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-slate-500 mt-4 leading-relaxed font-body font-medium">
                T-shirts are crafted from technical moisture-wicking dry-fit athletic polyester. In case of size exchange, visit the Expo Helpdesk between February 4 to 6, 2027.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
