const { createPortal } = require("react-dom");

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
    let row, column;

    if (side === boardSides.TOP) {
      row = 0;
    } else if (side === boardSides.BOTTOM) {
      row = this.height - 1;
    } else if (side === boardSides.LEFT) {
      column = 0;
    } else if (side === boardSides.RIGHT) {
      column = this.width - 1;
    }

    if (row != null) {
      faction.units.forEach((unit, i) => {
        this.data[row][i] = this.cellDataFor(unit);
      });
    } else {
      faction.units.forEach((unit, i) => {
        this.data[i][column] = this.cellDataFor(unit);
      });
    }
  }
  cellDataFor(unit) {
    return {
      id: unit.id,
      name: unit.name,
      faction: unit.faction.name
    }
  }
}
