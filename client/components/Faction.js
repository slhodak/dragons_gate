import React from 'react';
import Unit from './Unit';
import katana from '../images/icons8-katana-100.png';
import '../style.css';

export default (props) => {
  const { faction, myTurn } = props;
  return (
    <div className={`faction ${faction.name.toLowerCase()}`}>
      <div className="header">
        <h2>{faction.name.toUpperCase()}</h2>
        {myTurn ? <img className="katana" src={katana} alt='katana'/> : null}
      </div>
      <div className="units">
        {faction.units.map(unit => <Unit unit={unit} />)}
      </div>
    </div>
  )
};
