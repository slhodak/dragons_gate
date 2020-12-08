import React from 'react';
import MoveButton from './MoveButton.js';
import '../style.css';

export default (props) => {
  const { unitId, unitName, coordinates, myTurn, setMover, mover, isValidMove } = props;
  return (
    <div className={`squareCell${isValidMove ? ' isValidMove' : ''}`}>
      {unitId ?
        <div className={myTurn ? 'turnUnit' : ''}>
          {unitName}
          {myTurn ?
            <MoveButton unitId={unitId} coordinates={coordinates} setMover={setMover} mover={mover} />
            : null}
        </div> 
        : null}
    </div>
  )
}
