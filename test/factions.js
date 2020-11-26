const assert = require('assert');
const { Empire, Protectors, Guardians } = require('../game/factions.js');
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

describe('Empire', () => {
  before(() => {
    this.empire = new Empire();
  })
  it('should have 7 units', () => {
    assert.equal(this.empire.units.length, 7);
  })
  it('should have 6 elite soldiers', () => {
    let eliteSoldiers = 0;
    this.empire.units.forEach((unit) => {
      if (unit instanceof EliteSoldier) {
        eliteSoldiers += 1;
      };
    });
    assert.equal(eliteSoldiers, 6);
  });
  it('should have 1 flag bearer', () => {
    let flagBearers = 0;
    this.empire.units.forEach((unit) => {
      if (unit instanceof FlagBearer) {
        flagBearers += 1;
      }
    });
    assert.equal(flagBearers, 1);
  });
})