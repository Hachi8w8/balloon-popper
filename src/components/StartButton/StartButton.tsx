import React, { memo } from "react";

interface StartButtonProps {
  onClick: () => void;
  isPlaying: boolean;
}

export const StartButton: React.FC<StartButtonProps> = memo(
  ({ onClick, isPlaying }) => {
    if (isPlaying) return null;

    return (
      <button
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                 px-8 sm:px-12 py-4 sm:py-5 text-xl sm:text-2xl font-bold text-white 
                 bg-blue-500 rounded-full hover:bg-blue-600 transform transition-transform 
                 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 
                 focus:ring-blue-400 focus:ring-opacity-50 shadow-lg z-50"
        onClick={onClick}
        aria-label="ゲームを開始"
      >
        スタート
      </button>
    );
  },
);
