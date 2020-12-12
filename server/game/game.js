const fs = require('fs').promises;
const path = require('path');
const { Faction, Empire, Protectors, Guardians } = require('./factions.js');
const Board = require('./board.js');
const { xyDistance } = require(`${process.env.PWD}/lib/helpers.js`);

// Tracks the state of factions and their units
// Interface for users to play the game
class Game {
  constructor() {
    this.stateFilePath = path.join(__dirname, './state.json');
    this.factions = [
      new Faction(Empire),
      new Faction(Protectors),
      new Faction(Guardians)
    ];
    this.assignIds();
    this.turn = 0;
    this.board = new Board(10, 10, this.factions);
    this.mover = null;
    this.combat = {
      attacker: null,
      defender: null,
      attackType: null
    };
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
  // ensure board reflects changes
  nextTurn() {
    try {
      this.turn = (this.turn + 1) % 3;
      const turnFaction = this.factions[this.turn];
      turnFaction.units.forEach((unit) => {
        if (unit.isAlive()) {
          unit.beAffected();
          unit.replenishAttacks();
          unit.replenishSteps();
        }
      });
      this.board.update(turnFaction.units);
      return 0;
    } catch (ex) {
      return ex;
    }
  }
  setMover(unitId, coordinates) {
    if (unitId == null) {
      this.mover = null;
    } else {
      const unit = this.getUnitById(unitId);
      this.mover = unit;
      this.mover.coordinates = coordinates;
    }
  }
  // Change coordinates of mover in board
  // Deplete steps of unit
  moveMoverTo(coordinates) {
    const { mover, board } = this;
    const stepsToTake = xyDistance(mover.coordinates, coordinates);
    const moverInstance = this.getUnitById(mover.id);
    moverInstance.depleteSteps(stepsToTake);
    board.addUnit(moverInstance, coordinates);
    board.removeUnit(mover);
    this.mover = null;
  }
  /*
   Technically defender should never be set when this is called
   (so these don't *need* to be set individually, but that's why they are)
  */
  setAttacker(attackerId, attackType) {
    const attackerInstance = this.getUnitById(attackerId);
    this.combat.attacker = attackerInstance;
    this.combat.attackType = attackType;
  }
  // Alter defender's HP and status with some randomness
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
        const affected = defender.applyEffect(effect);
        console.debug(`${defender.name} is ${affected ? `now ${effect}` : `still ${defender.effect}`}`);
      }
    }
    attacker.depleteSteps(null);
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
  // Determine whether the attacker's faction has moves left
  attackerFactionHasNoMoves() {
    // do any units still have attacks left?
    const { attacker } = this.combat;
    const faction = this.factions.find(faction => faction.name === attacker.faction);
    return !faction.units.some(unit => unit.hasAttacksLeft());
  }
}

module.exports = () => new Game();
