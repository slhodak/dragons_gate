const { attackTypes, unitStatuses } = require(`${process.env.PWD}/lib/enums.js`);

class Unit {
  constructor(stats, name) {
    this.healthPoints = stats.healthPoints;
    this.speed = stats.speed;
    this.meleeRange = stats.meleeRange;
    this.meleeDamage = stats.meleeDamage;
    this.meleeEffect = stats.meleeEffect;
    this.rangedRange = stats.rangedRange;
    this.rangedDamage = stats.rangedDamage;
    this.defenseArmor = stats.defenseArmor;
    this.healthRegen = stats.healthRegen;
    this.status = unitStatuses.HEALTHY;
    this.name = name
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
  reduceHP(damage) {
    this.healthPoints -= damage;
  }
  calculateEffect() {
    return null;
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
    }, 'Elite Soldier');
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
    }, 'Imperial Flag-Bearer');
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
    }, 'Yuma');
  }

}

class Kusarigama extends Unit {
  constructor() {
    super({
      healthPoints: 50,
      speed: 3,
      meleeRange: 3,
      meleeDamage: [4, 6],
      meleeEffect: {
        roll: [1, 6],
        success: [4, 5, 6],
        effect: unitStatuses.IMMOBILIZED
      },
      defenseArmor: [5, 5],
      healthRegen: 5
    }, 'Kusarigama');
  }
  calculateEffect(attackType) {
    if (attackType === attackTypes.MELEE) {
      const { roll, success } = this.meleeEffect;
      const rollResult = (this.roll(roll));
      return success.includes(rollResult) ? unitStatuses.IMMOBILIZED : null;
    }
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
    }, 'Daisho');
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
      defenseArmor: [3, 4],
      healthRegen: 5,
    }, 'Shuriken');
  }
  rollRangedDamage(distance) {
    let damage = this.roll(this.rangedDamage);
    damage -= Math.ceil(distance / 2);
  }
}

class Ryu extends Unit {
  constructor() {
    super({
      healthPoints: 100,
      speed: 0,
      meleeRange: 3,
      meleeDamage: [5, 4],
      rangedRange: Infinity,
      rangedDamage: [4, 4],
      defenseArmor: [4, 4],
      healthRegen: 5
    }, 'Ryu');
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
    }, 'Yokai');
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
    }, 'Shinja');
  }
}

module.exports = {
  Unit,
  EliteSoldier, FlagBearer,
  Yuma, Kusarigama, Daisho, Shuriken,
  Ryu, Yokai, Shinja
};
