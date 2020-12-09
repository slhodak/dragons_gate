import React from 'react';
import '../style.css';

export default (props) => {
  const { unit, attacker, attackTypeUnderway } = props;
  return (
    <div>
      {(() => {
        if (attacker && attacker.faction != unit.faction) {
          return <button className="gameButton confirmAttack" onClick={() => props.attack(unit)}>Attack with {attacker.name}'s {attackTypeUnderway} attack</button>
        }
      })()}
    </div>
  )
}
