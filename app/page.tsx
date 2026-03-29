"use client";

import { useState } from "react";
import StarField from "./components/StarField";
import PlanetView from "./components/PlanetView";
import QuestView from "./components/QuestView";
import SunScreen from "./components/SunScreen";
import { levels } from "@/src/data";

type GamePhase = "welcome" | "learn" | "quest" | "complete" | "sun";

export default function Home() {
  const [phase, setPhase]                     = useState<GamePhase>("welcome");
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const level = levels[currentLevelIndex];

  const handleStartJourney      = () => setPhase("learn");
  const handleConceptsComplete  = () => setPhase(level.finalQuest ? "quest" : "sun");
  const handleQuestSuccess      = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
      setPhase("learn");
    } else {
      setPhase("sun");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarField />

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-12">

        {/* ─────────────────────────────────────────
            WELCOME SCREEN
        ───────────────────────────────────────── */}
        {phase === "welcome" && (
          <div className="flex flex-col items-center text-center px-6 animate-slideUp">

            {/* Hero icon */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div
                className="absolute w-36 h-36 rounded-full animate-glowPulse opacity-40"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)" }}
              />
              <div className="text-8xl animate-float hologram select-none">🌌</div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gradient animate-gradientShift mb-3">
              Web3 Galaxy Explorer
            </h1>
            <p className="text-slate-400 max-w-sm text-base leading-relaxed mb-10">
              Journey through the cosmos and master blockchain — one planet at a time.
            </p>

            {/* Level preview card */}
            <div className="relative mb-10 group w-full max-w-sm">
              {/* Ambient glow */}
              <div
                className="absolute -inset-1 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(139,92,246,0.35))" }}
              />
              <div className="glass-card relative p-7">
                <div className="flex items-center gap-4 mb-5">
                  {/* Planet icon badge */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl animate-orbitPulse flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))",
                      border:     "1px solid rgba(139,92,246,0.35)",
                    }}
                  >
                    {level.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-0.5">
                      First Stop
                    </div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Level {level.id}
                    </div>
                    <div className="text-xl font-bold text-white">{level.name}</div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {level.threeConcepts.map((concept, i) => (
                    <div key={concept.id} className="flex items-center gap-3 text-sm text-slate-400">
                      <span
                        className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold text-violet-400 flex-shrink-0"
                        style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.2)" }}
                      >
                        {i + 1}
                      </span>
                      {concept.title}
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 flex items-center gap-2 text-xs text-slate-600"
                     style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span>⚡</span>
                  <span>3 concepts + 1 quest per planet</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              id="start-journey-btn"
              onClick={handleStartJourney}
              className="group relative px-10 py-4 rounded-2xl text-base font-bold text-white
                transition-all duration-300 hover:scale-105 active:scale-95 mb-8"
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #a21caf 100%)",
                boxShadow:  "0 0 35px rgba(99,102,241,0.5), 0 4px 20px rgba(0,0,0,0.4)",
                border:     "1px solid rgba(139,92,246,0.4)",
              }}
            >
              <span className="relative flex items-center gap-2">
                Begin Your Journey
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            {/* Footer badges */}
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                Built on Base
              </span>
              <span>·</span>
              <span>Powered by OnchainKit</span>
              <span>·</span>
              <span>9 Planets</span>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────
            LEARNING PHASE
        ───────────────────────────────────────── */}
        {phase === "learn" && (
          <div className="animate-fadeIn w-full">
            <PlanetView
              key={`planet-${currentLevelIndex}`}
              concepts={level.threeConcepts}
              planetName={level.name}
              levelId={level.id}
              icon={level.icon}
              onComplete={handleConceptsComplete}
            />
          </div>
        )}

        {/* ─────────────────────────────────────────
            QUEST PHASE
        ───────────────────────────────────────── */}
        {phase === "quest" && level.finalQuest && (
          <div className="animate-fadeIn w-full">
            <QuestView
              key={`quest-${currentLevelIndex}`}
              quest={level.finalQuest}
              planetName={level.name}
              levelId={level.id}
              icon={level.icon}
              nextLevelName={levels[currentLevelIndex + 1]?.name}
              onSuccess={handleQuestSuccess}
            />
          </div>
        )}

        {/* ─────────────────────────────────────────
            SUN FINALE
        ───────────────────────────────────────── */}
        {phase === "sun" && (
          <SunScreen
            onRestart={() => {
              setCurrentLevelIndex(0);
              setPhase("welcome");
            }}
          />
        )}

        {/* ─────────────────────────────────────────
            COMPLETION SCREEN (unused path, kept for safety)
        ───────────────────────────────────────── */}
        {phase === "complete" && (
          <div className="flex flex-col items-center text-center px-6 animate-slideUp">
            <div className="text-7xl mb-6 animate-float hologram">🏆</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-4">
              Mission Complete!
            </h2>
            <p className="text-slate-400 max-w-md text-lg mb-8">
              You&apos;ve conquered Planet {level.name} and proved your blockchain knowledge.
            </p>
            <button
              id="restart-btn"
              onClick={() => { setCurrentLevelIndex(0); setPhase("welcome"); }}
              className="px-6 py-3 rounded-xl text-sm font-medium text-slate-300
                border border-white/8 hover:border-violet-500/40 hover:bg-white/5
                transition-all duration-200"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
