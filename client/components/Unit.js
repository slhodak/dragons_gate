import React from 'react';
import { attackTypes } from '../../lib/enums';
import '../style.css';
import CombatButton from './CombatButton.js';

// Unit
export default (props) => {
  const { attacker, defender, unit } = props;
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
      <div>{`Melee Damage: ${meleeDamage}`}
        <CombatButton unit={unit}
                      attacker={attacker}
                      defender={defender}
                      type={attackTypes.MELEE}
                      selectAttacker={props.selectAttacker}
                      selectDefender={props.selectDefender}
                      confirmAttack={props.confirmAttack}  />
      </div>
      {rangedRange ? <div>{`Ranged Range: ${rangedRange}`}</div> : null}
      {rangedDamage ? <div>{`Ranged Damage: ${rangedDamage}`}</div> : null}
      <div>{`Defense Armor: ${defenseArmor}`}</div>
      <div>{`Health Regen: ${healthRegen}`}</div>
    </div>
  )
}
