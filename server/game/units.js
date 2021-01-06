const chalk = require('chalk');
const { attackTypes, unitTypes, unitStatuses, statusHierarchy } = require(`${process.env.PWD}/lib/enums`);

class Unit {
  constructor(stats, name, faction) {
    this.id = null; // Assigned at game initialization
    this.name = name,
    this.faction = faction
    this.status = unitStatuses.HEALTHY;
    if (stats) {
      this.healthPoints = stats.healthPoints;
      this.steps = stats.steps;
      this.maxSteps = stats.steps;
      this.attack = stats.attack;
      Object.values(this.attack).forEach(type => {
        if (type.count) {
          type.max = type.count;
        } else {
          type.max = 1;
          type.count = 1;
        }
      });
      this.defenseArmor = stats.defenseArmor;
      this.healthRegen = stats.healthRegen;
    }
    this.damnedTurns = 0;
  }
  isAlive() {
    return this.healthPoints > 0;
  }
  canMove() {
    return this.isAlive() && this.status != unitStatuses.IMMOBILIZED;
  }
  // any units in range: use bool to gray-out or show attack buttons
  anyUnitsInRange() {
    
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
    const attack = this.attack[attackType];
    attack.count -= 1;
    return this.roll(attack.damage);
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
    const attack = this.attack[attackType];
    if (!attack.effect) { return; }
    const { roll, success, effect } = attack.effect;
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
    Object.values(this.attack).forEach(type => {
      type.count = type.max;
    });
  }
  hasAttacksLeft() {
    const hasAttacksLeft = Object.values(this.attack).some(type => type.count > 0)
    if (hasAttacksLeft) {
      return true;
    }
    return false;
  }
  // TODO: Needs test
  depleteAttacks() {
    Object.values(this.attack).forEach(attack => {
      attack.count = 0;
    });
  }
  depleteSteps(steps) {
    if (steps) {
      console.debug(chalk.blue(`${this.name} took ${steps} steps`));
    }
    this.steps = 0;
  }
  replenishSteps() {
    this.steps = this.maxSteps;
  }
  // game reference needed in overridden die() methods
  die() {
    // TODO: Should reduce all attacks to 0?
    this.status = unitStatuses.DECEASED;
    this.depleteAttacks();
    this.depleteSteps();
    console.debug(`${this.name} (id:${this.id}) died`);
  }
  // replace circular reference to faction with faction name
  withoutCircularReference() {
    let unitCopy = Object.assign({}, this);
    unitCopy.faction = this.faction.name;
    return unitCopy;
  }
  // desperately needs a test
  static fromPOO(object, faction) {
    let unit = new Unit();
    for (const [key, value] of Object.entries(object)) {
      unit[key] = value;
    }
    unit.faction = faction;
    return unit;
  }
}

class EliteSoldier extends Unit {
  constructor(faction) {
    super({
      healthPoints: 30,
      steps: 10,
      attack: {
        melee: {
          range: 2,
          damage: [4, 4]
        }
      },
      defenseArmor: [2, 4],
      healthRegen: 2
    }, unitTypes.ELITE_SOLDIER, faction);
  }
  die() {
    this.faction.units.forEach(unit => {
      if (unit != this && unit.isAlive()) {
        unit.attack.melee.damage[1] += 2;
      }
    });
    Unit.prototype.die.call(this);
  }
}

class FlagBearer extends Unit {
  constructor(faction) {
    super({
      healthPoints: 35,
      steps: 1,
      attack: {
        melee: {
          range: 1,
          damage: [3, 4]
        }
      },
      defenseArmor: [2, 4],
      healthRegen: 3
    }, unitTypes.FLAG_BEARER, faction);
  }
  die() {
    this.faction.units.forEach(unit => {
      if (unit != this && unit.isAlive()) {
        unit.attack.melee.damage[0] -= 1;
      }
    });
    Unit.prototype.die.call(this);
  }
}

class Yuma extends Unit {
  constructor(faction) {
    super({
      healthPoints: 50,
      steps: 2,
      attack: {
        melee: {
          range: 2,
          damage: [4, 6]
        }
      },
      defenseArmor: [3, 6],
      healthRegen: 5
    }, unitTypes.YUMA, faction);
    this.movedThisTurn = false;
  }
  depleteSteps(steps) {
    // null steps means this was called by doCombat
    if (!steps) {
      return;
    }
    // Can this be done better with a closure?
    if (this.movedThisTurn) {
      return Unit.prototype.depleteSteps.call(this, steps);
    } else {
      console.debug(`${this.name} took ${steps} steps`);
      this.movedThisTurn = true;
    }
  }
  replenishSteps() {
    this.movedThisTurn = false;
    Unit.prototype.replenishSteps.call(this);
  }
}

