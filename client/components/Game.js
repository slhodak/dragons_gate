import React from 'react';
import ReactDOM from 'react-dom';
import Combat from './Combat.js';
import Factions from './Factions.js';
import '../style.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    // get game state from server
    this.state = {
      factions: [],
      attacker: {},
      defender: {},
      selectingCombatant: 'attacker'
    };
    this.loadSavedGame = this.loadSavedGame.bind(this);
    this.loadCurrentGame = this.loadCurrentGame.bind(this);
    this.selectCombatant = this.selectCombatant.bind(this);
    this.changeSelectingCombatant = this.changeSelectingCombatant.bind(this);
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
    if (selectingCombatant === 'attacker') {
      this.setState({ attacker: unit });
    } else {
      this.setState({ defender: unit });
    }
  }
  // either 'attacker' or 'defender'
  changeSelectingCombatant(selectingCombatant) {
    this.setState({ selectingCombatant });
  }
  render() {
    const { factions, attacker, defender, selectingCombatant } = this.state;
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
                  changeSelectingCombatant={this.changeSelectingCombatant}
                  loadCurrentGame={this.loadCurrentGame} />
          <Factions factions={factions} selectCombatant={this.selectCombatant} />
        </div>
      </div>
    )
  }
}
