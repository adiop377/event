"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme && document.documentElement.classList.contains("dark"));

    if (isDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 shrink-0 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 lg:w-auto lg:h-auto p-0 lg:px-3 lg:py-1.5 rounded-full border transition-all duration-300 select-none shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt ${
        isDark
          ? "bg-[#111827] hover:bg-[#1A263A] text-amber-300 border-white/20 shadow-[0_0_15px_rgba(252,211,77,0.2)]"
          : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-sm"
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center gap-1.5"
          >
            <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="hidden lg:inline-block text-[11px] font-heading uppercase tracking-wider font-bold text-amber-300">
              Light
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center gap-1.5"
          >
            <Moon className="w-4 h-4 text-slate-700 fill-slate-700" />
            <span className="hidden lg:inline-block text-[11px] font-heading uppercase tracking-wider font-bold text-slate-800">
              Dark
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

