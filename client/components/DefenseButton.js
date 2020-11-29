import React from 'react';
import '../style.css';

export default (props) => {
  const { unit, attacker, defender, attackTypeUnderway } = props;
  return (
    <div className="defenseButton">
      {(() => {
        if (attackTypeUnderway && attackTypeUnderway != attackType) {
          return null;
        }
        if (!attacker) {
          return null;
        }
        if (!defender) {
          if (attacker.faction === unit.faction) {
            return null;
          }
          return <button onClick={() => props.selectDefender(unit)}>Select Enemy</button>
        }
        if (defender.id === unit.id) {
          return <button onClick={props.confirmAttack}>Confirm Attack</button>
        }
      })()}
    </div>
  )
}
