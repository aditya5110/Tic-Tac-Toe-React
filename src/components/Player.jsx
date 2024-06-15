import React from "react";
import {useState} from 'react';

export default function Player(props) {
    const [playerName, setPlayerName] = useState(props.name)
    const [isEditing,setisEditing] = useState(false)
    const handleOnClick = () => {
        setisEditing((editing) => !editing);
    }
    const handleChange = (event) => {
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    if(isEditing){
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
    }
    let editText = "Edit"
    if(isEditing){
        editText = "Save"
    }
    return (
    <li>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{props.symbol}</span>
      </span>
      <button onClick={handleOnClick}>{editText}</button>
    </li>
  );
}
