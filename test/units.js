const assert = require('assert');
const units = require('../game/units.js');

describe('Unit', () => {
  describe('EliteSoldier', () => {
    before(() => {
      this.eliteSoldier = new units.EliteSoldier();
    });
    describe('#roll', () => {
      it('should return an integer', () => {
        let { attackDamage } = this.eliteSoldier.stats;
        let damage = this.eliteSoldier.roll(attackDamage);
        assert(damage % 1 == 0)
      });
      it('should return a valid roll value based on the input', () => {
        let { attackDamage } = this.eliteSoldier.stats;
        let maxDamage = attackDamage[0] * attackDamage[1];
        let damage = this.eliteSoldier.roll(attackDamage);
        assert(damage > 0 && damage < maxDamage);
      });
    });
  });
});
