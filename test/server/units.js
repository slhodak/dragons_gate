const assert = require('assert');
const { Unit } = require(`${process.env.PWD}/server/game/units.js`);
const { attackTypes, unitStatuses, factionNames } = require(`${process.env.PWD}/lib/enums.js`);
const { Faction, Empire } = require(`${process.env.PWD}/server/game/factions.js`);

describe('Unit', () => {
  beforeEach(() => {
    let stats = {
        healthPoints: 10,
        speed: 5,
        attack: {
          melee: {
            range: 2,
            damage: [2, 4]
          },
          ranged: {
            range: 6,
            damage: [4, 4]
          }
        },
        defenseArmor: [2, 2],
        healthRegen: 1
    };
    this.unit = new Unit(stats);
  });
  describe('#isAlive', () => {
    it('should return true when the unit has HP left', () => {
      assert(this.unit.isAlive());
    });
    it('should return false when the unit has no HP left', () => {
      this.unit.healthPoints = 0;
      assert.strictEqual(this.unit.isAlive(), false);
    });
  });
  describe('#roll', () => {
    it('should return an integer', () => {
      let { melee } = this.unit.attack;
      let damage = this.unit.roll(melee.damage);
      assert.strictEqual(damage % 1, 0)
    });
    it('should return a valid roll value based on the input', () => {
      let { melee } = this.unit.attack;
      let maxDamage = melee.damage[0] * melee.damage[1];
      for (let i = 0; i < 1000; i++) {
        let damage = this.unit.roll(melee.damage);
        assert(damage > 0);
        assert(damage <= maxDamage)
      }
    });
  });
  describe('#applyEffect', () => {
    it('should change the unit status if the unit is healthy', () => {
      this.unit.applyEffect(unitStatuses.IMMOBILIZED);
      assert.strictEqual(this.unit.status, unitStatuses.IMMOBILIZED);
    });
    it('should change the unit status if the incoming effect is higher-ranking than the unit status', () => {
      this.unit.status = unitStatuses.POISONED;
      this.unit.applyEffect(unitStatuses.DAMNED);
      assert.strictEqual(this.unit.status, unitStatuses.DAMNED);
    });
    it('should not change the unit status if the incoming effect is lower-ranking than the unit status', () => {
      this.unit.status = unitStatuses.POISONED;
      this.unit.applyEffect(unitStatuses.IMMOBILIZED);
      assert.strictEqual(this.unit.status, unitStatuses.POISONED);
    });
  });
  describe('#beAffected', () => {
    it('should lose 1 HP per turn when poisoned', () => {
      this.unit.status = unitStatuses.POISONED;
      const { healthPoints } = this.unit;
      this.unit.beAffected();
      assert.strictEqual(this.unit.healthPoints, healthPoints - 1);
    });
    it('should die once affected 3 times when damned', () => {
      this.unit.status = unitStatuses.DAMNED;
      for (let i = 0; i < 3; i++) {
        this.unit.beAffected();
      }
      assert.strictEqual(this.unit.isAlive(), false);
    })
  });
  describe('#rollMeleeDamage', () => {
    it('should reduce remaining melee attacks by 1', () => {
      const startingAttacks = this.unit.attack.melee.count;
      this.unit.getDamageFor(attackTypes.MELEE);
      assert.strictEqual(this.unit.attack.melee.count, startingAttacks - 1);
    });
  });
  describe('#replenishAttacks', () => {
    it('should bring remaining attacks back to the unit maximum', () => {
      const startingAttacks = this.unit.attack.melee.count;
      this.unit.getDamageFor(attackTypes.MELEE);
      assert.strictEqual(this.unit.attack.melee.count, startingAttacks - 1);
      this.unit.replenishAttacks();
      assert.strictEqual(this.unit.attack.melee.count, startingAttacks);
    })
  });
  describe('#withoutCircularReference', () => {
    before(() => {
      this.empire = new Faction(Empire);
      this.imperialUnit = this.empire.units[0];
      this.unitWoCR = this.imperialUnit.withoutCircularReference();
    });
    it('should return an object', () => {
      assert(this.unitWoCR instanceof Object);
    });
    it('should not return a Unit', () => {
      assert.strictEqual(this.unitWoCR instanceof Unit, false);
    });
    it('should have the faction replaced with the faction name', () => {
      assert.strictEqual(this.unitWoCR.faction, factionNames.EMPIRE);
    });
    it('should not alter the faction reference in the original unit', () => {
      assert.strictEqual(this.imperialUnit.faction, this.empire);
    });
  });
});

describe('EliteSoldier', () => {
  beforeEach(() => {
    this.empire = new Faction(Empire);
    this.soldierIndex = 1;
    this.soldier = this.empire.units[this.soldierIndex];
  });
  describe('#die', () => {
    it("should increase its comrades' attack damage die sides by 2 when it dies", () => {
      const comrade = this.empire.units[this.soldierIndex + 1];
      const comradeDieSides = comrade.attack.melee.damage[1];
      this.soldier.die(this.game);
      assert.strictEqual(comrade.attack.melee.damage[1], comradeDieSides + 2);
    });
  });
});

describe('FlagBearer', () => {
  beforeEach(() => {
    this.empire = new Faction(Empire);
    this.flagBearer = this.empire.units.find(unit => unit.name === 'Flag-Bearer'); // no constant... oooh
  });
  describe('#die', () => {
    it("should decrease its comrades' attack damage die rolls by 1 when it dies", () => {
      const comrade = this.empire.units[0]; // no constant... oooh
      const comradeDieRolls = comrade.attack.melee.damage[0];
      this.flagBearer.die(this.game);
      assert.strictEqual(comrade.attack.melee.damage[0], comradeDieRolls - 1);
    });
  });
});
