class Unit {
  constructor(stats) {
    this.healthPoints = stats.healthPoints;
    this.speed = stats.speed;
    this.meleeRange = stats.meleeRange;
    this.meleeDamage = stats.meleeDamage;
    this.rangedRange = stats.rangedRange;
    this.rangedDamage = stats.rangedDamage;
    this.defenseArmor = stats.defenseArmor;
    this.healthRegen = stats.healthRegen;
  }
  roll(rollsSides) {
    // parse rolls-d-sides string and calculate resulting damage
    let total = 0;
    for (let i = 0; i < rollsSides[0]; i++) {
      total += Math.ceil(Math.random() * rollsSides[1]);
    }
    return total;
  }
  rollMeleeDamage() {
    return this.roll(this.meleeDamage);
  }
  rollRangedDamage() {
    if (!this.rangedDamage) {
      return;
    }
    return this.roll(this.rangedDamage);
  }
  rollDefenseArmor() {
    return this.roll(this.defenseArmor);
  }
  reduceHP(amount) {
    this.healthPoints -= amount;
  }
}

class EliteSoldier extends Unit {
  constructor() {
    super({
      healthPoints: 30,
      speed: 3,
      meleeRange: 2,
      meleeDamage: [2, 4],
      defenseArmor: [2, 4],
      healthRegen: 2
    });
  }
}

class FlagBearer extends Unit {
  constructor() {
    super({
      healthPoints: 35,
      speed: 2,
      meleeRange: 1,
      meleeDamage: [2, 4],
      defenseArmor: [2, 4],
      healthRegen: 3
    });
  }
}

class Yuma extends Unit {
  constructor() {
    super({ 
      healthPoints: 50,
      speed: 3,
      meleeRange: 2,
      meleeDamage: [4, 6],
      defenseArmor: [5, 6],
      healthRegen: 5
    });
  }
  
}

class Kusarigama extends Unit {
  constructor() {
    super({ 
      healthPoints: 50,
      speed: 3,
      meleeRange: 3,
      meleeDamage: [4, 6],
      defenseArmor: [5, 5],
      healthRegen: 5
    });
  }
  
}

class Daisho extends Unit {
  constructor() {
    super({ 
      healthPoints: 50,
      speed: 3,
      meleeRange: 2,
      meleeDamage: [4, 6],
      defenseArmor: [5, 5],
      healthRegen: 5
    });
  }
  
}

class Shuriken extends Unit {
  constructor() {
    super({ 
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
    });
  }
  
}

class Ryu extends Unit {
  constructor() {
    super({
      healthPoints: 100,
      speed: 0,
      meleeRange: 3,
      meleeDamage: [10, 10],
      rangedRange: Infinity,
      rangedDamage: [4, 4],
      defenseArmor: [4, 4],
      healthRegen: 5
    });
  }
  
}

class Yokai extends Unit {
  constructor() {
    super({ 
      healthPoints: 60,
      speed: 5,
      meleeRange: 3,
      meleeDamage: [2, 10],
      defenseArmor: [3, 4],
      healthRegen: 2
    });
  }
  
}

class Shinja extends Unit {
  constructor() {
    super({ 
      healthPoints: 20,
      speed: 2,
      meleeRange: 2,
      meleeDamage: [3, 6],
      defenseArmor: [4, 4],
      healthRegen: 0
    });
  }

}

module.exports = {
  Unit,
  EliteSoldier, FlagBearer,
  Yuma, Kusarigama, Daisho, Shuriken,
  Ryu, Yokai, Shinja
};
