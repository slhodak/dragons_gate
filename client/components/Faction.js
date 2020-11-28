import React from 'react';
import Unit from './Unit.js';
import katana from '../images/icons8-katana-64.png';
import '../style.css';

export default (props) => {
  const { faction } = props;
  return (
    <div className={`faction ${faction.name.toLowerCase()}`}>
      <div className="header"><h2>{faction.name.toUpperCase()}</h2><img className="katana" src={katana} alt='katana'/></div>
      <div className="units">
        {faction.units.map(unit => <Unit unit={unit} selectCombatant={props.selectCombatant} />)}
      </div>
    </div>
  )
};
