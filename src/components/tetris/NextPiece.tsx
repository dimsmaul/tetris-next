'use client';

import { Tetromino } from '@/types/tetris';

interface NextPieceProps {
  nextPiece: Tetromino | null;
}

export default function NextPiece({ nextPiece }: NextPieceProps) {
  if (!nextPiece) {
    return (
      <div className="bg-black border-4 border-gray-600 p-4">
        <div className="text-gray-500 text-center">No next piece</div>
      </div>
    );
  }

  // Create a 4x4 grid to display the next piece
  const displayGrid = Array(4).fill(null).map(() => Array(4).fill(null));
  
  // Center the piece in the 4x4 grid
  const offsetX = Math.floor((4 - nextPiece.shape[0].length) / 2);
  const offsetY = Math.floor((4 - nextPiece.shape.length) / 2);
  
  for (let y = 0; y < nextPiece.shape.length; y++) {
    for (let x = 0; x < nextPiece.shape[y].length; x++) {
      if (nextPiece.shape[y][x] !== 0) {
        displayGrid[offsetY + y][offsetX + x] = nextPiece.color;
      }
    }
  }

  return (
    <div className="bg-black border-4 border-gray-600 p-4">
      <div className="text-cyan-400 text-sm font-bold mb-2 text-center">NEXT</div>
      <div className="grid grid-cols-4 gap-0 w-24 h-24 mx-auto">
        {displayGrid.flat().map((cell, index) => (
          <div
            key={index}
            className={`w-6 h-6 border border-gray-800 ${
              cell ? 'brightness-110' : 'bg-transparent'
            }`}
            style={{
              backgroundColor: cell || 'transparent',
              boxShadow: cell ? 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.3)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}