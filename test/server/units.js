const assert = require('assert');
const {
  Unit,
  EliteSoldier, FlagBearer,
  Yuma, Kusarigama, Daisho, Shuriken,
  Ryu, Yokai, Shinja
} = require(`${process.env.PWD}/server/game/units.js`);
const { attackTypes, unitStatuses } = require(`${process.env.PWD}/lib/enums.js`);

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
});
