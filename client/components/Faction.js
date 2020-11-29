import React from 'react';
import Unit from './Unit.js';
import katana from '../images/icons8-katana-64.png';
import '../style.css';

export default (props) => {
  const { attacker, attackTypeUnderway, faction } = props;
  return (
    <div className={`faction ${faction.name.toLowerCase()}`}>
      <div className="header"><h2>{faction.name.toUpperCase()}</h2><img className="katana" src={katana} alt='katana'/></div>
      <div className="units">
        {faction.units.map(unit => {
          return (<Unit unit={unit}
                        attacker={attacker}
                        attackTypeUnderway={attackTypeUnderway}
                        selectAttacker={props.selectAttacker}
                        attack={props.attack}
                        resetAttack={props.resetAttack} />)
        })}
      </div>
    </div>
  )
};
