# 🥷 Base Ninja - Token Slicing Game

A polished, addictive token slicing game built with Next.js, React, and Canvas. Inspired by classic fruit-slicing games, Base Ninja challenges players to slice falling tokens while avoiding bombs in an increasingly difficult environment.

## 🎮 Game Features

### Core Gameplay
- **Token Slicing**: Use mouse or touch to slice falling tokens with smooth blade trail effects
- **Progressive Difficulty**: Spawn rates increase every 10 seconds, reaching extreme challenge levels
- **Combo System**: Chain successful slices for score multipliers with stunning visual effects
- **Lives System**: Heart-based health (3 lives) with visual health bars
- **Bomb Avoidance**: Avoid slicing bombs or lose a life and reset your combo

### Professional UI
- **Landing Screen**: Polished introduction with game features
- **Start Screen**: Detailed instructions on how to play
- **Game Screen**: Immersive gameplay with HUD showing score, combo, lives, and difficulty
- **Results Screen**: Beautiful game over screen with ranking system and stats
- **Pause Screen**: Pause functionality with resume capability
- **Glass Morphism Design**: Modern UI with backdrop blur effects and smooth animations

### Visual Effects
- **Blade Trails**: Glowing cyan trails that follow your swipes
- **Particle Explosions**: Colorful particles burst when tokens are sliced
- **Smooth Animations**: 60 FPS gameplay with physics-based movements
- **Token Rotation**: Tokens spin realistically as they fall
- **Shadow Effects**: Depth and dimension with shadow rendering

### Game Mechanics
- **Scoring System**: 10 points per token × combo multiplier (up to 5×)
- **Combo Multipliers**: 
  - 1-2 slices: 1× multiplier
  - 3-5 slices: 2× multiplier
  - 6-8 slices: 3× multiplier
  - 9-11 slices: 4× multiplier
  - 12+ slices: 5× multiplier
- **Combo Timer**: 2 seconds to maintain combo between slices
- **Difficulty Progression**: Spawn rate decreases by 100ms every 10 seconds (from 1500ms to 300ms minimum)
- **Token Variety**: 6 different token types (Base, Ethereum, USDC, Gold, Diamond, Rocket)

### Ranking System
- **Legendary Ninja** 🏆: 1000+ points
- **Master Ninja** ⚡: 500+ points
- **Elite Ninja** 🔥: 250+ points
- **Skilled Ninja** 🥷: 100+ points
- **Novice Ninja** 🌟: 0-99 points

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd base-ninja
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Play

1. **Swipe to Slice**: Use your mouse or finger to swipe across falling tokens
2. **Avoid Bombs**: Don't slice the black bombs with red outlines (💣)
3. **Build Combos**: Chain multiple slices quickly for higher multipliers
4. **Watch Your Lives**: You have 3 lives - don't miss tokens or hit bombs
5. **Beat Your High Score**: Try to reach Legendary Ninja status!

## 🛠️ Technical Details

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Canvas**: HTML5 Canvas API for game rendering
- **State Management**: React Hooks

### Project Structure
```
src/
├── components/
│   └── game/
│       ├── BaseNinjaGame.tsx     # Main game container
│       ├── GameScreen.tsx         # Core game logic and rendering
│       ├── LandingScreen.tsx      # Landing page
│       ├── StartScreen.tsx        # Instructions screen
│       ├── ResultsScreen.tsx      # Game over screen
│       ├── PauseScreen.tsx        # Pause overlay
│       ├── GameTypes.ts           # TypeScript interfaces
│       └── GameAssets.ts          # Token definitions
└── app/
    ├── app.tsx                    # App entry point
    ├── page.tsx                   # Next.js page
    └── globals.css                # Global styles
```

### Key Components

#### GameScreen.tsx
- Manages game loop with `requestAnimationFrame`
- Handles physics calculations (gravity, velocity)
- Detects collision between blade trails and tokens/bombs
- Renders all game elements on canvas
- Manages game state (score, lives, combo, difficulty)

#### Game Physics
- **Gravity**: 0.5 units per frame
- **Initial Velocity**: -15 units (upward)
- **Token Radius**: 30px
- **Bomb Radius**: 35px
- **Blade Trail**: 4px wide with glow effect

#### Collision Detection
Uses line-circle intersection algorithm to detect when a blade trail passes through a token or bomb.

## 🎨 Customization

### Change Token Types
Edit `src/components/game/GameAssets.ts`:
```typescript
export const TOKEN_IMAGES: TokenType[] = [
  { name: 'Custom', symbol: '🎯', color: '#FF5733' },
  // Add more tokens...
];
```

### Adjust Difficulty
Edit constants in `src/components/game/GameScreen.tsx`:
```typescript
const INITIAL_SPAWN_RATE = 1500; // ms
const MIN_SPAWN_RATE = 300; // ms
const SPAWN_RATE_DECREASE = 100; // ms every 10 seconds
const DIFFICULTY_INTERVAL = 10000; // 10 seconds
```

### Modify Lives
```typescript
const INITIAL_LIVES = 3; // Change to any number
```

## 📱 Mobile Support

The game is fully responsive and supports:
- Touch gestures for slicing
- Mobile-optimized UI
- Fullscreen gameplay
- Safe area insets for notched devices

## 🏆 High Score Persistence

High scores are automatically saved to browser localStorage and persist between sessions.

## 🎭 Animations

Custom CSS animations include:
- `animate-float`: Floating celebration particles
- `animate-spin-slow`: Slow rotation for decorative elements
- `animate-pulse`: Pulsing effects for important UI elements
- `animate-bounce`: Bouncing animations

## 📊 Performance

- **60 FPS** gameplay on modern devices
- **Canvas rendering** for optimal performance
- **Efficient particle system** with automatic cleanup
- **Optimized collision detection**

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

### Lint Code
```bash
npm run lint
```

## 🌐 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or use any Next.js-compatible hosting platform.

## 📝 License

See [LICENSE](LICENSE) file for details.

## 🙏 Credits

Built with ❤️ using:
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 🎮 Play Now!

Ready to become a Base Ninja? Start slicing those tokens! 🥷💎🚀
