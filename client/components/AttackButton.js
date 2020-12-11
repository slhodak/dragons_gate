import React from 'react';
import { attackTypes, unitStatuses } from '../../lib/enums.js';
import katana from '../images/icons8-katana-100.png';
import bowAndArrow from '../images/icons8-bow-and-arrow-96.png';
import '../style.css';

export default (props) => {
  const { unit, attacker, attackType, attackTypeUnderway, myTurn } = props;
  const { status, meleeAttacks, rangedAttacks } = unit;
  return (
    <div className="cellButton">
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
            attackCount = <span> ({meleeAttacks || rangedAttacks})</span>;
          }
          const icon = attackType === attackTypes.MELEE ? katana : bowAndArrow;
          return <button className="gameButton beginAttack" onClick={() => props.selectAttacker(unit, attackType)}><img className="cellButtonIcon" src={icon} alt="attack"/> {attackCount}</button>
        }
        if (attacker.id === unit.id) {
          return <div>Select enemy or <button className="gameButton" onClick={props.resetAttack}>Cancel</button></div>;
        }
      })()}
    </div>
  )
}
