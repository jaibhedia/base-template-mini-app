export interface TokenType {
  name: string;
  symbol: string;
  color: string;
  isImage?: boolean;
}

export interface Token {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  sliced: boolean;
  rotation: number;
  rotationSpeed: number;
  type: TokenType;
  oscillationAmplitude: number; // How much it zig-zags horizontally
  oscillationFrequency: number; // How fast it zig-zags
  oscillationPhase: number; // Current phase of oscillation
  speedMultiplier: number; // Random speed variation
}

export interface Bomb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rotation: number;
  rotationSpeed: number;
  oscillationAmplitude: number; // How much it zig-zags horizontally
  oscillationFrequency: number; // How fast it zig-zags
  oscillationPhase: number; // Current phase of oscillation
  speedMultiplier: number; // Random speed variation
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export interface BladeTrail {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  life: number;
}

export type GameState = 'landing' | 'start' | 'playing' | 'paused' | 'results';
