import React from 'react';
import footsteps from '../../images/icons8-footsteps-80.png';
import '../../style.css';

export default (props) => {
  const { unit, setMover, mover, coordinates } = props;
  const { id, steps } = unit;
  if (steps === 0) {
    return null;
  } else {
    return (
      <div className="cellButton">
        {(() => {
          if (!mover) {
            return <button className="gameButton" onClick={() => setMover(id, coordinates)}><img className="cellButtonIcon" src={footsteps} alt="movement" /></button>
          } else if (mover.id == id) {
            return <button className="gameButton" onClick={() => setMover(null)}>X</button>
          } else {
            return null;
          }
        })()}
      </div>
    )
  }
}
