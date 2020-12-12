import React, { useEffect, useRef } from 'react';
import '../style.css';
import Loss from './Loss';

// Unit
export default (props) => {
  const { unit } = props;
  const {
    healthPoints,
    steps,
    attack,
    defenseArmor,
    healthRegen,
    status,
    name
  } = unit;
  const { melee, ranged } = attack;
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
      {melee ?
        <div>
          <div>{`Melee Range: ${melee.range}`}</div>
          <div>{`Melee Damage: ${melee.damage}`}</div>
        </div>
        : null}
      {ranged ?
        <div>
          <div>{`Ranged Range: ${ranged.range}`}</div>
          <div>{`Ranged Damage: ${ranged.damage}`}</div>
        </div>
        : null}
      <div>{`Defense Armor: ${defenseArmor}`}</div>
      <div>{`Health Regen: ${healthRegen}`}</div>
    </div>
  )
}
