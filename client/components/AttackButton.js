import React from 'react';
import '../style.css';

export default (props) => {
  const { unit, attacker, defender, attackType, attackTypeUnderway } = props;
  return (
    <div className="attackButton">
      {(() => {
        if (attackTypeUnderway && attackTypeUnderway != attackType) {
          return null;
        }
        if (!attacker) {
          return <button onClick={() => props.selectAttacker(unit, attackType)}>{attackType.toUpperCase()} Attack</button>
        }
        if (attacker.id === unit.id) {
          return <div>Select enemy or <button onClick={() => props.selectAttacker(null, null, true)}>Cancel</button></div>;
        }
        if (!defender) {
          if (attacker.faction === unit.faction) {
            return <div><em>Selecting defender</em></div>;
          }
        }
        return <div><em>Confirming attack</em></div>
      })()}
    </div>
  )
}
