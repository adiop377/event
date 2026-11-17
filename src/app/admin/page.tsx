"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Award,
  DollarSign,
  Package,
  Search,
  Filter,
  Plus,
  Download,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Eye,
  Edit2,
  Trash2,
  X,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  HeartPulse,
  Droplets,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Lock,
  Unlock,
  AlertCircle,
  QrCode,
  Printer,
  ArrowRight,
  Radio,
  Sliders,
  Megaphone,
  Calendar,
  KeyRound,
  Check,
  Wallet,
  AlertTriangle,
} from "lucide-react";
import { RunnerRegistration } from "@/data/registrationsStore";

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "21k": { bg: "bg-volt/15", text: "text-volt", border: "border-volt/40" },
  "10k": { bg: "bg-sky-400/15", text: "text-sky-400", border: "border-sky-400/40" },
  "5k": { bg: "bg-emerald-400/15", text: "text-emerald-400", border: "border-emerald-400/40" },
};

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [runners, setRunners] = useState<RunnerRegistration[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedKitFilter, setSelectedKitFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<
    "control" | "roster" | "overview" | "expo" | "operations"
  >("control");

  // Master Control State
  const [eventControl, setEventControl] = useState<any>(null);
  const [savingControl, setSavingControl] = useState(false);
  const [controlSuccessMessage, setControlSuccessMessage] = useState<string | null>(null);

  // Broadcast Alert Editor State
  const [alertActive, setAlertActive] = useState(false);
  const [alertType, setAlertType] = useState<"info" | "warning" | "alert">("info");
  const [alertMessage, setAlertMessage] = useState("");

  // Registration Notice State
  const [regNotice, setRegNotice] = useState("");

  // Schedule State
  const [scheduleData, setScheduleData] = useState({
    date: "7 Feb 2027",
    venue: "JP Ganga Path, Vending Zone",
    reportingTime: "04:30 AM IST",
    flagOff21k: "05:00 AM",
    flagOff10k: "06:00 AM",
    flagOff5k: "07:00 AM",
  });

  // Quotas State
  const [quotaData, setQuotaData] = useState({
    "21k": 2000,
    "10k": 1800,
    "5k": 1200,
  });

  // Admin Credentials Update State
  const [credUsername, setCredUsername] = useState("admin8976@gmail.com");
  const [credPassword, setCredPassword] = useState("");
  const [credMessage, setCredMessage] = useState<string | null>(null);

  // Admin Payment Settings State
  const [adminPaymentData, setAdminPaymentData] = useState({
    upiId: "patnamarathon@upi",
    merchantName: "Pride Patna Marathon 2027",
    accountNumber: "50200084729103",
    ifscCode: "HDFC0001234",
    enableCards: true,
  });

  // New Incident Form State
  const [newIncident, setNewIncident] = useState({
    location: "",
    severity: "low" as "low" | "medium" | "critical",
    unit: "",
    description: "",
  });

  // Modals
  const [selectedRunner, setSelectedRunner] = useState<RunnerRegistration | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRunner, setEditingRunner] = useState<RunnerRegistration | null>(null);

  // Expo Scanner state
  const [expoSearch, setExpoSearch] = useState("");
  const [expoResult, setExpoResult] = useState<RunnerRegistration | null>(null);
  const [expoMessage, setExpoMessage] = useState<string | null>(null);

  // Add runner form state
  const [newRunner, setNewRunner] = useState({
    fullName: "",
    bibName: "",
    email: "",
    phone: "",
    gender: "male" as const,
    dob: "1995-05-15",
    city: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    categoryCode: "21k" as const,
    tShirtSize: "L" as const,
    medicalNotes: "",
  });

  // Fetch Event Control Settings
  const fetchEventControl = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const json = await res.json();
      if (json.success && json.control) {
        setEventControl(json.control);
        setAlertActive(json.control.emergencyAlert.active);
        setAlertType(json.control.emergencyAlert.type);
        setAlertMessage(json.control.emergencyAlert.message);
        setRegNotice(json.control.registrationNotice);
        if (json.control.eventSchedule) setScheduleData(json.control.eventSchedule);
        if (json.control.categoryQuotas) setQuotaData(json.control.categoryQuotas);
        if (json.control.paymentSettings) setAdminPaymentData(json.control.paymentSettings);
        if (json.currentAdminUsername) setCredUsername(json.currentAdminUsername);
      }
    } catch (err) {
      console.error("Failed to load control settings:", err);
    }
  };

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [runnersRes] = await Promise.all([
        fetch("/api/admin/runners"),
        fetchEventControl(),
      ]);
      const json = await runnersRes.json();
      if (json.success) {
        setRunners(json.runners);
        setMetrics(json.metrics);
      }
    } catch (err) {
      console.error("Failed to load runners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("patna_admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
    setAuthChecking(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginId, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoginError(data.error || "Invalid ID or Password! Only authorized organizers can log in.");
        setLoggingIn(false);
        return;
      }
      localStorage.setItem("patna_admin_token", data.token);
      setIsAuthenticated(true);
      setLoggingIn(false);
      fetchData();
    } catch (err) {
      setLoginError("Server communication error. Please try again.");
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("patna_admin_token");
    document.cookie = "patna_admin_token=; path=/; max-age=0;";
    setIsAuthenticated(false);
    setLoginId("");
    setLoginPassword("");
  };

  // Master Control Actions
  const handleToggleRegistrations = async () => {
    setSavingControl(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_registrations" }),
      });
      const data = await res.json();
      if (data.success) {
        setEventControl(data.control);
        setControlSuccessMessage(
          data.control.registrationsOpen
            ? "Registrations are now LIVE on the public website!"
            : "Registrations are now PAUSED on the public website."
        );
        setTimeout(() => setControlSuccessMessage(null), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingControl(false);
    }
  };

  const handleSaveRegistrationNotice = async () => {
    setSavingControl(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_control",
          payload: { registrationNotice: regNotice },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEventControl(data.control);
        setControlSuccessMessage("Registration notice updated successfully!");
        setTimeout(() => setControlSuccessMessage(null), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingControl(false);
    }
  };

  const handleSaveAlertBroadcast = async (overrideActive?: boolean) => {
    setSavingControl(true);
    const targetActive = overrideActive !== undefined ? overrideActive : !alertActive;
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle_emergency_alert",
          payload: {
            active: targetActive,
            message: alertMessage,
            type: alertType,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEventControl(data.control);
        setAlertActive(targetActive);
        setControlSuccessMessage(
          targetActive
            ? "Live broadcast banner is now active across all public website pages!"
            : "Live broadcast banner has been deactivated."
        );
        setTimeout(() => setControlSuccessMessage(null), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingControl(false);
    }
  };

  const handleSaveRaceMode = async (mode: string) => {
    setSavingControl(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_control",
          payload: { raceMode: mode },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEventControl(data.control);
        setControlSuccessMessage(`Event lifecycle phase switched to ${mode.toUpperCase()}!`);
        setTimeout(() => setControlSuccessMessage(null), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingControl(false);
    }
  };

  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingControl(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_control",
          payload: { eventSchedule: scheduleData },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEventControl(data.control);
        setControlSuccessMessage("Race schedule & flag-off timetable saved!");
        setTimeout(() => setControlSuccessMessage(null), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingControl(false);
    }
  };

  const handleSaveQuotas = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingControl(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_control",
          payload: { categoryQuotas: quotaData },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEventControl(data.control);
        setControlSuccessMessage("Category quotas and capacity caps saved!");
        setTimeout(() => setControlSuccessMessage(null), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingControl(false);
    }
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credUsername.trim() || !credPassword.trim()) {
      setCredMessage("Username and password cannot be empty.");
      return;
    }
    setSavingControl(true);
    setCredMessage(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_credentials",
          payload: { newUsername: credUsername, newPassword: credPassword },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCredMessage("Credentials updated successfully in real-time!");
        setCredPassword("");
      } else {
        setCredMessage(data.error || "Failed to update credentials.");
      }
    } catch (err) {
      setCredMessage("Failed to update credentials.");
    } finally {
      setSavingControl(false);
    }
  };

  const handleSavePaymentSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingControl(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_control",
          payload: { paymentSettings: adminPaymentData },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEventControl(data.control);
        setControlSuccessMessage("Receiving UPI & Bank payment details saved in real-time!");
        setTimeout(() => setControlSuccessMessage(null), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingControl(false);
    }
  };

  const handleAddIncident = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncident.location.trim() || !newIncident.description.trim()) return;
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_incident",
          payload: {
            ...newIncident,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: "active",
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEventControl(data.control);
        setNewIncident({ location: "", severity: "low", unit: "", description: "" });
        setControlSuccessMessage("Incident successfully dispatched and logged!");
        setTimeout(() => setControlSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleIncident = async (id: string) => {
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_incident", payload: { id } }),
      });
      const data = await res.json();
      if (data.success) {
        setEventControl(data.control);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered runners
  const filteredRunners = useMemo(() => {
    return runners.filter((r) => {
      const matchSearch =
        searchQuery === "" ||
        r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.bibNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.phone.includes(searchQuery) ||
        r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === "all" || r.categoryCode === selectedCategory;

      const matchKit =
        selectedKitFilter === "all" ||
        (selectedKitFilter === "collected" && r.kitCollected) ||
        (selectedKitFilter === "pending" && !r.kitCollected);

      return matchSearch && matchCategory && matchKit;
    });
  }, [runners, searchQuery, selectedCategory, selectedKitFilter]);

  // Handle Kit Toggle
  const handleToggleKit = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/runners/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggleKit" }),
      });
      const json = await res.json();
      if (json.success) {
        setRunners((prev) =>
          prev.map((r) => (r.id === id ? json.runner : r))
        );
        if (selectedRunner?.id === id) {
          setSelectedRunner(json.runner);
        }
        if (expoResult?.id === id) {
          setExpoResult(json.runner);
        }
        fetchData();
      }
    } catch (err) {
      console.error("Failed to toggle kit:", err);
    }
  };

  // Handle Delete Runner
  const handleDeleteRunner = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove runner ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/runners/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setRunners((prev) => prev.filter((r) => r.id !== id));
        if (selectedRunner?.id === id) setSelectedRunner(null);
        fetchData();
      }
    } catch (err) {
      console.error("Failed to delete runner:", err);
    }
  };

  // Handle Add Runner Submit
  const handleAddRunner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/runners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRunner),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        setNewRunner({
          fullName: "",
          bibName: "",
          email: "",
          phone: "",
          gender: "male",
          dob: "1995-05-15",
          city: "",
          emergencyContactName: "",
          emergencyContactPhone: "",
          categoryCode: "21k",
          tShirtSize: "L",
          medicalNotes: "",
        });
        fetchData();
      } else {
        alert(json.message || "Failed to add runner");
      }
    } catch (err) {
      console.error("Add runner error:", err);
    }
  };

  // Handle Edit Runner Submit
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRunner) return;
    try {
      const res = await fetch(`/api/admin/runners/${editingRunner.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingRunner),
      });
      const json = await res.json();
      if (json.success) {
        setRunners((prev) =>
          prev.map((r) => (r.id === editingRunner.id ? json.runner : r))
        );
        setEditingRunner(null);
        fetchData();
      }
    } catch (err) {
      console.error("Failed to edit runner:", err);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (runners.length === 0) return;
    const headers = [
      "Bib Number",
      "Full Name",
      "Bib Name",
      "Category",
      "Gender",
      "Date of Birth",
      "Email",
      "Phone",
      "City",
      "T-Shirt Size",
      "Emergency Contact",
      "Emergency Phone",
      "Corral",
      "Amount Paid",
      "Payment Status",
      "Kit Collected",
      "Kit Collected At",
      "Registered At",
      "Transaction ID",
    ];

    const rows = runners.map((r) => [
      r.bibNumber,
      `"${r.fullName}"`,
      `"${r.bibName}"`,
      r.categoryCode.toUpperCase(),
      r.gender,
      r.dob,
      r.email,
      r.phone,
      `"${r.city}"`,
      r.tShirtSize,
      `"${r.emergencyContactName}"`,
      r.emergencyContactPhone,
      `"${r.corral}"`,
      r.amountPaid,
      r.paymentStatus,
      r.kitCollected ? "YES" : "NO",
      r.kitCollectedAt || "-",
      r.registeredAt,
      r.transactionId,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `patna-marathon-2027-runners-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Expo Scanner search
  const handleExpoSearch = (query: string) => {
    setExpoSearch(query);
    setExpoMessage(null);
    if (!query.trim()) {
      setExpoResult(null);
      return;
    }
    const clean = query.trim().toLowerCase();
    const found = runners.find(
      (r) =>
        r.bibNumber.toLowerCase().includes(clean) ||
        r.phone.includes(clean) ||
        r.fullName.toLowerCase().includes(clean)
    );
    setExpoResult(found || null);
  };

  // Auth checking screen
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#070B12] text-ivory flex flex-col items-center justify-center font-body selection:bg-volt selection:text-black">
        <div className="w-12 h-12 rounded-full border-2 border-volt/20 border-t-volt animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest text-stone">Authenticating Race Control Session...</p>
      </div>
    );
  }

  // Login Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070B12] text-ivory flex items-center justify-center p-4 relative overflow-hidden font-body selection:bg-volt selection:text-black">
        {/* Glow ambient effects */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-volt/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative w-full max-w-md bg-[#0A0F1A]/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-volt/10 border border-volt/40 flex items-center justify-center text-volt mb-4 shadow-[0_0_20px_rgba(204,255,0,0.25)]">
              <Lock className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-[10px] font-heading uppercase tracking-widest text-volt font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Restricted Area
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-wider text-ivory">
              Race Director Portal
            </h1>
            <p className="text-stone text-xs mt-1.5 leading-relaxed">
              Patna Marathon 2027 Official Control Dashboard. Only authorized race directors can access this console.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone mb-2 font-bold">
                Director ID / Username
              </label>
              <input
                type="text"
                required
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="Enter Admin ID"
                className="w-full px-4 py-3 rounded-lg bg-[#070B12] border border-white/10 text-white placeholder-stone/40 text-sm focus:outline-none focus:border-volt/70 focus:ring-1 focus:ring-volt transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone mb-2 font-bold">
                Security Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-[#070B12] border border-white/10 text-white placeholder-stone/40 text-sm focus:outline-none focus:border-volt/70 focus:ring-1 focus:ring-volt transition-all pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone hover:text-white transition-colors"
                >
                  {showPassword ? <Eye className="w-4 h-4 text-volt" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 rounded-lg bg-volt hover:bg-[#b8e600] text-black font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:scale-[1.01] transition-all disabled:opacity-50"
            >
              {loggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Admin Console</span>
                </>
              )}
            </button>
          </form>

          {/* Notice & Back */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs text-stone">
            <span className="text-[11px] text-stone/70">Public Sign-up Disabled</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-volt hover:underline font-medium text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B12] text-ivory flex flex-col font-body selection:bg-volt selection:text-black">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-50 bg-[#090D14]/95 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-volt/10 border border-volt/40 flex items-center justify-center text-volt font-black font-numbers text-lg shadow-[0_0_12px_rgba(204,255,0,0.3)]">
            PM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg tracking-wider text-ivory uppercase font-black">
                PATNA MARATHON
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-volt text-black uppercase">
                RACE CONTROL
              </span>
            </div>
            <p className="text-[11px] text-stone">
              Central Timing Database &amp; Official Athlete Operations Portal
            </p>
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchData}
            title="Refresh Data"
            className="p-2 rounded-md bg-[#0D1422] border border-white/10 text-stone hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-volt" : ""}`} />
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#0D1422] border border-white/10 hover:border-white/25 text-xs text-stone hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-volt" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-volt text-black text-xs font-heading uppercase tracking-wider font-extrabold shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Runner</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white/[0.05] border border-white/10 text-xs text-stone hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Website</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            title="Logout of Admin"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/30 text-xs text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Summary Cards */}
        {metrics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Runners */}
            <div className="p-5 rounded-lg bg-[#0A0F1A] border border-white/[0.08] relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="label-subtle text-[10px] text-stone tracking-wider font-bold">
                  REGISTERED RUNNERS
                </span>
                <Users className="w-4 h-4 text-volt" />
              </div>
              <div className="font-numbers text-3xl sm:text-4xl font-black text-ivory">
                {metrics.totalRunners}
              </div>
              <div className="mt-2 text-xs text-stone flex items-center justify-between">
                <span>Capacity: 5,000 slots</span>
                <span className="text-volt font-bold">
                  {Math.round((metrics.totalRunners / 5000) * 100)}%
                </span>
              </div>
              <div className="w-full h-1 bg-white/[0.08] rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-volt"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(5, (metrics.totalRunners / 5000) * 100)
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Total Revenue */}
            <div className="p-5 rounded-lg bg-[#0A0F1A] border border-white/[0.08] relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="label-subtle text-[10px] text-stone tracking-wider font-bold">
                  TOTAL REVENUE
                </span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="font-numbers text-3xl sm:text-4xl font-black text-ivory">
                ₹{metrics.totalRevenue.toLocaleString()}
              </div>
              <p className="mt-2 text-xs text-stone">
                100% Verified AFI Payment Gateway
              </p>
            </div>

            {/* Expo Kit Collection */}
            <div className="p-5 rounded-lg bg-[#0A0F1A] border border-white/[0.08] relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="label-subtle text-[10px] text-stone tracking-wider font-bold">
                  EXPO KITS COLLECTED
                </span>
                <Package className="w-4 h-4 text-blaze" />
              </div>
              <div className="font-numbers text-3xl sm:text-4xl font-black text-ivory flex items-baseline gap-2">
                <span>{metrics.kitCollectedCount}</span>
                <span className="text-xs font-normal text-stone font-body">
                  / {metrics.totalRunners} runners
                </span>
              </div>
              <div className="mt-2 text-xs text-stone flex items-center justify-between">
                <span>JP Ganga Path Expo</span>
                <span className="text-blaze font-bold">
                  {metrics.collectionPercentage}% Collected
                </span>
              </div>
              <div className="w-full h-1 bg-white/[0.08] rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-blaze"
                  style={{ width: `${metrics.collectionPercentage}%` }}
                />
              </div>
            </div>

            {/* Course Ops */}
            <div className="p-5 rounded-lg bg-[#0A0F1A] border border-white/[0.08] relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="label-subtle text-[10px] text-stone tracking-wider font-bold">
                  SAFETY &amp; AID STATIONS
                </span>
                <ShieldCheck className="w-4 h-4 text-sky-400" />
              </div>
              <div className="font-numbers text-3xl sm:text-4xl font-black text-ivory">
                18 / 18
              </div>
              <p className="mt-2 text-xs text-stone flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Ganges &amp; Atal Checkpoints Active</span>
              </p>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1 overflow-x-auto">
          {[
            { id: "control", label: "Master Command & Controls", icon: Sliders },
            { id: "roster", label: "Runners Database", icon: Users },
            { id: "overview", label: "Analytics & Quotas", icon: Activity },
            { id: "expo", label: "Expo Kit Distribution Desk", icon: Package },
            { id: "operations", label: "Incident & Course Ops", icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-t-md text-xs font-heading uppercase tracking-wider font-bold transition-all border-b-2 whitespace-nowrap ${
                  isActive
                    ? "border-volt text-volt bg-white/[0.04]"
                    : "border-transparent text-stone hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === "roster" && (
                  <span className="px-1.5 py-0.5 rounded-full bg-white/[0.08] text-[10px] font-mono text-ivory">
                    {runners.length}
                  </span>
                )}
                {tab.id === "control" && eventControl && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      eventControl.registrationsOpen ? "bg-emerald-400" : "bg-rose-500"
                    } animate-pulse`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Global Feedback Banner */}
        {controlSuccessMessage && (
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 shrink-0" />
              <span>{controlSuccessMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setControlSuccessMessage(null)}
              className="text-stone hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 0: MASTER COMMAND & CONTROLS */}
        {activeTab === "control" && (
          <div className="space-y-8">
            {/* Row 1: Primary Real-time Switches */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 1. Registration Gate Control */}
              <div className="p-6 rounded-lg bg-[#0A0F1A] border border-white/[0.08] relative overflow-hidden flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="label-subtle text-[10px] text-stone tracking-wider font-bold flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-volt" />
                      REGISTRATION GATE
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        eventControl?.registrationsOpen
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {eventControl?.registrationsOpen ? "● LIVE / OPEN" : "● PAUSED / CLOSED"}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-black uppercase text-ivory tracking-wide mb-1">
                    Public Athlete Bib Portal
                  </h3>
                  <p className="text-xs text-stone leading-relaxed mb-4">
                    Master gate switch. When paused, the public registration form immediately stops accepting entries and displays an official notice.
                  </p>

                  <div className="space-y-2 mb-4">
                    <label className="text-[10px] uppercase tracking-wider text-stone font-bold block">
                      Custom Athlete Notice
                    </label>
                    <textarea
                      rows={2}
                      value={regNotice}
                      onChange={(e) => setRegNotice(e.target.value)}
                      placeholder="Enter notice shown to public runners..."
                      className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory placeholder-stone/40 focus:outline-none focus:border-volt/60"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    disabled={savingControl}
                    onClick={handleToggleRegistrations}
                    className={`w-full py-3 px-4 rounded font-heading text-xs uppercase tracking-wider font-black flex items-center justify-center gap-2 transition-all shadow-md ${
                      eventControl?.registrationsOpen
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
                        : "bg-volt text-black hover:bg-[#b8e600] shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>
                      {eventControl?.registrationsOpen
                        ? "Pause Public Registrations"
                        : "Resume Public Registrations"}
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={savingControl}
                    onClick={handleSaveRegistrationNotice}
                    className="w-full py-2 px-3 rounded bg-white/[0.04] hover:bg-white/[0.08] text-xs text-stone hover:text-white border border-white/10 transition-colors"
                  >
                    Save Notice Text
                  </button>
                </div>
              </div>

              {/* 2. Live Website Alert Broadcast */}
              <div className="p-6 rounded-lg bg-[#0A0F1A] border border-white/[0.08] relative overflow-hidden flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="label-subtle text-[10px] text-stone tracking-wider font-bold flex items-center gap-1.5">
                      <Megaphone className="w-3.5 h-3.5 text-blaze" />
                      WEBSITE LIVE ALERT BROADCAST
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        alertActive
                          ? "bg-volt text-black font-extrabold"
                          : "bg-white/[0.05] text-stone border border-white/10"
                      }`}
                    >
                      {alertActive ? "● BROADCASTING LIVE" : "OFFLINE"}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-black uppercase text-ivory tracking-wide mb-1">
                    Site-Wide Notification Banner
                  </h3>
                  <p className="text-xs text-stone leading-relaxed mb-4">
                    Broadcast critical race updates, traffic cordons, or bib collection advisories to all visitors across every page header.
                  </p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        Alert Priority Level
                      </label>
                      <select
                        value={alertType}
                        onChange={(e) => setAlertType(e.target.value as any)}
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory focus:outline-none focus:border-volt/60 font-semibold"
                      >
                        <option value="info">General Notice (Volt High-Energy)</option>
                        <option value="warning">Course Advisory (Amber Warning)</option>
                        <option value="alert">Emergency Bulletin (Red High-Alert)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        Broadcast Message
                      </label>
                      <textarea
                        rows={2}
                        value={alertMessage}
                        onChange={(e) => setAlertMessage(e.target.value)}
                        placeholder="Type urgent notification..."
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory placeholder-stone/40 focus:outline-none focus:border-volt/60"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    disabled={savingControl}
                    onClick={() => handleSaveAlertBroadcast(!alertActive)}
                    className={`w-full py-3 px-4 rounded font-heading text-xs uppercase tracking-wider font-black flex items-center justify-center gap-2 transition-all ${
                      alertActive
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
                        : "bg-volt text-black hover:bg-[#b8e600] shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                    }`}
                  >
                    <Megaphone className="w-3.5 h-3.5" />
                    <span>{alertActive ? "Turn Off Live Broadcast" : "Broadcast Live on Website"}</span>
                  </button>

                  {alertActive && (
                    <button
                      type="button"
                      disabled={savingControl}
                      onClick={() => handleSaveAlertBroadcast(true)}
                      className="w-full py-2 px-3 rounded bg-white/[0.04] hover:bg-white/[0.08] text-xs text-stone hover:text-white border border-white/10 transition-colors"
                    >
                      Update Broadcast Message
                    </button>
                  )}
                </div>
              </div>

              {/* 3. Event Lifecycle Phase */}
              <div className="p-6 rounded-lg bg-[#0A0F1A] border border-white/[0.08] relative overflow-hidden flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="label-subtle text-[10px] text-stone tracking-wider font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      EVENT LIFECYCLE
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-400/20 text-sky-400 border border-sky-400/30">
                      ACTIVE PHASE
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-black uppercase text-ivory tracking-wide mb-1">
                    Operational Mode
                  </h3>
                  <p className="text-xs text-stone leading-relaxed mb-4">
                    Switch marathon phases to automatically adapt dashboards and volunteer toolkits.
                  </p>

                  <div className="space-y-2">
                    {[
                      { id: "registration", label: "1. Athlete Registrations", desc: "Online registrations open" },
                      { id: "expo", label: "2. Bib Expo Handout", desc: "Kit distribution desk active at JP Ganga Path" },
                      { id: "race_day", label: "3. Live Race Day", desc: "Active timing mats & RFID gun flag-off" },
                      { id: "post_race", label: "4. Official Results", desc: "Leaderboards & finishing certificates" },
                    ].map((phase) => (
                      <button
                        key={phase.id}
                        type="button"
                        onClick={() => handleSaveRaceMode(phase.id)}
                        className={`w-full p-2.5 rounded-md text-left transition-all border ${
                          eventControl?.raceMode === phase.id
                            ? "bg-sky-500/15 border-sky-400/60 text-ivory shadow-sm"
                            : "bg-[#070B12] border-white/[0.06] text-stone hover:text-white hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-heading text-xs font-bold uppercase">
                            {phase.label}
                          </span>
                          {eventControl?.raceMode === phase.id && (
                            <span className="w-2 h-2 rounded-full bg-sky-400" />
                          )}
                        </div>
                        <span className="text-[10px] text-stone/80 block mt-0.5">
                          {phase.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <span className="text-[11px] text-stone">
                    Mode changes apply across the entire central database.
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: Event Schedule & Category Quotas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Event Timetable Form */}
              <div className="p-6 rounded-lg bg-[#0A0F1A] border border-white/[0.08] shadow-xl">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.06]">
                  <div>
                    <h3 className="font-heading text-lg font-black uppercase text-ivory tracking-wide flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-volt" />
                      <span>Race Day Schedule &amp; Timings Master</span>
                    </h3>
                    <p className="text-xs text-stone mt-0.5">
                      Central flag-off schedule and athlete reporting timeline
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#070B12] border border-white/10 font-mono text-[11px] text-volt">
                    {scheduleData.date}
                  </span>
                </div>

                <form onSubmit={handleSaveSchedule} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        Race Date
                      </label>
                      <input
                        type="text"
                        value={scheduleData.date}
                        onChange={(e) =>
                          setScheduleData({ ...scheduleData, date: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory font-mono focus:outline-none focus:border-volt/60"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        Venue
                      </label>
                      <input
                        type="text"
                        value={scheduleData.venue}
                        onChange={(e) =>
                          setScheduleData({ ...scheduleData, venue: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory font-mono focus:outline-none focus:border-volt/60"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        Reporting Time (Gates Open)
                      </label>
                      <input
                        type="text"
                        value={scheduleData.reportingTime}
                        onChange={(e) =>
                          setScheduleData({ ...scheduleData, reportingTime: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory font-mono focus:outline-none focus:border-volt/60"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        21 KM Half Marathon Flag-off
                      </label>
                      <input
                        type="text"
                        value={scheduleData.flagOff21k}
                        onChange={(e) =>
                          setScheduleData({ ...scheduleData, flagOff21k: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory font-mono focus:outline-none focus:border-volt/60"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        10 KM Urban Challenge Flag-off
                      </label>
                      <input
                        type="text"
                        value={scheduleData.flagOff10k}
                        onChange={(e) =>
                          setScheduleData({ ...scheduleData, flagOff10k: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory font-mono focus:outline-none focus:border-volt/60"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        5 KM Family Fun Run Flag-off
                      </label>
                      <input
                        type="text"
                        value={scheduleData.flagOff5k}
                        onChange={(e) =>
                          setScheduleData({ ...scheduleData, flagOff5k: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory font-mono focus:outline-none focus:border-volt/60"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={savingControl}
                      className="px-5 py-2.5 rounded bg-volt text-black text-xs font-heading font-black uppercase tracking-wider hover:bg-[#b8e600] shadow-[0_0_15px_rgba(204,255,0,0.25)] transition-all"
                    >
                      Save Official Schedule
                    </button>
                  </div>
                </form>
              </div>

              {/* Category Quotas & Capacity Caps */}
              <div className="p-6 rounded-lg bg-[#0A0F1A] border border-white/[0.08] shadow-xl">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.06]">
                  <div>
                    <h3 className="font-heading text-lg font-black uppercase text-ivory tracking-wide flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <span>Category Slot Quotas &amp; Limits</span>
                    </h3>
                    <p className="text-xs text-stone mt-0.5">
                      Control maximum athlete bib capacity per distance
                    </p>
                  </div>
                  <span className="font-numbers text-xs text-stone">
                    Total: {quotaData["21k"] + quotaData["10k"] + quotaData["5k"]} Slots
                  </span>
                </div>

                <form onSubmit={handleSaveQuotas} className="space-y-4">
                  {/* 21KM */}
                  <div className="p-3.5 rounded bg-[#070B12] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading text-xs uppercase font-bold text-volt">
                        21 KM Half Marathon
                      </span>
                      <span className="font-numbers text-xs text-stone">
                        Enrolled: {metrics?.categoryCounts?.["21k"] || 0} / {quotaData["21k"]}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={100}
                        max={10000}
                        value={quotaData["21k"]}
                        onChange={(e) =>
                          setQuotaData({ ...quotaData, "21k": parseInt(e.target.value, 10) || 0 })
                        }
                        className="w-32 px-3 py-1.5 rounded bg-[#0A0F1A] border border-white/10 text-xs text-ivory font-mono focus:outline-none focus:border-volt/60"
                      />
                      <div className="flex-1 h-2 bg-white/[0.08] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-volt"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(5, ((metrics?.categoryCounts?.["21k"] || 0) / quotaData["21k"]) * 100)
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 10KM */}
                  <div className="p-3.5 rounded bg-[#070B12] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading text-xs uppercase font-bold text-sky-400">
                        10 KM Urban Challenge
                      </span>
                      <span className="font-numbers text-xs text-stone">
                        Enrolled: {metrics?.categoryCounts?.["10k"] || 0} / {quotaData["10k"]}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={100}
                        max={10000}
                        value={quotaData["10k"]}
                        onChange={(e) =>
                          setQuotaData({ ...quotaData, "10k": parseInt(e.target.value, 10) || 0 })
                        }
                        className="w-32 px-3 py-1.5 rounded bg-[#0A0F1A] border border-white/10 text-xs text-ivory font-mono focus:outline-none focus:border-volt/60"
                      />
                      <div className="flex-1 h-2 bg-white/[0.08] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-400"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(5, ((metrics?.categoryCounts?.["10k"] || 0) / quotaData["10k"]) * 100)
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5KM */}
                  <div className="p-3.5 rounded bg-[#070B12] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading text-xs uppercase font-bold text-emerald-400">
                        5 KM Family Fun Run
                      </span>
                      <span className="font-numbers text-xs text-stone">
                        Enrolled: {metrics?.categoryCounts?.["5k"] || 0} / {quotaData["5k"]}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={100}
                        max={10000}
                        value={quotaData["5k"]}
                        onChange={(e) =>
                          setQuotaData({ ...quotaData, "5k": parseInt(e.target.value, 10) || 0 })
                        }
                        className="w-32 px-3 py-1.5 rounded bg-[#0A0F1A] border border-white/10 text-xs text-ivory font-mono focus:outline-none focus:border-volt/60"
                      />
                      <div className="flex-1 h-2 bg-white/[0.08] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(5, ((metrics?.categoryCounts?.["5k"] || 0) / quotaData["5k"]) * 100)
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={savingControl}
                      className="px-5 py-2.5 rounded bg-white/[0.06] hover:bg-white/[0.1] text-xs font-heading font-black uppercase tracking-wider text-white border border-white/10 transition-all"
                    >
                      Update Category Caps
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Row 3: Payment Gateway Receiving & Security Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Receiving Setup */}
              <div className="p-6 rounded-lg bg-[#0A0F1A] border border-emerald-500/30 shadow-xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                  <div>
                    <h3 className="font-heading text-lg font-black uppercase text-ivory tracking-wide flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-emerald-400" />
                      <span>Payment Receiving Gateway &amp; UPI Setup</span>
                    </h3>
                    <p className="text-xs text-stone mt-0.5">
                      Configure your official UPI ID and Bank Account where athletes transfer fees
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold">
                    ACTIVE GATEWAY
                  </span>
                </div>

                <form onSubmit={handleSavePaymentSettings} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        Receiving Official UPI ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={adminPaymentData.upiId}
                        onChange={(e) =>
                          setAdminPaymentData({ ...adminPaymentData, upiId: e.target.value.trim() })
                        }
                        placeholder="e.g. marathon@upi"
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory font-mono focus:outline-none focus:border-volt/60"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        Merchant / Payee Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={adminPaymentData.merchantName}
                        onChange={(e) =>
                          setAdminPaymentData({ ...adminPaymentData, merchantName: e.target.value })
                        }
                        placeholder="Pride Patna Marathon"
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory focus:outline-none focus:border-volt/60"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        Beneficiary Account Number
                      </label>
                      <input
                        type="text"
                        value={adminPaymentData.accountNumber || ""}
                        onChange={(e) =>
                          setAdminPaymentData({ ...adminPaymentData, accountNumber: e.target.value })
                        }
                        placeholder="Bank Account Number"
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory font-mono focus:outline-none focus:border-volt/60"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        Bank IFSC Code
                      </label>
                      <input
                        type="text"
                        value={adminPaymentData.ifscCode || ""}
                        onChange={(e) =>
                          setAdminPaymentData({ ...adminPaymentData, ifscCode: e.target.value.toUpperCase() })
                        }
                        placeholder="e.g. HDFC0001234"
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory font-mono uppercase focus:outline-none focus:border-volt/60"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-stone">
                      Dynamic UPI QR codes auto-generate with this ID.
                    </span>
                    <button
                      type="submit"
                      disabled={savingControl}
                      className="px-5 py-2.5 rounded bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-heading font-black uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all"
                    >
                      Save Payment Receiving Details
                    </button>
                  </div>
                </form>
              </div>

              {/* Security & Credentials Management */}
              <div className="p-6 rounded-lg bg-[#0A0F1A] border border-volt/20 shadow-xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                  <div>
                    <h3 className="font-heading text-lg font-black uppercase text-ivory tracking-wide flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-volt" />
                      <span>Race Director Security Credentials</span>
                    </h3>
                    <p className="text-xs text-stone mt-0.5">
                      Modify portal login ID &amp; password anytime. Public signup remains permanently disabled.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-volt/10 border border-volt/30 text-[10px] font-mono text-volt font-bold">
                    SUPER ADMIN
                  </span>
                </div>

                {credMessage && (
                  <div className="mb-4 p-3 rounded bg-volt/10 border border-volt/30 text-volt text-xs font-medium">
                    {credMessage}
                  </div>
                )}

                <form onSubmit={handleUpdateCredentials} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        Director ID / Username
                      </label>
                      <input
                        type="text"
                        required
                        value={credUsername}
                        onChange={(e) => setCredUsername(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory font-mono focus:outline-none focus:border-volt/60"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        value={credPassword}
                        onChange={(e) => setCredPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory font-mono focus:outline-none focus:border-volt/60"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-stone">
                      Active: <strong className="text-white">{credUsername}</strong>
                    </span>
                    <button
                      type="submit"
                      disabled={savingControl}
                      className="px-5 py-2.5 rounded bg-volt text-black text-xs font-heading font-black uppercase tracking-wider hover:bg-[#b8e600] shadow-[0_0_15px_rgba(204,255,0,0.25)] transition-all"
                    >
                      Update Security Credentials
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: RUNNERS ROSTER DATABASE */}
        {activeTab === "roster" && (
          <div className="space-y-6">
            {/* Search & Filter Toolbar */}
            <div className="p-4 rounded-lg bg-[#0A0F1A] border border-white/[0.08] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-md">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Runner Name, Bib #, Mobile, City, Email..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[#070B12] border border-white/10 text-xs text-ivory placeholder-stone/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-white text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: "all", label: "All Races" },
                  { id: "21k", label: "21K Half" },
                  { id: "10k", label: "10K" },
                  { id: "5k", label: "5K Fun" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1.5 rounded text-xs font-heading uppercase tracking-wider font-extrabold transition-colors ${
                      selectedCategory === c.id
                        ? "bg-volt text-black"
                        : "bg-[#070B12] text-stone hover:text-white border border-white/10"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Kit Status Filter */}
              <div className="flex items-center gap-1.5">
                {[
                  { id: "all", label: "All Kits" },
                  { id: "collected", label: "Collected" },
                  { id: "pending", label: "Pending" },
                ].map((k) => (
                  <button
                    key={k.id}
                    type="button"
                    onClick={() => setSelectedKitFilter(k.id)}
                    className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase transition-colors ${
                      selectedKitFilter === k.id
                        ? "bg-white/20 text-white"
                        : "bg-[#070B12] text-stone hover:text-white border border-white/10"
                    }`}
                  >
                    {k.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Runners Table */}
            <div className="rounded-lg bg-[#0A0F1A] border border-white/[0.08] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#070B12] border-b border-white/[0.08] text-stone uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-5 py-3.5">Bib Number</th>
                      <th className="px-5 py-3.5">Athlete &amp; Bib Name</th>
                      <th className="px-5 py-3.5">Category</th>
                      <th className="px-5 py-3.5">Contact Details</th>
                      <th className="px-5 py-3.5">City</th>
                      <th className="px-5 py-3.5">Jersey Size</th>
                      <th className="px-5 py-3.5">Expo Kit</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {filteredRunners.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-6 py-12 text-center text-stone text-sm"
                        >
                          No runners match the current search filters.
                        </td>
                      </tr>
                    ) : (
                      filteredRunners.map((runner) => {
                        const catStyle =
                          CATEGORY_COLORS[runner.categoryCode] ||
                          CATEGORY_COLORS["21k"];
                        return (
                          <tr
                            key={runner.id}
                            className="hover:bg-white/[0.02] transition-colors"
                          >
                            {/* Bib Number */}
                            <td className="px-5 py-4 font-mono font-bold">
                              <span
                                className={`px-2.5 py-1 rounded border text-[11px] ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                              >
                                {runner.bibNumber}
                              </span>
                            </td>

                            {/* Athlete & Bib Name */}
                            <td className="px-5 py-4">
                              <div className="font-bold text-ivory text-sm">
                                {runner.fullName}
                              </div>
                              <div className="text-[11px] text-stone flex items-center gap-1.5 mt-0.5">
                                <span>Bib:</span>
                                <span className="font-mono font-bold text-volt">
                                  {runner.bibName}
                                </span>
                                <span>•</span>
                                <span className="capitalize">{runner.gender}</span>
                              </div>
                            </td>

                            {/* Category & Corral */}
                            <td className="px-5 py-4">
                              <span className="font-heading font-bold uppercase text-ivory block">
                                {runner.categoryCode.toUpperCase()}
                              </span>
                              <span className="text-[10px] text-stone">
                                {runner.corral}
                              </span>
                            </td>

                            {/* Contact Details */}
                            <td className="px-5 py-4">
                              <div className="text-ivory font-mono">
                                {runner.phone}
                              </div>
                              <div className="text-[11px] text-stone truncate max-w-[180px]">
                                {runner.email}
                              </div>
                            </td>

                            {/* City */}
                            <td className="px-5 py-4 text-stone font-medium">
                              {runner.city}
                            </td>

                            {/* Jersey Size */}
                            <td className="px-5 py-4">
                              <span className="px-2 py-1 rounded bg-[#070B12] border border-white/10 font-mono font-bold text-ivory text-[11px]">
                                {runner.tShirtSize}
                              </span>
                            </td>

                            {/* Expo Kit Status Toggle */}
                            <td className="px-5 py-4">
                              <button
                                type="button"
                                onClick={() => handleToggleKit(runner.id)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold transition-all ${
                                  runner.kitCollected
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                                    : "bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20"
                                }`}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>
                                  {runner.kitCollected ? "Collected" : "Mark Kit"}
                                </span>
                              </button>
                            </td>

                            {/* Actions */}
                            <td className="px-5 py-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedRunner(runner)}
                                  title="View Dossier"
                                  className="p-1.5 rounded bg-white/[0.04] hover:bg-white/[0.1] text-stone hover:text-white transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingRunner(runner)}
                                  title="Edit Runner"
                                  className="p-1.5 rounded bg-white/[0.04] hover:bg-white/[0.1] text-stone hover:text-white transition-colors"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteRunner(runner.id, runner.fullName)
                                  }
                                  title="Delete Runner"
                                  className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-4 bg-[#070B12] border-t border-white/[0.08] flex items-center justify-between text-xs text-stone">
                <span>
                  Showing {filteredRunners.length} of {runners.length} registered
                  runners
                </span>
                <span className="font-mono">Central Timing Synced</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OVERVIEW & ANALYTICS */}
        {activeTab === "overview" && metrics && (
          <div className="space-y-8">
            {/* Category Performance Breakdown */}
            <div className="p-6 rounded-lg bg-[#0A0F1A] border border-white/[0.08]">
              <h3 className="font-heading text-lg uppercase text-ivory mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-volt" />
                <span>Race Distance Category Performance</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    code: "21k",
                    name: "21K Half Marathon",
                    fee: 1299,
                    color: "text-volt",
                    bg: "bg-volt",
                    count: metrics.categoryCounts["21k"] || 0,
                    target: 2000,
                  },
                  {
                    code: "10k",
                    name: "10K Urban Boulevard",
                    fee: 799,
                    color: "text-sky-400",
                    bg: "bg-sky-400",
                    count: metrics.categoryCounts["10k"] || 0,
                    target: 1500,
                  },
                  {
                    code: "5k",
                    name: "5K Family Fun Run",
                    fee: 499,
                    color: "text-emerald-400",
                    bg: "bg-emerald-400",
                    count: metrics.categoryCounts["5k"] || 0,
                    target: 1000,
                  },
                ].map((cat) => (
                  <div
                    key={cat.code}
                    className="p-5 rounded-md bg-[#070B12] border border-white/[0.06]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading uppercase text-sm font-bold text-ivory">
                        {cat.name}
                      </span>
                      <span className={`font-mono text-xs font-bold ${cat.color}`}>
                        ₹{cat.fee}
                      </span>
                    </div>

                    <div className="font-numbers text-3xl font-black text-ivory">
                      {cat.count}
                    </div>

                    <div className="mt-3 text-xs text-stone flex items-center justify-between">
                      <span>Target: {cat.target}</span>
                      <span className="font-bold text-ivory">
                        ₹{(cat.count * cat.fee).toLocaleString()}
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-white/[0.08] rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full ${cat.bg}`}
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(5, (cat.count / cat.target) * 100)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jersey Size Inventory Matrix */}
            <div className="p-6 rounded-lg bg-[#0A0F1A] border border-white/[0.08]">
              <h3 className="font-heading text-lg uppercase text-ivory mb-6 flex items-center gap-2">
                <Package className="w-4 h-4 text-volt" />
                <span>Athlete Official Jersey Size Allocation</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {Object.entries(metrics.jerseyCounts).map(([size, count]) => (
                  <div
                    key={size}
                    className="p-4 rounded-md bg-[#070B12] border border-white/[0.06] text-center"
                  >
                    <span className="label-subtle text-[10px] text-stone block mb-1">
                      SIZE
                    </span>
                    <span className="font-numbers text-2xl font-black text-volt block">
                      {size}
                    </span>
                    <span className="text-xs text-stone mt-1 block">
                      {Number(count)} Athletes
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EXPO KIT DISTRIBUTION DESK */}
        {activeTab === "expo" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-lg bg-[#0A0F1A] border border-volt/30 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-md bg-volt/15 border border-volt/40 flex items-center justify-center text-volt">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl uppercase text-ivory font-bold">
                    Expo Kit Handout Desk
                  </h3>
                  <p className="text-xs text-stone">
                    Scan or enter Bib Number / Athlete Mobile to issue official race kit
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-stone absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={expoSearch}
                    onChange={(e) => handleExpoSearch(e.target.value)}
                    placeholder="Enter Bib Number (e.g. PPM-21K-2045) or 10-digit Phone..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-md bg-[#070B12] border border-white/10 text-sm text-ivory placeholder-stone/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt font-mono"
                  />
                </div>
              </div>

              {/* Result Area */}
              {expoResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 rounded-lg bg-[#070B12] border border-white/10 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
                    <div>
                      <span className="px-3 py-1 rounded bg-volt text-black text-xs font-mono font-black uppercase">
                        {expoResult.bibNumber}
                      </span>
                      <h4 className="font-heading text-2xl uppercase text-ivory font-bold mt-2">
                        {expoResult.fullName}
                      </h4>
                      <p className="text-xs text-stone">
                        Chest Bib Print:{" "}
                        <strong className="text-volt">{expoResult.bibName}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="label-subtle text-[10px] text-stone block">
                        EXPO STATUS
                      </span>
                      <span
                        className={`inline-block px-3 py-1 rounded text-xs font-bold mt-1 ${
                          expoResult.kitCollected
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {expoResult.kitCollected
                          ? "KIT ISSUED & RECORDED"
                          : "KIT PENDING HANDOUT"}
                      </span>
                    </div>
                  </div>

                  {/* Checklist for Expo volunteer */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded bg-[#0A0F1A] border border-white/[0.06]">
                      <span className="label-subtle text-[9px] text-stone block">
                        RACE CATEGORY
                      </span>
                      <span className="font-heading text-base font-bold text-ivory uppercase">
                        {expoResult.categoryCode}
                      </span>
                    </div>
                    <div className="p-3 rounded bg-[#0A0F1A] border border-white/[0.06]">
                      <span className="label-subtle text-[9px] text-stone block">
                        JERSEY SIZE
                      </span>
                      <span className="font-numbers text-xl font-bold text-volt">
                        {expoResult.tShirtSize}
                      </span>
                    </div>
                    <div className="p-3 rounded bg-[#0A0F1A] border border-white/[0.06]">
                      <span className="label-subtle text-[9px] text-stone block">
                        CORRAL CHUTE
                      </span>
                      <span className="font-medium text-xs text-ivory">
                        {expoResult.corral}
                      </span>
                    </div>
                    <div className="p-3 rounded bg-[#0A0F1A] border border-white/[0.06]">
                      <span className="label-subtle text-[9px] text-stone block">
                        TIMING RFID
                      </span>
                      <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleToggleKit(expoResult.id)}
                      className={`w-full py-4 px-6 rounded-md font-heading uppercase tracking-wider font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                        expoResult.kitCollected
                          ? "bg-rose-900/40 text-rose-200 border border-rose-500/30 hover:bg-rose-900/60"
                          : "bg-volt text-black shadow-[0_0_20px_rgba(204,255,0,0.35)] hover:scale-102"
                      }`}
                    >
                      <Package className="w-5 h-5" />
                      <span>
                        {expoResult.kitCollected
                          ? "Undo / Revert Kit Status"
                          : "Confirm & Issue Official Race Kit"}
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: COURSE & AID STATION OPS */}
        {activeTab === "operations" && (
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-[#0A0F1A] border border-white/[0.08]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-heading text-lg uppercase text-ivory font-bold">
                    Official Course Corridor Status (21 KM)
                  </h3>
                  <p className="text-xs text-stone">
                    Live operational telemetry from JP Ganga Path to Digha Ghat
                  </p>
                </div>
                <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  All Corridors Clear
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: "JP Ganga Path Hub",
                    km: "0.0 KM / 21 KM",
                    type: "Corral Flag-Off & Finish Arch",
                    status: "Ready",
                    details: "AFI Timing Mats, Corrals A-D, Apollo ICU Base",
                  },
                  {
                    title: "Dak Bungalow Crossing",
                    km: "KM 5.0 / KM 10.0",
                    type: "Urban Boulevard Checkpoint",
                    status: "Ready",
                    details: "Water Station 2, Enerzal Gel, Cultural Stage 1",
                  },
                  {
                    title: "Atal Path Expressway",
                    km: "KM 12.0 / KM 18.0",
                    type: "High-Speed Asphalt 6-Lane",
                    status: "Ready",
                    details: "Zero Cross-Traffic barricading confirmed",
                  },
                  {
                    title: "Digha Ghat Turnaround",
                    km: "KM 13.5 / KM 21 KM",
                    type: "Riverfront 180° Timing Gantry",
                    status: "Ready",
                    details: "ChronoTrack mat, Apollo ICU, Mist Fans",
                  },
                ].map((station, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-md bg-[#070B12] border border-white/[0.06] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-sm uppercase text-ivory font-bold">
                        {station.title}
                      </span>
                      <span className="text-emerald-400 font-bold text-xs">
                        ● {station.status}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-volt block">
                      {station.km}
                    </span>
                    <p className="text-xs text-stone">{station.type}</p>
                    <p className="text-[11px] text-stone/80 pt-2 border-t border-white/[0.06]">
                      {station.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Field Incident Dispatcher & Telemetry Desk */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form to Log New Incident */}
              <div className="p-6 rounded-lg bg-[#0A0F1A] border border-white/[0.08] shadow-xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                  <div>
                    <h3 className="font-heading text-lg font-black uppercase text-ivory tracking-wide flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Dispatch Field Alert</span>
                    </h3>
                    <p className="text-xs text-stone mt-0.5">
                      Log live corridor, medical, or hydration incidents
                    </p>
                  </div>
                </div>

                <form onSubmit={handleAddIncident} className="space-y-3.5">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                      Corridor Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Atal Path KM 8, Digha Chute"
                      value={newIncident.location}
                      onChange={(e) =>
                        setNewIncident({ ...newIncident, location: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory focus:outline-none focus:border-volt/60"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                      Assigned Field Unit
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apollo Ambulance 2, PCR 14, Vol 3"
                      value={newIncident.unit}
                      onChange={(e) =>
                        setNewIncident({ ...newIncident, unit: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory focus:outline-none focus:border-volt/60"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                      Severity Priority
                    </label>
                    <select
                      value={newIncident.severity}
                      onChange={(e) =>
                        setNewIncident({ ...newIncident, severity: e.target.value as any })
                      }
                      className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory focus:outline-none focus:border-volt/60 font-semibold"
                    >
                      <option value="low">Low Priority (Hydration / Barricade)</option>
                      <option value="medium">Medium Priority (Traffic / Equipment)</option>
                      <option value="critical">Critical / Emergency (Apollo Medical Call)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-stone font-bold block mb-1">
                      Incident Summary *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Describe the operational incident..."
                      value={newIncident.description}
                      onChange={(e) =>
                        setNewIncident({ ...newIncident, description: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-xs text-ivory focus:outline-none focus:border-volt/60"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded bg-volt text-black text-xs font-heading font-black uppercase tracking-wider hover:bg-[#b8e600] shadow-[0_0_15px_rgba(204,255,0,0.25)] transition-all"
                  >
                    Log &amp; Dispatch Unit
                  </button>
                </form>
              </div>

              {/* Live Incident Log Table */}
              <div className="lg:col-span-2 p-6 rounded-lg bg-[#0A0F1A] border border-white/[0.08] shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                    <div>
                      <h3 className="font-heading text-lg font-black uppercase text-ivory tracking-wide flex items-center gap-2">
                        <Activity className="w-4 h-4 text-sky-400" />
                        <span>Live Field Incident Queue</span>
                      </h3>
                      <p className="text-xs text-stone mt-0.5">
                        Real-time log of active race-day radio dispatches
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#070B12] border border-white/10 font-mono text-[10px] text-ivory">
                      {eventControl?.incidents?.length || 0} Records
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                    {(!eventControl?.incidents || eventControl.incidents.length === 0) ? (
                      <div className="p-8 text-center text-stone text-xs">
                        No field incidents logged. All corrdidors report green.
                      </div>
                    ) : (
                      eventControl.incidents.map((inc: any) => (
                        <div
                          key={inc.id}
                          className={`p-3.5 rounded-md border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            inc.status === "resolved"
                              ? "bg-[#070B12]/60 border-white/[0.05] opacity-60"
                              : inc.severity === "critical"
                              ? "bg-rose-950/20 border-rose-500/40"
                              : inc.severity === "medium"
                              ? "bg-amber-950/20 border-amber-500/40"
                              : "bg-[#070B12] border-white/10"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] font-bold text-stone">
                                {inc.id} • {inc.timestamp}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                  inc.severity === "critical"
                                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                    : inc.severity === "medium"
                                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    : "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                                }`}
                              >
                                {inc.severity}
                              </span>
                              <span className="text-[11px] font-bold text-white">
                                {inc.location}
                              </span>
                            </div>
                            <p className="text-xs text-stone">{inc.description}</p>
                            {inc.unit && (
                              <p className="text-[10px] font-mono text-volt">
                                Unit Assigned: {inc.unit}
                              </p>
                            )}
                          </div>

                          <div className="sm:self-center shrink-0">
                            <button
                              type="button"
                              onClick={() => handleToggleIncident(inc.id)}
                              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                                inc.status === "resolved"
                                  ? "bg-white/[0.05] text-stone hover:text-white"
                                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                              }`}
                            >
                              {inc.status === "resolved" ? "Re-open" : "Mark Resolved"}
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-stone">
                  <span>Patna Police &amp; Apollo Hospital Radio Net</span>
                  <span className="text-emerald-400 font-mono">Channel 4 Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: RUNNER DOSSIER */}
      <AnimatePresence>
        {selectedRunner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#0A0F1A] border border-volt/30 rounded-lg p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded bg-volt text-black text-xs font-mono font-bold uppercase">
                    {selectedRunner.bibNumber}
                  </span>
                  <span className="text-xs text-stone font-mono">
                    Txn: {selectedRunner.transactionId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRunner(null)}
                  className="p-1 rounded text-stone hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Digital Bib Card Preview */}
              <div className="p-6 rounded-md bg-gradient-to-br from-[#161F30] via-[#0F1624] to-[#161F30] border border-volt/40 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="label-subtle text-[9px] text-volt font-bold">
                    PRIDE PATNA MARATHON 2027
                  </span>
                  <span className="font-heading uppercase text-xs font-bold text-stone">
                    {selectedRunner.categoryCode.toUpperCase()}
                  </span>
                </div>
                <div className="text-center py-4">
                  <div className="font-numbers text-5xl sm:text-6xl font-black text-volt tracking-tight">
                    {selectedRunner.bibNumber.split("-")[2] || "2027"}
                  </div>
                  <div className="font-heading uppercase text-xl sm:text-2xl text-ivory tracking-widest font-black mt-1">
                    {selectedRunner.bibName}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] text-stone">
                  <span>Corral: {selectedRunner.corral}</span>
                  <span>Size: {selectedRunner.tShirtSize}</span>
                  <span>7 FEB 2027 • JP GANGA PATH, VENDING ZONE</span>
                </div>
              </div>

              {/* Athlete Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="label-subtle text-[9px] text-stone block">
                    FULL ATHLETE NAME
                  </span>
                  <span className="text-ivory font-bold text-sm">
                    {selectedRunner.fullName}
                  </span>
                </div>
                <div>
                  <span className="label-subtle text-[9px] text-stone block">
                    CITY OF RESIDENCE
                  </span>
                  <span className="text-ivory font-medium">
                    {selectedRunner.city}
                  </span>
                </div>
                <div>
                  <span className="label-subtle text-[9px] text-stone block">
                    EMAIL ADDRESS
                  </span>
                  <span className="text-ivory font-mono">
                    {selectedRunner.email}
                  </span>
                </div>
                <div>
                  <span className="label-subtle text-[9px] text-stone block">
                    WHATSAPP / MOBILE
                  </span>
                  <span className="text-ivory font-mono">
                    {selectedRunner.phone}
                  </span>
                </div>
                <div>
                  <span className="label-subtle text-[9px] text-stone block">
                    EMERGENCY CONTACT
                  </span>
                  <span className="text-ivory font-medium">
                    {selectedRunner.emergencyContactName} (
                    {selectedRunner.emergencyContactPhone})
                  </span>
                </div>
                <div>
                  <span className="label-subtle text-[9px] text-stone block">
                    DATE OF BIRTH &amp; GENDER
                  </span>
                  <span className="text-ivory font-medium">
                    {selectedRunner.dob} •{" "}
                    <span className="capitalize">{selectedRunner.gender}</span>
                  </span>
                </div>
              </div>

              {selectedRunner.medicalNotes && (
                <div className="p-3 rounded bg-white/[0.03] border border-white/[0.06] text-xs text-stone">
                  <strong className="text-volt">Medical / Target Notes:</strong>{" "}
                  {selectedRunner.medicalNotes}
                </div>
              )}

              {/* Footer action */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => handleToggleKit(selectedRunner.id)}
                  className={`px-4 py-2.5 rounded text-xs font-bold transition-all ${
                    selectedRunner.kitCollected
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-volt text-black font-extrabold"
                  }`}
                >
                  {selectedRunner.kitCollected
                    ? "Kit Collected (Click to Undo)"
                    : "Mark Kit as Collected"}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded bg-white/[0.05] border border-white/10 text-xs text-stone hover:text-white flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Dossier</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: ADD MANUAL RUNNER */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#0A0F1A] border border-volt/30 rounded-lg p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <h3 className="font-heading text-xl uppercase text-ivory font-bold">
                  Add Manual / Offline Runner
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded text-stone hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddRunner} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-subtle block mb-1 text-[10px]">
                      FULL ATHLETE NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={newRunner.fullName}
                      onChange={(e) =>
                        setNewRunner({ ...newRunner, fullName: e.target.value })
                      }
                      placeholder="Enter full name"
                      className="w-full px-3 py-2.5 rounded bg-[#070B12] border border-white/10 text-xs text-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
                    />
                  </div>

                  <div>
                    <label className="label-subtle block mb-1 text-[10px]">
                      BIB PRINT NAME
                    </label>
                    <input
                      type="text"
                      value={newRunner.bibName}
                      onChange={(e) =>
                        setNewRunner({ ...newRunner, bibName: e.target.value })
                      }
                      placeholder="ENTER BIB NAME"
                      className="w-full px-3 py-2.5 rounded bg-[#070B12] border border-white/10 text-xs text-ivory uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
                    />
                  </div>

                  <div>
                    <label className="label-subtle block mb-1 text-[10px]">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={newRunner.email}
                      onChange={(e) =>
                        setNewRunner({ ...newRunner, email: e.target.value })
                      }
                      placeholder="Enter email"
                      className="w-full px-3 py-2.5 rounded bg-[#070B12] border border-white/10 text-xs text-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
                    />
                  </div>

                  <div>
                    <label className="label-subtle block mb-1 text-[10px]">
                      MOBILE PHONE *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newRunner.phone}
                      onChange={(e) =>
                        setNewRunner({ ...newRunner, phone: e.target.value })
                      }
                      placeholder="10-digit number"
                      className="w-full px-3 py-2.5 rounded bg-[#070B12] border border-white/10 text-xs text-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
                    />
                  </div>

                  <div>
                    <label className="label-subtle block mb-1 text-[10px]">
                      RACE CATEGORY *
                    </label>
                    <select
                      value={newRunner.categoryCode}
                      onChange={(e) =>
                        setNewRunner({
                          ...newRunner,
                          categoryCode: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2.5 rounded bg-[#070B12] border border-white/10 text-xs text-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
                    >
                      <option value="21k">21K Half Marathon (₹1,299)</option>
                      <option value="10k">10K Urban Challenge (₹799)</option>
                      <option value="5k">5K Family Fun Run (₹499)</option>
                    </select>
                  </div>

                  <div>
                    <label className="label-subtle block mb-1 text-[10px]">
                      JERSEY SIZE *
                    </label>
                    <select
                      value={newRunner.tShirtSize}
                      onChange={(e) =>
                        setNewRunner({
                          ...newRunner,
                          tShirtSize: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2.5 rounded bg-[#070B12] border border-white/10 text-xs text-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
                    >
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>

                  <div>
                    <label className="label-subtle block mb-1 text-[10px]">
                      CITY
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      value={newRunner.city}
                      onChange={(e) =>
                        setNewRunner({ ...newRunner, city: e.target.value })
                      }
                      placeholder="Enter city (e.g. Gaya, Delhi, etc.)"
                      className="w-full px-3 py-2.5 rounded bg-[#070B12] border border-white/10 text-xs text-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
                    />
                  </div>

                  <div>
                    <label className="label-subtle block mb-1 text-[10px]">
                      GENDER
                    </label>
                    <select
                      value={newRunner.gender}
                      onChange={(e) =>
                        setNewRunner({
                          ...newRunner,
                          gender: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2.5 rounded bg-[#070B12] border border-white/10 text-xs text-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-volt"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded bg-white/[0.05] text-xs text-stone hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded bg-volt text-black text-xs font-heading uppercase tracking-wider font-extrabold shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                  >
                    Register Runner
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: EDIT RUNNER */}
      <AnimatePresence>
        {editingRunner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0A0F1A] border border-volt/30 rounded-lg p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <h3 className="font-heading text-xl uppercase text-ivory font-bold">
                  Edit Runner: {editingRunner.fullName}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingRunner(null)}
                  className="p-1 rounded text-stone hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                <div>
                  <label className="label-subtle block mb-1 text-[10px]">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    value={editingRunner.fullName}
                    onChange={(e) =>
                      setEditingRunner({
                        ...editingRunner,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-ivory"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label-subtle block mb-1 text-[10px]">
                      BIB PRINT NAME
                    </label>
                    <input
                      type="text"
                      value={editingRunner.bibName}
                      onChange={(e) =>
                        setEditingRunner({
                          ...editingRunner,
                          bibName: e.target.value.toUpperCase(),
                        })
                      }
                      className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-ivory font-mono uppercase"
                    />
                  </div>

                  <div>
                    <label className="label-subtle block mb-1 text-[10px]">
                      JERSEY SIZE
                    </label>
                    <select
                      value={editingRunner.tShirtSize}
                      onChange={(e) =>
                        setEditingRunner({
                          ...editingRunner,
                          tShirtSize: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-ivory font-mono"
                    >
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label-subtle block mb-1 text-[10px]">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      value={editingRunner.phone}
                      onChange={(e) =>
                        setEditingRunner({
                          ...editingRunner,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-ivory"
                    />
                  </div>

                  <div>
                    <label className="label-subtle block mb-1 text-[10px]">
                      CITY
                    </label>
                    <input
                      type="text"
                      value={editingRunner.city}
                      onChange={(e) =>
                        setEditingRunner({
                          ...editingRunner,
                          city: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded bg-[#070B12] border border-white/10 text-ivory"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setEditingRunner(null)}
                    className="px-4 py-2 rounded bg-white/[0.05] text-stone hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded bg-volt text-black font-heading uppercase tracking-wider font-extrabold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

