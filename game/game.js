const fs = require('fs').promises;
const path = require('path');
const { Empire, Protectors, Guardians } = require('./factions.js');

// Tracks the state of factions and their units
// Interface for users to play the game
class Game {
  constructor() {
    this.factions = {
      empire: new Empire(),
      protectors: new Protectors(),
      guardians: new Guardians()
    }
  }
  // Alter defender's HP (and maybe state) based on calculated damage (and maybe other effects)
  doCombat(attacker, defender) {

  }
  // Write game state to file
  async save() {
    const stateFilePath = path.join(__dirname, './state.json');
    await fs.writeFile(stateFilePath, JSON.stringify(this.factions));
  }
}

module.exports = () => new Game();
