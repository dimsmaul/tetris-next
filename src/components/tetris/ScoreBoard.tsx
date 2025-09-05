'use client';

import { GameState, LevelConfig } from '@/types/tetris';
import { getLevelById } from '@/config/levels';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScoreBoardProps {
  gameState: GameState;
  onPause: () => void;
  onRestart: () => void;
}

export default function ScoreBoard({ gameState, onPause, onRestart }: ScoreBoardProps) {
  const { score, level, linesCleared, isPaused, isGameOver } = gameState;
  const currentLevel = getLevelById(level);

  return (
    <div className="space-y-4">
      {/* Score Card */}
      <Card className="bg-gray-900 border-2 border-cyan-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-cyan-400 text-lg">SCORE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-yellow-400 text-center">
            {score.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      {/* Level Card */}
      <Card className="bg-gray-900 border-2 border-green-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-400 text-lg">LEVEL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white text-center">
            {level} - {currentLevel?.name}
          </div>
        </CardContent>
      </Card>

      {/* Lines Card */}
      <Card className="bg-gray-900 border-2 border-purple-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-purple-400 text-lg">LINES</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white text-center">
            {linesCleared} / {currentLevel?.linesToClear}
          </div>
          <div className="w-full bg-gray-700 h-2 mt-2">
            <div 
              className="bg-purple-400 h-full transition-all duration-300"
              style={{ 
                width: `${Math.min(100, (linesCleared / (currentLevel?.linesToClear || 1)) * 100)}%` 
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Control Buttons */}
      <div className="space-y-2">
        <button
          onClick={onPause}
          disabled={isGameOver}
          className={`w-full h-12 font-bold border-4 rounded-none transition-all ${
            isPaused 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-300' 
              : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-300'
          } ${isGameOver ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ boxShadow: '0 4px 0 #1e40af' }}
        >
          {isPaused ? 'RESUME' : 'PAUSE'}
        </button>
        
        <button
          onClick={onRestart}
          className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-bold border-4 border-red-300 rounded-none"
          style={{ boxShadow: '0 4px 0 #991b1b' }}
        >
          RESTART
        </button>
      </div>

      {/* Game Status */}
      {isGameOver && (
        <Card className="bg-red-900 border-2 border-red-600">
          <CardContent className="pt-4">
            <div className="text-red-400 text-center font-bold">
              GAME OVER
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}