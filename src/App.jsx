import GameBoard from "./components/GameBoard"
import Player from "./components/Player"

function App() {
  

  return (
    <div>
      <div id="game-container">
        <ol id="players">
          <Player name="Player 1" symbol="X"/>
          <Player name="Player 2" symbol="O"/>
        </ol>
        <GameBoard />
      </div>
    </div>
  )
}

export default App
