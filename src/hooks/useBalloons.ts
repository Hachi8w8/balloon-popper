import { useState, useCallback } from "react";
import { Balloon } from "../types/game";
import { createBalloon } from "../utils/gameHelpers";
import { DEFAULT_GAME_CONFIG } from "../utils/gameConfig";

export const useBalloons = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  // 風船を追加
  const addBalloon = useCallback(() => {
    if (balloons.length >= DEFAULT_GAME_CONFIG.maxBalloons) return;

    const newBalloon = createBalloon(
      DEFAULT_GAME_CONFIG.minSpeed,
      DEFAULT_GAME_CONFIG.maxSpeed,
    );

    setBalloons((prev) => {
      const updated = [...prev, newBalloon];
      return updated;
    });
  }, [balloons.length]);

  // 風船を割る
  const popBalloon = useCallback((id: string) => {
    setBalloons((prev) =>
      prev.map((balloon) =>
        balloon.id === id ? { ...balloon, popped: true } : balloon,
      ),
    );
  }, []);

  // 風船を更新（位置の更新や画面外の風船の削除）
  const updateBalloons = useCallback((deltaTime: number) => {
    setBalloons((prev) => {
      // poppedされた風船と画面外の風船を削除
      const updated = prev
        .filter((balloon) => !balloon.popped && balloon.y > -10)
        .map((balloon) => ({
          ...balloon,
          y: balloon.y - balloon.speed * deltaTime,
        }));
      return updated;
    });
  }, []);

  // すべての風船をリセット
  const resetBalloons = useCallback(() => {
    setBalloons([]);
  }, []);

  return {
    balloons,
    addBalloon,
    popBalloon,
    updateBalloons,
    resetBalloons,
  };
};
