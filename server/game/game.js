const fs = require('fs').promises;
const path = require('path');
const { Empire, Protectors, Guardians } = require('./factions.js');
const board = require('./board.js')(8, 8);

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
    this.board = board;
    this.combat = {
      attacker: null,
      defender: null,
      attackType: null
    }
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
      this.turn = (this.turn + 1) % 3;
      const turnFaction = this.factions[this.turn];
      turnFaction.units.forEach((unit) => {
        if (unit.isAlive()) {
          unit.beAffected();
          unit.replenishAttacks();
        }
      });
      return 0;
    } catch (ex) {
      return ex;
    }
  }
  /*
   Technically defender should never be set when this is called
   (so therse don't *need* to be set individually,
    but that's why they are)
  */
   setAttacker(attacker, attackType) {
    this.combat.attacker = attacker;
    this.combat.attackType = attackType;
  }
  // Alter defender's HP (and maybe state) based on calculated damage (and maybe other effects)
  doCombat() {
    const { attacker, defender, attackType } = this.combat;
    const damage = attacker.getDamageFor(attackType);
    console.debug(`${attacker.name} (id:${attacker.id}) rolled ${damage} ${attackType} damage`);
    const defense = defender.rollDefenseArmor();
    console.debug(`${defender.name} (id:${defender.id}) rolled ${defense} defense`);
    const loss = damage - defense;
    defender.reduceHP(damage - defense);
    console.debug(`${attacker.name} did ${loss} damage to ${defender.name} with a ${attackType} attack`);
    if (defender.isAlive()) {
      const effect = attacker.getEffectFor(attackType);
      if (effect) {
        defender.status = effect;
        console.debug(`${defender.name} is now ${effect}`);
      }
    }
  }
  resetCombat() {
    this.combat = {
      attacker: null,
      defender: null,
      attackType: null
    };
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
      const game = { factions: this.factions, turn: this.turn, combat: this.combat };
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
      const { factions, turn, combat } = JSON.parse(json);
      this.factions = factions;
      this.turn = turn;
      this.combat = combat;
      return json;
    } catch (err) {
      return err;
    }
  }
  // Replace faction reference on unit with faction name
  factionsWithoutCircularReference() {
    return this.factions.map(faction => {
      let factionCopy = {};
      Object.assign(factionCopy, faction);
      const { units } = factionCopy;
      factionCopy.units = this.unitsWithoutCircularReference(units);
      return factionCopy;
    });
  }
  unitsWithoutCircularReference(units) {
    return units.map(unit => {
      let unitCopy = {};
      Object.assign(unitCopy, unit);
      unitCopy.faction = unit.faction.name;
      return unitCopy;
    });
  }
  combatWithoutCircularReference() {
    const { attacker, defender, attackType } = this.combat;
    if (attacker) {
      var attackerCopy = Object.assign({}, attacker)
      attackerCopy.faction = attacker.faction.name;
    }
    if (defender) {
      var defenderCopy = Object.assign({}, defender)
      defenderCopy.faction = defender.faction.name;
    }
    return {
      attacker: attackerCopy,
      defender: defenderCopy,
      attackType
    };
  }
  // Determine whether the attacker's faction has moves left
  attackerFactionHasNoMoves() {
    // do any units still have attacks left?
    const { attacker } = this.combat;
    const { faction } = attacker;
    if (faction.units.find(unit => unit.hasAttacksLeft())) {
      return false;
    }
    return true;
  }
}

module.exports = () => new Game();
