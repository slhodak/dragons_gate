import React from 'react';
import { capitalize } from '../../lib/helpers.js';
import '../style.css';

export default (props) => {
  const { unit, attacker, attackType, attackTypeUnderway, myTurn } = props;
  return (
    <div className="combatButton">
      {(() => {
        if (!myTurn) {
          return null;
        }
        if (attackTypeUnderway && attackTypeUnderway != attackType) {
          return null;
        }
        if (!attacker) {
          return <button onClick={() => props.selectAttacker(unit, attackType)}>{capitalize(attackType)} Attack</button>
        }
        if (attacker.id === unit.id) {
          return <div>Select enemy or <button className="cancelButton" onClick={props.resetAttack}>Cancel</button></div>;
        }
      })()}
    </div>
  )
}
