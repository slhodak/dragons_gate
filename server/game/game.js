const fs = require('fs').promises;
const path = require('path');
const { Faction, Empire, Protectors, Guardians } = require('./factions');
const Board = require('./board');
const Combat = require('./combat');
const Movement = require('./movement');
const Turn = require('./turn');
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
    this.turn = new Turn(this);
    this.board = new Board(this.factions);
    this.movement = new Movement(this);
    this.combat = new Combat(this);
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
  /*
   Technically defender should never be set when this is called
   (so these don't *need* to be set individually, but that's why they are)
  */
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
      const game = JSON.parse(json);
      let { factions, turn, board, movement, combat } = game;
      this.factions = factions.map(faction => {
        return new Faction(faction, this, false);
      });
      this.turn = new Turn(turn);
      this.board = new Board(board.length, board[0].length, this.factions, false);
      this.movement = new Movement(movement);
      this.combat = new Combat(combat, this);
      return { json };
    } catch (err) {
      return { err };
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
    const { factions, combat, movement, turn, board } = this;
    return {
      factions: factions.map(faction => faction.withoutCircularReference()),
      combat: combat.withoutCircularReference(),
      mover: movement.forJson(),
      turn: turn.turn,
      board: board.withoutCircularReference()
    }
  }
}

module.exports = () => new Game();
