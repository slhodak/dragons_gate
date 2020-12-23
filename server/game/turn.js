module.exports = class Turn {
  constructor(game, turn) {
    this.game = game;
    if (turn != undefined) {
      this.turn = turn;
    } else {
      this.turn = 0;
    }
  }
  get turnFaction() {
    return this.game.factions[this.turn];
  }
  // Give control of game to next player
  // Calculate turn-based effects
  // Ensure board reflects changes
  next() {
    const { combat, movement, board } = this.game;
    try {
      this.turn = (this.turn + 1) % 3;
      combat.reset();
      movement.resetMover();
      this.turnFaction.units.forEach((unit) => {
        if (unit.isAlive()) {
          unit.beAffected();
          unit.replenishAttacks();
          unit.replenishSteps();
        }
      });
      board.update(this.turnFaction.units);
      return 0;
    } catch (ex) {
      return ex;
    }
  }
}