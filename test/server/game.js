const assert = require('assert');
const e = require('express');
const game = require(`${process.env.PWD}/server/game/game.js`);
const { Faction, Empire, Protectors, Guardians } = require(`${process.env.PWD}/server/game/factions.js`);
const {
  Unit,
  EliteSoldier, FlagBearer,
  Yuma, Kusarigama, Daisho, Shuriken,
  Ryu, Yokai, Shinja
} = require(`${process.env.PWD}/server/game/units.js`);
const { attackTypes, factionNames } = require(`${process.env.PWD}/lib/enums.js`);

describe('Game', () => {
  before(() => {
    this.game = game();
    this.empire = this.game.factions.find(faction => faction.name === factionNames.EMPIRE);
  });
  it('should have 3 factions', () => {
    assert(this.game.factions.length === 3);
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
  describe('#attackerFactionHasNoMoves', () => {
    it('should return false when the faction has moves left', () => {
      const { combat } = this.game;
      combat.attacker = this.empire.units[0];
      assert.strictEqual(this.game.attackerFactionHasNoMoves(), false);
    });
    it('should return true when the faction has no moves left', () => {
      const { combat } = this.game;
      combat.attacker = this.empire.units[0];
      // Currently assumed no Imperial units have ranged attacks
      this.empire.units.forEach(unit => unit.attack.melee.count = 0);
      assert(this.game.attackerFactionHasNoMoves());
    });
  });
});

