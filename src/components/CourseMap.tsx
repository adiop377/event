"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Download,
  Droplets,
  HeartPulse,
  Zap,
  TrendingUp,
  Mountain,
  Navigation,
  Music,
  MapPin,
  CheckCircle2,
  Info,
} from "lucide-react";
import { ROUTES } from "@/data/marathon";

interface MapWaypoint {
  id: string;
  name: string;
  km: string;
  x: number;
  y: number;
  type: "start" | "waypoint" | "turnaround" | "return";
  elevation: string;
  notes: string;
}

interface SchematicRoute {
  outboundPath: string;
  returnPath: string;
  riverPath: string;
  riverLabelPos: { x: number; y: number };
  waypoints: MapWaypoint[];
}

const SCHEMATIC_MAPS: Record<string, SchematicRoute> = {
  "5k": {
    riverPath: "M 40 70 C 180 50, 360 85, 520 60 S 740 75, 860 45",
    riverLabelPos: { x: 230, y: 46 },
    outboundPath: "M 220,235 C 310,230 400,205 480,185 S 620,150 670,140",
    returnPath: "M 670,140 C 690,160 610,190 520,210 S 370,240 220,235",
    waypoints: [
      {
        id: "start",
        name: "GANDHI MAIDAN (START / FINISH)",
        km: "0.0 KM / 5.0 KM",
        x: 220,
        y: 235,
        type: "start",
        elevation: "52m",
        notes: "Family Fun Run starting corral & finish chute",
      },
      {
        id: "wp1",
        name: "GOLGHAR HERITAGE CIRCLE",
        km: "KM 1.8",
        x: 480,
        y: 185,
        type: "waypoint",
        elevation: "55m",
        notes: "Historic granary landmark cheering zone",
      },
      {
        id: "turn",
        name: "CHILDREN PARK TURNAROUND",
        km: "KM 2.5",
        x: 670,
        y: 140,
        type: "turnaround",
        elevation: "54m",
        notes: "5K midway turnaround point & hydration station",
      },
      {
        id: "ret",
        name: "AVENUE RETURN",
        km: "KM 3.8",
        x: 505,
        y: 205,
        type: "return",
        elevation: "53m",
        notes: "Direct sprint corridor back to Gandhi Maidan Gate 1",
      },
    ],
  },
  "10k": {
    riverPath: "M 40 70 C 180 50, 360 85, 520 60 S 740 75, 860 45",
    riverLabelPos: { x: 230, y: 46 },
    outboundPath: "M 200,240 C 290,235 370,205 450,185 S 610,145 690,130",
    returnPath: "M 690,130 C 710,150 640,180 540,205 S 360,245 200,240",
    waypoints: [
      {
        id: "start",
        name: "GANDHI MAIDAN (START / FINISH)",
        km: "0.0 KM / 10.0 KM",
        x: 200,
        y: 240,
        type: "start",
        elevation: "52m",
        notes: "Flag-off Gate 1 & official timing gantry",
      },
      {
        id: "wp1",
        name: "DAK BUNGALOW CROSSING",
        km: "KM 2.5",
        x: 450,
        y: 185,
        type: "waypoint",
        elevation: "54m",
        notes: "Apollo first aid & Enerzal hydration zone",
      },
      {
        id: "turn",
        name: "BAILEY ROAD FLYOVER TURNAROUND",
        km: "KM 5.0",
        x: 690,
        y: 130,
        type: "turnaround",
        elevation: "58m",
        notes: "Official 10K turnaround timing mat & medical station",
      },
      {
        id: "ret",
        name: "MUSEUM BOULEVARD RETURN",
        km: "KM 7.5",
        x: 520,
        y: 200,
        type: "return",
        elevation: "55m",
        notes: "Shaded tree-lined boulevard returning to finish line",
      },
    ],
  },
  "21k": {
    riverPath: "M 40 70 C 180 50, 360 85, 520 60 S 740 75, 860 45",
    riverLabelPos: { x: 220, y: 46 },
    outboundPath: "M 180,245 C 260,240 330,215 390,200 S 520,165 580,155 S 680,135 740,125",
    returnPath: "M 740,125 C 765,140 710,175 620,195 S 440,230 330,245 S 220,255 180,245",
    waypoints: [
      {
        id: "start",
        name: "GANDHI MAIDAN (START / FINISH)",
        km: "0.0 KM / 21.1 KM",
        x: 180,
        y: 245,
        type: "start",
        elevation: "52m",
        notes: "Corrals A-D flag-off & final celebration arch",
      },
      {
        id: "wp1",
        name: "DAK BUNGALOW (KM 5)",
        km: "KM 5.0",
        x: 390,
        y: 200,
        type: "waypoint",
        elevation: "54m",
        notes: "Split timing mat & Enerzal electrolyte post",
      },
      {
        id: "wp2",
        name: "ATAL PATH ENTRY (KM 12)",
        km: "KM 9.0 - 12.0",
        x: 580,
        y: 155,
        type: "waypoint",
        elevation: "61m",
        notes: "6-lane high-speed expressway smooth asphalt section",
      },
      {
        id: "turn",
        name: "DIGHA GHAT TURNAROUND",
        km: "KM 13.5",
        x: 740,
        y: 125,
        type: "turnaround",
        elevation: "62m",
        notes: "AFI/AIMS certified 180° turnaround timing mat & Apollo ICU",
      },
      {
        id: "ret",
        name: "GANGA PATHWAY RETURN",
        km: "KM 17.5",
        x: 600,
        y: 195,
        type: "return",
        elevation: "57m",
        notes: "Ganga marine drive corridor with early morning river breeze",
      },
    ],
  },
};

