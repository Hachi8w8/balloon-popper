import { GameConfig } from "../types/game";

export const DEFAULT_GAME_CONFIG: GameConfig = {
  gameDuration: 30, // 30秒
  initialBalloonInterval: 1500, // 1.5秒に1個
  mediumBalloonInterval: 1000, // 1秒に1個
  fastBalloonInterval: 500, // 0.5秒に1個
  firstSpeedUpTime: 10, // 10秒後に1段階目の加速
  secondSpeedUpTime: 20, // 20秒後に2段階目の加速
  pointsPerBalloon: 10, // 1個10点
  minSpeed: 3, // 最小速度（画面の高さの3%/秒）
  maxSpeed: 6, // 最大速度（画面の高さの6%/秒）
  maxBalloons: 20, // 画面上の最大風船数
};

// 風船の色の配列
export const BALLOON_COLORS = [
  "#FF6B6B", // 赤
  "#4ECDC4", // ターコイズ
  "#45B7D1", // 水色
  "#96CEB4", // 緑
  "#FFEEAD", // 黄色
  "#FFD93D", // オレンジ
  "#FF9999", // ピンク
  "#6C5B7B", // 紫
];
