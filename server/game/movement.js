module.exports = class Movement {
  constructor(game, moverObject) {
    this.game = game;
    if (moverObject) {
      this.mover = this.game.getUnitById(moverObject.id);
    } else {
      this.mover = null;
    }
  }
  resetMover() {
    this.mover = null;
  }
  setMover(unitId) {
    const unit = this.game.getUnitById(unitId);
    this.mover = unit;
  }
  // Change coordinates of mover in board
  // Deplete steps of unit
  moveMoverTo(coordinates) {
    const stepsToTake = Movement.xyDistance(this.mover.coordinates, coordinates);
    this.game.board.moveUnit(this.mover, coordinates);
    this.mover.depleteSteps(stepsToTake);
    this.resetMover();
  }
  // Only return the mover unit when saving or sending to client
  forJson() {
    return this.mover ? this.mover.withoutCircularReference() : null;
  }
  static xyDistance(from, to) {
    // Stepwise including turns, not pythagorean
    const xDistance = Math.abs(from[0] - to[0]);
    const yDistance = Math.abs(from[1] - to[1]);
    return xDistance + yDistance;
  }
}
