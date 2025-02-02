import React, { memo } from "react";

interface GameHeaderProps {
  score: number;
  timeLeft: number;
  highScore: number;
}

export const GameHeader: React.FC<GameHeaderProps> = memo(
  ({ score, timeLeft, highScore }) => {
    return (
      <header className="header">
        <div className="flex items-center gap-4">
          <div className="score">スコア: {score}</div>
          <div className="text-sm text-gray-600">ハイスコア: {highScore}</div>
        </div>
        <div className="timer">残り時間: {Math.ceil(timeLeft)}秒</div>
      </header>
    );
  },
);
