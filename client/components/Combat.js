import React from 'react';
import '../style.css';

export default class Combat extends React.Component {
  constructor(props) {
    super(props);

    this.doCombat = this.doCombat.bind(this);
  }
  doCombat() {
    const { attacker, defender } = this.props;
    fetch('doCombat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        attackerId: attacker.id,
        defenderId: defender.id,
        type: 'melee' // keep this in state too
      })
    })
      .then(res => {
        // this is "heavy" but it is 1 small page of JSON
        this.props.loadCurrentGame();
      })
      .catch(err => console.error(`Error calculating combat result: ${err}`));
  }
  render() {
    const { attacker, defender, selectingCombatant, changeSelectingCombatant } = this.props;
    return (
      <div className="combat">
        <h2>Combat</h2>
        <div>Selecting: {selectingCombatant}</div>
        <div>
          <div>Attacker</div><span>{attacker.name || 'none'}, id: {attacker.id || 'n/a'}</span>
          <button onClick={() => { changeSelectingCombatant('attacker') }}>Select attacker</button>
        </div>
        <div>
          <div>Defender</div><span>{defender.name || 'none'}, id: {defender.id || 'n/a'}</span>
          <button onClick={() => { changeSelectingCombatant('defender') }}>Select defender</button>
        </div>
        <button onClick={this.doCombat} className="fightButton">Fight</button>
      </div>
    )
  }
}
