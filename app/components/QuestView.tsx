"use client";

import { useState } from "react";
import { PlanetQuest } from "@/src/types";

interface QuestViewProps {
  quest: PlanetQuest;
  planetName: string;
  accentColor: string;
  nextLevelName?: string;
  onSuccess: () => void;
}

export default function QuestView({
  quest,
  planetName,
  accentColor,
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
      // Wrong answer - shake and allow retry
      setShakeWrong(true);
      setTimeout(() => {
        setShakeWrong(false);
        setHasAnswered(false);
        setSelectedIndex(null);
      }, 1200);
    }
    // Correct answer: user clicks the CTA button that appears
  };

  const isCorrect =
    hasAnswered && selectedIndex === quest.correctOptionIndex;
  const isWrong =
    hasAnswered && selectedIndex !== quest.correctOptionIndex;

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4">
      {/* Quest Header */}
      <div className="mb-8 text-center">
        <div className="text-5xl mb-3">
          {isCorrect ? (
            <span className="animate-bounce inline-block">🎉</span>
          ) : (
            <span className="animate-float inline-block">⚡</span>
          )}
        </div>
        <h2 className={`text-2xl font-bold ${accentColor}`}>
          {planetName} Quest
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Answer correctly to proceed
        </p>
      </div>

      {/* Question Card */}
      <div className="relative w-full mb-8">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-500/20 rounded-2xl blur-lg opacity-60" />
        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-lg mt-0.5">❓</span>
            <p className="text-white font-medium text-lg leading-relaxed">
              {quest.question}
            </p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div
        className={`w-full space-y-3 ${
          shakeWrong ? "animate-shake" : ""
        }`}
      >
        {quest.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const showCorrect =
            hasAnswered && index === quest.correctOptionIndex;
          const showWrong =
            hasAnswered &&
            isSelected &&
            index !== quest.correctOptionIndex;

          let borderClass = "border-slate-700/50 hover:border-slate-500/70";
          let bgClass = "bg-slate-900/60 hover:bg-slate-800/60";
          let ringClass = "";

          if (isSelected && !hasAnswered) {
            borderClass = "border-blue-500/70";
            bgClass = "bg-blue-950/40";
            ringClass = "ring-1 ring-blue-500/30";
          }
          if (showCorrect) {
            borderClass = "border-emerald-500/70";
            bgClass = "bg-emerald-950/30";
            ringClass = "ring-1 ring-emerald-500/30";
          }
          if (showWrong) {
            borderClass = "border-red-500/70";
            bgClass = "bg-red-950/30";
            ringClass = "ring-1 ring-red-500/30";
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={hasAnswered}
              className={`w-full text-left p-4 rounded-xl border backdrop-blur-sm
                transition-all duration-200 group
                ${borderClass} ${bgClass} ${ringClass}
                disabled:cursor-default
                ${!hasAnswered ? "cursor-pointer active:scale-[0.98]" : ""}
              `}
            >
              <div className="flex items-start gap-3">
                {/* Option Letter */}
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200
                    ${
                      showCorrect
                        ? "bg-emerald-500 text-white"
                        : showWrong
                        ? "bg-red-500 text-white"
                        : isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-slate-700/50 text-slate-400 group-hover:bg-slate-600/50"
                    }
                  `}
                >
                  {showCorrect ? "✓" : showWrong ? "✗" : String.fromCharCode(65 + index)}
                </span>

                <span
                  className={`text-[15px] leading-relaxed ${
                    showCorrect
                      ? "text-emerald-300"
                      : showWrong
                      ? "text-red-300"
                      : isSelected
                      ? "text-blue-200"
                      : "text-slate-300 group-hover:text-slate-200"
                  }`}
                >
                  {option}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback & Action */}
      <div className="w-full mt-8">
        {isCorrect && (
          <div className="flex flex-col items-center gap-4 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/30 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/30">
              <span>🎉</span> Correct! Well done, explorer!
            </div>
            <button
              id="travel-next-btn"
              onClick={onSuccess}
              className="relative group w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300
                bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500
                text-white shadow-lg shadow-teal-600/30 hover:shadow-teal-500/40
                hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-2">
                {nextLevelName === "The Sun"
                  ? "ENTER THE SUN ☀️"
                  : `🚀 Travel to ${nextLevelName ?? "Next Planet"}`}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        )}

        {isWrong && (
          <div className="text-center mb-4 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/30 text-red-400 rounded-full text-sm font-medium border border-red-500/30">
              <span>🔄</span> Not quite — try again!
            </div>
          </div>
        )}

        {!hasAnswered && (
          <button
            onClick={handleSubmit}
            disabled={selectedIndex === null}
            className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200
              disabled:opacity-30 disabled:cursor-not-allowed
              bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500
              text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40
              hover:scale-[1.01] active:scale-[0.99]"
          >
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
}
