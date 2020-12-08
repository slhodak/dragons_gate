import React from 'react';
import MoveButton from './MoveButton.js';
import '../style.css';

export default (props) => {
  const { unitId, unitName, unitFaction, coordinates, myTurn, setMover, mover, isValidMove } = props;
  // refactor later depending on final layout of each version
  if (unitId) {
    if (myTurn) {
      return (
        <div className={`squareCell ${unitFaction}`}>
          <div className="cellContents">
            <span className="cellName">{unitName.substr(0, 1)}</span>
            <MoveButton myTurn={myTurn}
                        unitId={unitId}
                        coordinates={coordinates}
                        setMover={setMover}
                        mover={mover} />
          </div>
        </div>
      )
    } else {
      return (
        <div className={`squareCell ${unitFaction}`}>
          <div className="cellContents">
            <span className="cellName">{unitName.substr(0, 1)}</span>
          </div>
        </div>
      )
    }
  } else if (isValidMove) {
    return (
      <div className="squareCell isValidMove"
           onClick={() => moveTo(coordinates)}>
      </div>
    )
  } else {
    return <div className="squareCell"></div>
  }
}
