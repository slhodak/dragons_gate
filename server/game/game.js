const fs = require('fs').promises;
const path = require('path');
const { Empire, Protectors, Guardians } = require('./factions.js');
const { attackTypes } = require('../../lib/enums.js');

// Tracks the state of factions and their units
// Interface for users to play the game
class Game {
  constructor() {
    this.stateFilePath = path.join(__dirname, './state.json');
    this.factions = [
      new Empire(),
      new Protectors(),
      new Guardians()
    ]
    this.turn = 0;
    this.assignIds();
  }
  // assign IDs
  assignIds() {
    let idCounter = 1;
    this.factions.forEach((faction) => {
      faction.units.forEach((unit) => {
        unit.id = idCounter;
        idCounter += 1;
      });
    });
  }
  // change over control of game to next player
  // calculate turn-based effects
  nextTurn() {
    try {
      this.turn = this.turn + 1 % 3;
      const turnFaction = this.factions[this.turn];
      turnFaction.units.forEach((unit) => {
        unit.beAffected();
      });
      return 0;
    } catch (ex) {
      return ex;
    }
  }
  // Alter defender's HP (and maybe state) based on calculated damage (and maybe other effects)
  doCombat(attacker, defender, type) {
    // reject combatants who are deceased
    let damage = 0;
    // should use constant/enum
    if (type === attackTypes.MELEE) {
      damage = attacker.rollMeleeDamage();
    } else if (type === attackTypes.RANGED) {
      damage = attacker.rollRangedDamage();
    }
    let defense = defender.rollDefenseArmor();
    let loss = damage - defense;
    if (loss > 0) {
      defender.reduceHP(loss);
    }
    let effect = attacker.calculateEffect(type);
    if (effect) {
      defender.status = effect;
    }
    console.debug(`${attacker.name} did ${loss} damage to ${defender.name} with a ${type} attack`);
  }
  getUnitById(id) {
    let foundUnit = false; // gotta love that weak typing
    this.factions.some(faction => {
      faction.units.some(unit => {
        if (unit.id === id) {
          foundUnit = unit;
        }
        return foundUnit;
      });
      return foundUnit;
    });
    return foundUnit;
  }
  // Write game state to file
  async save() {
    try {
      const game = { factions: this.factions, turn: this.turn };
      await fs.writeFile(this.stateFilePath, JSON.stringify(game));
      return true;
    } catch (err) {
      return err;
    }
  }
  // Read game state from file
  async load() {
    try {
      const json = await fs.readFile(this.stateFilePath);
      const { factions, turn } = JSON.parse(json);
      this.factions = factions;
      this.turn = turn;
      return json;
    } catch (err) {
      return err;
    }
  }
}

module.exports = () => new Game();
