import React from 'react';
import { unitStatuses } from '../../lib/enums.js';
import { capitalize } from '../../lib/helpers.js';
import '../style.css';

export default (props) => {
  const { unit, meleeAttacks, rangedAttacks, attacker, attackType, attackTypeUnderway, myTurn } = props;
  const { status } = unit;
  return (
    <div className="combatButton">
      {(() => {
        if (!myTurn || status === unitStatuses.DECEASED || meleeAttacks < 1) {
          return null;
        }
        if (attackTypeUnderway && attackTypeUnderway != attackType) {
          return null;
        }
        if (!attacker) {
          let attackCount = ''
          if ((meleeAttacks && meleeAttacks > 1) || (rangedAttacks && rangedAttacks > 1)) {
            attackCount = <span> ({meleeAttacks || rangedAttacks} Left)</span>;
          }
          return <button onClick={() => props.selectAttacker(unit, attackType)}>{capitalize(attackType)} Attack {attackCount}</button>
        }
        if (attacker.id === unit.id) {
          return <div>Select enemy or <button className="cancelButton" onClick={props.resetAttack}>Cancel</button></div>;
        }
      })()}
    </div>
  )
}
