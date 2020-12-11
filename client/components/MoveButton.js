import React from 'react';
import footsteps from '../images/icons8-footsteps-80.png';
import '../style.css';

export default (props) => {
  const { myTurn, unitId, unitSteps, setMover, mover, coordinates } = props;
  if (!myTurn || unitSteps === 0) {
    return null;
  } else {
    return (
      <div className="cellButton">
        {(() => {
          if (!mover) {
            return <button className="gameButton" onClick={() => setMover(unitId, coordinates)}><img className="cellButtonIcon" src={footsteps} alt="movement" /></button>
          } else if (mover.id == unitId) {
            return <button className="gameButton" onClick={() => setMover(null)}>c</button>
          } else {
            return null;
          }
        })()}
      </div>
    )
  }
}
