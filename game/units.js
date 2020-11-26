class Unit {
  constructor(stats) {
    this.stats = stats;
  }
  roll(rollsSides) {
    // parse rolls-d-sides string and calculate resulting damage
    let total = 0;
    for (let i = 0; i < rollsSides[0]; i++) {
      total += Math.ceil(Math.random() * rollsSides[1]);
    }
    return total;
  }
}

class EliteSoldier extends Unit {
  constructor() {
    let stats = {
      healthPoints: 30,
      speed: 3,
      meleeRange: 2,
      meleeDamage: [2, 4],
      defenseArmor: [2, 4],
      healthRegen: 2
    };
    super(stats);
  }
}

class FlagBearer extends Unit {
  constructor() {
    let stats = {
      healthPoints: 35,
      speed: 2,
      meleeRange: 1,
      meleeDamage: [2, 4],
      defenseArmor: [2, 4],
      healthRegen: 3
    };
    super(stats);
  }
}

class Yuma extends Unit {
  constructor() {
    let stats = { 
      healthPoints: 50,
      speed: 3,
      meleeRange: 2,
      meleeDamage: [4, 6],
      defenseArmor: [5, 6],
      healthRegen: 5
    }
    super(stats);
  }
  
}

class Kusarigama extends Unit {
  constructor() {
    let stats = { 
      healthPoints: 50,
      speed: 3,
      meleeRange: 3,
      meleeDamage: [4, 6],
      defenseArmor: [5, 5],
      healthRegen: 5
    }
    super(stats);
  }
  
}

class Daisho extends Unit {
  constructor() {
    let stats = { 
      healthPoints: 50,
      speed: 3,
      meleeRange: 2,
      meleeDamage: [4, 6],
      defenseArmor: [5, 5],
      healthRegen: 5
    }
    super(stats);
  }
  
}

class Shuriken extends Unit {
  constructor() {
    let stats = { 
      healthPoints: 50,
      speed: 4,
      meleeRange: 2,
      meleeDamage: [4, 6],
      rangedRange: 10,
      // -1 roll per 2cm distance
      // e.g. at 5cm, rangedDamage = [4, 4]
      rangedDamage: [6, 4],
      defenseArmor: [5, 5],
      healthRegen: 5
    }
    super(stats);

  }
  
}

class Ryu extends Unit {
  constructor() {
    let stats = { 
      healthPoints: 100,
      speed: 0,
      meleeRange: 3,
      meleeDamage: [10, 10],
      rangedRange: Infinity,
      rangedDamage: [4, 4],
      defenseArmor: [4, 4],
      healthRegen: 5
    }
    super(stats);
  }
  
}

class Yokai extends Unit {
  constructor() {
    let stats = { 
      healthPoints: 60,
      speed: 5,
      meleeRange: 3,
      meleeDamage: [2, 10],
      defenseArmor: [3, 4],
      healthRegen: 2
    }
    super(stats);
  }
  
}

class Shinja extends Unit {
  constructor() {
    let stats = { 
      healthPoints: 20,
      speed: 2,
      meleeRange: 2,
      meleeDamage: [3, 6],
      defenseArmor: [4, 4],
      healthRegen: 0
    }
    super(stats);
  }

}

module.exports = {
  Unit,
  EliteSoldier,
  FlagBearer,
  Yuma,
  Kusarigama,
  Daisho,
  Shuriken,
  Ryu,
  Yokai,
  Shinja
};