class Kusarigama extends Unit {
  constructor(faction) {
    super({
      healthPoints: 50,
      steps: 1,
      attack: {
        melee: {
          range: 3,
          damage: [4, 6],
          effect: {
            roll: [1, 6],
            success: [4, 5, 6],
            effect: unitStatuses.IMMOBILIZED
          }
        }
      },
      defenseArmor: [3, 4],
      healthRegen: 5
    }, unitTypes.KUSARIGAMA, faction);
  }
}

class Daisho extends Unit {
  constructor(faction) {
    super({
      healthPoints: 50,
      steps: 1,
      attack: {
        melee: {
          range: 2,
          damage: [10, 6],
          count: 2
        }
      },
      defenseArmor: [2, 4],
      healthRegen: 5
    }, unitTypes.DAISHO, faction);
  }
}

class Shuriken extends Unit {
  constructor(faction) {
    super({
      healthPoints: 50,
      steps: 1,
      attack: {
        melee: {
          range: 1,
          damage: [4, 6],
        },
        ranged: {
          range: 5,
          damage: [6, 4],
          count: 2,
          effect: {
            roll: [1, 6],
            success: [5, 6],
            effect: unitStatuses.POISONED
          }
        }
      },
      defenseArmor: [3, 4],
      healthRegen: 5,
    }, unitTypes.SHURIKEN, faction);
  }
  // -1 roll per square distance
  // distance tracking tbd
  getDamageFor(attackType, distance = this.attack[attackTypes.RANGED].range) {
    if (attackType === attackTypes.MELEE) {
      return Unit.prototype.getDamageFor.call(this, attackType);
    }
    if (attackType === attackTypes.RANGED) {
      const { ranged } = this.attack;
      const rangedRoll = [
        ranged.damage[0] - distance,
        ranged.damage[1]
      ];
      const damage = Unit.prototype.roll.call(this, rangedRoll);
      ranged.count -= 1;
      return damage;
    } else {
      console.warn(`No attackType ${attackType} found for ${this.name}`);
    }
  }
}

class Ryu extends Unit {
  constructor(faction) {
    super({
      healthPoints: 100,
      steps: 1,
      attack: {
        melee: {
          range: 3,
          damage: [5, 4]
        },
        ranged: {
          range: 10,
          damage: [4, 4]
        }
      },
      defenseArmor: [4, 4],
      healthRegen: 5
    }, unitTypes.RYU, faction);
  }
}

class Yokai extends Unit {
  constructor(faction) {
    super({
      healthPoints: 60,
      steps: 2,
      attack: {
        melee: {
          range: 3,
          damage: [2, 10],
          effect: {
            roll: [2, 6],
            success: [7],
            effect: unitStatuses.DAMNED
          }
        }
      },
      defenseArmor: [3, 4],
      healthRegen: 2
    }, unitTypes.YOKAI, faction);
  }
}

class Shinja extends Unit {
  constructor(faction) {
    super({
      healthPoints: 20,
      steps: 1,
      attack: {
        melee: {
          range: 2,
          damage: [3, 6]
        }
      },
      defenseArmor: [4, 4],
      healthRegen: 0
    }, unitTypes.SHINJA, faction);
    this.deaths = 2;
  }
  // TODO: Needs test
  die() {
    // reduce deaths by one
    this.deaths -= 1;
    if (this.deaths === 0) {
      Unit.prototype.die.call(this);
    } else {
      // reduce steps and attacks (end turn)
      this.depleteAttacks();
      this.depleteSteps();
      this.status = unitStatuses.HEALTHY;
      this.healthPoints = 20;
      this.resetLocation();
    }
  }
  // move back to starting square
  resetLocation() {
    const { board } = this.faction.game;
    const coordinates = board.emptyCellFrom([4, 3], [5,4]);
    if (coordinates) {
      board.moveUnit(this, coordinates);
    } else {
      console.error(chalk.red('No space found to place dead Shinja'));
    }
  }
}

module.exports = {
  Unit,
  EliteSoldier, FlagBearer,
  Yuma, Kusarigama, Daisho, Shuriken,
  Ryu, Yokai, Shinja
};
