import React from 'react';
import MoveButton from './MoveButton.js';
import '../style.css';

export default (props) => {
  const {
    unit,
    coordinates,
    myTurn,
    setMover,
    mover,
    isValidMove,
    moveMoverTo
  } = props;
  // refactor later depending on final layout of each version
  if (unit) {
    const { id, name, steps, faction } = unit;
    if (myTurn) {
      return (
        <div className={`squareCell ${faction}`}>
          <div className="cellContents">
            <span className="cellName">{name.substr(0, 1)}</span>
            <MoveButton myTurn={myTurn}
                        unitId={id}
                        unitSteps={steps}
                        coordinates={coordinates}
                        setMover={setMover}
                        mover={mover} />
          </div>
        </div>
      )
    } else {
      return (
        <div className={`squareCell ${faction}`}>
          <div className="cellContents">
            <span className="cellName">{name.substr(0, 1)}</span>
          </div>
        </div>
      )
    }
  } else if (isValidMove) {
    return (
      <div className="squareCell isValidMove"
           onClick={() => moveMoverTo(coordinates)}>
      </div>
    )
  } else {
    return <div className="squareCell"></div>
  }
}
