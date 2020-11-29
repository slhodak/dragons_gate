import React from 'react';
import { capitalize } from '../../lib/helpers.js';
import '../style.css';

export default (props) => {
  const { unit, attacker, defender, attackTypeUnderway } = props;
  return (
    <div className="combatButton">
      {(() => {
        if (!attacker) {
          return null;
        }
        if (!defender) {
          if (attacker.faction === unit.faction) {
            return null;
          }
          return <button className="confirmDefender" onClick={() => props.selectDefender(unit)}>Select Enemy</button>
        }
        if (defender.id === unit.id) {
          return <button className="confirmButton" onClick={props.confirmAttack}>Confirm {capitalize(attackTypeUnderway)} Attack</button>
        }
      })()}
    </div>
  )
}
