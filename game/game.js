const { Empire, Protectors, Guardians } = require('./factions.js');

// Tracks the state of factions and their units
class Game {
  constructor() {
    this.factions = [new Empire(), new Protectors(), new Guardians()];
    
  }
}