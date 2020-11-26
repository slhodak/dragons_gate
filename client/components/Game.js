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
    this.fetchGameState();
  }
  // get one big page with the whole game in it. json is fine
  fetchGameState() {
    console.log("Fetching game state...");
    fetch('load')
      .then(res => res.json())
      .then(factions => {
        this.setState({ factions });
      })
      .catch(err => console.error(`Error fetching game state ${err}`));
  }
  render() {
    const { factions } = this.state;
    return (
      <div>
        <h1>Dragon's Gate</h1>
        <button onClick={this.fetchGameState}>Load Game</button>
        <Combat />
        <Factions factions={factions} />
      </div>
    )
  }
}
