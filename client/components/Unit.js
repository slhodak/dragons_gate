import React from 'react';
import { attackTypes } from '../../lib/enums';
import '../style.css';
import AttackButton from './AttackButton.js';
import DefenseButton from './DefenseButton.js';

// Unit
export default (props) => {
  const { attacker, defender, unit, attackTypeUnderway } = props;
  const {
    healthPoints,
    speed,
    meleeRange,
    meleeDamage,
    rangedRange,
    rangedDamage,
    defenseArmor,
    healthRegen,
    status,
    name
  } = unit;
  return (
    <div className="unit">
      <div className="header">
        <h3>{name}</h3>
        <span><em>{status}</em></span>
      </div>
      <div>{`HP: ${healthPoints}`}</div>
      <div>{`Speed: ${speed}`}</div>
      <div>{`Melee Range: ${meleeRange}`}</div>
      <div>
        {`Melee Damage: ${meleeDamage}`}
        <AttackButton unit={unit}
                      attacker={attacker}
                      defender={defender}
                      attackTypeUnderway={attackTypeUnderway}
                      attackType={attackTypes.MELEE}
                      selectAttacker={props.selectAttacker} />
      </div>
      {rangedRange ? <div>{`Ranged Range: ${rangedRange}`}</div> : null}
      {(() => {
        if (rangedDamage) {
          return <div>
                  <div>{`Ranged Damage: ${rangedDamage}`}</div>
                  <AttackButton unit={unit}
                      attacker={attacker}
                      defender={defender}
                      attackTypeUnderway={attackTypeUnderway}
                      attackType={attackTypes.RANGED}
                      selectAttacker={props.selectAttacker} />
                </div>
        }
      })()}
      <div>{`Defense Armor: ${defenseArmor}`}</div>
      <div>{`Health Regen: ${healthRegen}`}</div>
      <DefenseButton  unit={unit}
                      attacker={attacker}
                      defender={defender}
                      confirmAttack={props.confirmAttack}
                      selectDefender={props.selectDefender} />
    </div>
  )
}
