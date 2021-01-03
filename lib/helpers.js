const capitalize = (string) => {
  let firstLetter = string[0];
  let latterLetters = string.substring(1, string.length);
  return firstLetter.toUpperCase() + latterLetters.toLowerCase();
}

const isInRange = (coordinates, attackerCoordinates, range) => {
  return (coordinates[0] <= attackerCoordinates[0] + range)
        && (coordinates[0] >= attackerCoordinates[0] - range)
        && (coordinates[1] <= attackerCoordinates[1] + range)
        && (coordinates[1] >= attackerCoordinates[1] - range);
}

// This should be done all within Movement on server
const xyDistance = (from, to) => {
  // Stepwise including turns, not pythagorean
  const xDistance = Math.abs(from[0] - to[0]);
  const yDistance = Math.abs(from[1] - to[1]);
  return xDistance + yDistance;
}

// Find empty board cell from starting point in outward spiral
const findEmptyCellFor = (unit, startingPoint) => {
  let coordinates = startingPoint;
  let sideLength = 2;
  let side = 0;
  let direction = [1, 0]; // (right)
  const { board } = unit.faction.game;
  let firstRun = true;
  // check central tiles in clockwise spiral from 3,4, return first empty cell
  while(true) {
    // Check all cells on a side for emptiness
    // move unit correct direction by correct side length
    for (let i = 0; i < sideLength; i++) {
      if (firstRun) {
        firstRun = false;
        continue;
      }
      if (nextCellIsEmpty(board, coordinates, direction)) {
        return coordinates;
      }
    }
    side += 1;
    // every 4 sides, move one more tile and add 1 to side length
    if (side === 4) {
      // Move one more square
      if (nextCellIsEmpty(board, coordinates, direction)) {
        return coordinates;
      }
      turnRight(direction);
      side = 0;
      sideLength += 1;
    }
  }
}

function turnRight(_2DVector) {
  _2DVector[0] -= 1;
  if (_2DVector[0] === -2) {
    _2DVector[0] = 1;
  }
  _2DVector[1] -= 1;
  if (_2DVector[1] === -2) {
    _2DVector[1] = 1;
  }
}

function nextCellIsEmpty(board, coordinates, direction) {
  coordinates[0] += direction[0];
  coordinates[1] += direction[1];
  if (board.isEmptyAt(coordinates)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  capitalize,
  isInRange,
  xyDistance,
  findEmptyCellFor
};
