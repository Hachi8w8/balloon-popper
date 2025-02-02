import React, { memo } from "react";
import { FaCrown } from "react-icons/fa";

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRetry: () => void;
  isGameOver: boolean;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = memo(
  ({ score, highScore, onRetry, isGameOver }) => {
    if (!isGameOver) return null;

    const isNewHighScore = score >= highScore;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          {/* スコア表示カード */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center min-w-[260px]">
            <h2 className="text-xl font-bold mb-3">ゲームオーバー</h2>
            <div className="space-y-3">
              <div className="p-3">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isNewHighScore && (
                    <FaCrown className="text-yellow-400 text-2xl" />
                  )}
                  <p
                    className={`text-3xl font-bold ${isNewHighScore ? "text-red-600" : "text-gray-900"}`}
                  >
                    {score}
                    <span className="text-lg ml-2">点</span>
                  </p>
                </div>
                {isNewHighScore && (
                  <p className="text-sm text-green-600 mt-1 font-bold">
                    新記録達成！
                  </p>
                )}
              </div>
              <div className="p-2">
                <p className="text-lg font-bold text-gray-600">
                  ハイスコア: {highScore}
                </p>
              </div>
            </div>
          </div>

          {/* リトライボタン */}
          <button
            className="px-10 py-3 text-lg font-bold text-white bg-blue-500 rounded-full 
                     hover:bg-blue-600 transform transition-transform hover:scale-105 
                     active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 
                     focus:ring-opacity-50 shadow-lg"
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
