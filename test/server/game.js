const assert = require('assert');
const game = require(`${process.env.PWD}/server/game/game.js`);
const { Empire, Protectors, Guardians } = require(`${process.env.PWD}/server/game/factions.js`);
const {
  Unit,
  EliteSoldier, FlagBearer,
  Yuma, Kusarigama, Daisho, Shuriken,
  Ryu, Yokai, Shinja
} = require(`${process.env.PWD}/server/game/units.js`);
const { attackTypes } = require(`${process.env.PWD}/lib/enums.js`);

describe('Game', () => {
  before(() => {
    this.game = game();
  });
  describe('#doCombat', () => {
    it("should reduce the defender's health points", () => {
      let eliteSoldier = new EliteSoldier();
      const startingHP = eliteSoldier.healthPoints;
      this.game.combat = {
        attacker: new Ryu(),
        defender: eliteSoldier,
        attackType: attackTypes.MELEE
      }
      this.game.doCombat();
      assert(startingHP > eliteSoldier.healthPoints);
    });
  });
});

