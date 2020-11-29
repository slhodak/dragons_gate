import React from 'react';
import Header from './Header.js';
import Combat from './Combat.js';
import HexBoard from './HexBoard.js';
import Factions from './Factions.js';
import Footer from './Footer.js';
import { attackTypes } from '../../lib/enums.js';
import '../style.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      factions: [],
      attacker: null,
      defender: null
    };

    this.nextTurn = this.nextTurn.bind(this);
    this.loadSavedGame = this.loadSavedGame.bind(this);
    this.loadCurrentGame = this.loadCurrentGame.bind(this);
    this.selectAttacker = this.selectAttacker.bind(this);
    this.selectDefender = this.selectDefender.bind(this);
    this.confirmAttack = this.confirmAttack.bind(this);
  }
  componentDidMount() {
    this.loadCurrentGame();
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
  // Get game data from value in server memory
  loadCurrentGame() {
    console.log("Updating game from server memory...");
    fetch('start')
      .then(res => res.json())
      .then(body => {
        const { factions, turn } = body;
        this.setState({ factions, turn });
      })
      .catch(err => console.error(`Error fetching game state ${err}`));
  }
  // Get game data from last save on server disk
  loadSavedGame() {
    console.log("Fetching game from server disk...");
    fetch('load')
      .then(res => res.json())
      .then(body => {
        const { factions, turn } = body;
        this.setState({ factions, turn });
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
  selectAttacker(unit, reset) {
    if (reset) {
      this.setState({ attacker: null })
      return;
    }
    this.setState({ attacker: unit }, () => console.log(unit));
  }
  selectDefender(unit) {
    this.setState({ defender: unit }, () => console.log(unit));
  }
  confirmAttack(type) {
    const { attacker, defender } = this.state;
    fetch('doCombat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        attackerId: attacker.id,
        defenderId: defender.id,
        type
      })
    })
      .then(_res => {
        this.setState({
          attacker: null,
          defender: null
        }, () => {
          // this is "heavy" but it is 1 small page of JSON
          this.loadCurrentGame();
        });
      })
      .catch(err => console.error(`Error calculating combat result: ${err}`));
  }

  render() {
    const {
      turn,
      factions,
      attacker,
      defender
    } = this.state;
    return (
      <div>
        <Header loadSavedGame={this.loadSavedGame} saveGame={this.saveGame} />
        <div className="game">
          <HexBoard />
          <Factions attacker={attacker}
                    defender={defender}
                    factions={factions}
                    selectAttacker={this.selectAttacker}
                    selectDefender={this.selectDefender}
                    confirmAttack={this.confirmAttack} />
        </div>
        <Footer />
      </div>
    )
  }
}
