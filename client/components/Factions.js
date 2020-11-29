import React from 'react';
import Faction from './Faction.js';
import '../style.css';

export default (props) => {
  const { attacker, defender, attackTypeUnderway, factions } = props;
  return (
    <div className="factions">
      {factions.map(faction => {
        return ( <Faction faction={faction}
                          attacker={attacker}
                          defender={defender}
                          attackTypeUnderway={attackTypeUnderway}
                          selectAttacker={props.selectAttacker}
                          selectDefender={props.selectDefender}
                          resetAttack={props.resetAttack}
                          confirmAttack={props.confirmAttack} /> )
      })}
    </div>
  )
}
