import React from 'react';
import '../style.css';

export default (props) => {
  const { unit, attacker, defender, type } = props;
  return (
    <div className="attackButton">
      {(() => {
        if (!attacker) {
          return <button onClick={() => props.selectAttacker(unit)}>{type.toUpperCase()} Attack</button>
        }
        if (attacker.id === unit.id) {
          return <div>Select enemy or <button onClick={() => props.selectAttacker(null, true)}>Cancel</button></div>;
        }
        if (!defender) {
          if (attacker.faction === unit.faction) {
            return <div><em>Selecting defender</em></div>;
          }
          return <button onClick={() => props.selectDefender(unit)}>Select Enemy</button>
        }
        if (defender.id === unit.id) {
          return <button onClick={() => props.confirmAttack(type)}>Confirm Attack</button>
        }
        return <div><em>Confirming attack</em></div>
      })()}
    </div>
  )
}
