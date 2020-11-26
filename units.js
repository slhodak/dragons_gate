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
      range: 2,
      attackDamage: [2, 4],
      defenseArmor: [2, 4],
      healthRegen: 2
    };
    super(stats);
  }
}

class FlagBearer extends Unit {
  constructor() {
    let stats = {
      healthPoints: 40,
      speed: 2,
      range: 1,
      attackDamage: [2, 4],
      defenseArmor: [2, 4],
      healthRegen: 3
    };
    super(stats);
  }
}

class Yuma extends Unit {
  constructor() {
    super();
  
  }
  
}

class Kusarigama extends Unit {
  constructor(healthPoints, speed, range, attackDamage, defenseArmor, healthRegen) {
    super(healthPoints, speed, range, attackDamage, defenseArmor, healthRegen);
  
  }
  
}

class Daisho extends Unit {
  constructor(healthPoints, speed, range, attackDamage, defenseArmor, healthRegen) {
    super(healthPoints, speed, range, attackDamage, defenseArmor, healthRegen);
  
  }
  
}

class Shuriken extends Unit {
  constructor(healthPoints, speed, range, attackDamage, defenseArmor, healthRegen) {
    super(healthPoints, speed, range, attackDamage, defenseArmor, healthRegen);
  
  }
  
}

class Ryu extends Unit {
  constructor(healthPoints, speed, range, attackDamage, defenseArmor, healthRegen) {
    super(healthPoints, speed, range, attackDamage, defenseArmor, healthRegen);
  
  }
  
}

class Yokai extends Unit {
  constructor(healthPoints, speed, range, attackDamage, defenseArmor, healthRegen) {
    super(healthPoints, speed, range, attackDamage, defenseArmor, healthRegen);
  
  }
  
}

class Shinja extends Unit {
  constructor(healthPoints, speed, range, attackDamage, defenseArmor, healthRegen) {
    super(healthPoints, speed, range, attackDamage, defenseArmor, healthRegen);
  
  }

}

module.exports = {
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
