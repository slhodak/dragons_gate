const {
  EliteSoldier, FlagBearer,
  Yuma, Kusarigama, Daisho, Shuriken,
  Ryu, Yokai, Shinja
} = require('./units.js');
const { factionNames } = require(`${process.env.PWD}/lib/enums.js`);

class Faction {
  constructor(name) {
    this.units = [];
    this.name = name;
  }
  // return number of living units in the faction
  unitsAlive() {
    let alive = 0;
    this.units.forEach((unit) => {
      unit.isAlive ? alive += 1 : null;
    });
    return alive;
  }
  status() {
    // return a code indicating whether the faction is defeated, active, or otherwise
  }
}

class Empire extends Faction {
  constructor() {
    super('Empire');
    for (let i = 0; i < 6; i++) {
      this.units.push(new EliteSoldier(this));
    }
    this.units.push(new FlagBearer(this));
    this.name = factionNames.EMPIRE;
  }
}

class Protectors extends Faction {
  constructor() {
    super('Protectors');
    this.units.push(
      new Yuma(this),
      new Kusarigama(this),
      new Daisho(this),
      new Shuriken(this)
    );
    this.name = factionNames.PROTECTORS;
  }
}

class Guardians extends Faction {
  constructor() {
    super('Guardians');
    this.units.push(
      new Ryu(this),
      new Yokai(this),
      new Shinja(this)
    );
    this.name = factionNames.GUARDIANS;
  }
}

module.exports = {
  Faction,
  Empire,
  Protectors,
  Guardians
};
