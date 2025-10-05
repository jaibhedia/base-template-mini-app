"use client";

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useMintScoreNFT } from '~/lib/hooks/useScoreNFT';

interface ResultsScreenProps {
  score: number;
  highScore: number;
  maxCombo?: number;
  level?: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  highScore,
  maxCombo = 0,
  level = 1,
  onPlayAgain,
  onMainMenu,
}) => {
  const { address, isConnected } = useAccount();
  const { mintScore, isPending, isConfirming, isConfirmed, error } = useMintScoreNFT();
  const [hasMinted, setHasMinted] = useState(false);
  
  const isNewHighScore = score === highScore && score > 0;
  const getRank = (score: number) => {
    if (score >= 1000) return { title: 'Legendary Ninja', color: 'from-yellow-400 to-orange-500' };
    if (score >= 500) return { title: 'Master Ninja',  color: 'from-purple-400 to-pink-500' };
    if (score >= 250) return { title: 'Elite Ninja',  color: 'from-blue-400 to-purple-500' };
    if (score >= 100) return { title: 'Skilled Ninja',  color: 'from-green-400 to-blue-500' };
    return { title: 'Novice Ninja',  color: 'from-gray-400 to-gray-600' };
  };

  const rank = getRank(score);

  useEffect(() => {
    if (isConfirmed) {
      setHasMinted(true);
    }
  }, [isConfirmed]);

  const handleMintNFT = async () => {
    if (!isConnected || hasMinted) return;
    try {
      await mintScore(score, maxCombo, level);
    } catch (err) {
      console.error('Failed to mint NFT:', err);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-900 via-purple-900 to-black flex items-center justify-center">
      {/* Celebration particles for high score */}
      {isNewHighScore && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {['🎉', '⭐', '💫', '✨'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Game Over Title */}
        <div className="mb-8">
          <h2 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            {isNewHighScore ? 'New High Score!' : 'Game Over'}
          </h2>
          <div className="text-5xl mb-4">{rank.emoji}</div>
          <p className={`text-2xl font-bold bg-gradient-to-r ${rank.color} bg-clip-text text-transparent`}>
            {rank.title}
          </p>
        </div>

        {/* Score Display */}
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="mb-6">
            <div className="text-white/70 text-lg mb-2">Your Score</div>
            <div className={`text-7xl font-bold ${isNewHighScore ? 'text-yellow-400 animate-pulse' : 'text-white'}`}>
              {score.toLocaleString()}
            </div>
          </div>

          <div className="h-px bg-white/20 my-6" />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-white/70 text-sm mb-2">High Score</div>
              <div className="text-3xl font-bold text-white">
                {highScore.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-white/70 text-sm mb-2">Rank</div>
              <div className="text-3xl font-bold text-white">
                {rank.title.split(' ')[0]}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-white/70 text-xs">Accuracy</div>
            <div className="text-white font-bold">
              {score > 0 ? Math.min(95, 70 + Math.floor(score / 50)) : 0}%
            </div>
          </div>
          <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-white/70 text-xs">Best Combo</div>
            <div className="text-white font-bold">
              {Math.floor(score / 30)}
            </div>
          </div>
        </div>

        {/* NFT Mint Section */}
        {isConnected && score > 0 && (
          <div className="mb-8 backdrop-blur-md bg-gradient-to-r from-[#0052FF]/20 to-purple-500/20 rounded-2xl p-6 border border-[#0052FF]/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">🎨</div>
                <div className="text-left">
                  <div className="text-white font-bold text-lg">Mint Your Score NFT</div>
                  <div className="text-white/70 text-sm">Immortalize this game on Base Chain</div>
                </div>
              </div>
            </div>
            
            {!hasMinted && !isConfirmed && (
              <button
                onClick={handleMintNFT}
                disabled={isPending || isConfirming}
                className="w-full px-6 py-3 text-lg font-bold text-white bg-[#0052FF] hover:bg-[#0052FF]/90 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isPending || isConfirming ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    {isPending ? 'Confirm in Wallet...' : 'Minting...'}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>⚡</span>
                    Mint Score NFT
                    <span>⚡</span>
                  </span>
                )}
              </button>
            )}
            
            {isConfirmed && (
              <div className="bg-green-500/20 border border-green-500/40 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">✅</div>
                <div className="text-green-400 font-bold mb-1">NFT Minted Successfully!</div>
                <div className="text-white/70 text-sm">Your score is now on the blockchain</div>
              </div>
            )}
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-4 text-center">
                <div className="text-red-400 font-bold mb-1">Failed to mint NFT</div>
                <div className="text-white/70 text-xs">{error.message}</div>
              </div>
            )}
          </div>
        )}

        {!isConnected && score > 0 && (
          <div className="mb-8 backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/20">
            <div className="text-center">
              <div className="text-3xl mb-2">🔗</div>
              <div className="text-white/70 text-sm">
                Connect your wallet to mint this score as an NFT
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={onPlayAgain}
            className="w-full px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-[#0052FF] to-purple-600 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-[#0052FF]/50"
          >
            Play Again 🎮
          </button>
          <button
            onClick={onMainMenu}
            className="w-full px-12 py-4 text-xl font-bold text-white backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-full shadow-xl transform hover:scale-105 transition-all border border-white/20"
          >
            Main Menu
          </button>
        </div>

        {/* Share prompt */}
        <div className="mt-8 text-white/60 text-sm">
          {hasMinted ? 'Your NFT is minted! Share it with friends! ' : 'Share your score with friends! 🚀'}
        </div>
      </div>
    </div>
  );
};
