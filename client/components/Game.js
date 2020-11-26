import React from 'react';
import ReactDOM from 'react-dom';
import Combat from './components/Combat.js';
import Factions from './components/Factions.js';

export default class Game extends React.Component {
  constructor() {
    super();
    // game state exists on the server
    //    does game logic? for now
    // browser refresh does not reset game
    // server restart would reset game -- tech debt
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
