import React from 'react';
import Faction from './Faction.js';
import '../style.css';

export default (props) => {
  const { attacker, attackTypeUnderway, factions } = props;
  return (
    <div className="factions">
      {factions.map(faction => {
        return ( <Faction faction={faction}
                          attacker={attacker}
                          attackTypeUnderway={attackTypeUnderway}
                          selectAttacker={props.selectAttacker}
                          attack={props.attack}
                          resetAttack={props.resetAttack}
                          confirmAttack={props.confirmAttack} /> )
      })}
    </div>
  )
}
