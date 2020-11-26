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
});

describe('Protectors', () => {
  before(() => {
    let protectors = new Protectors();
    this.yumaCount = 0;
    this.kusarigamaCount = 0;
    this.daishoCount = 0;
    this.shurikenCount = 0;
    protectors.units.forEach((unit)=> {
      if (unit instanceof Yuma) {
        this.yumaCount += 1;
      } else if (unit instanceof Kusarigama) {
        this.kusarigamaCount += 1;
      } else if (unit instanceof Daisho) {
        this.daishoCount += 1;
      } else if (unit instanceof Shuriken) {
        this.shurikenCount += 1;
      }
    });
  });
  it('should include one Yuma', () => {
    assert.equal(this.yumaCount, 1);
  });
  it('should include one Kusarigama unit', () => {
    assert.equal(this.kusarigamaCount, 1);
  });
  it('should include one Daisho unit', () => {
    assert.equal(this.daishoCount, 1);
  });
  it('should include one Shuriken unit', () => {
    assert.equal(this.shurikenCount, 1);
  });
});