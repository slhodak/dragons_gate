const assert = require('assert');
const Combat = require(`${process.env.PWD}/server/game/combat`);
const createGame = require(`${process.env.PWD}/server/game/game`);

describe('Combat', () => {
  before(() => {
    const combatObject = {
        "attacker": null,
        "defender": null,
        "attackType": "melee"
    };
    this.gameReference = {};
    this.combatFromPOO = new Combat(this.gameReference, combatObject);
  });
  describe('#fromPOO', () => {
    it('should produce a combat instance', () => {
      assert.strictEqual(this.combatFromPOO.constructor.name, 'Combat');
    });
    it('should produce a valid combat instance', () => {
      const { attacker, defender, attackType } = this.combatFromPOO;
      // assert.notStrictEqual(attacker, undefined);
      assert.strictEqual(attacker, null);
      // assert.notStrictEqual(defender, undefined);
      assert.strictEqual(defender, null);
      assert.strictEqual(attackType, 'melee');
    });
    it('should reference the supplied game parameter', () => {
      assert.strictEqual(this.combatFromPOO.game, this.gameReference);
    });
  });
});
