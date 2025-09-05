'use client';

import { GameState } from '@/types/tetris';

interface BoardProps {
  gameState: GameState;
}

export default function Board({ gameState }: BoardProps) {
  const { board, currentPiece } = gameState;

  // Create a copy of the board to render
  const renderBoard = board.map(row => [...row]);

  // Place the current piece on the board for rendering
  if (currentPiece) {
    const { tetromino, position } = currentPiece;
    for (let y = 0; y < tetromino.shape.length; y++) {
      for (let x = 0; x < tetromino.shape[y].length; x++) {
        if (tetromino.shape[y][x] !== 0) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
            renderBoard[boardY][boardX] = tetromino.color;
          }
        }
      }
    }
  }

  return (
    <div className="bg-black border-4 border-gray-600 p-2 shadow-2xl">
      <div className="grid grid-cols-10 gap-0">
        {renderBoard.flat().map((cell, index) => (
          <div
            key={index}
            className={`w-6 h-6 border border-gray-800 transition-all duration-150 ${
              cell ? 'brightness-110 hover:brightness-125' : 'bg-gray-900'
            }`}
            style={{
              backgroundColor: cell || '#1a1a1a',
              boxShadow: cell ? 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.3)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}