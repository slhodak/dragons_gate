const {
  EliteSoldier, FlagBearer,
  Yuma, Kusarigama, Daisho, Shuriken,
  Ryu, Yokai, Shinja
} = require('./units');
const { factionNames } = require(`${process.env.PWD}/lib/enums`);

class Faction {
  constructor(faction, game) {
    this.game = game;
    this.name = faction.name;
    this.units = [];
    faction.units.forEach(unit => {
      for (let i = 0; i < unit.count; i++) {
        this.units.push(new unit.clazz(this));
      }
    });
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
  // Replace faction reference on unit with faction name
  withoutCircularReference() {
    let factionCopy = Object.assign({}, this);
    delete factionCopy.game;
    const { units } = factionCopy;
    factionCopy.units = units.map(unit => unit.withoutCircularReference());
    return factionCopy;
  }
}

const Empire = {
  name: factionNames.EMPIRE,
  units: [
    {
      clazz: EliteSoldier,
      count: 6
    },
    {
      clazz: FlagBearer,
      count: 1
    },
  ]
};

const Protectors = {
  name: factionNames.PROTECTORS,
  units: [
    {
      clazz: Yuma,
      count: 1
    },
    {
      clazz: Kusarigama,
      count: 1
    },
    {
      clazz: Daisho,
      count: 1
    },
    {
      clazz: Shuriken,
      count: 1
    },
  ]
};

const Guardians = {
  name: factionNames.GUARDIANS,
  units: [
    {
      clazz: Ryu,
      count: 1
    },
    {
      clazz: Yokai,
      count: 1
    },
    {
      clazz: Shinja,
      count: 1
    },
  ]
};

module.exports = {
  Faction,
  Empire,
  Protectors,
  Guardians
};
