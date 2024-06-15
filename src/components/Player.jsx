import React from "react";
import {useState} from 'react';

export default function Player({name, symbol, isActive}) {
    const [playerName, setPlayerName] = useState(name)
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
    <li className={isActive?"active":undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleOnClick}>{editText}</button>
    </li>
  );
}
