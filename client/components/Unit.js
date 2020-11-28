import React from 'react';
import '../style.css';

// Unit
export default (props) => {
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
    name,
    id
  } = props.unit;

  return (
    <div className="unit" onClick={() => { props.selectCombatant({ name, id }) }}>
      <div className="header">
        <h3>{name}</h3>
        <span><em>{status}</em></span>
      </div>
      <div>{`HP: ${healthPoints}`}</div>
      <div>{`Speed: ${speed}`}</div>
      <div>{`Melee Range: ${meleeRange}`}</div>
      <div>{`Melee Damage: ${meleeDamage}`}</div>
      <div>{`Ranged Range: ${rangedRange}`}</div>
      <div>{`Ranged Damage: ${rangedDamage}`}</div>
      <div>{`Defense Armor: ${defenseArmor}`}</div>
      <div>{`Health Regen: ${healthRegen}`}</div>
    </div>
  )
}
