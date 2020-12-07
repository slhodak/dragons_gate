const e = require("express");

const { factionNames } = require(`${process.env.PWD}/lib/enums.js`);

const boardSides = {
  TOP: 'top',
  RIGHT: 'right',
  LEFT: 'left',
  BOTTOM: 'bottom'
};

module.exports = class Board {
  constructor(height, width, factions) {
    this.height = height;
    this.width = width;
    this.data = [];
    for (let i = 0; i < height; i++) {
      this.data.push(new Array(width));
    }

    // Place faction units on separate walls
    factions.forEach(faction => {
      // Guardians at top
      if (faction.name === factionNames.GUARDIANS) {
        this.addUnitsTo(boardSides.TOP, faction);
      } else if (faction.name === factionNames.PROTECTORS) {
        this.addUnitsTo(boardSides.RIGHT, faction);
      } else if (faction.name === factionNames.EMPIRE) {
        this.addUnitsTo(boardSides.BOTTOM, faction);
      }
    });
  }
  addUnitsTo(side, faction) {
    if (side === boardSides.BOTTOM) {
      for (let i = 0; i < faction.units.length; i++) {
        this.data[this.height - 1][i] = faction.units[i].name;
      }
    } else if (side === boardSides.TOP) {
      for (let i = 0; i < faction.units.length; i++) {
        this.data[0][i] = faction.units[i].name;
      }
    }
    
    if (side === boardSides.LEFT) {
      for (let i = 0; i < faction.units.length; i++) {
        this.data[i][0] = faction.units[i].name;
      }
    } else if (side === boardSides.RIGHT) {
      for (let i = 0; i < faction.units.length; i++) {
        this.data[i][this.width - 1] = faction.units[i].name;
      }
    }
  }
}
