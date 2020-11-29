import React from 'react';
import Faction from './Faction.js';
import '../style.css';

export default (props) => {
  const { attacker, attackTypeUnderway, factions, turn } = props;
  return (
    <div className="factions">
      {factions.map(faction => {
        const myTurn = faction === factions[turn];
        return ( <Faction faction={faction}
                          myTurn={myTurn}
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
