import { act, useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'
  if(gameTurns.length > 0 && gameTurns[0].player == 'X'){
    currentPlayer = 'O'
  }else{
    currentPlayer = 'X'
  }
  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  // const [activePlayer, setActivePlayer] = useState('X')
  const activePlayer = deriveActivePlayer(gameTurns)
  
  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((currActivePlayer)=>currActivePlayer==='X'?'O':'X')
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{square : {row:rowIndex, col:colIndex}, player: activePlayer},...prevTurns]
      return updatedTurns
    })
  }

  return (
    <div>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer==='X'}/>
          <Player name="Player 2" symbol="O" isActive={activePlayer==='O'}/>
        </ol>
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          turns={gameTurns} 
        />
      </div>
      <Log turns={gameTurns}/>
    </div>
  )
}

export default App
