import React from 'react';
import { Display } from 'rot-js';
import '../style.css';

export default class HexBoard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.board();
  }
  board() {
    var display = new Display({width:8, height:5});
    for (var y = 0; y < 5; y++) {
      for (var x = y%2; x < 8; x += 2) {
        display.draw(x, y, "•");
      }
    }
    let canvas = document.getElementById("hexBoard");
    canvas.appendChild(display.getContainer());
  }
  render() {
    return (
      <div id="hexBoard">
      </div>
    )
  }
}