const units = require('./units.js');

class Faction {
  this.units = [];
  constructor() {}
  // return number of living units in the faction (lose if 0)
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
    super();
    for (let i = 0; i < 6; i++) {
      this.units.push(new units.EliteSoldier());
    }
    this.units.push(new units.FlagBearer());
  }
}

class Protectors extends Faction {
  constructor() {
    super();
  }
}

class Guardians extends Faction {
  constructor() {
    super();
  }
}

module.exports = {
  Empire,
  Protectors,
  Guardians
};
