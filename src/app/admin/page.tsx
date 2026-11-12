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
} from "lucide-react";
import { RunnerRegistration } from "@/data/registrationsStore";

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "42k": { bg: "bg-blaze/15", text: "text-blaze", border: "border-blaze/40" },
  "21k": { bg: "bg-volt/15", text: "text-volt", border: "border-volt/40" },
  "10k": { bg: "bg-sky-400/15", text: "text-sky-400", border: "border-sky-400/40" },
  "5k": { bg: "bg-emerald-400/15", text: "text-emerald-400", border: "border-emerald-400/40" },
};

export default function AdminPage() {
  const [runners, setRunners] = useState<RunnerRegistration[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedKitFilter, setSelectedKitFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<
    "overview" | "roster" | "expo" | "operations" | "settings"
  >("roster");

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
    city: "Patna",
    emergencyContactName: "",
    emergencyContactPhone: "",
    categoryCode: "21k" as const,
    tShirtSize: "L" as const,
    medicalNotes: "",
  });

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/runners");
      const json = await res.json();
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
    fetchData();
  }, []);

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
          city: "Patna",
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
                <span>Gandhi Maidan Expo</span>
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
            { id: "roster", label: "Runners Database", icon: Users },
            { id: "overview", label: "Analytics & Quotas", icon: Activity },
            { id: "expo", label: "Expo Kit Distribution Desk", icon: Package },
            { id: "operations", label: "Course & Aid Station Ops", icon: MapPin },
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
              </button>
            );
          })}
        </div>

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
                  { id: "42k", label: "42K Full" },
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    code: "42k",
                    name: "42.2K Full Marathon",
                    fee: 1899,
                    color: "text-blaze",
                    bg: "bg-blaze",
                    count: metrics.categoryCounts["42k"] || 0,
                    target: 500,
                  },
                  {
                    code: "21k",
                    name: "21.1K Half Marathon",
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
                    Official Course Corridor Status (42.2 KM)
                  </h3>
                  <p className="text-xs text-stone">
                    Live operational telemetry from Gandhi Maidan to Digha Ghat
                  </p>
                </div>
                <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  All Corridors Clear
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: "Gandhi Maidan Hub",
                    km: "0.0 KM / 42.2 KM",
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
                    km: "KM 13.5 / KM 21.1",
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
                      <option value="42k">42K Full Marathon (₹1,899)</option>
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
                      value={newRunner.city}
                      onChange={(e) =>
                        setNewRunner({ ...newRunner, city: e.target.value })
                      }
                      placeholder="Patna, Gaya, etc."
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

