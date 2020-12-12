import React from 'react';
import MoveButton from './MoveButton';
import AttackButton from './AttackButton';
import DefenseButton from './DefenseButton';
import '../style.css';

export default (props) => {
  const {
    unit,
    coordinates,
    myTurn,
    setMover,
    mover,
    isValidMove,
    moveMoverTo,
    combat,
    selectAttacker,
    resetAttack,
    attack
  } = props;
  // refactor later depending on final layout of each version
  
  // put this in a component
  if (unit) {
    const { name, faction, healthPoints } = unit;
    const cellHeader =  <div className="cellHeader">
                          <span className="cellName">{name.substr(0, 1)}</span>
                          <span>{healthPoints}</span>
                        </div>
    if (myTurn) {
      return (
        <div className={`squareCell ${faction}`}>
          <div className="cellContents">
            {cellHeader}
            <div className="cellButtons">
              <div className="actionButtons">
                <MoveButton unit={unit}
                            coordinates={coordinates}
                            setMover={setMover}
                            mover={mover} />
                {Object.keys(unit.attack).map(type => {
                  return (
                    <AttackButton unit={unit}
                                  attackType={type}
                                  combat={combat}
                                  selectAttacker={selectAttacker}
                                  resetAttack={resetAttack} />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={`squareCell ${faction}`}>
          <div className="cellContents">
            {cellHeader}
            <DefenseButton  unit={unit}
                            combat={combat}
                            attack={attack} />
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
