'use client';

import { Button } from '@/components/ui/button';
import { useNavigate } from '@/hooks/use-navigate';

export default function Welcome() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-black border-4 border-cyan-400 p-8 max-w-md w-full">
        {/* Pixel Art Style Title */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-cyan-400 mb-2 tracking-wider" style={{ textShadow: '4px 4px 0px #008080, 8px 8px 0px #004040' }}>
            TETRIS
          </h1>
          <div className="text-yellow-400 text-xl font-bold mb-4">
            PIXEL EDITION
          </div>
          <div className="text-green-400 text-sm mb-6">
            Use Arrow Keys or WASD to Play
          </div>
        </div>

        {/* Decorative Pixel Elements */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-4 gap-1">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 ${
                  i % 4 === 0 ? 'bg-cyan-400' :
                  i % 4 === 1 ? 'bg-yellow-400' :
                  i % 4 === 2 ? 'bg-green-400' :
                  'bg-red-400'
                } animate-pulse`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleStartGame}
            className="w-full h-16 bg-green-500 hover:bg-green-600 text-black font-bold text-xl border-4 border-green-300 rounded-none"
            style={{ boxShadow: '0 4px 0 #166534' }}
          >
            START GAME
          </Button>
          
          <Button
            onClick={handleSettings}
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg border-4 border-blue-300 rounded-none"
            style={{ boxShadow: '0 4px 0 #1e40af' }}
          >
            SETTINGS
          </Button>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <div className="text-cyan-300 text-sm mb-2">CONTROLS:</div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
            <div>← → or A/D: Move</div>
            <div>↓ or S: Soft Drop</div>
            <div>↑ or W: Rotate</div>
            <div>Space: Hard Drop</div>
            <div>P: Pause</div>
            <div></div>
          </div>
        </div>

        {/* Pixel Border Decoration */}
        <div className="absolute inset-0 border-2 border-white pointer-events-none opacity-20" />
      </div>
    </div>
  );
}