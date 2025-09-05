import { Tetromino, TetrominoType, Position, TETROMINO_SHAPES, BOARD_WIDTH, BOARD_HEIGHT } from '@/types/tetris';

export const TETROMINO_COLORS = {
  I: '#00f0f0', // Cyan
  O: '#f0f000', // Yellow
  T: '#a000f0', // Purple
  L: '#f0a000', // Orange
  J: '#0000f0', // Blue
  S: '#00f000', // Green
  Z: '#f00000', // Red
};

export const createTetromino = (type: TetrominoType): Tetromino => {
  return {
    shape: TETROMINO_SHAPES[type],
    color: TETROMINO_COLORS[type],
    type,
  };
};

export const getRandomTetromino = (): Tetromino => {
  const tetrominoTypes: TetrominoType[] = ['I', 'O', 'T', 'L', 'J', 'S', 'Z'];
  const randomType = tetrominoTypes[Math.floor(Math.random() * tetrominoTypes.length)];
  return createTetromino(randomType);
};

export const rotatePiece = (piece: Tetromino): Tetromino => {
  const rotatedShape = piece.shape[0].map((_, index) =>
    piece.shape.map(row => row[index]).reverse()
  );
  
  return {
    ...piece,
    shape: rotatedShape,
  };
};

export const createEmptyBoard = (): (string | null)[][] => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
};

export const isValidPosition = (
  board: (string | null)[][],
  piece: Tetromino,
  position: Position
): boolean => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const newX = position.x + x;
        const newY = position.y + y;

        // Check boundaries
        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT
        ) {
          return false;
        }

        // Check collision with existing pieces
        if (newY >= 0 && board[newY][newX] !== null) {
          return false;
        }
      }
    }
  }
  return true;
};

export const placePiece = (
  board: (string | null)[][],
  piece: Tetromino,
  position: Position
): (string | null)[][] => {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const boardY = position.y + y;
        const boardX = position.x + x;
        
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    }
  }
  
  return newBoard;
};

export const clearLines = (board: (string | null)[][]): {
  newBoard: (string | null)[][];
  linesCleared: number;
} => {
  const newBoard = board.filter(row => row.some(cell => cell === null));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  
  // Add empty rows at the top
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }
  
  return { newBoard, linesCleared };
};

export const calculateScore = (linesCleared: number, level: number): number => {
  const baseScore = [0, 100, 300, 500, 800];
  return baseScore[linesCleared] * level;
};

export const getHardDropPosition = (
  board: (string | null)[][],
  piece: Tetromino,
  position: Position
): Position => {
  let newPosition = { ...position };
  
  while (isValidPosition(board, piece, { ...newPosition, y: newPosition.y + 1 })) {
    newPosition.y++;
  }
  
  return newPosition;
};

export const addPreFilledRows = (
  board: (string | null)[][],
  rows: number
): (string | null)[][] => {
  const newBoard = [...board];
  
  for (let i = 0; i < rows; i++) {
    const preFilledRow = Array(BOARD_WIDTH).fill(null).map(() => {
      // Fill with random blocks, leaving some gaps
      return Math.random() > 0.3 ? TETROMINO_COLORS[Object.keys(TETROMINO_COLORS)[Math.floor(Math.random() * 7)] as TetrominoType] : null;
    });
    newBoard[BOARD_HEIGHT - 1 - i] = preFilledRow;
  }
  
  return newBoard;
};