import React from 'react';
import '../style.css';

export default (props) => {
  const { myTurn, unitId, unitSteps, setMover, mover, coordinates } = props;
  if (!myTurn || unitSteps === 0) {
    return null;
  } else if (!mover) {
    return <button className="gameButton" onClick={() => setMover(unitId, coordinates)}>Move</button>
  } else if (mover.id == unitId) {
    return <button className="gameButton" onClick={() => setMover(null)}>Cancel</button>
  } else {
    return null;
  }
}
