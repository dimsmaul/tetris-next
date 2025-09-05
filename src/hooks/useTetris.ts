'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Position, GameSettings, LevelConfig } from '@/types/tetris';
import { 
  createEmptyBoard, 
  getRandomTetromino, 
  isValidPosition, 
  placePiece, 
  clearLines, 
  calculateScore,
  rotatePiece,
  getHardDropPosition,
  addPreFilledRows
} from '@/utils/tetris';
import { LEVELS, getLevelById } from '@/config/levels';

export const useTetris = (settings: GameSettings) => {
  const gameLoopRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const createInitialGameState = (settings: GameSettings): GameState => {
    const level = getLevelById(settings.startingLevel) || LEVELS[0];
    let board = createEmptyBoard();
    
    if (level.preFilledRows) {
      board = addPreFilledRows(board, level.preFilledRows);
    }

    return {
      board,
      currentPiece: {
        tetromino: getRandomTetromino(),
        position: { x: Math.floor(10 / 2) - 1, y: 0 },
        rotation: 0,
      },
      nextPiece: getRandomTetromino(),
      score: 0,
      level: settings.startingLevel,
      linesCleared: 0,
      isPaused: false,
      isGameOver: false,
      dropTime: level.fallSpeed,
      lastDrop: 0,
    };
  };
  const [gameState, setGameState] = useState<GameState>(() => createInitialGameState(settings));


  const spawnNewPiece = useCallback(() => {
    const newPiece = gameState.nextPiece || getRandomTetromino();
    const nextPiece = getRandomTetromino();
    
    const newPosition = { x: Math.floor(10 / 2) - 1, y: 0 };
    
    if (!isValidPosition(gameState.board, newPiece, newPosition)) {
      // Game over
      setGameState(prev => ({ ...prev, isGameOver: true }));
      return null;
    }
    
    return {
      currentPiece: {
        tetromino: newPiece,
        position: newPosition,
        rotation: 0,
      },
      nextPiece,
    };
  }, [gameState.board, gameState.nextPiece]);

  const movePiece = useCallback((direction: 'left' | 'right' | 'down') => {
    if (gameState.isPaused || gameState.isGameOver || !gameState.currentPiece) return;

    const { position, tetromino } = gameState.currentPiece;
    const newPosition = { ...position };

    switch (direction) {
      case 'left':
        newPosition.x -= 1;
        break;
      case 'right':
        newPosition.x += 1;
        break;
      case 'down':
        newPosition.y += 1;
        break;
    }

    if (isValidPosition(gameState.board, tetromino, newPosition)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: prev.currentPiece ? {
          ...prev.currentPiece,
          position: newPosition,
        } : null,
      }));
    } else if (direction === 'down') {
      // Piece can't move down, place it
      placeCurrentPiece();
    }
  }, [gameState]);

  const rotateCurrentPiece = useCallback(() => {
    if (gameState.isPaused || gameState.isGameOver || !gameState.currentPiece) return;

    const { tetromino, position } = gameState.currentPiece;
    const rotatedPiece = rotatePiece(tetromino);

    if (isValidPosition(gameState.board, rotatedPiece, position)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: prev.currentPiece ? {
          ...prev.currentPiece,
          tetromino: rotatedPiece,
        } : null,
      }));
    }
  }, [gameState]);

  const hardDrop = useCallback(() => {
    if (gameState.isPaused || gameState.isGameOver || !gameState.currentPiece) return;

    const { tetromino, position } = gameState.currentPiece;
    const dropPosition = getHardDropPosition(gameState.board, tetromino, position);
    
    setGameState(prev => ({
      ...prev,
      currentPiece: prev.currentPiece ? {
        ...prev.currentPiece,
        position: dropPosition,
      } : null,
    }));
    
    // Immediately place the piece
    setTimeout(() => placeCurrentPiece(), 50);
  }, [gameState]);

  const placeCurrentPiece = useCallback(() => {
    if (!gameState.currentPiece) return;

    const { tetromino, position } = gameState.currentPiece;
    const newBoard = placePiece(gameState.board, tetromino, position);
    const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
    
    const levelConfig = getLevelById(gameState.level);
    const scoreIncrease = calculateScore(linesCleared, gameState.level);
    const newScore = gameState.score + scoreIncrease;
    const newLinesCleared = gameState.linesCleared + linesCleared;
    
    // Check if level is complete
    let isLevelComplete = false;
    let nextLevel = gameState.level;
    
    if (levelConfig && newLinesCleared >= levelConfig.linesToClear) {
      isLevelComplete = true;
      const nextLevelConfig = LEVELS.find(l => l.id === gameState.level + 1);
      if (nextLevelConfig) {
        nextLevel = nextLevelConfig.id;
      }
    }

    const newPieceState = spawnNewPiece();
    
    setGameState(prev => ({
      ...prev,
      board: clearedBoard,
      score: newScore,
      linesCleared: newLinesCleared,
      level: nextLevel,
      ...(newPieceState || {}),
      dropTime: nextLevel !== prev.level ? (getLevelById(nextLevel)?.fallSpeed || prev.dropTime) : prev.dropTime,
    }));
  }, [gameState, spawnNewPiece]);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(createInitialGameState(settings));
  }, [settings]);

  const gameLoop = useCallback((timestamp: number) => {
    if (!gameState.isPaused && !gameState.isGameOver && gameState.dropTime) {
      if (timestamp - lastTimeRef.current > gameState.dropTime) {
        movePiece('down');
        lastTimeRef.current = timestamp;
      }
    }
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, movePiece]);

  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameLoop]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState.isGameOver) return;

      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          event.preventDefault();
          movePiece('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          event.preventDefault();
          movePiece('right');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          event.preventDefault();
          movePiece('down');
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault();
          rotateCurrentPiece();
          break;
        case ' ':
          event.preventDefault();
          hardDrop();
          break;
        case 'p':
        case 'P':
          event.preventDefault();
          pauseGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePiece, rotateCurrentPiece, hardDrop, pauseGame, gameState.isGameOver]);

  return {
    gameState,
    movePiece,
    rotateCurrentPiece,
    hardDrop,
    pauseGame,
    resetGame,
  };
};