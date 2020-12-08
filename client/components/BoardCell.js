import React from 'react';
import MoveButton from './MoveButton.js';
import '../style.css';

export default (props) => {
  const { unitId, unitName, unitFaction, coordinates, myTurn, setMover, mover, isValidMove } = props;
  return (
    <div className={`squareCell ${unitFaction ? unitFaction : ''}${isValidMove ? ' isValidMove' : ''}`}>
    {unitId ?
      <div className="cellContents">
        <span className="cellName">{unitName.substr(0, 1)}</span>
        <MoveButton myTurn={myTurn} unitId={unitId} coordinates={coordinates} setMover={setMover} mover={mover} />
      </div>
      : null}
    </div>
  )
}
