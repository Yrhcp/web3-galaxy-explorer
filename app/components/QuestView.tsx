"use client";

import { useState } from "react";
import { PlanetQuest } from "@/src/types";

interface QuestViewProps {
  quest: PlanetQuest;
  planetName: string;
  levelId: number;
  icon: string;
  nextLevelName?: string;
  onSuccess: () => void;
}

export default function QuestView({
  quest,
  planetName,
  levelId,
  icon,
  nextLevelName,
  onSuccess,
}: QuestViewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);

  const handleSelect = (index: number) => {
    if (hasAnswered) return;
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex === null) return;
    setHasAnswered(true);

    if (selectedIndex !== quest.correctOptionIndex) {
      setShakeWrong(true);
      setTimeout(() => {
        setShakeWrong(false);
        setHasAnswered(false);
        setSelectedIndex(null);
      }, 1200);
    }
  };

  const isCorrect = hasAnswered && selectedIndex === quest.correctOptionIndex;
  const isWrong   = hasAnswered && selectedIndex !== quest.correctOptionIndex;

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4">

      {/* ── Planet Header ── */}
      <div className="mb-8 text-center">
        {/* Hologram icon */}
        <div className="relative inline-flex items-center justify-center mb-4">
          {/* Glow ring behind the emoji */}
          <div className="absolute w-24 h-24 rounded-full animate-glowPulse opacity-60"
               style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)" }} />
          <span className={`text-7xl animate-float hologram select-none ${isCorrect ? "animate-bounce" : ""}`}>
            {isCorrect ? "🎉" : icon}
          </span>
        </div>

        {/* Level + planet title */}
        <h2 className="text-2xl font-bold text-gradient tracking-tight">
          Level {levelId}: {planetName}
        </h2>
        <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-medium">
          Final Quest
        </p>
      </div>

      {/* ── Question Card ── */}
      <div className="relative w-full mb-6">
        {/* Outer glow layer */}
        <div className="absolute -inset-px rounded-3xl opacity-50"
             style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))", filter: "blur(8px)" }} />
        <div className="glass-card relative p-6">
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5 flex-shrink-0">❓</span>
            <p className="text-white font-semibold text-[17px] leading-relaxed">
              {quest.question}
            </p>
          </div>
        </div>
      </div>

      {/* ── Answer Options ── */}
      <div className={`w-full space-y-3 ${shakeWrong ? "animate-shake" : ""}`}>
        {quest.options.map((option, index) => {
          const isSelected  = selectedIndex === index;
          const showCorrect = hasAnswered && index === quest.correctOptionIndex;
          const showWrong   = hasAnswered && isSelected && index !== quest.correctOptionIndex;

          // Derive styles per state
          let borderStyle  = "border-white/8  hover:border-violet-500/40";
          let bgStyle      = "bg-white/4      hover:bg-white/7";
          let ringStyle    = "";
          let glowStyle    = "";

          if (isSelected && !hasAnswered) {
            borderStyle = "border-indigo-500/60";
            bgStyle     = "bg-indigo-500/10";
            ringStyle   = "ring-1 ring-indigo-500/30";
            glowStyle   = "shadow-lg shadow-indigo-500/10";
          }
          if (showCorrect) {
            borderStyle = "border-emerald-500/60";
            bgStyle     = "bg-emerald-500/10";
            ringStyle   = "ring-1 ring-emerald-500/30";
            glowStyle   = "shadow-lg shadow-emerald-500/20";
          }
          if (showWrong) {
            borderStyle = "border-red-500/60";
            bgStyle     = "bg-red-500/10";
            ringStyle   = "ring-1 ring-red-500/30";
            glowStyle   = "shadow-lg shadow-red-500/10";
          }

          const letterBg = showCorrect
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/40"
            : showWrong
            ? "bg-red-500 text-white shadow-lg shadow-red-500/40"
            : isSelected
            ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/40"
            : "bg-white/8 text-slate-400 group-hover:bg-white/14";

          const textColor = showCorrect
            ? "text-emerald-300"
            : showWrong
            ? "text-red-300"
            : isSelected
            ? "text-indigo-200"
            : "text-slate-300 group-hover:text-slate-100";

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={hasAnswered}
              className={`w-full text-left p-4 rounded-2xl border backdrop-blur-md
                transition-all duration-200 group
                ${borderStyle} ${bgStyle} ${ringStyle} ${glowStyle}
                disabled:cursor-default
                ${!hasAnswered ? "cursor-pointer active:scale-[0.98]" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                {/* Letter badge */}
                <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center
                  text-xs font-bold transition-all duration-200 ${letterBg}`}>
                  {showCorrect ? "✓" : showWrong ? "✗" : String.fromCharCode(65 + index)}
                </span>
                <span className={`text-[15px] leading-relaxed font-medium transition-colors duration-200 ${textColor}`}>
                  {option}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Feedback & CTA ── */}
      <div className="w-full mt-8 space-y-3">
        {isCorrect && (
          <div className="flex flex-col items-center gap-4 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
              bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              🎉 Correct! Well done, Explorer!
            </div>

            <button
              id="travel-next-btn"
              onClick={onSuccess}
              className="relative group w-full py-4 rounded-2xl text-sm font-bold text-white
                transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #a21caf 100%)",
                boxShadow:  "0 0 30px rgba(99,102,241,0.45), 0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <span className="flex items-center justify-center gap-2">
                {nextLevelName === "The Sun"
                  ? "ENTER THE SUN ☀️"
                  : `🚀 Travel to ${nextLevelName ?? "Next Planet"}`}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        )}

        {isWrong && (
          <div className="text-center animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
              bg-red-500/12 text-red-400 border border-red-500/30">
              🔄 Not quite — try again!
            </div>
          </div>
        )}

        {!hasAnswered && (
          <button
            onClick={handleSubmit}
            disabled={selectedIndex === null}
            className="w-full py-4 rounded-2xl text-sm font-bold text-white
              transition-all duration-200
              disabled:opacity-25 disabled:cursor-not-allowed disabled:scale-100
              hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background:  selectedIndex !== null
                ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
                : "rgba(255,255,255,0.06)",
              boxShadow: selectedIndex !== null
                ? "0 0 22px rgba(99,102,241,0.35), 0 4px 15px rgba(0,0,0,0.4)"
                : "none",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
}
