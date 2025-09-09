"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "@/hooks/use-navigate";
import { GameSettings } from "@/types/tetris";
import { useTetris } from "@/hooks/useTetris";
import Board from "@/components/tetris/Board";
import ScoreBoard from "@/components/tetris/ScoreBoard";
import NextPiece from "@/components/tetris/NextPiece";
import { getLevelById, getNextLevel } from "@/config/levels";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsDown,
  Rotate3D,
  RotateCcw,
  RotateCw,
  RotateCwSquareIcon,
} from "lucide-react";

export default function Game() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<GameSettings>({
    startingLevel: 1,
    theme: "classic",
    soundEnabled: true,
  });
  const [showLevelComplete, setShowLevelComplete] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("tetris-settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const {
    gameState,
    pauseGame,
    resetGame,
    hardDrop,
    movePiece,
    rotateCurrentPiece,
  } = useTetris(settings);

  useEffect(() => {
    const currentLevel = getLevelById(gameState.level);
    if (currentLevel && gameState.linesCleared >= currentLevel.linesToClear) {
      setShowLevelComplete(true);
    }
  }, [gameState.linesCleared, gameState.level]);

  const handleNextLevel = () => {
    setShowLevelComplete(false);
    resetGame();
  };

  const handleBackToMenu = () => {
    navigate("/");
  };

  if (gameState.isGameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-black border-4 border-red-600 p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">GAME OVER</h1>
          <div className="text-2xl text-yellow-400 mb-2">Final Score</div>
          <div className="text-4xl font-bold text-white mb-6">
            {gameState.score.toLocaleString()}
          </div>
          <div className="space-y-4">
            <Button
              onClick={resetGame}
              className="w-full h-12 bg-green-500 hover:bg-green-600 text-black font-bold border-4 border-green-300 rounded-none"
              style={{ boxShadow: "0 4px 0 #166534" }}
            >
              PLAY AGAIN
            </Button>
            <Button
              onClick={handleBackToMenu}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold border-4 border-blue-300 rounded-none"
              style={{ boxShadow: "0 4px 0 #1e40af" }}
            >
              MAIN MENU
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showLevelComplete) {
    const currentLevel = getLevelById(gameState.level);
    const nextLevel = getNextLevel(gameState.level);

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-black border-4 border-green-600 p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            LEVEL COMPLETE!
          </h1>
          <div className="text-xl text-cyan-400 mb-2">
            Level {gameState.level} - {currentLevel?.name}
          </div>
          <div className="text-2xl text-yellow-400 mb-2">Score Earned</div>
          <div className="text-4xl font-bold text-white mb-6">
            {gameState.score.toLocaleString()}
          </div>

          {nextLevel ? (
            <>
              <div className="text-lg text-purple-400 mb-4">
                Next: Level {nextLevel.id} - {nextLevel.name}
              </div>
              <Button
                onClick={handleNextLevel}
                className="w-full h-12 bg-green-500 hover:bg-green-600 text-black font-bold border-4 border-green-300 rounded-none mb-4"
                style={{ boxShadow: "0 4px 0 #166534" }}
              >
                NEXT LEVEL
              </Button>
            </>
          ) : (
            <div className="text-xl text-yellow-400 mb-4">
              🎉 Congratulations! You've completed all levels! 🎉
            </div>
          )}

          <Button
            onClick={handleBackToMenu}
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold border-4 border-blue-300 rounded-none"
            style={{ boxShadow: "0 4px 0 #1e40af" }}
          >
            MAIN MENU
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 lg:block hidden">
          <h1 className="text-4xl font-bold text-cyan-400 tracking-wider">
            TETRIS
          </h1>
          {/* <div className="text-yellow-400">PIXEL EDITION</div> */}
        </div>

        {/* Game Area */}
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          {/* <div className="absolute lg:relative top-0 right-0 lg:top-auto lg:right-auto lg:ml-6"></div> */}

          {/* Game Board */}
          <div className="flex-shrink-0">
            <Board gameState={gameState} />
            <div className="flex md:hidden flex-row items-center justify-between mt-3 ">
              <Button
                size={"icon"}
                onClick={() => movePiece("left")}
                className="h-12 w-12 bg-yellow-500 hover:bg-yellow-600 text-black font-bold border-4 border-yellow-300 rounded-none"
                style={{ boxShadow: "0 4px 0 #854d0e" }}
              >
                <ChevronLeft />
              </Button>
              <Button
                size={"icon"}
                onClick={() => rotateCurrentPiece()}
                className="h-12 w-12 bg-blue-500 hover:bg-blue-600 text-white border-blue-300 rounded-none"
                style={{ boxShadow: "0 4px 0 #1e40af" }}
              >
                <RotateCw />
              </Button>
              <Button
                size={"icon"}
                onClick={() => hardDrop()}
                className="h-12 w-12 bg-blue-500 hover:bg-blue-600 text-white border-blue-300 rounded-none"
                style={{ boxShadow: "0 4px 0 #1e40af" }}
              >
                <ChevronsDown />
              </Button>
              <Button
                size={"icon"}
                onClick={() => movePiece("down")}
                className="h-12 w-12 bg-blue-500 hover:bg-blue-600 text-white border-blue-300 rounded-none"
                style={{ boxShadow: "0 4px 0 #1e40af" }}
              >
                <ChevronDown />
              </Button>
              <Button
                size={"icon"}
                onClick={() => movePiece("right")}
                className="h-12 w-12 bg-yellow-500 hover:bg-yellow-600 text-black font-bold border-4 border-yellow-300 rounded-none"
                style={{ boxShadow: "0 4px 0 #854d0e" }}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>

          {/* Side Panel */}
          <div className="flex-shrink-0 w-full lg:w-80">
            <div className="space-y-4">
              <NextPiece nextPiece={gameState.nextPiece} />

              <ScoreBoard
                gameState={gameState}
                onPause={pauseGame}
                onRestart={resetGame}
              />
            </div>
          </div>
        </div>

        {/* Mobile Controls Hint */}
        <div className="mt-8 text-center lg:hidden">
          <div className="bg-black bg-opacity-75 border-2 border-cyan-600 p-4 rounded">
            <p className="text-cyan-400 text-sm">
              📱 Use on-screen keyboard or connect a keyboard for best
              experience
            </p>
          </div>
        </div>

        {/* Pause Overlay */}
        {gameState.isPaused && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-black border-4 border-yellow-400 p-8 text-center">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                PAUSED
              </h2>
              <p className="text-gray-300 mb-4">
                Press P or click Resume to continue
              </p>
              <Button
                onClick={pauseGame}
                className="h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-bold border-4 border-yellow-300 rounded-none"
                style={{ boxShadow: "0 4px 0 #854d0e" }}
              >
                RESUME
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
