import { Balloon } from "../types/game";
import { BALLOON_COLORS } from "./gameConfig";

// ランダムなIDを生成する関数
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// ランダムな色を選択する関数
export const getRandomColor = (): number => {
  return BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
};

// ランダムなX座標を生成する関数（画面幅に対する割合）
export const getRandomX = (): number => {
  return Math.random() * 80 + 10; // 10%～90%の範囲
};

// ランダムな速度を生成する関数
export const getRandomSpeed = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// 新しい風船を生成する関数
export const createBalloon = (minSpeed: number, maxSpeed: number): Balloon => {
  return {
    id: generateId(),
    x: getRandomX(),
    y: 100, // 画面下部から開始
    size: 50, // 固定サイズ（px）
    color: getRandomColor(),
    speed: getRandomSpeed(minSpeed, maxSpeed),
    popped: false,
  };
};

// スコアをセッションストレージに保存する関数
export const saveHighScore = (score: number) => {
  const currentHighScore = getHighScore();
  if (score > currentHighScore) {
    sessionStorage.setItem("balloonGameHighScore", score.toString());
  }
};

// ハイスコアを取得する関数
export const getHighScore = (): number => {
  const highScore = sessionStorage.getItem("balloonGameHighScore");
  return highScore ? parseInt(highScore, 10) : 0;
};
