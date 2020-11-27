const assert = require('assert');
const game = require(`${process.env.PWD}/server/game/game.js`);
const { Empire, Protectors, Guardians } = require(`${process.env.PWD}/server/game/factions.js`);
const {
  Unit,
  EliteSoldier, FlagBearer,
  Yuma, Kusarigama, Daisho, Shuriken,
  Ryu, Yokai, Shinja
} = require(`${process.env.PWD}/server/game/units.js`);

describe('Game', () => {
  before(() => {
    this.game = game();
  });
  describe('#doCombat', () => {
    it("should reduce the defender's health points", () => {
      let eliteSoldier = new EliteSoldier();
      const startingHP = eliteSoldier.healthPoints;
      let ryu = new Ryu();
      this.game.doCombat(ryu, eliteSoldier, this.game.attackTypes.RANGED);
      assert(startingHP > eliteSoldier.healthPoints);
    });
  });
});

