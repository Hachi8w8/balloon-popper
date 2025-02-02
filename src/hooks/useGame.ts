import { useState, useCallback, useEffect, useRef } from "react";
import { GameState } from "../types/game";
import { DEFAULT_GAME_CONFIG } from "../utils/gameConfig";
import { getHighScore, saveHighScore } from "../utils/gameHelpers";
import { useBalloons } from "./useBalloons";

export const useGame = () => {
  // 初期化時のみハイスコアを取得
  const [gameState, setGameState] = useState<GameState>({
    status: "idle",
    score: 0,
    timeLeft: DEFAULT_GAME_CONFIG.gameDuration,
    balloons: [],
    highScore: getHighScore(),
  });

  const { balloons, addBalloon, popBalloon, updateBalloons, resetBalloons } =
    useBalloons();

  const lastTimeRef = useRef<number>(0);
  const balloonIntervalRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();
  const isNewHighScore = useRef<boolean>(false);

  // ゲーム開始
  const startGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      status: "playing",
      score: 0,
      timeLeft: DEFAULT_GAME_CONFIG.gameDuration,
      // スタート時にハイスコアを再取得
      highScore: getHighScore(),
    }));
    isNewHighScore.current = false;
    resetBalloons();
    lastTimeRef.current = 0;
    balloonIntervalRef.current = 0;
  }, [resetBalloons]);

  // ゲームの状態を更新
  const updateGame = useCallback(
    (currentTime: number) => {
      if (gameState.status !== "playing") {
        // ゲームが終了したら新しい風船の生成を停止
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        lastTimeRef.current = 0;
        balloonIntervalRef.current = 0;
        return;
      }

      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
        animationFrameRef.current = requestAnimationFrame(updateGame);
        return;
      }

      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      // 時間を更新
      setGameState((prev) => ({
        ...prev,
        timeLeft: Math.max(0, prev.timeLeft - deltaTime),
      }));

      // 風船の位置を更新
      updateBalloons(deltaTime);

      // ゲームがプレイ中の場合のみ新しい風船を生成
      balloonIntervalRef.current += deltaTime;

      // 残り時間に応じて風船の生成間隔を変更
      let interval;
      if (gameState.timeLeft <= DEFAULT_GAME_CONFIG.secondSpeedUpTime) {
        // 終盤（20秒以下）: 0.5秒に1個
        interval = DEFAULT_GAME_CONFIG.fastBalloonInterval / 1000;
      } else if (gameState.timeLeft <= DEFAULT_GAME_CONFIG.firstSpeedUpTime) {
        // 中盤（10-20秒）: 1秒に1個
        interval = DEFAULT_GAME_CONFIG.mediumBalloonInterval / 1000;
      } else {
        // 序盤（0-10秒）: 1.5秒に1個
        interval = DEFAULT_GAME_CONFIG.initialBalloonInterval / 1000;
      }

      if (balloonIntervalRef.current >= interval) {
        addBalloon();
        balloonIntervalRef.current = 0;
      }

      animationFrameRef.current = requestAnimationFrame(updateGame);
    },
    [gameState.status, gameState.timeLeft, addBalloon, updateBalloons],
  );

  // ゲームループの開始
  useEffect(() => {
    if (gameState.status === "playing") {
      animationFrameRef.current = requestAnimationFrame(updateGame);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState.status, updateGame]);

  // 風船を割る
  const handlePopBalloon = useCallback(
    (id: string) => {
      if (gameState.status !== "playing") return;

      popBalloon(id);
      setGameState((prev) => ({
        ...prev,
        score: prev.score + DEFAULT_GAME_CONFIG.pointsPerBalloon,
      }));
    },
    [gameState.status, popBalloon],
  );

  // 時間切れの監視
  useEffect(() => {
    if (gameState.status === "playing" && gameState.timeLeft <= 0) {
      const finalScore = gameState.score;
      const currentHighScore = getHighScore();
      
      // 新記録かどうかを判定
      if (finalScore > currentHighScore) {
        saveHighScore(finalScore);
        isNewHighScore.current = true;
      }

      setGameState((prev) => ({
        ...prev,
        status: "gameover",
        // ハイスコアは更新しない（現在の値を維持）
      }));

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resetBalloons();
    }
  }, [gameState.status, gameState.timeLeft, gameState.score, resetBalloons]);

  return {
    gameState: {
      ...gameState,
      balloons,
      isNewHighScore: isNewHighScore.current,
    },
    startGame,
    handlePopBalloon,
  };
};
