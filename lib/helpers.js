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

module.exports = {
  capitalize,
  isInRange
};
