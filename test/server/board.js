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
    it('should calculate velocity for single-unit distances between A and B', () => {
      const a = [2, 8];
      const b = [2, 9];
      const answer = [0, 1];
      assert.deepStrictEqual(this.board.velocity(a, b), answer);
    });
  });
  describe('#clockwiseDirectionFromVector', () => {
    it('should return "right" unit vector when input vector points to top left corner', () => {
      const centerVector = [0, 0];
      const bVec = [-8, 8];
      const veloVector = this.board.velocity(centerVector, bVec);
      assert.deepStrictEqual(this.board.clockwiseDirectionFromVector(veloVector), [1, 0]);
    });
    it('should return "right" unit vector when input vector points to top side', () => {
      const centerVector = [5, 4];
      const bVec = [5, 5];
      const veloVector = this.board.velocity(centerVector, bVec);
      assert.deepStrictEqual(this.board.clockwiseDirectionFromVector(veloVector), [1, 0]);
    });
    it('should return "right" unit vector when input vector points to top side and is off the board', () => {
      const centerVector = [2, 8];
      const bVec = [2, 9];
      const veloVector = this.board.velocity(centerVector, bVec);
      assert.deepStrictEqual(this.board.clockwiseDirectionFromVector(veloVector), [1, 0]);
    });
    it('should return "down" unit vector when input vector points to top right corner', () => {
      const centerVector = [3, 6];
      const bVec = [4, 7];
      const veloVector = this.board.velocity(centerVector, bVec);
      assert.deepStrictEqual(this.board.clockwiseDirectionFromVector(veloVector), [0, -1]);
    });
    it('should return "down" unit vector when input vector points to right side', () => {
      const centerVector = [3, 6];
      const bVec = [4, 6];
      const veloVector = this.board.velocity(centerVector, bVec);
      assert.deepStrictEqual(this.board.clockwiseDirectionFromVector(veloVector), [0, -1]);
    });
    it('should return "left" unit vector when input vector points to bottom right corner', () => {
      const centerVector = [5, 4];
      const bVec = [6, 3];
      const veloVector = this.board.velocity(centerVector, bVec);
      assert.deepStrictEqual(this.board.clockwiseDirectionFromVector(veloVector), [-1, 0]);
    });
    it('should return "left" unit vector when input vector points to bottom side', () => {
      const centerVector = [5, 4];
      const bVec = [5, 1];
      const veloVector = this.board.velocity(centerVector, bVec);
      assert.deepStrictEqual(this.board.clockwiseDirectionFromVector(veloVector), [-1, 0]);
    });
    it('should return "up" unit vector when input vector points to bottom left corner', () => {
      const centerVector = [5, 4];
      const bVec = [3, 2];
      const veloVector = this.board.velocity(centerVector, bVec);
      assert.deepStrictEqual(this.board.clockwiseDirectionFromVector(veloVector), [0, 1]);
    });
    it('should return "up" unit vector when input vector points to left side', () => {
      const centerVector = [5, 4];
      const bVec = [2, 3];
      const veloVector = this.board.velocity(centerVector, bVec);
      assert.deepStrictEqual(this.board.clockwiseDirectionFromVector(veloVector), [0, 1]);
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
  describe('#distanceToCorner', () => {
    it('should return the whole remaining side length when on a corner', () => {
      assert.strictEqual(this.board.distanceToCorner([-2, 2]), 4);
    });
    it('should return half the remaining side length minus 1 when on the vertical above 0', () => {
      assert.strictEqual(this.board.distanceToCorner([1, 0]), 1);
    });
  });
  describe('#findEmptyCellFor', () => {
    it('should return the starting point for an empty board', () => {
      this.board = new Board([]);
      assert.deepStrictEqual(this.board.emptyCellFrom([4, 4], [5, 4]), [4, 4]);
    });
    it('should return the next square to the right if given a non-empty starting point on the top side', () => {
      assert.strictEqual(this.board.isEmptyAt([1, 8]), false);
      assert.deepStrictEqual(this.board.emptyCellFrom([1, 8], [2, 6]), [2, 8]);
    });
    it('should return the next square up if given a non-empty starting point on the left side', () => {
      assert.strictEqual(this.board.isEmptyAt([5, 5]), false);
      assert.deepStrictEqual(this.board.emptyCellFrom([5, 5], [6, 5]), [5, 6]);
    });
    it('should turn right at the top left corner to search the top side if searching non-empty cells up the left side', () => {
      assert.strictEqual(this.board.isEmptyAt([1, 0]), false);
      assert.strictEqual(this.board.isEmptyAt([1, 1]), false);
      assert.strictEqual(this.board.isEmptyAt([1, 2]), false);
      assert.deepStrictEqual(this.board.emptyCellFrom([1, 0], [3, 0]), [2, 2]);
    });
    it('should return the first empty square to the right if searching non-empty cells on the top side', () => {
      assert.strictEqual(this.board.isEmptyAt([0, 7]), false);
      assert.strictEqual(this.board.isEmptyAt([1, 7]), false);
      assert.deepStrictEqual(this.board.emptyCellFrom([0, 7], [1, 6]), [2, 7]);
    });
    it('should return the next real square if searching a ring that goes off the board', () => {
      assert.strictEqual(this.board.isEmptyAt([1, 8]), false);
      assert.deepStrictEqual(this.board.emptyCellFrom([1, 8], [2, 8]), [3, 8]);
    });
    it('should return the next real square in a large ring if searching a ring that goes off the board', () => {
      assert.strictEqual(this.board.isEmptyAt([0, 7]), false);
      assert.strictEqual(this.board.isEmptyAt([0, 8]), false);
      assert.deepStrictEqual(this.board.emptyCellFrom([0, 7], [3, 7]), [6, 8]);
    });
  });
});
