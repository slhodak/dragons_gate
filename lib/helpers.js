const capitalize = (string) => {
  let firstLetter = string[0];
  let latterLetters = string.substring(1, string.length);
  return firstLetter.toUpperCase() + latterLetters.toLowerCase();
}

module.exports = {
  capitalize
};
