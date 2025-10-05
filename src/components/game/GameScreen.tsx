"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Token, Bomb, Particle, BladeTrail } from './GameTypes';
import { TOKEN_IMAGES, BASE_LOGO_URL } from './GameAssets';

interface GameScreenProps {
  onGameOver: (score: number, highScore: number) => void;
  onPause: (score: number) => void;
}

const INITIAL_SPAWN_RATE = 1500; // ms
const MIN_SPAWN_RATE = 300; // ms
const SPAWN_RATE_DECREASE = 100; // ms every 10 seconds
const DIFFICULTY_INTERVAL = 10000; // 10 seconds
const GRAVITY = 0.5;
const INITIAL_VELOCITY = -22; // Increased from -15 to -22 for higher jumps
const INITIAL_LIVES = 3;

export const GameScreen: React.FC<GameScreenProps> = ({ onGameOver, onPause }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [spawnRate, setSpawnRate] = useState(INITIAL_SPAWN_RATE);
  const [isPaused, setIsPaused] = useState(false);
  
  const tokensRef = useRef<Token[]>([]);
  const bombsRef = useRef<Bomb[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const bladeTrailRef = useRef<BladeTrail[]>([]);
  const comboTimerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number>();
  const spawnIntervalRef = useRef<NodeJS.Timeout>();
  const difficultyIntervalRef = useRef<NodeJS.Timeout>();
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);
  const isSlicingRef = useRef(false);
  const baseLogoRef = useRef<HTMLImageElement | null>(null);

  // Load Base logo image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = BASE_LOGO_URL;
    img.onload = () => {
      baseLogoRef.current = img;
    };
  }, []);

  // Pause game when screen/tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isPaused) {
        setIsPaused(true);
        // Cancel animation frame immediately
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        onPause(score);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [score, onPause, isPaused]);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('baseNinjaHighScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('baseNinjaHighScore', score.toString());
    }
  }, [score, highScore]);

  // Combo system - reset after 2 seconds of no slices
  const resetComboTimer = useCallback(() => {
    if (comboTimerRef.current) {
      clearTimeout(comboTimerRef.current);
    }
    comboTimerRef.current = window.setTimeout(() => {
      setCombo(0);
    }, 2000);
  }, []);

  // Create particles for slice effect
  const createParticles = useCallback((x: number, y: number, color: string) => {
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 3 + Math.random() * 3;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        color,
      });
    }
  }, []);

  // Check if line intersects circle (token/bomb)
  const checkLineCircleCollision = useCallback((
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    cx: number,
    cy: number,
    radius: number
  ): boolean => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const fx = x1 - cx;
    const fy = y1 - cy;

    const a = dx * dx + dy * dy;
    const b = 2 * (fx * dx + fy * dy);
    const c = (fx * fx + fy * fy) - radius * radius;

    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return false;

    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

    return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1);
  }, []);

  // Spawn token
  const spawnToken = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isBomb = Math.random() < 0.15; // 15% chance for bomb
    const x = Math.random() * (canvas.width - 100) + 50;
    const tokenType = TOKEN_IMAGES[Math.floor(Math.random() * TOKEN_IMAGES.length)];

    if (isBomb) {
      const speedMultiplier = 0.8 + Math.random() * 0.6; // 0.8x to 1.4x speed
      bombsRef.current.push({
        x,
        y: canvas.height + 50,
        vx: 0,
        vy: (INITIAL_VELOCITY + Math.random() * -6) * speedMultiplier, // Increased variation from -3 to -6
        radius: 35,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        oscillationAmplitude: 20 + Math.random() * 40, // 20-60px horizontal movement
        oscillationFrequency: 0.02 + Math.random() * 0.03, // Varying zig-zag speed
        oscillationPhase: Math.random() * Math.PI * 2,
        speedMultiplier,
      });
    } else {
      const speedMultiplier = 0.7 + Math.random() * 0.8; // 0.7x to 1.5x speed for more variety
      tokensRef.current.push({
        x,
        y: canvas.height + 50,
        vx: 0,
        vy: (INITIAL_VELOCITY + Math.random() * -6) * speedMultiplier, // Increased variation from -3 to -6
        radius: 30,
        sliced: false,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        type: tokenType,
        oscillationAmplitude: 30 + Math.random() * 50, // 30-80px horizontal movement
        oscillationFrequency: 0.02 + Math.random() * 0.04, // Varying zig-zag speed
        oscillationPhase: Math.random() * Math.PI * 2,
        speedMultiplier,
      });
    }
  }, []);

  // Handle mouse/touch movement
  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (isSlicingRef.current && lastMousePosRef.current) {
      // Add blade trail
      bladeTrailRef.current.push({
        x1: lastMousePosRef.current.x,
        y1: lastMousePosRef.current.y,
        x2: x,
        y2: y,
        life: 1,
      });

      // Check collisions with tokens
      tokensRef.current.forEach((token) => {
        if (!token.sliced && checkLineCircleCollision(
          lastMousePosRef.current!.x,
          lastMousePosRef.current!.y,
          x,
          y,
          token.x,
          token.y,
          token.radius
        )) {
          token.sliced = true;
          const newCombo = combo + 1;
          setCombo(newCombo);
          const multiplier = Math.min(Math.floor(newCombo / 3) + 1, 5);
          setScore((prev) => prev + (10 * multiplier));
          createParticles(token.x, token.y, token.type.color);
          resetComboTimer();
        }
      });

      // Check collisions with bombs
      bombsRef.current.forEach((bomb, index) => {
        if (checkLineCircleCollision(
          lastMousePosRef.current!.x,
          lastMousePosRef.current!.y,
          x,
          y,
          bomb.x,
          bomb.y,
          bomb.radius
        )) {
          bombsRef.current.splice(index, 1);
          setLives((prev) => {
            const newLives = prev - 1;
            if (newLives <= 0) {
              onGameOver(score, highScore);
            }
            return newLives;
          });
          setCombo(0);
          createParticles(bomb.x, bomb.y, '#ff0000');
        }
      });
    }

    lastMousePosRef.current = { x, y };
  }, [combo, score, highScore, onGameOver, checkLineCircleCollision, createParticles, resetComboTimer]);

  const handlePointerDown = useCallback(() => {
    isSlicingRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    isSlicingRef.current = false;
    lastMousePosRef.current = null;
  }, []);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gameLoop = () => {
      // Clear canvas (transparent so CSS background shows through)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw tokens
      tokensRef.current = tokensRef.current.filter((token) => {
        token.vy += GRAVITY * token.speedMultiplier;
        // Zig-zag horizontal movement
        token.oscillationPhase += token.oscillationFrequency;
        token.x += Math.sin(token.oscillationPhase) * token.oscillationAmplitude * 0.1;
        token.y += token.vy;
        token.rotation += token.rotationSpeed;

        if (token.y > canvas.height + 100) {
          if (!token.sliced) {
            setLives((prev) => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                onGameOver(score, highScore);
              }
              return newLives;
            });
            setCombo(0);
          }
          return false;
        }

        if (!token.sliced) {
          ctx.save();
          ctx.translate(token.x, token.y);
          ctx.rotate(token.rotation);
          
          // Draw token shadow
          ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
          ctx.shadowBlur = 10;
          ctx.shadowOffsetY = 5;
          
          // Draw token background circle
          ctx.beginPath();
          ctx.arc(0, 0, token.radius, 0, Math.PI * 2);
          ctx.fillStyle = token.type.color;
          ctx.fill();
          
          // Draw Base logo image if loaded
          if (baseLogoRef.current && token.type.isImage) {
            ctx.shadowColor = 'transparent';
            const imgSize = token.radius * 1.5;
            ctx.drawImage(
              baseLogoRef.current,
              -imgSize / 2,
              -imgSize / 2,
              imgSize,
              imgSize
            );
          } else {
            // Fallback to symbol if image not loaded
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'transparent';
            ctx.fillText(token.type.symbol, 0, 0);
          }
          
          ctx.restore();
        }

        return true;
      });

      // Update and draw bombs
      bombsRef.current = bombsRef.current.filter((bomb) => {
        bomb.vy += GRAVITY * bomb.speedMultiplier;
        // Zig-zag horizontal movement
        bomb.oscillationPhase += bomb.oscillationFrequency;
        bomb.x += Math.sin(bomb.oscillationPhase) * bomb.oscillationAmplitude * 0.1;
        bomb.y += bomb.vy;
        bomb.rotation += bomb.rotationSpeed;

        if (bomb.y > canvas.height + 100) {
          return false;
        }

        ctx.save();
        ctx.translate(bomb.x, bomb.y);
        ctx.rotate(bomb.rotation);
        
        // Draw bomb
        ctx.beginPath();
        ctx.arc(0, 0, bomb.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#2c2c2c';
        ctx.fill();
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw bomb warning symbol
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#ff0000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💣', 0, 0);
        
        ctx.restore();

        return true;
      });

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.2;
        particle.life -= 0.02;

        if (particle.life > 0) {
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.fillRect(particle.x, particle.y, 4, 4);
          ctx.globalAlpha = 1;
          return true;
        }
        return false;
      });

      // Update and draw blade trail
      bladeTrailRef.current = bladeTrailRef.current.filter((trail) => {
        trail.life -= 0.05;

        if (trail.life > 0) {
          ctx.globalAlpha = trail.life * 0.7;
          ctx.strokeStyle = '#00d4ff';
          ctx.lineWidth = 4;
          ctx.lineCap = 'round';
          ctx.shadowColor = '#00d4ff';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(trail.x1, trail.y1);
          ctx.lineTo(trail.x2, trail.y2);
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
          return true;
        }
        return false;
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    // Only start game loop if not paused
    if (!isPaused) {
      gameLoop();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [score, highScore, onGameOver, isPaused]);

  // Spawn interval
  useEffect(() => {
    if (isPaused) {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }
      return;
    }

    spawnIntervalRef.current = setInterval(spawnToken, spawnRate);
    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }
    };
  }, [spawnRate, spawnToken, isPaused]);

  // Difficulty progression
  useEffect(() => {
    if (isPaused) {
      if (difficultyIntervalRef.current) {
        clearInterval(difficultyIntervalRef.current);
      }
      return;
    }

    difficultyIntervalRef.current = setInterval(() => {
      setSpawnRate((prev) => Math.max(MIN_SPAWN_RATE, prev - SPAWN_RATE_DECREASE));
    }, DIFFICULTY_INTERVAL);

    return () => {
      if (difficultyIntervalRef.current) {
        clearInterval(difficultyIntervalRef.current);
      }
    };
  }, [isPaused]);

  // Event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    canvas.addEventListener('mousedown', handlePointerDown);
    canvas.addEventListener('mouseup', handlePointerUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchstart', handlePointerDown);
    canvas.addEventListener('touchend', handlePointerUp);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener('mousedown', handlePointerDown);
      canvas.removeEventListener('mouseup', handlePointerUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchstart', handlePointerDown);
      canvas.removeEventListener('touchend', handlePointerUp);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handlePointerMove, handlePointerDown, handlePointerUp]);

  const multiplier = Math.min(Math.floor(combo / 3) + 1, 5);

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundColor: '#3d2817',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(/wood-background.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full touch-none cursor-none"
        style={{ background: 'transparent' }}
      />
      
      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-10">
        <div className="backdrop-blur-md bg-white/10 rounded-xl px-4 py-3 border border-white/20 shadow-lg">
          <div className="text-white text-sm font-medium mb-1">Score</div>
          <div className="text-white text-3xl font-bold">{score}</div>
          <div className="text-white/70 text-xs mt-1">Best: {highScore}</div>
        </div>

        {combo > 2 && (
          <div className="backdrop-blur-md bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl px-4 py-3 border border-yellow-400/40 shadow-lg animate-pulse">
            <div className="text-yellow-300 text-sm font-medium">Combo</div>
            <div className="text-white text-3xl font-bold">{combo}</div>
            <div className="text-yellow-200 text-xs mt-1">×{multiplier} Multiplier</div>
          </div>
        )}

        <div className="backdrop-blur-md bg-white/10 rounded-xl px-4 py-3 border border-white/20 shadow-lg">
          <div className="text-white text-sm font-medium mb-2">Lives</div>
          <div className="flex gap-2">
            {Array.from({ length: INITIAL_LIVES }).map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xl transition-all ${
                  i < lives
                    ? 'bg-red-500 scale-100 shadow-lg shadow-red-500/50'
                    : 'bg-gray-600 scale-75 opacity-30'
                }`}
              >
                ❤️
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pause Button */}
      <button
        onClick={() => {
          // Cancel animation frame immediately
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          setIsPaused(true);
          onPause(score);
        }}
        className="absolute top-4 right-4 backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-full p-3 border border-white/20 shadow-lg transition-all pointer-events-auto z-10"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>


    </div>
  );
};
