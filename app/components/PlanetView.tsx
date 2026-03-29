"use client";

import { useState } from "react";
import { EducationalConcept } from "@/src/types";

interface PlanetViewProps {
  concepts: EducationalConcept[];
  planetName: string;
  levelId: number;
  icon: string;
  onComplete: () => void;
}

export default function PlanetView({
  concepts,
  planetName,
  levelId,
  icon,
  onComplete,
}: PlanetViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating]       = useState(false);
  const [direction, setDirection]       = useState<"left" | "right">("right");

  const concept = concepts[currentIndex];
  const isLast  = currentIndex === concepts.length - 1;

  const navigate = (newIndex: number) => {
    if (animating) return;
    setDirection(newIndex > currentIndex ? "right" : "left");
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setAnimating(false);
    }, 300);
  };

  const handleNext = () => (isLast ? onComplete() : navigate(currentIndex + 1));
  const handlePrev = () => { if (currentIndex > 0) navigate(currentIndex - 1); };

  const conceptIcons = ["🔗", "🌐", "🔐"];

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4">

      {/* ── Planet Header ── */}
      <div className="mb-8 text-center">
        {/* Hologram planet icon */}
        <div className="relative inline-flex items-center justify-center mb-4">
          <div
            className="absolute w-28 h-28 rounded-full animate-glowPulse opacity-50"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)" }}
          />
          <span className="text-7xl animate-float hologram select-none">{icon}</span>
        </div>

        <h2 className="text-2xl font-bold text-gradient tracking-tight">
          Level {levelId}: {planetName}
        </h2>
        <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-medium">
          Concept {currentIndex + 1} of {concepts.length}
        </p>
      </div>

      {/* ── Progress Bar ── */}
      <div className="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${((currentIndex + 1) / concepts.length) * 100}%`,
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)",
            boxShadow: "0 0 10px rgba(139,92,246,0.7)",
          }}
        />
      </div>

      {/* ── Concept Card ── */}
      <div
        className={`relative w-full transition-all duration-300 ease-out ${
          animating
            ? direction === "right"
              ? "opacity-0 translate-x-8"
              : "opacity-0 -translate-x-8"
            : "opacity-100 translate-x-0"
        }`}
      >
        {/* Outer ambient glow */}
        <div
          className="absolute -inset-1 rounded-3xl opacity-40 blur-lg"
          style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(139,92,246,0.35))" }}
        />

        <div className="glass-card relative p-8 shadow-2xl">
          {/* Concept icon + title */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">{conceptIcons[currentIndex]}</span>
            <h3 className={`text-xl font-semibold text-white`}>{concept.title}</h3>
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-5"
               style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }} />

          {/* Content */}
          <p className="text-slate-300 leading-relaxed text-[15px]">{concept.content}</p>

          {/* Decorative specks */}
          <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-violet-400/40 rounded-full animate-ping" />
          <div className="absolute bottom-6 right-7 w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse" />
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="flex items-center justify-between w-full mt-8">
        {/* Back */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
            transition-all duration-200
            disabled:opacity-20 disabled:cursor-not-allowed
            text-slate-400 hover:text-white border border-white/8 hover:border-violet-500/40
            hover:bg-white/5 backdrop-blur-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {concepts.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-5 h-2.5 bg-violet-400 shadow-lg shadow-violet-500/60"
                  : i < currentIndex
                  ? "w-2.5 h-2.5 bg-violet-400/35"
                  : "w-2.5 h-2.5 bg-white/12"
              }`}
            />
          ))}
        </div>

        {/* Next / Start Quest */}
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white
            transition-all duration-200 hover:scale-[1.04] active:scale-95"
          style={{
            background:  "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            boxShadow:   "0 0 18px rgba(99,102,241,0.4), 0 4px 12px rgba(0,0,0,0.35)",
            border:      "1px solid rgba(139,92,246,0.4)",
          }}
        >
          {isLast ? "Start Quest" : "Next"}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
