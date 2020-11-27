const {
  EliteSoldier, FlagBearer,
  Yuma, Kusarigama, Daisho, Shuriken,
  Ryu, Yokai, Shinja
} = require('./units.js');

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
      this.units.push(new EliteSoldier());
    }
    this.units.push(new FlagBearer());
  }
}

class Protectors extends Faction {
  constructor() {
    super('Protectors');
    this.units.push(
      new Yuma(),
      new Kusarigama(),
      new Daisho(),
      new Shuriken()
    );
  }
}

class Guardians extends Faction {
  constructor() {
    super('Guardians');
    this.units.push(
      new Ryu(),
      new Yokai(),
      new Shinja()
    );
  }
}

module.exports = {
  Empire,
  Protectors,
  Guardians
};
