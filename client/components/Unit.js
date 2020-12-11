import React, { useEffect, useRef } from 'react';
import { attackTypes } from '../../lib/enums';
import '../style.css';
import AttackButton from './AttackButton.js';
import DefenseButton from './DefenseButton.js';
import Loss from './Loss.js';

// Unit
export default (props) => {
  const { attacker, defender, unit, attackTypeUnderway, myTurn } = props;
  const {
    healthPoints,
    steps,
    meleeRange,
    meleeDamage,
    rangedAttacks,
    rangedRange,
    rangedDamage,
    defenseArmor,
    healthRegen,
    status,
    name
  } = unit;

  // Keep last HP to calculate loss if HP changes during update
  const hpRef = useRef();
  useEffect(() => {
    hpRef.current = healthPoints;
  });
  const loss = hpRef.current - healthPoints;

  return (
    <div className="unit">
      <div className="header">
        <h3>{name}</h3>
        <span className={status}><em>{status}</em></span>
      </div>
      <div>{`HP: ${healthPoints}`}<Loss loss={loss}/></div>
      <div>{`Steps: ${steps}`}</div>
      <div>{`Melee Range: ${meleeRange}`}</div>
      <div>
        {`Melee Damage: ${meleeDamage}`}
        <AttackButton unit={unit}
                      myTurn={myTurn}
                      attacker={attacker}
                      defender={defender}
                      attackTypeUnderway={attackTypeUnderway}
                      attackType={attackTypes.MELEE}
                      selectAttacker={props.selectAttacker}
                      resetAttack={props.resetAttack} />
      </div>
      {(() => {
        if (rangedDamage) {
          return (
            <div>
              <div>{`Ranged Range: ${rangedRange}`}</div>
              <div>{`Ranged Damage: ${rangedDamage}`}</div>
              <AttackButton unit={unit}
                            myTurn={myTurn}
                            rangedAttacks={rangedAttacks}
                            attacker={attacker}
                            defender={defender}
                            attackTypeUnderway={attackTypeUnderway}
                            attackType={attackTypes.RANGED}
                            selectAttacker={props.selectAttacker}
                            resetAttack={props.resetAttack} />
            </div>
          )
        }
      })()}
      <div>{`Defense Armor: ${defenseArmor}`}</div>
      <div>{`Health Regen: ${healthRegen}`}</div>
      <DefenseButton  unit={unit}
                      attacker={attacker}
                      defender={defender}
                      attackTypeUnderway={attackTypeUnderway}
                      attack={props.attack} />
    </div>
  )
}
