"use client";

import React from 'react';

interface PauseScreenProps {
  score: number;
  onResume: () => void;
  onMainMenu: () => void;
}

export const PauseScreen: React.FC<PauseScreenProps> = ({
  score,
  onResume,
  onMainMenu,
}) => {
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative z-10 text-center px-6 max-w-lg">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Pause Icon */}
          <div className="text-6xl mb-4">⏸️</div>
          
          <h2 className="text-4xl font-bold text-white mb-4">Paused</h2>
          
          {/* Current Score */}
          <div className="mb-8">
            <div className="text-white/70 text-sm mb-2">Current Score</div>
            <div className="text-5xl font-bold text-white">
              {score.toLocaleString()}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 mb-8 border border-white/10">
            <div className="text-white/70 text-sm mb-3 font-semibold">Quick Tips</div>
            <div className="space-y-2 text-white/60 text-xs text-left">
              <p>• Swipe quickly to build combos</p>
              <p>• Watch out for bombs </p>
              <p>• Higher combos = bigger multipliers</p>
              <p>• Don't let tokens fall!</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={onResume}
              className="w-full px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-green-500/50"
            >
              Resume Game ▶️
            </button>
            <button
              onClick={onMainMenu}
              className="w-full px-8 py-3 text-lg font-bold text-white backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-full shadow-xl transform hover:scale-105 transition-all border border-white/20"
            >
              Main Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
