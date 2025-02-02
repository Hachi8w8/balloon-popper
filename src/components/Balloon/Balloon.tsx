import React, { memo, useMemo } from "react";
import { Balloon as BalloonInterface } from "../../types/game";
import balloonSvg from "../../assets/balloon.svg";

interface BalloonProps {
  balloon: BalloonInterface;
  onPop: (id: string) => void;
  isGameOver: boolean;
}

export const Balloon: React.FC<BalloonProps> = memo(
  ({ balloon, onPop, isGameOver }) => {
    const handleClick = () => {
      if (!balloon.popped) {
        onPop(balloon.id);
      }
    };

    // 風船の初期位置を決定
    const position = useMemo(() => {
      // 画面の10%～90%の範囲でランダムな横位置を生成
      const randomLeft = Math.floor(Math.random() * 80 + 10);
      return {
        bottom: "150px", // 地面の高さと同じ位置から開始
        left: `${randomLeft}%`,
      };
    }, [balloon.id]);

    return (
      <div
        className="balloon fixed cursor-pointer w-[10vmin] h-[10vmin] min-w-[60px] min-h-[60px] max-w-[100px] max-h-[100px]"
        style={{
          bottom: position.bottom,
          left: position.left,
          animation: isGameOver ? "none" : "floatUp 8s linear infinite",
        }}
        onClick={handleClick}
        role="button"
        aria-label="風船"
        tabIndex={0}
      >
        <img
          src={balloonSvg}
          alt=""
          className="w-full h-full pointer-events-none"
          style={{
            display: "block",
          }}
        />
      </div>
    );
  },
);
