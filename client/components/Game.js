import React from 'react';
import ReactDOM from 'react-dom';
import Combat from './Combat.js';
import Factions from './Factions.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    // get game state from server
    this.state = {
      factions: {}
    };
    this.fetchGameState = this.fetchGameState.bind(this);
  }
  componentDidMount() {
    this.openGame();
  }
  // Get game data from value in server memory
  openGame() {
    console.log("Loading game...");
    fetch('start')
      .then(res => res.json())
      .then(factions => {
        this.setState({ factions });
      })
      .catch(err => console.error(`Error fetching game state ${err}`));
  }
  // Get game data from last save on server disk
  fetchGameState() {
    console.log("Fetching game state...");
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
  render() {
    const { factions } = this.state;
    return (
      <div>
        <h1>Dragon's Gate</h1>
        <button onClick={this.fetchGameState}>Load Game</button>
        <button onClick={this.saveGame}>Save Game</button>
        <Combat />
        <Factions factions={factions} />
      </div>
    )
  }
}
