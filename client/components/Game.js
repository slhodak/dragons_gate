import React from 'react';
import ReactDOM from 'react-dom';
import Combat from './Combat.js';
import Factions from './Factions.js';

export default class Game extends React.Component {
  constructor() {
    super();
    // get game state from server
    this.state = {};
  }
  fetchGameState() {
    // get one big page with the whole game in it. json is fine
    
  }
  render() {
    return (
      <div>
        <h1>Dragon's Gate</h1>
        <Combat />
        <Factions />
      </div>
    )
  }
}
