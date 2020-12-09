import React from 'react';
import { attackTypes, unitStatuses } from '../../lib/enums.js';
import { capitalize } from '../../lib/helpers.js';
import '../style.css';

export default (props) => {
  const { unit, meleeAttacks, rangedAttacks, attacker, attackType, attackTypeUnderway, myTurn } = props;
  const { status } = unit;
  return (
    <div>
      {(() => {
        if (!myTurn || status === unitStatuses.DECEASED) {
          return null;
        }
        if (attackTypeUnderway && attackTypeUnderway != attackType) {
          return null;
        }
        if (attackType === attackTypes.MELEE && meleeAttacks < 1) {
          return null;
        } else if (attackType === attackTypes.RANGED && rangedAttacks < 1) {
          return null;
        }
        if (!attacker) {
          let attackCount = ''
          if ((meleeAttacks && meleeAttacks > 1) || (rangedAttacks && rangedAttacks > 1)) {
            attackCount = <span> ({meleeAttacks || rangedAttacks} Left)</span>;
          }
          return <button className="gameButton beginAttack" onClick={() => props.selectAttacker(unit, attackType)}>{capitalize(attackType)} Attack {attackCount}</button>
        }
        if (attacker.id === unit.id) {
          return <div>Select enemy or <button className="gameButton" onClick={props.resetAttack}>Cancel</button></div>;
        }
      })()}
    </div>
  )
}
