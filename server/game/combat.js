const chalk = require('chalk');

module.exports = class Combat {
  constructor(object, game) {
    if(object && game) {
      console.debug(chalk.cyan('Instantiating Combat from POO'));
      const { attacker, defender, attackType } = object;
      this.attacker = game.getUnitById(attacker.id);
      this.attacker = game.getUnitById(defender.id);
      this.attackType = attackType;
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
  withoutCircularReference() {
    const { attacker, defender, attackType } = this;
    return {
      attacker: attacker ? attacker.withoutCircularReference() : null,
      defender: defender ? defender.withoutCircularReference() : null,
      attackType
    };
  }
  fromPOO(object) {
    const combat = { attackType: object.attackType };
    Object.entries(object).forEach((key, value) => {
      if (value.id) {
        combat[key] = game.getUnitById(value.id);
      }
    });
    return combat;
  }
}
