import React from 'react';
import Faction from './Faction.js';
import '../style.css';

export default (props) => {
  const { attacker, defender, factions } = props;
  return (
    <div className="factions">
      {factions.map(faction => {
        return ( <Faction faction={faction}
                          attacker={attacker}
                          defender={defender}
                          selectAttacker={props.selectAttacker}
                          selectDefender={props.selectDefender}
                          confirmAttack={props.confirmAttack} /> )
      })}
    </div>
  )
}
