const assert = require('assert');
const { factionNames } = require('../../lib/enums');
const { Empire, Protectors, Guardians } = require(`${process.env.PWD}/server/game/factions.js`);
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
} = require(`${process.env.PWD}/server/game/units.js`);

describe('Empire', () => {
  before(() => {
    this.empire = new Empire();
  })
  it('should have 7 units', () => {
    assert.strictEqual(this.empire.units.length, 7);
  })
  it('should have 6 elite soldiers', () => {
    let eliteSoldiers = 0;
    this.empire.units.forEach((unit) => {
      if (unit instanceof EliteSoldier) {
        eliteSoldiers += 1;
      };
    });
    assert.strictEqual(eliteSoldiers, 6);
  });
  it('should have 1 flag bearer', () => {
    let flagBearers = 0;
    this.empire.units.forEach((unit) => {
      if (unit instanceof FlagBearer) {
        flagBearers += 1;
      }
    });
    assert.strictEqual(flagBearers, 1);
  });
  it('should contain its name', () => {
    assert.strictEqual(this.empire.name, factionNames.EMPIRE);
  });
});

describe('Protectors', () => {
  before(() => {
    this.protectors = new Protectors();
    this.yumaCount = 0;
    this.kusarigamaCount = 0;
    this.daishoCount = 0;
    this.shurikenCount = 0;
    this.protectors.units.forEach((unit)=> {
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
    assert.strictEqual(this.yumaCount, 1);
  });
  it('should include one Kusarigama unit', () => {
    assert.strictEqual(this.kusarigamaCount, 1);
  });
  it('should include one Daisho unit', () => {
    assert.strictEqual(this.daishoCount, 1);
  });
  it('should include one Shuriken unit', () => {
    assert.strictEqual(this.shurikenCount, 1);
  });
  it('should contain its name', () => {
    assert.strictEqual(this.protectors.name, factionNames.PROTECTORS);
  });
});

describe('Guardians', () => {
  before(() => {
    this.guardians = new Guardians();
    const { units } = this.guardians;
    this.ryuCount = 0;
    this.yokaiCount = 0;
    this.shinjaCount = 0;
    units.forEach((unit)=> {
      if (unit instanceof Ryu) {
        this.ryuCount += 1;
      } else if (unit instanceof Yokai) {
        this.yokaiCount += 1;
      } else if (unit instanceof Shinja) {
        this.shinjaCount += 1;
      }
    });
  });
  it('should have 3 units', () => {
    const { units } = this.guardians;
    assert.strictEqual(units.length, 3);
  });
  it('should have one Ryu', () => {
    assert.strictEqual(this.ryuCount, 1);
  });
  it('should have one Yokai', () => {
    assert.strictEqual(this.yokaiCount, 1);
  });
  it('should have one Shinja', () => {
    assert.strictEqual(this.shinjaCount, 1);
  });
  it('should contain its name', () => {
    assert.strictEqual(this.guardians.name, factionNames.GUARDIANS);
  });
});
