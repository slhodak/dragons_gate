import React from 'react';
import Faction from './Faction';
import '../style.css';

export default (props) => {
  const { factions, turnFaction } = props;
  return (
    <div className="factions">
      {factions.map(faction => {
        const myTurn = faction === turnFaction;
        return <Faction faction={faction} myTurn={myTurn} />
      })}
    </div>
  )
}
