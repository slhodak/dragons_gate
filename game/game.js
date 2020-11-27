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
    this.assignIds();
  }
  // assign IDs
  assignIds() {
    let idCounter = 0;
    Object.keys(this.factions).forEach((faction) => {
      this.factions[faction].units.forEach((unit) => {
        unit.id = idCounter;
        idCounter += 1;
      });
    });
  }
  // Alter defender's HP (and maybe state) based on calculated damage (and maybe other effects)
  doCombat(attacker, defender, type) {
    // reject combatants who are deceased
    let damage = 0;
    // should use constant/enum
    if (type === 'melee') {
      damage = attacker.rollMeleeDamage();
    } else if (type === 'ranged') {
      damage = attacker.rollRangedDamage();
    }
    console.log(damage);
    let defense = defender.rollDefenseArmor();
    let loss = damage - defense;
    defender.reduceHP(loss);
  }
  // Write game state to file
  async save() {
    try {
      await fs.writeFile(this.stateFilePath, JSON.stringify(this.factions));
      return true;
    } catch (err) {
      return err;
    }
  }
  async load() {
    try {
      const json = await fs.readFile(this.stateFilePath);
      this.factions = JSON.parse(json);
      return json;
    } catch (err) {
      return err;
    }
  }
}

module.exports = () => new Game();
