"use client";

import React from 'react';

interface StartScreenProps {
  onPlay: () => void;
  onBack: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onPlay, onBack }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-900 via-purple-900 to-black flex items-center justify-center">
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h2 className="text-5xl font-bold text-white mb-8 drop-shadow-xl">
          How to Play
        </h2>

        {/* Instructions */}
        <div className="space-y-4 mb-12">
          <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 shadow-xl text-left">
            <div className="flex items-start gap-4">
              <div className="text-4xl">👆</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Slice Tokens</h3>
                <p className="text-white/80">
                  Use your mouse or finger to swipe across falling tokens. Create smooth blade trails to slice them!
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 shadow-xl text-left">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💣</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Avoid Bombs</h3>
                <p className="text-white/80">
                  Don't slice the bombs! Each bomb hit costs you one life. You have 3 lives total.
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 shadow-xl text-left">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🔥</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Build Combos</h3>
                <p className="text-white/80">
                  Chain multiple slices quickly to build combos! Higher combos give score multipliers up to 5x.
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 shadow-xl text-left">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚡</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Progressive Difficulty</h3>
                <p className="text-white/80">
                  The game gets harder every 10 seconds with faster spawn rates. Stay sharp!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onBack}
            className="px-8 py-3 text-lg font-bold text-white backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-full shadow-xl transform hover:scale-105 transition-all border border-white/20"
          >
            Back
          </button>
          <button
            onClick={onPlay}
            className="px-12 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/50"
          >
            Let's Play! 🎮
          </button>
        </div>
      </div>
    </div>
  );
};
