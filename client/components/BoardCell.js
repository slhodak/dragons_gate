import React from 'react';
import CellHeader from './CellHeader';
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
    confirmAttack
  } = props;
  // refactor later depending on final layout of each version

  // put this in a component
  if (unit) {
    const { faction } = unit;
    if (myTurn) {
      return (
        <div className={`squareCell ${faction}`}>
        <CellHeader coordinates={coordinates} unit={unit} />
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
      )
    } else {
      return (
        <div className={`squareCell ${faction}`}>
          <CellHeader coordinates={coordinates} unit={unit} />
          <DefenseButton  coordinates={coordinates}
                          unit={unit}
                          combat={combat}
                          confirmAttack={confirmAttack} />
        </div>
      )
    }
  } else if (isValidMove) {
    return (
      <div className="squareCell isValidMove"
           onClick={() => moveMoverTo(coordinates)}>
        <CellHeader coordinates={coordinates} unit={unit} />
      </div>
    )
  } else {
    return (
      <div className="squareCell">
        <CellHeader coordinates={coordinates} unit={unit} />
      </div>
    )
  }
}
