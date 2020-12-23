const assert = require('assert');
const Board = require(`${process.env.PWD}/server/game/board`);
const { Faction, Empire, Protectors, Guardians } = require(`${process.env.PWD}/server/game/factions`);

describe('Board', () => {
  describe('#constructor', () => {
    it('should place units on the board', () => {
      const factions = [
        new Faction(Empire, this),
        new Faction(Protectors, this),
        new Faction(Guardians, this)
      ];
      const board = new Board(factions);
      assert.strictEqual(board.data[4][3].name, 'Ryu');
    });
  });
});
