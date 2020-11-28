import React from 'react';
import { attackTypes, combatantTypes } from '../../lib/enums.js';
import '../style.css';

export default class Combat extends React.Component {
  constructor(props) {
    super(props);

    this.doCombat = this.doCombat.bind(this);
  }
  doCombat() {
    const { attacker, defender, attackType } = this.props;
    fetch('doCombat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        attackerId: attacker.id,
        defenderId: defender.id,
        type: attackType
      })
    })
      .then(res => {
        // this is "heavy" but it is 1 small page of JSON
        this.props.loadCurrentGame();
      })
      .catch(err => console.error(`Error calculating combat result: ${err}`));
  }
  render() {
    const {
      turn,
      attacker,
      defender,
      nextTurn,
      selectingCombatant,
      toggleCombatantType,
      attackType,
      toggleAttackType
    } = this.props;
    return (
      <div className="combat">
        <span>Turn: {turn}</span>
        <button onClick={nextTurn}>Next Turn</button>
        <h2>Combat</h2>
        <div>Selecting: {selectingCombatant}</div>
        <button onClick={toggleCombatantType}>Select {selectingCombatant === combatantTypes.ATTACKER ? combatantTypes.DEFENDER : combatantTypes.ATTACKER}</button>
        <div>Attack Type: {attackType}</div>
        <button onClick={toggleAttackType}>Attack using {attackType === attackTypes.MELEE ? attackTypes.RANGED : attackTypes.MELEE}</button>
        <div>Attacker</div><span>{attacker.name || 'none'}, id: {attacker.id || 'n/a'}</span>
        <div>Defender</div><span>{defender.name || 'none'}, id: {defender.id || 'n/a'}</span>
        <button onClick={this.doCombat} className="fightButton">Fight</button>
      </div>
    )
  }
}
