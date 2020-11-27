import React from 'react';
import Unit from './Unit.js';
import '../style.css';

export default (props) => {
  const { faction, name } = props;
  return (
    <div className="faction">
      <h2>{name.toUpperCase()}</h2>
      <div className="units">
        {faction.units.map(unit => <Unit unit={unit} selectCombatant={props.selectCombatant} />)}
      </div>
    </div>
  )
};
