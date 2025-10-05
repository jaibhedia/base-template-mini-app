"use client";

import React, { useState } from 'react';
import { GameState } from './GameTypes';
import { LandingScreen } from './LandingScreen';
import { StartScreen } from './StartScreen';
import { GameScreen } from './GameScreen';
import { ResultsScreen } from './ResultsScreen';
import { PauseScreen } from './PauseScreen';

export const BaseNinjaGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [finalScore, setFinalScore] = useState(0);
  const [finalHighScore, setFinalHighScore] = useState(0);
  const [finalMaxCombo, setFinalMaxCombo] = useState(0);
  const [finalLevel, setFinalLevel] = useState(1);
  const [pausedScore, setPausedScore] = useState(0);
  const [gameKey, setGameKey] = useState(0);

  const handleStart = () => {
    setGameState('start');
  };

  const handlePlay = () => {
    setGameKey(prev => prev + 1);
    setGameState('playing');
  };

  const handleGameOver = (score: number, highScore: number, maxCombo?: number, level?: number) => {
    setFinalScore(score);
    setFinalHighScore(highScore);
    setFinalMaxCombo(maxCombo || Math.floor(score / 30));
    setFinalLevel(level || Math.floor(score / 100) + 1);
    setGameState('results');
  };

  const handlePause = (score: number) => {
    setPausedScore(score);
    setGameState('paused');
  };

  const handleResume = () => {
    setGameState('playing');
  };

  const handlePlayAgain = () => {
    setGameKey(prev => prev + 1);
    setGameState('playing');
  };

  const handleMainMenu = () => {
    setGameState('landing');
  };

  const handleBack = () => {
    setGameState('landing');
  };

  return (
    <>
      {gameState === 'landing' && <LandingScreen onStart={handleStart} />}
      {gameState === 'start' && <StartScreen onPlay={handlePlay} onBack={handleBack} />}
      {gameState === 'playing' && (
        <GameScreen key={gameKey} onGameOver={handleGameOver} onPause={handlePause} />
      )}
      {gameState === 'results' && (
        <ResultsScreen
          score={finalScore}
          highScore={finalHighScore}
          maxCombo={finalMaxCombo}
          level={finalLevel}
          onPlayAgain={handlePlayAgain}
          onMainMenu={handleMainMenu}
        />
      )}
      {gameState === 'paused' && (
        <div className="relative w-full h-screen">
          <GameScreen key={gameKey} onGameOver={handleGameOver} onPause={handlePause} />
          <PauseScreen
            score={pausedScore}
            onResume={handleResume}
            onMainMenu={handleMainMenu}
          />
        </div>
      )}
    </>
  );
};
