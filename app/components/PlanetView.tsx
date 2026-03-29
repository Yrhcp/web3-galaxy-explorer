"use client";

import { useState } from "react";
import { EducationalConcept } from "@/src/types";

interface PlanetViewProps {
  concepts: EducationalConcept[];
  planetName: string;
  levelId: number;
  accentColor: string;
  onComplete: () => void;
}

export default function PlanetView({
  concepts,
  planetName,
  levelId,
  accentColor,
  onComplete,
}: PlanetViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const concept = concepts[currentIndex];
  const isLast = currentIndex === concepts.length - 1;

  const navigate = (newIndex: number) => {
    if (animating) return;
    setDirection(newIndex > currentIndex ? "right" : "left");
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      navigate(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(currentIndex - 1);
    }
  };

  const conceptIcons = ["🔗", "🌐", "🔐"];

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4">
      {/* Planet Header */}
      <div className="mb-8 text-center">
        <div className="text-6xl mb-3 animate-float">🪐</div>
        <h2 className={`text-2xl font-bold ${accentColor}`}>
          Level {levelId}: {planetName}
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Concept {currentIndex + 1} of {concepts.length}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${((currentIndex + 1) / concepts.length) * 100}%`,
          }}
        />
      </div>

      {/* Concept Card */}
      <div
        className={`relative w-full transition-all duration-300 ease-out ${
          animating
            ? direction === "right"
              ? "opacity-0 translate-x-8"
              : "opacity-0 -translate-x-8"
            : "opacity-100 translate-x-0"
        }`}
      >
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            {/* Concept Icon */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">{conceptIcons[currentIndex]}</span>
              <h3 className={`text-xl font-semibold ${accentColor}`}>
                {concept.title}
              </h3>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-5" />

            {/* Content */}
            <p className="text-slate-300 leading-relaxed text-[15px]">
              {concept.content}
            </p>

            {/* Floating particles decoration */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full animate-ping" />
            <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-cyan-400/20 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between w-full mt-8">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
            disabled:opacity-30 disabled:cursor-not-allowed
            text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Dot Indicators */}
        <div className="flex gap-2">
          {concepts.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-blue-400 scale-125 shadow-lg shadow-blue-400/50"
                  : i < currentIndex
                  ? "bg-blue-400/40"
                  : "bg-slate-600"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
            bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500
            text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-95"
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
