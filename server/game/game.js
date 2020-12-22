const fs = require('fs').promises;
const path = require('path');
const factions = require('./factions');
const { Faction, Empire, Protectors, Guardians } = factions;
const Board = require('./board');
const { xyDistance } = require(`${process.env.PWD}/lib/helpers`);
const SAVE_PATH = path.join(__dirname, './data/game.json');

// Tracks the state of factions and their units
// Interface for users to play the game
class Game {
  constructor() {
    this.factions = [
      new Faction(Empire, this),
      new Faction(Protectors, this),
      new Faction(Guardians, this)
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
  // Assign unique IDs to units
  assignIds() {
    let idCounter = 1;
    this.factions.forEach((faction) => {
      faction.units.forEach((unit) => {
        unit.id = idCounter;
        idCounter += 1;
      });
    });
  }
  // Give control of game to next player
  // Calculate turn-based effects
  // Ensure board reflects changes
  nextTurn() {
    try {
      this.resetCombat();
      this.setMover(null);
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
  setMover(unitId) {
    if (unitId == null) {
      this.mover = null;
    } else {
      const unit = this.getUnitById(unitId);
      this.mover = unit;
    }
  }
  // Change coordinates of mover in board
  // Deplete steps of unit
  moveMoverTo(coordinates) {
    const { mover, board } = this;
    const stepsToTake = xyDistance(mover.coordinates, coordinates);
    const moverInstance = this.getUnitById(mover.id);
    board.moveUnit(moverInstance, coordinates);
    moverInstance.depleteSteps(stepsToTake);
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
    defender.reduceHP(loss);
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
      const game = JSON.stringify(this.withoutCircularReference());
      await fs.writeFile(SAVE_PATH, game);
      return true;
    } catch (err) {
      return err;
    }
  }
  // Read game state from file
  async load() {
    try {
      const json = await fs.readFile(SAVE_PATH);
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
    const { attacker } = this.combat;
    const faction = this.factions.find(faction => faction.name === attacker.faction.name);
    return !faction.units.some(unit => unit.hasAttacksLeft());
  }
  // Return game data without any circular references
  withoutCircularReference() {
    const { factions, mover } = this;
    return {
      factions: factions.map(faction => faction.withoutCircularReference()),
      combat: this.combatWithoutCircularReference(),
      mover: mover ? mover.withoutCircularReference() : null,
      turn: this.turn,
      board: this.board.withoutCircularReference()
    }
  }
  combatWithoutCircularReference() {
    const { attacker, defender, attackType } = this.combat;
    return {
      attacker: attacker ? attacker.withoutCircularReference() : null,
      defender: defender ? defender.withoutCircularReference() : null,
      attackType
    };
  }
}

module.exports = () => new Game();
