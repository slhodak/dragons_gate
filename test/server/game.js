const assert = require('assert');
const game = require(`${process.env.PWD}/server/game/game`);
const { EliteSoldier, Ryu } = require(`${process.env.PWD}/server/game/units`);
const { attackTypes, factionNames } = require(`${process.env.PWD}/lib/enums`);

describe('Game', () => {
  before(() => {
    this.game = game();
    this.empire = this.game.factions.find(faction => faction.name === factionNames.EMPIRE);
  });
  it('should have 3 factions', () => {
    assert(this.game.factions.length === 3);
  });
  describe('#attackerFactionHasNoMoves', () => {
    it('should return false when the faction has moves left', () => {
      const { combat } = this.game;
      combat.attacker = this.empire.units[0];
      assert.strictEqual(this.game.attackerFactionHasNoMoves(), false);
    });
    it('should return true when the faction has no moves left', () => {
      const { combat } = this.game;
      combat.attacker = this.empire.units[0];
      this.empire.units.forEach(unit => {
        Object.values(unit.attack).forEach(attack => {
          attack.count = 0;
        });
      });
      assert(this.game.attackerFactionHasNoMoves());
    });
  });
});

