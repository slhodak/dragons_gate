import React from 'react';
import Header from './Header.js';
import HexBoard from './HexBoard.js';
import Factions from './Factions.js';
import Footer from './Footer.js';
import '../style.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      factions: [],
      attacker: null,
      attackType: null
    };

    this.nextTurn = this.nextTurn.bind(this);
    this.loadSavedGame = this.loadSavedGame.bind(this);
    this.loadCurrentGame = this.loadCurrentGame.bind(this);
    this.selectAttacker = this.selectAttacker.bind(this);
    this.attack = this.attack.bind(this);
    this.resetAttack = this.resetAttack.bind(this);
  }
  componentDidMount() {
    this.loadCurrentGame();
  }
  // Get game data from value in server memory
  loadCurrentGame() {
    console.log("Updating game from server memory...");
    fetch('load')
      .then(res => res.json())
      .then(body => {
        const { factions, turn, combat } = body;
        const { attacker, attackType } = combat;
        this.setState({ factions, turn, attacker, attackType });
      })
      .catch(err => console.error(`Error fetching game state ${err}`));
  }
  // Get game data from last save on server disk
  loadSavedGame() {
    console.log("Fetching game from server disk...");
    fetch('loadSaved')
      .then(res => res.json())
      .then(body => {
        const { factions, turn, combat } = body;
        const { attacker, attackType } = combat;
        this.setState({ factions, turn, attacker, attackType });
      })
      .catch(err => console.error(`Error fetching game state ${err}`));
  }
  saveGame() {
    console.log('Saving game file...');
    fetch('save', {
      method: 'POST'
    })
      .then(_res => {
        console.log('Game saved successfully');
      })
      .catch(err => {
        console.error(`Error saving game: ${err}`);
      });
  }
  // Change turn
  nextTurn() {
    fetch('/nextTurn', {
      method: 'POST'
    })
      .then(_res => {
        console.debug('Changing turn');
        this.loadCurrentGame();
      })
      .catch(err => `Error changing turns: ${err}`)
  }
  selectAttacker(attacker, attackType) {
    fetch('/selectAttacker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        attacker,
        attackType
      })
    })
      .then(res => res.json())
      .then(body => {
        const { attacker, attackType } = body;
        this.setState({
          attacker,
          attackType
        })
      })
      .catch(err => console.error(`Error selecting attacker: ${err}`));
  }
  resetAttack() {
    fetch('/resetAttack', {
      method: 'POST'
    })
      .then(res => res.json())
      .then(body => {
        const { attacker, attackType } = body;
        this.setState({
          attacker,
          attackType
        })
      })
      .catch(err => console.error(`Error resetting attack: ${err}`));
  }
  attack(defender) {
    fetch('doCombat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ defender })
    })
      .then(_res => this.loadCurrentGame())
      .catch(err => console.error(`Error calculating combat result: ${err}`));
  }

  render() {
    const {
      turn,
      factions,
      attacker,
      defender,
      attackType
    } = this.state;
    return (
      <div>
        <Header turnFaction={factions ? factions[turn] : null}
                loadSavedGame={this.loadSavedGame}
                saveGame={this.saveGame}
                nextTurn={this.nextTurn} />
        <div className="game">
          <HexBoard />
          <Factions attacker={attacker}
                    defender={defender}
                    attackTypeUnderway={attackType}
                    turn={turn}
                    factions={factions}
                    selectAttacker={this.selectAttacker}
                    attack={this.attack}
                    resetAttack={this.resetAttack}
                    confirmAttack={this.confirmAttack} />
        </div>
        <Footer />
      </div>
    )
  }
}
