const fs = require('fs').promises;
const path = require('path');
const { Empire, Protectors, Guardians } = require('./factions.js');

// Tracks the state of factions and their units
// Interface for users to play the game
class Game {
  constructor() {
    this.stateFilePath = path.join(__dirname, './state.json');
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
    await fs.writeFile(this.stateFilePath, JSON.stringify(this.factions));
  }
  async load() {
    let stateData = await fs.readFile(this.stateFilePath, JSON.stringify(this.factions));
    stateData = JSON.parse(stateData);
    this.factions = stateData;
  }
}

module.exports = () => new Game();
