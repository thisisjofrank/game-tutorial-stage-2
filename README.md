# 🦕 Dino Runner Game

A comprehensive tutorial series for building a Dino Runner game using Deno and
TypeScript.

## Stage 2: Game canvas & control handling

### Getting started

To run this project locally, you will need to install [Deno](https://deno.com/).

```bash
deno install
deno run dev
```

You can clone and deploy this project immediately to start building the Dino
Runner game.

[![Deploy on Deno](https://deno.com/button)](https://app.deno.com/new?clone=https://github.com/thisisjofrank/game-tutorial-stage-2.git&install=deno+install)

You will need to edit your Deno Deploy build configuration to set the entrypoint of the project to `src/main.ts`.

Once deployed, you can clone the created project to your local machine to work
on it.

# What's in this code?

In stage 2 we add a game canvas and basic controls for the Dino character.

## Project structure

```text
Runner Game/
├── src/                    # Server-side source code
│   ├── main.ts             # Server entry point
│   └── routes/             # Route definitions
│       └── api.routes.ts   # API route definitions
├── public/                 # Client-side static files
│   ├── index.html          # Main landing page
│   ├── js/
│   │   └── game.js         # Client-side game logic
│   └── css/
│       └── styles.css      # Styling
├── deno.json               # Deno configuration
├── .env.example            # Environment variables template
└── README.md               # Documentation
```

## `public/index.html` - Game interface and canvas

**Stage 2 Updates:** Completely redesigned from a simple landing page to a full
game interface.

### Key HTML Structure Changes

#### 1. Game Canvas Element

```html
<canvas id="gameCanvas" width="800" height="200"></canvas>
```

The core game rendering area with fixed dimensions optimized for the dino runner
gameplay.

#### 2. Game Container with UI Overlay

```html
<div class="canvas-container">
  <canvas id="gameCanvas" width="800" height="200"></canvas>
  <div class="game-ui">
    <div class="score">Score: <span id="score">0</span></div>
    <div class="game-status" id="gameStatus">Click to Start!</div>
  </div>
</div>
```

The canvas is wrapped in a container with absolutely positioned UI elements for
score and status messages, which will be updated in later stages of this
tutorial.

#### 3. Interactive Controls Guide

```html
<div class="controls">
  <h3>🎮 Controls</h3>
  <div class="control-grid">
    <div class="control-item">
      <kbd>Space</kbd>
      <span>Jump</span>
    </div>
    <div class="control-item">
      <kbd>↑</kbd>
      <span>Jump</span>
    </div>
    <div class="control-item">
      <span>🖱️ Click</span>
      <span>Start/Jump</span>
    </div>
  </div>
</div>
```

Visual control guide using semantic `<kbd>` elements for keyboard keys.

The `#gameCanvas` element serves as the main game rendering area where the dino
character, ground, and future obstacles are drawn using the Canvas 2D API.

## `public/js/game.js` - Complete game engine

**Stage 2 Updates:** Transformed from a simple health check into a full-featured
game engine.

### Core Game Architecture

#### 1. DinoGame Class Structure

```javascript
class DinoGame {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.gameState = "waiting"; // 'waiting', 'playing', 'gameOver'

    // Dino properties
    this.dino = {
      x: 50,
      y: 150,
      width: 40,
      height: 40,
      velocityY: 0,
      isJumping: false,
      groundY: 150,
    };

    // Physics constants
    this.gravity = 0.6;
    this.jumpStrength = -12;
  }
}
```

The `DinoGame` class encapsulates all game logic, including the dino character's
properties, game state management, and physics constants.

#### 2. Physics Engine

```javascript
updatePhysics() {
  if (this.gameState !== 'playing') return;
  
  // Apply gravity
  this.dino.velocityY += this.gravity;
  this.dino.y += this.dino.velocityY;
  
  // Ground collision
  if (this.dino.y >= this.dino.groundY) {
    this.dino.y = this.dino.groundY;
    this.dino.velocityY = 0;
    this.dino.isJumping = false;
  }
  
  // Update score
  this.score += 0.1;
}
```

The `updatePhysics` method implements realistic physics with gravity simulation
and ground collision detection.

#### 3. Input Handling System

```javascript
setupEventListeners() {
  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      this.handleJump();
    }
  });
  
  // Mouse/touch controls
  this.canvas.addEventListener('click', () => {
    this.handleJump();
  });
}
```

We add multi-input support for keyboard (Space, ↑) and mouse/touch interactions.

#### 4. Game Loop with requestAnimationFrame

```javascript
gameLoop() {
  this.updatePhysics();
  this.render();
  requestAnimationFrame(() => this.gameLoop());
}
```

This method implements the main game loop using `requestAnimationFrame`,
ensuring smooth 60fps animation, ensuring smooth gameplay across different
devices.

#### 5. Canvas Rendering System

```javascript
render() {
  // Clear canvas
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
  // Draw ground line
  this.ctx.strokeStyle = '#8B4513';
  this.ctx.lineWidth = 2;
  this.ctx.beginPath();
  this.ctx.moveTo(0, this.groundY);
  this.ctx.lineTo(this.canvas.width, this.groundY);
  this.ctx.stroke();
  
  // Draw dino
  this.drawDino();
}
```

Finally we set up an efficient rendering system that clears and redraws game
elements each frame. This is a standard practice in game development to ensure
smooth animations and updates.

## `public/css/styles.css` - Game styling and responsive design

**Stage 2 Updates:** Expanded from basic page styling to comprehensive game UI
styling with a mobile-first responsive design ensuring the game works on all
screen sizes.

The game now provides a fully interactive dino character with realistic jumping
mechanics and continuous score tracking.

## `deno.json` - Project configuration

**Unchanged in Stage 2:**

This is where we set up scripts and dependencies for our Deno project. The
configuration includes:

- Development task (`dev`): Runs the server with hot reloading using `--watch`
  flag
- Production task (`serve`): Runs the server without development features
- Permission settings: Defines required permissions (`--allow-net`,
  `--allow-read`, `--allow-env`)
- Import map: Manages dependencies like the Oak framework for web server
  functionality
- TypeScript configuration: Compiler options and type checking settings

## `src/main.ts` - HTTP Server entry point

**Unchanged in Stage 2:**

This is where we set up our Deno server using the Oak framework with a
professional architecture. It handles:

- Static file serving: Serves all files from the `public/` directory (HTML, CSS,
  JS, images)
- API route mounting: Integrates the API routes defined in `api.routes.ts`
- Middleware configuration: CORS handling, error handling, and request logging
- Server initialization: Starts the HTTP server on the configured port
  (default: 8000)
- Development features: Supports hot reloading with the `--watch` flag

The server provides the foundation that delivers our game files to browsers and
handles any future API endpoints we'll need for features like high scores or
multiplayer functionality.

## `src/routes/api.routes.ts` - API route definitions

**Unchanged in Stage 2:**

This file contains the API route definitions for our server. Currently includes:

- Health check endpoint (`/api/health`): Returns JSON response to verify server
  status
- Modular route structure: Organized for easy addition of future endpoints
- Proper HTTP methods: RESTful API design patterns
- Error handling: Structured error responses

Future stages will expand this file to include endpoints for:

- High score storage and retrieval
- Player statistics
- Leaderboards
- Multiplayer game sessions (if implemented)

## `.env.example` - Environment variables template

**Unchanged in Stage 2:**

This file serves as a template for environment variables. To use it, create a
`.env` file and copy the contents of `.env.example` into it.

Future variables will include API keys, database connections, and feature flags
in later stages.

Note, the actual `.env` file is git-ignored to protect sensitive information

## Running the Code

To run the server, first install the dependencies, then start the server:

```bash
deno install
deno run dev
```

Navigate to [http://localhost:8000](http://localhost:8000) and you'll see the
game canvas with a controllable dino character!

## Stage 2 Accomplishments

By completing Stage 2, you'll have:

- ✅ Set up HTML5 Canvas for game rendering
- ✅ Implemented basic game loop with animation
- ✅ Added keyboard and mouse input handling
- ✅ Created a jumping dino character with physics
- ✅ Established foundation for infinity runner mechanics
- ✅ Built responsive game UI that works on different screen sizes

## Next Steps

You can now proceed to
[Stage 3](https://github.com/thisisjofrank/game-tutorial-stage-3), where we will
add game functionality like obstacles, scoring, and game over mechanics.
