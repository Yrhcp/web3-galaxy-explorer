"use client";

import { useState } from "react";
import StarField from "./components/StarField";
import PlanetView from "./components/PlanetView";
import QuestView from "./components/QuestView";
import SunScreen from "./components/SunScreen";
import { levels } from "@/src/data";

type GamePhase = "welcome" | "learn" | "quest" | "complete" | "sun";

export default function Home() {
  const [phase, setPhase] = useState<GamePhase>("welcome");
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const level = levels[currentLevelIndex];

  const handleStartJourney = () => {
    setPhase("learn");
  };

  const handleConceptsComplete = () => {
    // Skip quest phase if the level has no quest (e.g. The Sun)
    if (!level.finalQuest) {
      setPhase("sun");
    } else {
      setPhase("quest");
    }
  };

  const handleQuestSuccess = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
      setPhase("learn");
    } else {
      // Last level (The Sun) complete → show the Galaxy Conquered screen
      setPhase("sun");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarField />

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-12">
        {/* Welcome Screen */}
        {phase === "welcome" && (
          <div className="flex flex-col items-center text-center px-6 animate-slideUp">
            {/* Logo / Title */}
            <div className="mb-6">
              <div className="text-7xl mb-4 animate-float">🌌</div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradientShift">
                Web3 Galaxy Explorer
              </h1>
              <p className="text-slate-400 mt-3 max-w-md text-lg">
                Journey through the cosmos to master blockchain fundamentals
              </p>
            </div>

            {/* Level Preview Card */}
            <div className="relative mt-8 mb-10 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-cyan-500/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative glass rounded-2xl p-8 max-w-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-2xl shadow-lg shadow-blue-600/30 animate-orbitPulse">
                    🪐
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                      Level {level.id}
                    </div>
                    <div className="text-xl font-bold text-white">
                      {level.name}
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {level.threeConcepts.map((concept, i) => (
                    <div
                      key={concept.id}
                      className="flex items-center gap-3 text-sm text-slate-400"
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center text-xs text-slate-500">
                        {i + 1}
                      </span>
                      {concept.title}
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-700/50 flex items-center gap-2 text-xs text-slate-500">
                  <span>⚡</span>
                  <span>3 concepts + 1 quest</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              id="start-journey-btn"
              onClick={handleStartJourney}
              className="relative group px-8 py-4 rounded-2xl text-base font-semibold text-white
                bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500
                shadow-xl shadow-blue-600/25 hover:shadow-blue-500/40
                transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Begin Your Journey
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>

            {/* Footer info */}
            <div className="mt-8 flex items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Built on Base
              </span>
              <span>·</span>
              <span>Powered by OnchainKit</span>
            </div>
          </div>
        )}

        {/* Learning Phase */}
        {phase === "learn" && (
          <div className="animate-fadeIn w-full">
            <PlanetView
              concepts={level.threeConcepts}
              planetName={level.name}
              accentColor={level.colorPalette.accent}
              onComplete={handleConceptsComplete}
            />
          </div>
        )}

        {/* Quest Phase */}
        {phase === "quest" && level.finalQuest && (
          <div className="animate-fadeIn w-full">
            <QuestView
              quest={level.finalQuest}
              planetName={level.name}
              accentColor={level.colorPalette.accent}
              nextLevelName={levels[currentLevelIndex + 1]?.name}
              onSuccess={handleQuestSuccess}
            />
          </div>
        )}

        {/* Sun Finale */}
        {phase === "sun" && (
          <SunScreen
            onRestart={() => {
              setCurrentLevelIndex(0);
              setPhase("welcome");
            }}
          />
        )}

        {/* Completion Screen */}
        {phase === "complete" && (
          <div className="flex flex-col items-center text-center px-6 animate-slideUp">
            <div className="text-7xl mb-6 animate-float">
              {level.id === 8 ? "🌟" : "🏆"}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
              {level.id === 8 ? "Galaxy Explorer!" : "Mission Complete!"}
            </h2>
            <p className="text-slate-400 max-w-md text-lg mb-2">
              {level.id === 8
                ? "Congratulations, Galaxy Explorer! You have mastered the Onchain World."
                : `You've conquered Planet ${level.name} and proved your blockchain knowledge.`}
            </p>
            <p className="text-slate-500 text-sm mb-8">
              {level.id === 8
                ? "You've travelled the full Solar System and unlocked the secrets of Web3."
                : "More planets are being discovered... The galaxy awaits!"}
            </p>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-2xl blur-lg opacity-60" />
              <div className="relative glass rounded-2xl p-6 max-w-sm">
                <div className="text-sm font-medium text-slate-300 mb-3">
                  🎖️ Achievement Unlocked
                </div>
                <div className="text-xl font-bold text-amber-400 mb-1">
                  {level.name} Navigator
                </div>
                <div className="text-xs text-slate-500">
                  Completed all concepts and quest for Level {level.id}
                </div>
              </div>
            </div>

            <button
              id="restart-btn"
              onClick={() => {
                setCurrentLevelIndex(0);
                setPhase("welcome");
              }}
              className="mt-8 px-6 py-3 rounded-xl text-sm font-medium text-slate-300
                border border-slate-700/50 hover:border-slate-500
                hover:bg-slate-800/50 transition-all duration-200"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
