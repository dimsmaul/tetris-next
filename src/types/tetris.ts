export type TetrominoType = "I" | "O" | "T" | "L" | "J" | "S" | "Z" | "E";

export interface Position {
  x: number;
  y: number;
}

export interface Tetromino {
  shape: number[][];
  color: string;
  type: TetrominoType;
}

export interface GameState {
  board: (string | null)[][];
  currentPiece: {
    tetromino: Tetromino;
    position: Position;
    rotation: number;
  } | null;
  nextPiece: Tetromino | null;
  score: number;
  level: number;
  linesCleared: number;
  isPaused: boolean;
  isGameOver: boolean;
  dropTime: number | null;
  lastDrop: number;
}

export interface LevelConfig {
  id: number;
  name: string;
  fallSpeed: number; // milliseconds between drops
  linesToClear: number;
  preFilledRows?: number;
  scoreMultiplier: number;
}

export type GameTheme = "classic" | "neon" | "pastel";

export interface GameSettings {
  startingLevel: number;
  theme: GameTheme;
  soundEnabled: boolean;
}

export type GameStatus =
  | "welcome"
  | "settings"
  | "playing"
  | "levelComplete"
  | "gameOver";

export interface TetrominoShape {
  [key: string]: number[][];
}

export const TETROMINO_SHAPES: TetrominoShape = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  E: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
};

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;


// TODO: Need to implement special level colors for new tetrominoes
export const TETROMINO_SHAPE_IMPOSSIBLE_LEVELS: TetrominoShape = {
  ...TETROMINO_SHAPES, 
  U: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  F: [
    [0, 1, 0],
    [1, 1, 1],
    [1, 0, 1],
  ],
}

export const TETROMINO_SHAPE_GOD_LEVELS: TetrominoShape = {
  ...TETROMINO_SHAPES, 
  ...TETROMINO_SHAPE_IMPOSSIBLE_LEVELS,
  P: [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  Q: [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
}