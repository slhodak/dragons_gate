// Hexagonal hex board

const moves = {
  TOP_RIGHT: 'topRight',
  BOTTOM_RIGHT: 'bottomRight',
  BOTTOM: 'bottom',
  BOTTOM_LEFT: 'bottomLeft',
  TOP_LEFT: 'topLeft',
  TOP: 'top'
};

// The position of a neighbor by your position to them
const inverseNeighbor = {
  top: moves.BOTTOM,
  topRight: moves.BOTTOM_LEFT,
  bottomRight: moves.BOTTOM_RIGHT,
  bottom: moves.TOP,
  bottomLeft: moves.TOP_RIGHT,
  topLeft: moves.TOP_LEFT
};

// Moving to each one once returns to current cell
const pathsBackToCell = [
  // I think this order matters for makeNeighbors
  [ moves.TOP_RIGHT, moves.BOTTOM, moves.TOP_LEFT ],
  [ moves.BOTTOM_RIGHT, moves.BOTTOM_LEFT, moves.TOP ]
];

class Cell {
  constructor(board, ring, neighbors = {}) {
    this.ring = ring;
    this.board = board;
    this.neighbors = neighbors;
  }
  // makeNeighbors
  // Create and/or connect all neighbors
  // Follow around Pathsback alternating
  //    a 0, 1, 2 then b 0, 1, 2 then a 1, 2, 0, etc.
  //    Connect forward and reverse
  //    Start again with a[0] as current cell
  makeNeighbors() {
    if (this.ring > this.board.diameter) {
      return;
    }
    // keep track of original center
    // move current cell around PathsBack
    for (let i = 0; i < 6; i++) {
      let pathSet = i % 2;
      for (let j = 0; j < 3; j++) {
        let moveIndex = (i + j) % 3;
        let move = pathsBackToCell[pathSet][moveIndex];
        if (!this.neighbors[move]) {
          this.neighbors[move] = new Cell(this.board, this.ring + 1, {})
          this.neighbors[move].setNeighbor(this, move);
        }
      }
    }
  }
  makeNeighborsAlongPath(move/path)??
  // neighbor: instance of Cell, myPositionToThem: member of "moves"
  setNeighbor(neighbor, myPositionToThem) {
    const theirPositionToMe = inverseNeighbor[myPositionToThem];
    this.neighbors[theirPositionToMe] = neighbor;
  }
}

class Board {
  constructor(diameter) {
    this.diameter = diameter;
    this.center = new Cell(this, 0);
    this.center.makeNeighbors();
  }
}
