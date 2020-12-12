import React from 'react';
import '../style.css';

export default (props) => {
  const { unit, combat, attack } = props;
  const { attacker } = combat;
  if (attacker && (attacker.faction != unit.faction)) {
    return <button className="gameButton confirmAttack" onClick={() => attack(unit)}>hit!</button>
  } else {
    return null;
  }
}
