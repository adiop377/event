"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  TrendingUp,
  Droplets,
  HeartPulse,
  Zap,
  Compass,
  Download,
  Music,
  CheckCircle2,
  Flame,
} from "lucide-react";
import { ROUTES } from "@/data/marathon";

export default function CourseMap() {
  const [selectedCode, setSelectedCode] = useState<string>("21k");
  const activeRoute = ROUTES.find((r) => r.code === selectedCode) || ROUTES[2];

  // Elevation points calculation for SVG graph
  const points = activeRoute.points;
  const maxElevation = Math.max(...points.map((p) => p.elevationM), 65);
  const minElevation = Math.min(...points.map((p) => p.elevationM), 48);
  const elevationRange = maxElevation - minElevation || 1;

  const svgWidth = 800;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const getCoordinates = (p: { distanceKm: number; elevationM: number }) => {
    const totalDist = activeRoute.points[activeRoute.points.length - 1].distanceKm || 1;
    const x = paddingX + (p.distanceKm / totalDist) * (svgWidth - 2 * paddingX);
    const normalizedY = (p.elevationM - minElevation) / elevationRange;
    const y = svgHeight - paddingY - normalizedY * (svgHeight - 2 * paddingY);
    return { x, y };
  };

  const pathD = points.reduce((acc, p, idx) => {
    const { x, y } = getCoordinates(p);
    return idx === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
  }, "");

  const firstPoint = getCoordinates(points[0]);
  const lastPoint = getCoordinates(points[points.length - 1]);
  const areaD = `${pathD} L ${lastPoint.x},${svgHeight - paddingY} L ${firstPoint.x},${svgHeight - paddingY} Z`;

  const handleDownloadMap = () => {
    const content = `Pride Patna Marathon 2027\nRoute: ${activeRoute.title}\nDistance: ${activeRoute.distance}\nElevation Gain: ${activeRoute.elevationGain}\nLandmarks: ${activeRoute.landmarks.join(" -> ")}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pride-patna-marathon-${activeRoute.code}-route.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="route" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <Compass className="w-4 h-4 text-volt" />
              <span className="label-subtle text-volt font-bold">TECHNICAL COURSE SPECIFICATIONS</span>
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-ivory font-black">
              THE PATNA <span className="text-volt-gradient">COURSE.</span>
            </h2>
          </div>

          {/* Route distance selector tabs - Sharp 6px athletic tabs */}
          <div className="inline-flex p-1.5 rounded-md bg-[#0D1422] border border-white/10 self-start md:self-end shadow-lg">
            {ROUTES.map((route) => (
              <button
                key={route.code}
                onClick={() => setSelectedCode(route.code)}
                className={`px-5 py-2 rounded text-xs font-heading uppercase tracking-wider font-extrabold transition-all ${
                  selectedCode === route.code
                    ? "bg-volt text-black shadow-[0_0_15px_rgba(204,255,0,0.35)]"
                    : "text-stone hover:text-ivory"
                }`}
              >
                {route.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Route Card Container */}
        <div className="luxury-card p-6 sm:p-10 lg:p-12 bg-graphite/95 backdrop-blur-xl border-volt/20 shadow-2xl">
          {/* Top Title & Quick Metrics */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-line gap-6">
            <div>
              <span className="label-subtle text-volt block mb-1 font-bold">
                AIMS CERTIFIED ELEVATION PROFILE
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl text-ivory uppercase">
                {activeRoute.title}
              </h3>
              <p className="font-body text-xs text-stone mt-1">
                Patna Riverfront &amp; Atal Expressway Corridor • Zero traffic cross-flow • High-speed smooth asphalt
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-[#0A0F1A]/85 rounded-lg p-3.5 border border-white/[0.08] shadow-md">
                <span className="label-subtle text-[8.5px] text-stone block mb-1">DISTANCE</span>
                <span className="font-numbers text-xl font-extrabold text-volt">
                  {activeRoute.distance}
                </span>
              </div>
              <div className="bg-[#0A0F1A]/85 rounded-lg p-3.5 border border-white/[0.08] shadow-md">
                <span className="label-subtle text-[8.5px] text-stone block mb-1">ELEVATION GAIN</span>
                <span className="font-numbers text-xl font-extrabold text-ivory">
                  {activeRoute.elevationGain}
                </span>
              </div>
              <div className="bg-[#0A0F1A]/85 rounded-lg p-3.5 border border-white/[0.08] shadow-md">
                <span className="label-subtle text-[8.5px] text-stone block mb-1">WATER STATIONS</span>
                <span className="font-numbers text-xl font-extrabold text-sky-400 flex items-center justify-center gap-1">
                  <Droplets className="w-3.5 h-3.5" />
                  {activeRoute.waterStations}
                </span>
              </div>
              <div className="bg-[#0A0F1A]/85 rounded-lg p-3.5 border border-white/[0.08] shadow-md">
                <span className="label-subtle text-[8.5px] text-stone block mb-1">APOLLO MEDICS</span>
                <span className="font-numbers text-xl font-extrabold text-blaze flex items-center justify-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5" />
                  {activeRoute.medicalPoints}
                </span>
              </div>
            </div>
          </div>

          {/* Elevation Profile Graph */}
          <div className="my-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-volt" />
                <span className="label-subtle text-ivory text-xs font-bold">COURSE TOPOGRAPHY PROFILE</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="label-subtle text-[10px] text-stone">
                  Datum: ~52m AMSL • Peak: {activeRoute.peakElevation}
                </span>
                <button
                  type="button"
                  onClick={handleDownloadMap}
                  className="inline-flex items-center gap-1.5 text-xs text-volt hover:underline font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Route Spec</span>
                </button>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <div className="min-w-[680px] relative bg-[#0A0F1A]/95 rounded-lg p-5 border border-white/[0.08] shadow-inner">
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-44 overflow-visible"
                >
                  <defs>
                    <linearGradient id="elevationGradVolt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#CCFF00" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line
                    x1={paddingX}
                    y1={paddingY}
                    x2={svgWidth - paddingX}
                    y2={paddingY}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1={paddingX}
                    y1={svgHeight / 2}
                    x2={svgWidth - paddingX}
                    y2={svgHeight / 2}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1={paddingX}
                    y1={svgHeight - paddingY}
                    x2={svgWidth - paddingX}
                    y2={svgHeight - paddingY}
                    stroke="rgba(255,255,255,0.14)"
                  />

                  {/* Shaded Area */}
                  <path d={areaD} fill="url(#elevationGradVolt)" />

                  {/* Polyline */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#CCFF00"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Points with Tooltip Labels */}
                  {points.map((p, idx) => {
                    const { x, y } = getCoordinates(p);
                    return (
                      <g key={idx}>
                        <circle
                          cx={x}
                          cy={y}
                          r={p.label ? "6" : "3.5"}
                          fill="#090D14"
                          stroke={p.label ? "#FF5722" : "#CCFF00"}
                          strokeWidth="2.5"
                        />
                        {p.label && (
                          <g>
                            <text
                              x={x}
                              y={y - 12}
                              textAnchor="middle"
                              fill="#F8FAFC"
                              fontSize="11"
                              fontWeight="700"
                              fontFamily="var(--font-inter)"
                            >
                              {p.label} ({p.elevationM}m)
                            </text>
                            <text
                              x={x}
                              y={svgHeight - paddingY + 18}
                              textAnchor="middle"
                              fill="#94A3B8"
                              fontSize="10"
                              fontWeight="700"
                              fontFamily="var(--font-barlow)"
                            >
                              {p.distanceKm} km
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Aid Station Support Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-line/60 text-xs text-stone mb-6">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-400" />
              <span>Hydration Every 2.5 km</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-blaze" />
              <span>Apollo ICU at Corrals</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-volt" />
              <span>Enerzal Gel Zones</span>
            </div>
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-amber-400" />
              <span>Cultural Dhol Stages</span>
            </div>
          </div>

          {/* Landmarks / Turns */}
          <div>
            <span className="label-subtle text-stone block mb-3">KEY LANDMARKS &amp; CORRIDORS</span>
            <div className="flex flex-wrap gap-2.5">
              {activeRoute.landmarks.map((landmark, idx) => (
                <div
                  key={landmark}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink/90 border border-line text-xs text-ivory font-medium"
                >
                  <span className="w-5 h-5 rounded-full bg-volt/15 text-volt text-[10px] font-numbers flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span>{landmark}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
