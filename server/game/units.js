const { attackTypes, unitStatuses, factions } = require(`${process.env.PWD}/lib/enums.js`);

class Unit {
  constructor(stats, name, faction) {
    this.healthPoints = stats.healthPoints;
    this.speed = stats.speed;
    this.meleeRange = stats.meleeRange;
    this.meleeDamage = stats.meleeDamage;
    this.meleeEffect = stats.meleeEffect;
    this.rangedRange = stats.rangedRange;
    this.rangedDamage = stats.rangedDamage;
    this.rangedEffect = stats.rangedEffect;
    this.defenseArmor = stats.defenseArmor;
    this.healthRegen = stats.healthRegen;
    this.status = unitStatuses.HEALTHY;
    this.damnedTurns = 0;
    this.name = name,
    this.faction = faction
  }
  isAlive() {
    return this.healthPoints < 0;
  }
  canMove() {
    return this.status != unitStatuses.IMMOBILIZED;
  }
  roll(rollsSides) {
    // parse rolls-d-sides string and calculate resulting damage
    let total = 0;
    for (let i = 0; i <= rollsSides[0]; i++) {
      total += Math.ceil(Math.random() * rollsSides[1]);
    }
    return total;
  }
  getDamageFor(attackType) {
    if (attackType === attackTypes.MELEE) {
      return this.rollMeleeDamage();
    } else if (attackType === attackTypes.RANGED) {
      return this.rollRangedDamage();
    }
  }
  rollMeleeDamage() {
    if (!this.meleeDamage) { return; }
    return this.roll(this.meleeDamage);
  }
  rollRangedDamage() {
    if (!this.rangedDamage) { return; }
    return this.roll(this.rangedDamage);
  }
  rollDefenseArmor() {
    return this.roll(this.defenseArmor);
  }
  reduceHP(damage) {
    if (damage < 0) { return; }
    this.healthPoints -= damage;
  }
  getEffectFor(attackType) {
    if (attackType === attackTypes.MELEE) {
      if (!this.meleeEffect) { return; }
      var { roll, success, effect } = this.meleeEffect;
    } else if (attackType === attackTypes.RANGED) {
      if (!this.rangedEffect) { return; }
      var { roll, success, effect } = this.rangedEffect;
    }
    const rollResult = (this.roll(roll));
    return success.includes(rollResult) ? effect : null;
  }
  beAffected() {
    if (this.status === unitStatuses.HEALTHY) {
      return;
    } else if (this.status === unitStatuses.IMMOBILIZED) {
      if (this.roll([1, 6]) > 2) {
        this.status = unitStatuses.HEALTHY;
      }
    } else if (this.status === unitStatuses.POISONED) {
      if (this.roll([1, 6]) > 0) {
        this.reduceHP(1);
      }
    } else if (this.status === unitStatuses.DAMNED) {
      this.damnedTurns += 1;
      if (this.damnedTurns === 3) {
        this.healthPoints = 0;
      }
    }
  }
}

class EliteSoldier extends Unit {
  constructor(faction) {
    super({
      healthPoints: 30,
      speed: 3,
      meleeRange: 2,
      meleeDamage: [2, 4],
      defenseArmor: [2, 4],
      healthRegen: 2
    }, 'Elite Soldier', factions.EMPIRE);
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
    }, 'Flag-Bearer', factions.EMPIRE);
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
    }, 'Yuma', factions.PROTECTORS);
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
    }, 'Kusarigama', factions.PROTECTORS);
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
    }, 'Daisho', factions.PROTECTORS);
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
      rangedEffect: {
        roll: [1, 6],
        success: [5, 6],
        effect: unitStatuses.POISONED
      },
      defenseArmor: [3, 4],
      healthRegen: 5,
    }, 'Shuriken', factions.PROTECTORS);
  }
  rollRangedDamage(distance = 10) {
    const rangedRoll = [
      this.rangedDamage[0] - Math.ceil(distance / 2),
      this.rangedDamage[1]
    ];
    const damage = this.roll(rangedRoll);
    return damage;
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
    }, 'Ryu', factions.GUARDIANS);
  }
}

class Yokai extends Unit {
  constructor() {
    super({
      healthPoints: 60,
      speed: 5,
      meleeRange: 3,
      meleeDamage: [2, 10],
      meleeEffect: {
        roll: [2, 6],
        success: [7],
        effect: unitStatuses.DAMNED
      },
      defenseArmor: [3, 4],
      healthRegen: 2
    }, 'Yokai', factions.GUARDIANS);
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
    }, 'Shinja', factions.GUARDIANS);
  }
}

module.exports = {
  Unit,
  EliteSoldier, FlagBearer,
  Yuma, Kusarigama, Daisho, Shuriken,
  Ryu, Yokai, Shinja
};
