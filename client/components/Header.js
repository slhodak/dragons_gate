import React from 'react';
import dragonIcon from '../images/icons8-dragon-96.png';
import '../style.css';

export default (props) => {
  const { turnFaction } = props;
  return (
    <div className="header">
      <h1>
        <img className="dragonIcon" src={dragonIcon} alt='dragon'/>
        Dragon's Gate
      </h1>
      <div className="saveLoadTurn">
        <h2 className="turnFaction">Current Turn: {turnFaction ? turnFaction.name : null}</h2>
        <button className="gameButton turnButton" onClick={props.nextTurn}>Next Turn</button>
        <div className="saveLoad">
          <button className="gameButton" onClick={props.loadSavedGame}>Load Game</button>
          <button className="gameButton" onClick={props.saveGame}>Save Game</button>
        </div>
      </div>
    </div>
  )
};
