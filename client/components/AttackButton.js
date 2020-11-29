import React from 'react';
import { capitalize } from '../../lib/helpers.js';
import '../style.css';

export default (props) => {
  const { unit, attacker, defender, attackType, attackTypeUnderway } = props;
  return (
    <div className="combatButton">
      {(() => {
        if (attackTypeUnderway && attackTypeUnderway != attackType) {
          return null;
        }
        if (!attacker) {
          return <button onClick={() => props.selectAttacker(unit, attackType)}>{capitalize(attackType)} Attack</button>
        }
        if (attacker.id === unit.id) {
          return <div>Select enemy or <button className="cancelButton" onClick={props.resetAttack}>Cancel</button></div>;
        }
        if (!defender) {
          if (attacker.faction === unit.faction) {
            return <div><em>Selecting defender</em></div>;
          }
        }
      })()}
    </div>
  )
}
