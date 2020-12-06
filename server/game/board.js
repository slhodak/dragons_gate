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

// Moving to each one once returns to cell
const PathsBackToCell = {
  a: [ 'top', 'bottomRight', 'bottomLeft' ],  // delta
  b: [ 'topRight', 'topLeft', 'bottom'] // inverted delta
};

// once the whole board is made, lace up all connections
// while trying to make neighbors, if they already exist, lace connection
//    how to know if they already exist?
//    The one we come from exists
//      The one we started at exists (cell of PathsBackToCell)


// Make all rings (use ring size/side-length algorithm)
//    ringSize = ringNumber * 6
//    sideLength = ringNumber
// Connect each ring with the sizes bordering within
//    Inner neighbors to connect per ring = (ringNumber * 2) - 1

// Following the paths back to me, create and or connect neighbors
//    Lace forward and reverse as you go
// First do a from 0, then a from 1, then a from 2
//    Then b from 0, 1, 2
//  Then start at top of current cell and make that current cell
//    // create and/or lace 

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
