import { act, useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combination"
import GameOver from "./components/GameOver"

const PLAYERS = {
  X : 'Player 1',
  O : 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'
  if(gameTurns.length > 0 && gameTurns[0].player == 'X'){
    currentPlayer = 'O'
  }else{
    currentPlayer = 'X'
  }
  return currentPlayer
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map( array => [...array] )]
  for(const turn of gameTurns){
      const {square, player} = turn
      const {row, col} = square

      gameBoard[row][col] = player
  }
  return gameBoard
}

function deriveWinner(gameBoard, players){
  let winner
  for(const combination of WINNING_COMBINATIONS){
    const firstSquare = gameBoard[combination[0].row][combination[0].column]
    const secondSquare = gameBoard[combination[1].row][combination[1].column] 
    const thirdSquare = gameBoard[combination[2].row][combination[2].column]
    
    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
        winner = players[firstSquare]
      }
  }
  return winner
}



function App() {

  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])
  // const [activePlayer, setActivePlayer] = useState('X')
  const activePlayer = deriveActivePlayer(gameTurns)
  
  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurns.length===9 && !winner

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((currActivePlayer)=>currActivePlayer==='X'?'O':'X')
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{square : {row:rowIndex, col:colIndex}, player: activePlayer},...prevTurns]
      return updatedTurns
    })
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers( (prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <div>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRestart}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          turns={gameTurns} 
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns}/>
    </div>
  )
}

export default App
