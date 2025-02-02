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
        className="start-button"
        onClick={onClick}
        aria-label="ゲームを開始"
      >
        スタート
      </button>
    );
  },
);
