const capitalize = (string) => {
  let firstLetter = string[0];
  let latterLetters = string.substring(1, string.length);
  return firstLetter.toUpperCase() + latterLetters.toLowerCase();
}

// Stepwise including turns, not pythagorean
const xyDistance = (xyA, xyB) => {
  const xDistance = Math.abs(xyA[0] - xyB[0]);
  const yDistance = Math.abs(xyA[1] - xyB[1]);
  return xDistance + yDistance;
}

module.exports = {
  capitalize,
  xyDistance
};
