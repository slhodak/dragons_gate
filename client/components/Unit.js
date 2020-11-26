import React from 'react';
import style from '../style.css';

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
    healthRegen
  } = props.unit;

  return (
    <div className={style.unit}>
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
