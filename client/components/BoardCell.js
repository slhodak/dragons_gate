import React from 'react';
import MoveButton from './MoveButton.js';
import '../style.css';

export default (props) => {
  const { unitId, unitName, myTurn, startMovement } = props;
  return (
    <div className="squareCell">
      {unitId ?
        <div>
          {unitName}
          {myTurn ?
            <MoveButton unitId={unitId} startMovement={startMovement} />
            : null}
        </div> 
        : null}
    </div>
  )
}
