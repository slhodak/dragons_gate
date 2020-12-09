const { attackTypes, unitStatuses, statusHierarchy } = require(`${process.env.PWD}/lib/enums.js`);

class Unit {
  constructor(stats, name, faction) {
    this.healthPoints = stats.healthPoints;
    this.steps = stats.steps;
    this.maxSteps = stats.steps;
    this.meleeAttacks = stats.meleeAttacks;
    this.maxMeleeAttacks = stats.meleeAttacks,
    this.meleeRange = stats.meleeRange;
    this.meleeDamage = stats.meleeDamage;
    this.meleeEffect = stats.meleeEffect;
    this.rangedAttacks = stats.rangedAttacks;
    this.maxRangedAttacks = stats.rangedAttacks,
    this.rangedRange = stats.rangedRange;
    this.rangedDamage = stats.rangedDamage;
    this.rangedEffect = stats.rangedEffect;
    this.defenseArmor = stats.defenseArmor;
    this.healthRegen = stats.healthRegen;
    this.status = unitStatuses.HEALTHY;
    this.damnedTurns = 0;
    this.name = name,
    this.faction = faction
    this.id = null; // Assigned at game initialization
  }
  isAlive() {
    return this.healthPoints > 0;
  }
  canMove() {
    return this.isAlive() && this.status != unitStatuses.IMMOBILIZED;
  }
  roll(rollsSides) {
    // parse rolls-d-sides string and calculate resulting damage
    let total = 0;
    for (let i = 0; i < rollsSides[0]; i++) {
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
    this.meleeAttacks -= 1;
    return this.roll(this.meleeDamage);
  }
  rollRangedDamage() {
    if (!this.rangedDamage) { return; }
    this.rangedAttacks -= 1;
    return this.roll(this.rangedDamage);
  }
  rollDefenseArmor() {
    return this.roll(this.defenseArmor);
  }
  reduceHP(damage) {
    // this could be checked before this point
    if (damage < 0) { return; }
    this.healthPoints -= damage;
    if (this.healthPoints <= 0) {
      this.healthPoints = 0;
      this.die();
    }
  }
  // Return effect if roll succeeds
  getEffectFor(attackType) {
    if (attackType === attackTypes.MELEE) {
      if (!this.meleeEffect) { return; }
      var { roll, success, effect } = this.meleeEffect;
    } else if (attackType === attackTypes.RANGED) {
      if (!this.rangedEffect) { return; }
      var { roll, success, effect } = this.rangedEffect;
    }
    const rollResult = this.roll(roll);
    return success.includes(rollResult) ? effect : null;
  }
  // Some effects can override others, some cannot
  // Maybe multiple statuses should be possible
  applyEffect(effect) {
    const effectIndex = statusHierarchy.indexOf(effect);
    const statusIndex = statusHierarchy.indexOf(this.status);
    if (effectIndex > statusIndex) {
      this.status = effect;
      return true;
    }
    return false;
  }
  beAffected() {
    let effect;
    if (this.status === unitStatuses.HEALTHY) {
      return;
    } else if (this.status === unitStatuses.IMMOBILIZED) {
      effect = unitStatuses.IMMOBILIZED;
      if (this.roll([1, 6]) > 2) {
        this.status = unitStatuses.HEALTHY;
      }
    } else if (this.status === unitStatuses.POISONED) {
      effect = unitStatuses.POISONED;
      if (this.roll([1, 6]) > 0) {
        this.reduceHP(1);
      }
    } else if (this.status === unitStatuses.DAMNED) {
      effect = unitStatuses.DAMNED;
      this.damnedTurns += 1;
      if (this.damnedTurns === 3) {
        this.healthPoints = 0;
        this.die();
      }
    }
    if (effect) console.debug(`${this.name} (id:${this.id}) suffered from being ${effect}`);
  }
  replenishAttacks() {
    if (this.meleeDamage) {
      this.meleeAttacks = this.maxMeleeAttacks || 1;
    }
    if (this.rangedDamage) {
      this.rangedAttacks = this.maxRangedAttacks || 1;
    }
  }
  hasAttacksLeft() {
    if (this.meleeDamage) {
      return this.meleeAttacks > 0;
    } else if (this.rangedDamage) {
      return this.rangedAttacks > 0;
    }
  }
  replenishSteps() {
    this.steps = this.maxSteps;
  }
  die() {
    this.status = unitStatuses.DECEASED;
    console.debug(`${this.name} (id:${this.id}) died`);
  }
}

class EliteSoldier extends Unit {
  constructor(faction) {
    super({
      healthPoints: 30,
      steps: 3,
      meleeAttacks: 1,
      meleeRange: 2,
      meleeDamage: [4, 4],
      defenseArmor: [2, 4],
      healthRegen: 2
    }, 'Elite Soldier', faction);
  }
  die() {
    this.faction.units.forEach(unit => {
      if (unit != this && unit.isAlive()) {
        unit.meleeDamage[1] += 2;
      }
    });
    Unit.prototype.die.call(this);
  }
}

class FlagBearer extends Unit {
  constructor(faction) {
    super({
      healthPoints: 35,
      steps: 2,
      meleeAttacks: 1,
      meleeRange: 1,
      meleeDamage: [3, 4],
      defenseArmor: [2, 4],
      healthRegen: 3
    }, 'Flag-Bearer', faction);
  }
  die() {
    this.faction.units.forEach(unit => {
      if (unit != this && unit.isAlive()) {
        unit.meleeDamage[0] -= 1;
      }
    });
    Unit.prototype.die.call(this);
  }
}

class Yuma extends Unit {
  constructor(faction) {
    super({
      healthPoints: 50,
      steps: 3,
      meleeAttacks: 1,
      meleeRange: 2,
      meleeDamage: [4, 6],
      defenseArmor: [3, 6],
      healthRegen: 5
    }, 'Yuma', faction);
  }
}

class Kusarigama extends Unit {
  constructor(faction) {
    super({
      healthPoints: 50,
      steps: 3,
      meleeAttacks: 1,
      meleeRange: 3,
      meleeDamage: [4, 6],
      meleeEffect: {
        roll: [1, 6],
        success: [4, 5, 6],
        effect: unitStatuses.IMMOBILIZED
      },
      defenseArmor: [3, 4],
      healthRegen: 5
    }, 'Kusarigama', faction);
  }
}

class Daisho extends Unit {
  constructor(faction) {
    super({
      healthPoints: 50,
      steps: 3,
      meleeAttacks: 2,
      meleeRange: 2,
      meleeDamage: [4, 6],
      defenseArmor: [2, 4],
      healthRegen: 5
    }, 'Daisho', faction);
  }
}

class Shuriken extends Unit {
  constructor(faction) {
    super({
      healthPoints: 50,
      steps: 4,
      meleeAttacks: 1,
      meleeRange: 2,
      meleeDamage: [4, 6],
      rangedAttacks: 2,
      rangedRange: 10,
      rangedDamage: [6, 4],
      rangedEffect: {
        roll: [1, 6],
        success: [5, 6],
        effect: unitStatuses.POISONED
      },
      defenseArmor: [3, 4],
      healthRegen: 5,
    }, 'Shuriken', faction);
  }
  // -1 roll per 2cm distance
  rollRangedDamage(distance = 10) {
    const rangedRoll = [
      this.rangedDamage[0] - Math.ceil(distance / 2),
      this.rangedDamage[1]
    ];
    const damage = this.roll(rangedRoll);
    this.rangedAttacks -= 1;
    return damage;
  }
}

class Ryu extends Unit {
  constructor(faction) {
    super({
      healthPoints: 100,
      steps: 0,
      meleeAttacks: 1,
      meleeRange: 3,
      meleeDamage: [5, 4],
      rangedAttacks: 1,
      rangedRange: Infinity,
      rangedDamage: [4, 4],
      defenseArmor: [4, 4],
      healthRegen: 5
    }, 'Ryu', faction);
  }
}

class Yokai extends Unit {
  constructor(faction) {
    super({
      healthPoints: 60,
      steps: 5,
      meleeAttacks: 1,
      meleeRange: 3,
      meleeDamage: [2, 10],
      meleeEffect: {
        roll: [2, 6],
        success: [7],
        effect: unitStatuses.DAMNED
      },
      defenseArmor: [3, 4],
      healthRegen: 2
    }, 'Yokai', faction);
  }
}

class Shinja extends Unit {
  constructor(faction) {
    super({
      healthPoints: 20,
      steps: 2,
      meleeAttacks: 1,
      meleeRange: 2,
      meleeDamage: [3, 6],
      defenseArmor: [4, 4],
      healthRegen: 0
    }, 'Shinja', faction);
    this.deaths = 2;
  }
}

module.exports = {
  Unit,
  EliteSoldier, FlagBearer,
  Yuma, Kusarigama, Daisho, Shuriken,
  Ryu, Yokai, Shinja
};
