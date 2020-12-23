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
  withoutCircularReference() {
    const { attacker, defender, attackType } = this;
    return {
      attacker: attacker ? attacker.withoutCircularReference() : null,
      defender: defender ? defender.withoutCircularReference() : null,
      attackType
    };
  }
}
