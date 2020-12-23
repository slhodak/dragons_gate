const assert = require('assert');
const Board = require(`${process.env.PWD}/server/game/board`);
const { Faction, Empire, Protectors, Guardians } = require(`${process.env.PWD}/server/game/factions`);
const { unitTypes } = require(`${process.env.PWD}/lib/enums`);

describe('Board', () => {
  describe('#constructor', () => {
    before(() => {
      this.factions = [
        new Faction(Empire, {}),
        new Faction(Protectors, {}),
        new Faction(Guardians, {})
      ];
      this.board = new Board(this.factions);
    })
    it('should place units on the board', () => {
      assert.strictEqual(this.board.data[5][3].name, unitTypes.RYU);
    });
    // it('should contain a Gate square', () => {
    //   assert.strictEqual(this.board.data[5][4].name, 'Gate');
    // });
  });
});
