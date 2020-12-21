import React from 'react';
import { attackTypes, unitStatuses } from '../../../lib/enums';
import katana from '../../images/icons8-katana-100.png';
import bowAndArrow from '../../images/icons8-bow-and-arrow-96.png';
import '../../style.css';

export default (props) => {
  const { unit, combat, attackType } = props;
  const { attacker, attackTypeUnderway } = combat;
  const { status, attack } = unit;
  const attackInfo = attack[attackType];
  return (
    <div className="cellButton">
      {(() => {
        if (status === unitStatuses.DECEASED) {
          return null;
        }
        if (attackTypeUnderway && attackTypeUnderway != attackType) {
          return null;
        }
        if (attackInfo.count < 1) {
          return null;
        }
        if (!attacker) {
          let attackCount = '';          
          if (attackInfo.max > 1) {
            attackCount = <span>x{attackInfo.count}</span>;
          }
          const icon = attackType === attackTypes.MELEE ? katana : bowAndArrow;
          return <button className="gameButton beginAttack" onClick={() => props.selectAttacker(unit, attackType)}><img className="cellButtonIcon" src={icon} alt="attack"/>{attackCount}</button>
        }
        if (attacker.id === unit.id) {
          return <button className="gameButton" onClick={props.resetAttack}>X</button>;
        }
      })()}
    </div>
  )
}
