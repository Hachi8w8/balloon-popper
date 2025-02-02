import { useGame } from "./hooks/useGame";
import { GameHeader } from "./components/GameHeader/GameHeader";
import { Balloon } from "./components/Balloon/Balloon";
import { StartButton } from "./components/StartButton/StartButton";
import { GameOverScreen } from "./components/GameOverScreen/GameOverScreen";

function App() {
  const { gameState, startGame, handlePopBalloon } = useGame();

  return (
    <div className="game-container bg-gradient-to-b from-blue-50 to-blue-100 text-gray-900">
      <GameHeader
        score={gameState.score}
        timeLeft={gameState.timeLeft}
        highScore={gameState.highScore}
      />

      {gameState.balloons.map((balloon) => (
        <Balloon
          key={balloon.id}
          balloon={balloon}
          onPop={handlePopBalloon}
          isGameOver={gameState.status === "gameover"}
        />
      ))}

      <StartButton
        onClick={startGame}
        isPlaying={gameState.status === "playing"}
      />

      <GameOverScreen
        score={gameState.score}
        highScore={gameState.highScore}
        onRetry={startGame}
        isGameOver={gameState.status === "gameover"}
        isNewHighScore={gameState.isNewHighScore}
      />

      <div className="ground" />
    </div>
  );
}

export default App;
