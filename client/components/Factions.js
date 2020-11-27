import React from 'react';
import Faction from './Faction.js';
import '../style.css';

export default (props) => {
  const { factions } = props;
  return (
    <div className="factions">
      {factions.map(faction => <Faction faction={faction} selectCombatant={props.selectCombatant} />)}
    </div>
  )
}
