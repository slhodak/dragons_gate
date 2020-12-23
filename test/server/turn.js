const assert = require('assert');
const Turn = require(`${process.env.PWD}/server/game/turn`);
const { Faction, Empire, Protectors, Guardians } = require(`${process.env.PWD}/server/game/factions`);

describe('Turn', () => {
  before(() => {
    this.game = {
      factions: [
        new Faction(Empire),
        new Faction(Protectors),
        new Faction(Guardians),
      ]
    };
    this.turn = new Turn(this.game);
  });
  it('should know whose turn it is', () => {
    assert.strictEqual(this.turn.turnFaction, this.game.factions[0]);
  });
  it('should update the turn faction when the turn changes', () => {
    this.turn.next();
    assert.strictEqual(this.turn.turnFaction, this.game.factions[1]);
  });
});
