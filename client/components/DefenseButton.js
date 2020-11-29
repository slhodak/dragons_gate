import React from 'react';
import '../style.css';

export default (props) => {
  const { unit, attacker, attackTypeUnderway } = props;
  return (
    <div className="combatButton">
      {(() => {
        if (attacker && attacker.faction != unit.faction) {
          return <button className="confirmButton" onClick={() => props.attack(unit)}>Attack with {attacker.name}'s {attackTypeUnderway} attack</button>
        }
      })()}
    </div>
  )
}
