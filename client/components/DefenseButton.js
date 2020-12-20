import React from 'react';
import { isInRange } from '../../lib/helpers';
import '../style.css';

export default (props) => {
  const { coordinates, unit, combat, confirmAttack } = props;
  const { attacker, attackType } = combat;
  // Display iff this button's cell's coordinates are in the attacker's InRange list for the attackTypeUnderway
  if (attacker && (attacker.faction != unit.faction)) {
    const attack = attacker.attack[attackType];
    const { range } = attack;
    // where to put this method?
    if (isInRange(coordinates, attacker.coordinates, range)) {
      return <button className="gameButton confirmAttack" onClick={() => confirmAttack(unit)}>hit!</button>
    } else {
      return null;
    }
  } else {
    return null;
  }
}
