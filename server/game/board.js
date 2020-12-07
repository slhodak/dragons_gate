class Board {
  constructor(height, width) {
    this.data = [];
    for (let i = 0; i < height; i++) {
      this.data.push(new Array(width));
    }
  }
}

module.exports = (height, width) => new Board(height, width);
