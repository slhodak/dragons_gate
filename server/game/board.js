// Who is the root node? Center?

// The position of a neighbor by their position for you
const InverseNeighbor = {
  top: 'bottom',
  topRight: 'bottomLeft',
  bottomRight: 'topLeft',
  bottom: 'top',
  bottomLeft: 'topRight',
  topLeft: 'bottomRight'
};

// I am the last position in the path
// Can I have concept of "two rights" or "two lefts"?
//  "Two turns in the same direction"
// "Turn" right or left -- needs to know initial direction. bottom -> top, right == bottomRight
const PathsBackToMe = {
  top: { 
    bottomRight: 'bottomLeft', // use in InverseNeighbor to find my position
    bottomLeft: 'bottomRight'
  },
  topRight: {
    topLeft: 'bottom',
    bottom: 'topLeft'
  },
  bottomRight: {
    top: 'bottomLeft',
    bottomLeft: 'top'
  },
  bottom: {
    topRight: 'topLeft',
    topLeft: 'topRight'
  },
  bottomLeft: {
    bottomRight: 'top',
    top: 'bottomRight'
  },
  topLeft: {
    bottom: 'topRight',
    topRight: 'bottom'
  }
};

// once the whole board is made, lace up all connections
// while trying to make neighbors, if they already exist, lace connection
//    how to know if they already exist?

// Make all rings (use ring size/side-length algorithm)
//    ringSize = ringNumber * 6
//    sideLength = ringNumber
// Connect each ring with the sizes bordering within
//    Inner neighbors to connect per ring = (ringNumber * 2) - 1


class Cell {
  constructor(boardSize, distanceFromCenter, neighbors) {
    this.boardSize = boardSize;
    this.distanceFromCenter = distanceFromCenter;
    this.neighbors = neighbors;
    this.makeNeighbors(boardSize);
  }
  makeNeighbors() {
    if (this.distanceFromCenter >= this.boardSize) {
      return;
    }
    // Create "breadth-first"
    // Make each new & existing neighbor aware of all
    //  new & existing neighbors bordering it


  }
}

class Board {
  constructor(size) {
    this.size = size;
    this.center = new Cell(size, 0);
    this.center.makeNeighbors();
  }
}
