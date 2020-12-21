import React from 'react';
import AttackButton from './AttackButton';
import DefenseButton from './DefenseButton';
import MoveButton from './MoveButton';
import '../../style.css';

export default (props) => {
  const {
    unit,
    turnFaction,
    coordinates,
    setMover,
    mover,
    combat,
    selectAttacker,
    resetAttack,
    confirmAttack
  } = props;
  const { faction } = unit;
  const myTurn = faction === turnFaction.name;
  return (
    <div className="cellButtons">
      {myTurn ?
        <div>
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
        </div> :
        <DefenseButton  coordinates={coordinates}
                        unit={unit}
                        combat={combat}
                        confirmAttack={confirmAttack} />}
    </div>
  )
}