export default function CourseMap() {
  const [selectedCode, setSelectedCode] = useState<string>("21k");
  const [viewMode, setViewMode] = useState<"both" | "map" | "elevation">("both");
  const [activeWaypoint, setActiveWaypoint] = useState<MapWaypoint | null>(null);

  const activeRoute = ROUTES.find((r) => r.code === selectedCode) || ROUTES[2];
  const activeSchematic = SCHEMATIC_MAPS[selectedCode] || SCHEMATIC_MAPS["21k"];

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
    const content = `Pride Patna Marathon 2027
Route: ${activeRoute.title}
Distance: ${activeRoute.distance}
Elevation Gain: ${activeRoute.elevationGain}
Peak Elevation: ${activeRoute.peakElevation}
Water Stations: ${activeRoute.waterStations}
Medical Stations: ${activeRoute.medicalPoints}
Waypoints:
${activeSchematic.waypoints.map((w) => `- ${w.name} (${w.km}) [Elev: ${w.elevation}]: ${w.notes}`).join("\n")}

Landmarks:
${activeRoute.landmarks.join(" -> ")}
`;
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
              <span className="w-6 h-[2px] bg-volt inline-block" />
              <span className="label-subtle text-volt font-bold tracking-widest text-xs">COURSE ARCHITECTURE</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-ivory font-black">
              THE PATNA <span className="text-volt-gradient">COURSE.</span>
            </h2>
          </div>

          {/* Route distance selector tabs */}
          <div className="inline-flex flex-wrap p-1.5 rounded-md bg-[#0D1422] border border-white/10 self-start md:self-end shadow-lg gap-1">
            {ROUTES.map((route) => (
              <button
                key={route.code}
                type="button"
                onClick={() => {
                  setSelectedCode(route.code);
                  setActiveWaypoint(null);
                }}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded text-xs font-heading uppercase tracking-wider font-extrabold transition-all ${
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
        <div className="luxury-card p-4 sm:p-8 lg:p-12 bg-graphite/95 backdrop-blur-xl border-volt/20 shadow-2xl rounded-lg">
          {/* Top Stats Bar - 4 High-Impact Stat Columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pb-8 border-b border-white/[0.08]">
            {/* Distance */}
            <div>
              <span className="label-subtle text-[9px] sm:text-[10px] text-stone tracking-wider block mb-1 font-bold">
                DISTANCE
              </span>
              <div className="font-numbers text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-ivory tracking-tight">
                {activeRoute.distance}
              </div>
              <p className="font-body text-xs text-stone mt-1 line-clamp-1">
                {activeRoute.title}
              </p>
            </div>

            {/* Total Gain */}
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-volt" />
                <span className="label-subtle text-[9px] sm:text-[10px] text-stone tracking-wider font-bold">
                  TOTAL GAIN
                </span>
              </div>
              <div className="font-numbers text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-ivory tracking-tight">
                {activeRoute.elevationGain}
              </div>
              <p className="font-body text-xs text-stone mt-1">
                Gentle gradient, fast asphalt
              </p>
            </div>

            {/* Peak Elevation */}
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Mountain className="w-3.5 h-3.5 text-sky-400" />
                <span className="label-subtle text-[9px] sm:text-[10px] text-stone tracking-wider font-bold">
                  PEAK ELEVATION
                </span>
              </div>
              <div className="font-numbers text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-ivory tracking-tight">
                {activeRoute.peakElevation}
              </div>
              <p className="font-body text-xs text-stone mt-1">
                Bailey Overpass vantage
              </p>
            </div>

            {/* Support Stations */}
            <div>
              <span className="label-subtle text-[9px] sm:text-[10px] text-stone tracking-wider block mb-1 font-bold">
                SUPPORT STATIONS
              </span>
              <div className="flex items-center gap-3 my-1">
                <span className="inline-flex items-center gap-1 text-sm font-bold text-sky-400">
                  <Droplets className="w-4 h-4" />
                  <span>{activeRoute.waterStations}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-blaze">
                  <HeartPulse className="w-4 h-4" />
                  <span>{activeRoute.medicalPoints}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-volt">
                  <Zap className="w-4 h-4" />
                  <span>{activeRoute.energyGelZones}</span>
                </span>
              </div>
              <p className="font-body text-xs text-stone mt-1">
                Every 2.5 km along course
              </p>
            </div>
          </div>

          {/* Course View Header & Mode Controls */}
          <div className="pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-volt" />
              <span className="label-subtle text-ivory text-xs font-bold tracking-wider">
                COURSE ROUTE &amp; ELEVATION TELEMETRY
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline-block text-xs text-stone">
                Patna Riverfront &amp; Expressway Corridor
              </span>

              {/* View Mode Controls */}
              <div className="inline-flex p-1 rounded-md bg-[#0A0F1A] border border-white/10 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-1 rounded transition-colors ${
                    viewMode === "map"
                      ? "bg-volt text-black shadow-sm"
                      : "text-stone hover:text-white"
                  }`}
                >
                  OUTLINE MAP
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("elevation")}
                  className={`px-3 py-1 rounded transition-colors ${
                    viewMode === "elevation"
                      ? "bg-volt text-black shadow-sm"
                      : "text-stone hover:text-white"
                  }`}
                >
                  ELEVATION GRAPH
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("both")}
                  className={`px-3 py-1 rounded transition-colors ${
                    viewMode === "both"
                      ? "bg-volt text-black shadow-sm"
                      : "text-stone hover:text-white"
                  }`}
                >
                  ALL VIEWS
                </button>
              </div>
            </div>
          </div>

          {/* Section 1: COURSE ROUTE OVERVIEW (Schematic 2D Interactive Route Map) */}
          {(viewMode === "both" || viewMode === "map") && (
            <div className="pb-4">
              {/* 2D Interactive Route Schematic Canvas */}
              <div className="relative bg-[#070B12]/95 border border-white/[0.08] rounded-lg p-3 sm:p-6 overflow-hidden shadow-inner">
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[760px] relative">
                    <svg
                      viewBox="0 0 900 320"
                      className="w-full h-[260px] sm:h-[300px] overflow-visible select-none"
                    >
                      <defs>
                        {/* Glow Filter for Course Route */}
                        <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3.5" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>

                        {/* Turnaround Red Glow Filter */}
                        <filter id="redPulseGlow" x="-30%" y="-30%" width="160%" height="160%">
                          <feGaussianBlur stdDeviation="4" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* River Ganges Background Zone */}
                      <path
                        d="M 20 20 L 880 20 L 880 75 C 740 85, 520 65, 360 85 S 180 55, 20 75 Z"
                        fill="rgba(14, 165, 233, 0.04)"
                      />

                      {/* River Ganges Flowing Dotted Curve */}
                      <path
                        d={activeSchematic.riverPath}
                        fill="none"
                        stroke="#0284C7"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                        strokeOpacity="0.55"
                      />

                      {/* River Ganges Label */}
                      <g>
                        <rect
                          x={activeSchematic.riverLabelPos.x - 12}
                          y={activeSchematic.riverLabelPos.y - 13}
                          width="330"
                          height="20"
                          rx="4"
                          fill="rgba(14, 165, 233, 0.08)"
                          stroke="rgba(14, 165, 233, 0.25)"
                          strokeWidth="1"
                        />
                        <text
                          x={activeSchematic.riverLabelPos.x}
                          y={activeSchematic.riverLabelPos.y}
                          fill="#38BDF8"
                          fontSize="9.5"
                          fontWeight="800"
                          letterSpacing="0.12em"
                          fontFamily="var(--font-barlow)"
                        >
                          RIVER GANGES (GANGA PATHWAY WATERFRONT)
                        </text>
                      </g>

                      {/* Return Route Trajectory (Dashed Loop) */}
                      <path
                        d={activeSchematic.returnPath}
                        fill="none"
                        stroke="#FF5722"
                        strokeWidth="2.2"
                        strokeDasharray="6 5"
                        strokeOpacity="0.65"
                      />

                      {/* Outbound Highway / Course Track (Golden / Volt High-Speed Curve) */}
                      <path
                        d={activeSchematic.outboundPath}
                        fill="none"
                        stroke="#CCFF00"
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="url(#routeGlow)"
                      />

                      {/* Interactive Waypoints */}
                      {activeSchematic.waypoints.map((wp) => {
                        const isTurnaround = wp.type === "turnaround";
                        const isStart = wp.type === "start";
                        const isSelected = activeWaypoint?.id === wp.id;

                        return (
                          <g
                            key={wp.id}
                            className="cursor-pointer transition-transform duration-200"
                            onClick={() =>
                              setActiveWaypoint(isSelected ? null : wp)
                            }
                            onMouseEnter={() => setActiveWaypoint(wp)}
                          >
                            {/* Animated Ping Radar for Turnaround & Start */}
                            {(isTurnaround || isStart) && (
                              <circle
                                cx={wp.x}
                                cy={wp.y}
                                r="14"
                                fill="none"
                                stroke={isTurnaround ? "#FF5722" : "#CCFF00"}
                                strokeWidth="1.5"
                                opacity="0.45"
                              >
                                <animate
                                  attributeName="r"
                                  values="8;18;8"
                                  dur="2.4s"
                                  repeatCount="indefinite"
                                />
                                <animate
                                  attributeName="opacity"
                                  values="0.7;0.1;0.7"
                                  dur="2.4s"
                                  repeatCount="indefinite"
                                />
                              </circle>
                            )}

                            {/* Waypoint Dot */}
                            <circle
                              cx={wp.x}
                              cy={wp.y}
                              r={isTurnaround ? "7" : isStart ? "6" : "5"}
                              fill={
                                isTurnaround
                                  ? "#FF5722"
                                  : isStart
                                  ? "#CCFF00"
                                  : isSelected
                                  ? "#CCFF00"
                                  : "#FFFFFF"
                              }
                              stroke="#090D14"
                              strokeWidth={isTurnaround ? "3" : "2.5"}
                              filter={
                                isTurnaround
                                  ? "url(#redPulseGlow)"
                                  : isStart
                                  ? "url(#routeGlow)"
                                  : undefined
                              }
                            />

                            {/* Waypoint Label Text */}
                            {isStart ? (
                              <g>
                                <text
                                  x={wp.x}
                                  y={wp.y + 22}
                                  textAnchor="middle"
                                  fill="#F8FAFC"
                                  fontSize="10"
                                  fontWeight="800"
                                  letterSpacing="0.06em"
                                  fontFamily="var(--font-barlow)"
                                >
                                  {wp.name}
                                </text>
                                <text
                                  x={wp.x}
                                  y={wp.y + 35}
                                  textAnchor="middle"
                                  fill="#CCFF00"
                                  fontSize="9"
                                  fontWeight="800"
                                  fontFamily="var(--font-barlow)"
                                >
                                  {wp.km}
                                </text>
                              </g>
                            ) : isTurnaround ? (
                              <g>
                                <text
                                  x={wp.x}
                                  y={wp.y - 16}
                                  textAnchor="middle"
                                  fill="#FF5722"
                                  fontSize="10.5"
                                  fontWeight="900"
                                  letterSpacing="0.08em"
                                  fontFamily="var(--font-barlow)"
                                >
                                  {wp.name}
                                </text>
                                <text
                                  x={wp.x}
                                  y={wp.y - 4}
                                  textAnchor="middle"
                                  fill="#CBD5E1"
                                  fontSize="8.5"
                                  fontWeight="700"
                                  fontFamily="var(--font-barlow)"
                                >
                                  {wp.km}
                                </text>
                              </g>
                            ) : (
                              <g>
                                <text
                                  x={wp.x}
                                  y={wp.type === "return" ? wp.y + 18 : wp.y - 12}
                                  textAnchor="middle"
                                  fill="#E2E8F0"
                                  fontSize="9.5"
                                  fontWeight="700"
                                  letterSpacing="0.05em"
                                  fontFamily="var(--font-barlow)"
                                >
                                  {wp.name}
                                </text>
                              </g>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Floating Waypoint HUD Tooltip */}
                <AnimatePresence>
                  {activeWaypoint && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="mt-3 p-3 rounded-md bg-[#0A0F1A]/95 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin
                          className={`w-4 h-4 ${
                            activeWaypoint.type === "turnaround"
                              ? "text-blaze"
                              : "text-volt"
                          }`}
                        />
                        <span className="font-bold text-ivory tracking-wide">
                          {activeWaypoint.name}
                        </span>
                        <span className="text-stone">({activeWaypoint.km})</span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.06] text-volt text-[10px] font-mono">
                          Elev: {activeWaypoint.elevation}
                        </span>
                      </div>
                      <div className="text-stone font-body text-xs flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-sky-400" />
                        <span>{activeWaypoint.notes}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Section 2: ELEVATION PROFILE GRAPH (Directly below route map) */}
          {(viewMode === "both" || viewMode === "elevation") && (
            <div className="pt-6 my-4 border-t border-white/[0.08]">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-volt" />
                  <span className="label-subtle text-ivory text-xs font-bold tracking-wider">
                    ELEVATION PROFILE
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="label-subtle text-[10px] text-stone">
                    Sea Level Reference: ~52m AMSL • Peak: {activeRoute.peakElevation}
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
                <div className="min-w-[680px] relative bg-[#070B12]/95 rounded-lg p-5 border border-white/[0.08] shadow-inner">
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
          )}

          {/* Aid Station Support Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-white/[0.08] text-xs text-stone my-6">
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
            <span className="label-subtle text-stone block mb-3 font-bold text-[10px] tracking-wider">
              KEY LANDMARKS &amp; CORRIDORS
            </span>
            <div className="flex flex-wrap gap-2.5">
              {activeRoute.landmarks.map((landmark, idx) => (
                <div
                  key={landmark}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#0A0F1A] border border-white/10 text-xs text-ivory font-medium shadow-sm hover:border-volt/40 transition-colors"
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
