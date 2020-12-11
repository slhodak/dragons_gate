import React from 'react';
import Header from './Header.js';
import SquareBoard from './SquareBoard.js';
import Factions from './Factions.js';
import Footer from './Footer.js';
import { xyDistance } from '../../lib/helpers.js';
import '../style.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      board: null,
      factions: [],
      attacker: null,
      attackType: null,
      mover: null
    };

    this.nextTurn = this.nextTurn.bind(this);
    this.loadSavedGame = this.loadSavedGame.bind(this);
    this.loadCurrentGame = this.loadCurrentGame.bind(this);
    this.selectAttacker = this.selectAttacker.bind(this);
    this.attack = this.attack.bind(this);
    this.resetAttack = this.resetAttack.bind(this);
    this.setMover = this.setMover.bind(this);
    this.moverCanMoveTo = this.moverCanMoveTo.bind(this);
    this.moveMoverTo = this.moveMoverTo.bind(this);
  }
  render() {
    const {
      turn,
      board,
      mover,
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
          <SquareBoard board={board}
                       setMover={this.setMover}
                       mover={mover}
                       moverCanMoveTo={this.moverCanMoveTo}
                       moveMoverTo={this.moveMoverTo}
                       turnFaction={factions ? factions[turn] : null} />
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
  componentDidMount() {
    this.loadCurrentGame();
  }
  // Get game data from value in server memory
  loadCurrentGame() {
    console.debug("Updating game from server memory...");
    fetch('load')
    .then(res => { 
      if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error updating game');
        }
      })
      .then(body => {
        const { board, factions, turn, mover, combat } = body;
        const { attacker, attackType } = combat;
        this.setState({ board, factions, turn, attacker, attackType, mover });
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
    console.debug('Saving game file...');
    fetch('save', {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          console.log('Game saved successfully');
        } else {
          return res.json();
        }
      })
      .then(err => { throw new Error(err.message) })
      .catch(err => {
        console.error(`Error saving game: ${err}`);
      });
  }
  // Change turn
  nextTurn() {
    fetch('/nextTurn')
      .then(res => {
        if (res.ok) {
          console.debug('Changing turn');
          this.loadCurrentGame();
        } else {
          return res.json();
        }
      })
      .then(err => { throw new Error(err.message) })
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
      .then(res => {
        if (res.ok) {
          this.loadCurrentGame();
        } else {
          return res.json();
        }
      })
      .then(err => { throw new Error(err.message) })
      .catch(err => console.error(`Error selecting attacker: ${err}`));
  }
  resetAttack() {
    fetch('/resetAttack', {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          this.loadCurrentGame();
        } else {
          return res.json();
        }
      })
      .then(err => { throw new Error(err.message) })
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
      .then(res => {
        if (res.ok) {
          this.loadCurrentGame();
        } else {
          return res.json();
        }
      })
      .then(err => { throw new Error(err.message) })
      .catch(err => console.error(`Error calculating combat result: ${err}`));
  }
  setMover(unitId, coordinates = null) {
    fetch('setMover', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mover: unitId, coordinates })
    })
      .then(res => {
        if (res.ok) {
          console.debug('Mover set successfully');
          this.loadCurrentGame();
        }
      })
      .then(err => {
        throw new Error(err.message);
      })
      .catch(err => console.error(`Server error setting mover: ${err}`));
  }
  // Returns true if it unit is in motion and square is in range
  moverCanMoveTo(coordinates, unit) {
    const { mover } = this.state;
    // Ensure this method is not called unless mover exists?
    if (!mover || unit) {
      return false;
    }
    // are coordinates within step range of mover?
    const distance = xyDistance(mover.coordinates, coordinates);
    return distance <= mover.steps;
  }
  moveMoverTo(coordinates) {
    console.log('coordinates sent in moveTo ' + coordinates);
    fetch('moveMoverTo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ coordinates })
    })
      .then(res => {
        if (res.ok) {
          console.log(`Successfully moved unit to ${coordinates}`);
          this.loadCurrentGame();
        } else {
          throw new Error(res);
        }
      })
      .catch(err => console.error(`Error moving unit: ${err}`));    
  }
}
