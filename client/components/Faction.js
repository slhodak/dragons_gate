import React from 'react';
import Unit from './Unit.js';
import '../style.css';

export default (props) => {
  const { faction } = props;
  return (
    <div className="faction">
      <h2>{faction.name.toUpperCase()}</h2>
      <div className="units">
        {faction.units.map(unit => <Unit unit={unit} selectCombatant={props.selectCombatant} />)}
      </div>
    </div>
  )
};
