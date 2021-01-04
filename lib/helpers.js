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

module.exports = {
  capitalize,
  isInRange,
  xyDistance
};
