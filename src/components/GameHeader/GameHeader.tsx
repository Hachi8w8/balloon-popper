import React, { memo } from "react";

interface GameHeaderProps {
  score: number;
  timeLeft: number;
  highScore: number;
}

export const GameHeader: React.FC<GameHeaderProps> = memo(
  ({ score, timeLeft, highScore }) => {
    return (
      <header className="fixed top-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm shadow-md z-50">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6 sm:gap-8">
            <div className="min-w-[120px] sm:min-w-[150px]">
              <div className="text-xl sm:text-2xl font-bold">
                スコア: {score.toString().padStart(3, '0')}
              </div>
            </div>
            <div className="min-w-[120px] sm:min-w-[150px]">
              <div className="text-sm sm:text-base text-gray-600">
                ハイスコア: {highScore.toString().padStart(3, '0')}
              </div>
            </div>
          </div>
          <div className="min-w-[120px] sm:min-w-[150px] text-center">
            <div className="text-lg sm:text-xl font-medium text-blue-600">
              残り時間: {Math.ceil(timeLeft)}秒
            </div>
          </div>
        </div>
      </header>
    );
  },
);
