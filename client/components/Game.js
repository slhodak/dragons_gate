import React from 'react';
import createWebSocket from '../websocket';
import Header from './Header';
import SquareBoard from './Board/SquareBoard';
import Factions from './Factions';
import Footer from './Footer';
import { xyDistance } from '../../lib/helpers';
import '../style.css';

const serverUrl = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || '3456'}`;

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
    this.webSocket = createWebSocket(this);

    this.nextTurn = this.nextTurn.bind(this);
    this.loadSavedGame = this.loadSavedGame.bind(this);
    this.update = this.update.bind(this);
    this.selectAttacker = this.selectAttacker.bind(this);
    this.confirmAttack = this.confirmAttack.bind(this);
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
                newGame={this.new}
                loadSavedGame={this.loadSavedGame}
                saveGame={this.saveGame}
                nextTurn={this.nextTurn} />
        <SquareBoard board={board}
                      setMover={this.setMover}
                      mover={mover}
                      moverCanMoveTo={this.moverCanMoveTo}
                      moveMoverTo={this.moveMoverTo}
                      turnFaction={turnFaction}
                      combat={combat}
                      selectAttacker={this.selectAttacker}
                      resetAttack={this.resetAttack}
                      confirmAttack={this.confirmAttack} />
        <Factions factions={factions} turnFaction={turnFaction} />
        <Footer />
      </div>
    )
  }
  // Reset game data, creating fresh game
  new() {
    fetch(serverUrl + '/new')
      .catch(err => console.error(`Error renewing game: ${err}`));
  }
  // Get game data from value in server memory
  update(newData) {
    console.debug("Updating game");
    const { board, factions, turn, mover, combat } = newData;
    this.setState({ board, factions, turn, combat, mover });
  }
  // Get game data from last save on server disk
  loadSavedGame() {
    console.log("Fetching game from server disk...");
    fetch(serverUrl + '/loadSaved')
      .then(res => res.json())
      .then(body => {
        if (body.message) {
          throw new Error(body.message);
        } else {
          const { factions, turn, combat, board, mover } = body;
          this.setState({ factions, turn, combat, board, mover });
        }
      })
      .catch(err => console.error(`Error fetching game state ${err}`));
  }
  saveGame() {
    console.debug('Saving game file...');
    fetch(serverUrl + '/save', {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          console.log('Game saved successfully');
        } else {
          return res.json();
        }
      })
      .then(err => {
        if (err) {
          throw new Error(err.message);
        }
      })
      .catch(err => {
        console.error(`Error saving game: ${err}`);
      });
  }
  // Change turn
  nextTurn() {
    fetch(serverUrl + '/nextTurn')
      .then(res => {
        if (!res.ok) {
          return res.json();
        }
      })
      .then(err => {
        if (err) {
          throw new Error(err.message);
        }
      })
      .catch(err => `Error changing turns: ${err}`)
  }
  selectAttacker(attacker, attackType) {
    fetch(serverUrl + '/selectAttacker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ attacker, attackType })
    })
      .then(res => {
        if (!res.ok) {
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
    fetch(serverUrl + '/resetAttack', {
      method: 'POST'
    })
      .then(res => {
        if (!res.ok) {
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
  confirmAttack(defender) {
    fetch(serverUrl + '/doCombat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ defender })
    })
      .then(res => {
        if (!res.ok) {
          return res.json();
        }
      })
      .then(err => {
        if (err) {
          throw new Error(err.message);
        }
      })
      .catch(err => console.error(`Error calculating combat result: ${err.message}`));
  }
  setMover(unitId) {
    fetch(serverUrl + '/setMover', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mover: unitId })
    })
      .then(res => {
        if (res.ok) {
          console.debug('Mover set successfully');
        } else {
          return res.json();
        }
      })
      .then(err => {
        if (err) {
          throw new Error(err.message);
        }
      })
      .catch(err => console.error(`Server error setting mover: ${err.message}`));
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
    fetch(serverUrl + '/moveMoverTo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ coordinates })
    })
      .then(res => {
        if (res.ok) {
          console.debug(`Successfully moved unit to ${coordinates}`);
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
