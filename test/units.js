const assert = require('assert');
const {
  EliteSoldier,
  FlagBearer,
  Yuma,
  Kusarigama,
  Daisho,
  Shuriken,
  Ryu,
  Yokai,
  Shinja
} = require('../game/units.js');

describe('Unit', () => {
  describe('EliteSoldier', () => {
    before(() => {
      this.eliteSoldier = new EliteSoldier();
    });
    describe('#roll', () => {
      it('should return an integer', () => {
        let { attackDamage } = this.eliteSoldier.stats;
        let damage = this.eliteSoldier.roll(attackDamage);
        assert.equal(damage % 1, 0)
      });
      it('should return a valid roll value based on the input', () => {
        let { attackDamage } = this.eliteSoldier.stats;
        let maxDamage = attackDamage[0] * attackDamage[1];
        let damage = this.eliteSoldier.roll(attackDamage);
        assert(damage > 0);
        assert(damage < maxDamage)
      });
    });
  });
});
