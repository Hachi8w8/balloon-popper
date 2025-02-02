import React, { memo } from "react";
import { FaCrown } from "react-icons/fa";

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRetry: () => void;
  isGameOver: boolean;
  isNewHighScore: boolean;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = memo(
  ({ score, highScore, onRetry, isGameOver, isNewHighScore }) => {
    if (!isGameOver) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-[90vw] sm:max-w-[400px]">
          {/* スコア表示カード */}
          <div className="bg-white w-full p-4 sm:p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg sm:text-xl font-bold mb-3">ゲームオーバー</h2>
            <div className="space-y-3">
              <div className="p-2 sm:p-3">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isNewHighScore && (
                    <FaCrown className="text-xl sm:text-2xl text-yellow-400" />
                  )}
                  <p
                    className={`text-2xl sm:text-3xl font-bold ${isNewHighScore ? "text-red-600" : "text-gray-900"}`}
                  >
                    {score}
                    <span className="text-base sm:text-lg ml-2">点</span>
                  </p>
                </div>
                {isNewHighScore && (
                  <p className="text-sm sm:text-base text-green-600 mt-1 font-bold">
                    新記録達成！
                  </p>
                )}
              </div>
              <div className="p-2">
                <p className="text-base sm:text-lg font-bold text-gray-600">
                  ハイスコア: {highScore}
                </p>
              </div>
            </div>
          </div>

          {/* リトライボタン */}
          <button
            className="w-full sm:w-auto px-8 sm:px-10 py-3 text-base sm:text-lg font-bold text-white 
                     bg-blue-500 rounded-full hover:bg-blue-600 transform transition-transform 
                     hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 
                     focus:ring-blue-400 focus:ring-opacity-50 shadow-lg"
            onClick={onRetry}
            aria-label="もう一度プレイ"
          >
            リトライ
          </button>
        </div>
      </div>
    );
  },
);
