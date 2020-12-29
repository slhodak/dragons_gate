const chalk = require('chalk');

module.exports = class Combat {
  constructor(game, object) {
    this.game = game;
    if(object) {
      console.debug(chalk.cyan('Instantiating Combat from POO'));
      for (const [key, value] of Object.entries(object)) {
        if (value && value.id) {
          this[key] = this.game.getUnitById(value.id);
        } else {
          this[key] = null;
        }
      }
      this.attackType = object.attackType;
    } else {
      console.debug(chalk.cyan('Instantiating new Combat'));
      this.reset();
    }
  }

  reset() {
    this.attacker = null;
    this.defender = null;
    this.attackType = null;
  }
  setAttacker(unitId, attackType) {
    this.attacker = this.game.getUnitById(unitId);
    this.attackType = attackType;
  }
  setDefender(unitId) {
    this.defender = this.game.getUnitById(unitId);
  }
  // Alter defender's HP and status with some randomness
  doCombat() {
    const { attacker, defender, attackType } = this;
    const damage = attacker.getDamageFor(attackType);
    console.debug(chalk.yellow(`${attacker.name} (id:${attacker.id}) rolled ${damage} ${attackType} damage`));
    const defense = defender.rollDefenseArmor();
    console.debug(chalk.yellow(`${defender.name} (id:${defender.id}) rolled ${defense} defense`));
    const loss = damage - defense;
    defender.reduceHP(loss);
    console.debug(chalk.yellow(`${attacker.name} did ${loss} damage to ${defender.name} with a ${attackType} attack`));
    if (defender.isAlive()) {
      const effect = attacker.getEffectFor(attackType);
      if (effect) {
        const affected = defender.applyEffect(effect);
        console.debug(chalk.red(`${defender.name} is ${affected ? `now ${effect}` : `still ${effect}`}`));
      }
    }
    attacker.depleteSteps(null);
  }
  // Remove circular references to factions within units
  withoutCircularReference() {
    const { attacker, defender, attackType } = this;
    return {
      attacker: attacker ? attacker.withoutCircularReference() : null,
      defender: defender ? defender.withoutCircularReference() : null,
      attackType
    };
  }
}
