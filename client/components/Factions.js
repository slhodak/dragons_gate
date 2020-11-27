import React from 'react';
import Faction from './Faction.js';
import '../style.css';

export default (props) => {
  const { factions } = props;
  return (
    <div className="factions">
      {`${Object.keys(factions).length} factions loaded`}
      {Object.keys(factions).map(faction => <Faction faction={factions[faction]} name={faction} selectCombatant={props.selectCombatant} />)}
    </div>
  )
}
