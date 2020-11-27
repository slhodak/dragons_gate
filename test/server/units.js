const assert = require('assert');
const {
  Unit,
  EliteSoldier, FlagBearer,
  Yuma, Kusarigama, Daisho, Shuriken,
  Ryu, Yokai, Shinja
} = require(`${process.env.PWD}/server/game/units.js`);

describe('Unit', () => {
  before(() => {
    let stats = {
        healthPoints: 10,
        speed: 5,
        range: 4,
        meleeDamage: [3, 4],
        rangedDamage: [2, 4],
        defenseArmor: [2, 2],
        healthRegen: 1
    };
    this.unit = new Unit(stats);
  });
  describe('#roll', () => {
    it('should return an integer', () => {
      let { meleeDamage } = this.unit;
      let damage = this.unit.roll(meleeDamage);
      assert.equal(damage % 1, 0)
    });
    it('should return a valid roll value based on the input', () => {
      let { meleeDamage } = this.unit;
      let maxDamage = meleeDamage[0] * meleeDamage[1];
      let damage = this.unit.roll(meleeDamage);
      assert(damage > 0);
      assert(damage <= maxDamage)
    });
  });
  describe('EliteSoldier', () => {
    before(() => {
      this.eliteSoldier = new EliteSoldier();
    });
    
  });
});
