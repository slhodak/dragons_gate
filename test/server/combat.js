const assert = require('assert');
const Combat = require(`${process.env.PWD}/server/game/combat`);
const createGame = require(`${process.env.PWD}/server/game/game`);
const { EliteSoldier, Daisho } = require(`${process.env.PWD}/server/game/units`);
const { attackTypes, factionNames } = require(`${process.env.PWD}/lib/enums`);

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
  describe('#constructor', () => {
    it('should produce a combat instance when given a plain old object', () => {
      assert.strictEqual(this.combatFromPOO.constructor.name, 'Combat');
    });
    it('should produce a valid combat instance (when given a plain old object)', () => {
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
  describe('#doCombat', () => {
    it("should reduce the defender's health points", () => {
      let eliteSoldier = new EliteSoldier();
      eliteSoldier.faction = { units: [] };
      const startingHP = eliteSoldier.healthPoints;
      const combat = new Combat();
      combat.attacker = new Daisho();
      combat.defender = eliteSoldier;
      combat.attackType = attackTypes.MELEE;
      for (let i = 0; i < 5; i++) {
        combat.doCombat();
      }
      assert(startingHP > eliteSoldier.healthPoints);
    });
  });
});
