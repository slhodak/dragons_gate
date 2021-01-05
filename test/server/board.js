const assert = require('assert');
const Board = require(`${process.env.PWD}/server/game/board`);
const { Faction, Empire, Protectors, Guardians } = require(`${process.env.PWD}/server/game/factions`);
const { unitTypes } = require(`${process.env.PWD}/lib/enums`);

describe('Board', () => {
  beforeEach(() => {
    this.factions = [
      new Faction(Empire, {}),
      new Faction(Protectors, {}),
      new Faction(Guardians, {})
    ];
    this.board = new Board(this.factions);
  })
  describe('#constructor', () => {
    it('should place units on the board', () => {
      assert.strictEqual(this.board.data[5][3].name, unitTypes.RYU);
    });
  });
  describe('#velocity', () => {
    it('should calculate velocity from point A to point B', () => {
      const a = [0, 0];
      const b = [5, -12];
      const answer = [5, -12];
      assert.deepStrictEqual(this.board.velocity(a, b), answer);
    });
  });
  describe('#clockwiseDirectionFromVector', () => {
    it('should return "right" unit vector when input vector points to top side', () => {
      const centerVector = [5, 3];
      const bVec = [5, 5];
      const veloVector = this.board.velocity(centerVector, bVec);
      assert.deepStrictEqual(this.board.clockwiseDirectionFromVector(veloVector), [1, 0]);
    });
    it('should return "left" unit vector when input vector points to bottom side', () => {
      const centerVector = [5, 3];
      const bVec = [5, 1];
      const veloVector = this.board.velocity(centerVector, bVec);
      assert.deepStrictEqual(this.board.clockwiseDirectionFromVector(veloVector), [-1, 0]);
    });
    it('should return "down" unit vector when input vector points to top right corner', () => {
      const centerVector = [5, 3];
      const bVec = [7, 5];
      const veloVector = this.board.velocity(centerVector, bVec);
      assert.deepStrictEqual(this.board.clockwiseDirectionFromVector(veloVector), [0, -1]);
    });
    it('should return "right" unit vector when input vector points to top left corner', () => {
      const centerVector = [0, 0];
      const bVec = [-8, 8];
      const veloVector = this.board.velocity(centerVector, bVec);
      assert.deepStrictEqual(this.board.clockwiseDirectionFromVector(veloVector), [1, 0]);
    });
  });
  describe('#turnRight', () => {
    it('should turn [1, 0] into [0, -1]', () => {
      const direction = [1, 0];
      this.board.turnRight(direction);
      assert.deepStrictEqual(direction, [0, -1]); 
    });
    it('should turn [0, -1] into [-1, 0]', () => {
      const direction = [0, -1];
      this.board.turnRight(direction);
      assert.deepStrictEqual(direction, [-1, 0]);
    });
    it('should turn [-1, 0] into [0, 1]', () => {
      const direction = [-1, 0];
      this.board.turnRight(direction);
      assert.deepStrictEqual(direction, [0, 1]);
    });
    it('should turn [0, 1] into [1, 0]', () => {
      const direction = [0, 1];
      this.board.turnRight(direction);
      assert.deepStrictEqual(direction, [1, 0]);
    });
  });
  describe('#findEmptyCellFor', () => {
    it('should search the first side of the first ring for the appropriate distance', () => {

    });
  });
});
