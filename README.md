# 🎈 風船割りゲーム

シンプルで楽しい風船割りゲーム！制限時間内にできるだけ多くの風船を割って、ハイスコアを目指しましょう。

## 🎮 ゲームの遊び方

1. 「スタート」ボタンをクリックしてゲームを開始
2. 画面下から浮かび上がってくる風船をクリックして割る
3. 制限時間は30秒
4. 1個の風船を割ると10点獲得
5. ゲーム終了後、ハイスコアを更新すると王冠マークと「新記録達成！」の演出が表示

### 難易度変化

ゲームは時間経過とともに3段階で難しくなります：

- 序盤（30-20秒）：1.5秒に1個の風船が出現
- 中盤（20-10秒）：1秒に1個の風船が出現
- 終盤（10-0秒）：0.5秒に1個の風船が出現

## 🛠️ 開発情報

### 技術スタック

- フレームワーク：React + TypeScript
- スタイリング：Tailwind CSS
- ビルドツール：Vite
- 状態管理：React Hooks

### 主な機能

- リアルタイムの風船アニメーション
- スコアとハイスコアの管理（セッションストレージ使用）
- レスポンシブ対応
- アクセシビリティ対応

### ローカルでの開発方法

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# コードのフォーマット
npm run format
```

## 🎨 デザイン

- シンプルで直感的なUI
- 風船は8色のカラフルなバリエーション
- スムーズなアニメーション
- 新記録達成時の特別な演出
