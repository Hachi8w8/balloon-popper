// ゲームの状態を表す型
export type GameStatus = "idle" | "playing" | "gameover";

// 風船の情報を表す型
export interface Balloon {
  id: string;
  x: number; // 画面上のX座標（%）
  y: number; // 画面上のY座標（%）
  size: number; // 風船のサイズ（px）
  color: number; // 色相回転角度（degree）
  speed: number; // 上昇速度（px/s）
  popped: boolean; // 割れた状態かどうか
}

// ゲームの状態を管理する型
export interface GameState {
  status: GameStatus;
  score: number;
  timeLeft: number;
  balloons: Balloon[];
  highScore: number;
}

// ゲーム設定の型
export interface GameConfig {
  gameDuration: number; // ゲームの制限時間（秒）
  initialBalloonInterval: number; // 開始時の風船生成間隔（ミリ秒）
  mediumBalloonInterval: number; // 中盤の風船生成間隔（ミリ秒）
  fastBalloonInterval: number; // 終盤の風船生成間隔（ミリ秒）
  firstSpeedUpTime: number; // 1段階目の加速までの時間（秒）
  secondSpeedUpTime: number; // 2段階目の加速までの時間（秒）
  pointsPerBalloon: number; // 1個の風船を割ったときのポイント
  minSpeed: number; // 風船の最小上昇速度
  maxSpeed: number; // 風船の最大上昇速度
  maxBalloons: number; // 画面上の最大風船数
}

// ゲームの結果を表す型
export interface GameResult {
  score: number;
  isHighScore: boolean;
  poppedBalloons: number;
  playTime: number;
}
