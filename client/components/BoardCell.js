import React from 'react';
import MoveButton from './MoveButton.js';
import AttackButton from './AttackButton.js';
import { attackTypes } from '../../lib/enums.js';
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
            <div className="cellButtons">
              <MoveButton myTurn={myTurn}
                          unitId={id}
                          unitSteps={steps}
                          coordinates={coordinates}
                          setMover={setMover}
                          mover={mover} />            
              <AttackButton unit={unit}
                            myTurn={myTurn}
                            // attacker={attacker}
                            // defender={defender}
                            // attackTypeUnderway={attackTypeUnderway}
                            attackType={attackTypes.MELEE}
                            // selectAttacker={selectAttacker}
                            // resetAttack={resetAttack}
                            />
              <AttackButton unit={unit}
                            myTurn={myTurn}
                            // attacker={attacker}
                            // defender={defender}
                            // attackTypeUnderway={attackTypeUnderway}
                            attackType={attackTypes.RANGED}
                            // selectAttacker={selectAttacker}
                            // resetAttack={resetAttack}
                            />
            </div>
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
