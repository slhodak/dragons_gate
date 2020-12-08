import React from 'react';
import '../style.css';

export default (props) => {
  const { unitId, startMovement } = props;
  return (
    <button className="gameButton" onClick={() => startMovement(unitId)}>Move</button>
  )
}
