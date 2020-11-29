import React from 'react';
import Unit from './Unit.js';
import katana from '../images/icons8-katana-100.png';
import '../style.css';

export default (props) => {
  const { attacker, attackTypeUnderway, faction, myTurn } = props;
  return (
    <div className={`faction ${faction.name.toLowerCase()}`}>
      <div className="header">
        <h2>{faction.name.toUpperCase()}</h2>
        {myTurn ? <img className="katana" src={katana} alt='katana'/> : null}
      </div>
      <div className="units">
        {faction.units.map(unit => {
          return (<Unit unit={unit}
                        myTurn={myTurn}
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
