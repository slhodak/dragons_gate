import React from 'react';
import Combat from './Combat.js';
import Factions from './Factions.js';
import { attackTypes, combatantTypes } from '../../lib/enums.js';
import '../style.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      factions: [],
      attacker: {},
      defender: {},
      selectingCombatant: combatantTypes.ATTACKER,
      attackType: attackTypes.MELEE
    };

    this.loadSavedGame = this.loadSavedGame.bind(this);
    this.loadCurrentGame = this.loadCurrentGame.bind(this);
    this.selectCombatant = this.selectCombatant.bind(this);
    this.toggleCombatantType = this.toggleCombatantType.bind(this);
    this.toggleAttackType = this.toggleAttackType.bind(this);
  }
  componentDidMount() {
    this.loadCurrentGame();
  }
  // Get game data from value in server memory
  loadCurrentGame() {
    console.log("Updating game from server memory...");
    fetch('start')
      .then(res => res.json())
      .then(factions => {
        this.setState({ factions });
      })
      .catch(err => console.error(`Error fetching game state ${err}`));
  }
  // Get game data from last save on server disk
  loadSavedGame() {
    console.log("Fetching game from server disk...");
    fetch('load')
      .then(res => res.json())
      .then(factions => {
        this.setState({ factions });
      })
      .catch(err => console.error(`Error fetching game state ${err}`));
  }
  saveGame() {
    console.log('Saving game file...');
    fetch('save', {
      method: 'POST',
    })
      .then(_res => {
        console.log('Game saved successfully');
      })
      .catch(err => {
        console.error(`Error saving game: ${err}`);
      });
  }
  selectCombatant(unit) {
    const { selectingCombatant } = this.state;
    if (selectingCombatant === combatantTypes.ATTACKER) {
      this.setState({ attacker: unit });
    } else if (selectingCombatant === combatantTypes.DEFENDER) {
      this.setState({ defender: unit });
    }
  }
  // Toggle combatantTypes enum values in state
  toggleCombatantType() {
    const { selectingCombatant } = this.state;
    if (selectingCombatant === combatantTypes.ATTACKER) {
      this.setState({ selectingCombatant: combatantTypes.DEFENDER });
    } else if (selectingCombatant === combatantTypes.DEFENDER) {
      this.setState({ selectingCombatant: combatantTypes.ATTACKER });
    }
  }
  // Toggle attackTypes enum values in state
  toggleAttackType() {
    const { attackType } = this.state;
    if (attackType === attackTypes.MELEE) {
      this.setState({ attackType: attackTypes.RANGED });
    } else if (attackType === attackTypes.RANGED) {
      this.setState({ attackType: attackTypes.MELEE });
    }
  }

  render() {
    const { factions, attacker, defender, selectingCombatant, attackType } = this.state;
    return (
      <div>
        <div className="header">
          <h1>Dragon's Gate</h1>
          <button onClick={this.loadSavedGame}>Load Game</button>
          <button onClick={this.saveGame}>Save Game</button>
        </div>
        <div className="game">
          <Combat attacker={attacker}
                  defender={defender}
                  selectingCombatant={selectingCombatant}
                  attackType={attackType}
                  toggleCombatantType={this.toggleCombatantType}
                  toggleAttackType={this.toggleAttackType}
                  loadCurrentGame={this.loadCurrentGame} />
          <Factions factions={factions} selectCombatant={this.selectCombatant} />
        </div>
      </div>
    )
  }
}
