"use client";

import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  shape: "square" | "circle";
}

const CONFETTI_COLORS = [
  "#fbbf24", "#f59e0b", "#ef4444", "#10b981",
  "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4",
  "#f97316", "#a3e635",
];

interface SunScreenProps {
  onRestart: () => void;
}

export default function SunScreen({ onRestart }: SunScreenProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const pieces: ConfettiPiece[] = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 4,
      duration: Math.random() * 2 + 2.5,
      size: Math.random() * 9 + 4,
      shape: Math.random() > 0.5 ? "square" : "circle",
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div className="relative flex flex-col items-center text-center px-6 py-10 w-full max-w-lg mx-auto animate-slideUp">

      {/* Golden radial glow background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(251,191,36,0.18) 0%, rgba(234,88,12,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Confetti rain */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        {confetti.map((p) => (
          <div
            key={p.id}
            className="absolute animate-confettiFall"
            style={{
              left: `${p.x}%`,
              top: "-16px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "50%" : "2px",
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 w-full">

        {/* Spinning sun with solar flare layers */}
        <div className="relative inline-flex items-center justify-center mb-6">
          {/* Outer solar flare ring */}
          <div
            className="absolute w-52 h-52 rounded-full animate-solarFlare"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(251,191,36,0.0), rgba(249,115,22,0.5), rgba(234,88,12,0.4), rgba(251,191,36,0.0), rgba(249,115,22,0.3), rgba(251,191,36,0.0))",
              filter: "blur(12px)",
            }}
          />
          {/* Inner glow ring */}
          <div
            className="absolute w-36 h-36 rounded-full animate-sunGlow"
            style={{ background: "rgba(251,191,36,0.12)" }}
          />
          <span className="text-8xl animate-spin-slow select-none">☀️</span>
        </div>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight"
          style={{
            background: "linear-gradient(135deg, #fde68a 0%, #fbbf24 40%, #f97316 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          GALAXY CONQUERED
        </h1>

        <p className="text-yellow-200/90 text-lg mb-2 font-semibold">
          Congratulations, Galaxy Explorer! 🌟
        </p>
        <p className="text-slate-400 text-sm max-w-sm mx-auto mb-10 leading-relaxed">
          You have mastered the Onchain World — wallets, gas, smart contracts,
          DAOs, NFTs, DeFi, and Base. The Solar System is yours.
        </p>

        {/* Achievement Card */}
        <div className="relative mb-8 group">
          <div
            className="absolute -inset-1 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
            style={{
              background: "linear-gradient(135deg, rgba(251,191,36,0.4), rgba(249,115,22,0.4))",
            }}
          />
          <div className="relative bg-slate-900/90 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-8">
            <div className="text-5xl mb-3">🎖️</div>
            <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-2">
              Achievement Unlocked
            </div>
            <div className="text-2xl font-extrabold text-white mb-1">
              Solar System Master
            </div>
            <div className="text-sm font-semibold text-orange-400 mb-3">
              Galaxy Conquered ☀️
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span>✦</span>
              <span>9 levels completed</span>
              <span>✦</span>
              <span>Web3 Galaxy Explorer</span>
              <span>✦</span>
            </div>
          </div>
        </div>

        {/* Mint CTA */}
        <button
          id="mint-badge-btn"
          className="relative w-full py-4 rounded-2xl text-base font-bold text-slate-900
            transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] mb-2 shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #fde68a 0%, #fbbf24 50%, #f97316 100%)",
            boxShadow: "0 0 40px rgba(251,191,36,0.35)",
          }}
        >
          <span className="flex items-center justify-center gap-2">
            🏅 MINT YOUR EXPLORER BADGE
          </span>
        </button>
        <p className="text-xs text-slate-600 mb-10">Coming Soon to Base</p>

        {/* Restart */}
        <button
          id="restart-btn"
          onClick={onRestart}
          className="px-6 py-3 rounded-xl text-sm font-medium text-slate-400
            border border-slate-700/50 hover:border-slate-500 hover:text-slate-300
            hover:bg-slate-800/50 transition-all duration-200"
        >
          ↩ Play Again
        </button>
      </div>
    </div>
  );
}
