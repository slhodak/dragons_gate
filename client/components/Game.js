import React from 'react';
import Header from './Header';
import SquareBoard from './SquareBoard';
import Factions from './Factions';
import Footer from './Footer';
import { xyDistance } from '../../lib/helpers';
import '../style.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      board: null,
      factions: [],
      combat: {},
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
      combat
    } = this.state;
    const turnFaction = factions ? factions[turn] : null;
    return (
      <div>
        <Header turnFaction={turnFaction}
                loadSavedGame={this.loadSavedGame}
                saveGame={this.saveGame}
                nextTurn={this.nextTurn} />
        <div className="game">
          <SquareBoard board={board}
                       setMover={this.setMover}
                       mover={mover}
                       moverCanMoveTo={this.moverCanMoveTo}
                       moveMoverTo={this.moveMoverTo}
                       turnFaction={turnFaction}
                       combat={combat}
                       selectAttacker={this.selectAttacker}
                       resetAttack={this.resetAttack}
                       attack={this.attack}
                       />
          <Factions factions={factions} turnFaction={turnFaction} />
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
        this.setState({ board, factions, turn, combat, mover });
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
        this.setState({ factions, turn, combat });
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
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ attacker, attackType })
    })
      .then(res => {
        if (res.ok) {
          this.loadCurrentGame();
        } else {
          return res.json();
        }
      })
      .then(err => {
        if (err) {
          throw new Error(err.message);
        }
      })
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
      .then(err => { 
        if (err) {
          throw new Error(err.message);
        }
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
      .then(res => {
        if (res.ok) {
          this.loadCurrentGame();
        } else {
          return res.json();
        }
      })
      .then(err => {
        if (err) {
          throw new Error(err.message);
        }
      })
      .catch(err => console.error(`Error calculating combat result: ${err}`));
  }
  setMover(unitId) {
    fetch('setMover', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mover: unitId })
    })
      .then(res => {
        if (res.ok) {
          console.debug('Mover set successfully');
          this.loadCurrentGame();
        }
      })
      .then(err => {
        if (err) {
          throw new Error(err.message);
        }
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
    console.debug('Coordinates sent in moveTo ' + coordinates);
    fetch('moveMoverTo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ coordinates })
    })
      .then(res => {
        if (res.ok) {
          console.debug(`Successfully moved unit to ${coordinates}`);
          this.loadCurrentGame();
        } else {
          res.json();
        }
      })
      .then(err => {
        if (err) {
          throw new Error(err.message);
        }
      })
      .catch(err => console.error(`Error moving unit: ${err}`));    
  }
}
