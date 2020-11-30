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
  describe('#unitsWithoutCircularReference', () => {
    before(() => {
      const { units } = this.empire;
      this.unit = units[0];
      this.unitsWoCR = this.game.unitsWithoutCircularReference(units);
    });
    it('should return a list', () => {
      assert(this.unitsWoCR instanceof Array);
    });
    it('should return units that contain their faction name', () => {
      assert.strictEqual(this.unitsWoCR[0].faction, factionNames.EMPIRE);
    })
  });
  describe('#factionsWithoutCircularReference', () => {
    before(() => {
      const { units } = this.empire;
      this.unit = units[0];
    });
    it('should start with units that reference their factions', () => {
      assert.strictEqual(this.unit.faction, this.empire);
    });
    it('should return a list', () => {
      this.factionsWoCR = this.game.factionsWithoutCircularReference();
      assert(this.factionsWoCR instanceof Array);
    });
    it('should replace the faction reference with faction name', () => {
      const empireWoCR = this.factionsWoCR.find(faction => faction.name === factionNames.EMPIRE);
      const { units } = empireWoCR;
      const unitWoCR = units.find(unit => unit.id === this.unit.id);
      assert.strictEqual(unitWoCR.faction, factionNames.EMPIRE);
    });
    it('should not mutate the server-side game.factions', () => {
      const { units } = this.game.factions.find(faction => {
        return faction.name === factionNames.EMPIRE;
      });
      assert.strictEqual(units[0].faction, this.empire);
    });
  });
});

