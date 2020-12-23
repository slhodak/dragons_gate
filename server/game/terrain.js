// Controls rules for movement on a tile
class Terrain {
  constructor(type) {
    this.rules = type.rules;
  }
}

const Gate = {
  rules: {
    // If a unit moves to this tile, their faction wins
    
  }
};

module.exports = {
  Terrain,
  Gate
};
