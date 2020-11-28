import React from 'react';
import dragonIcon from '../images/icons8-dragon-96.png';
import '../style.css';

export default (props) => {
  return (
    <div className="header">
      <h1><img className="dragonIcon" src={dragonIcon} alt='dragon'/> Dragon's Gate</h1>
      <button onClick={props.loadSavedGame}>Load Game</button>
      <button onClick={props.saveGame}>Save Game</button>
    </div>
  )
};
