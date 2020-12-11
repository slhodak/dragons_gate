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
  // For each unit, update cell data
  // Least efficient method so far, I think
  update(units) {
    units.forEach(unit => {
      loop1:
        for (let i = 0; i < this.height; i++) {
          for (let j = 0; j < this.width; j++) {
            if (this.data[i][j] && (unit.id === this.data[i][j].id)) {
              this.data[i][j] = unit;
              break loop1;
            }
          }
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
        this.data[row][i] = unit;
      });
    } else {
      faction.units.forEach((unit, i) => {
        this.data[i][column] = unit;
      });
    }
  }
  addUnit(unit, coordinates) {
    this.data[coordinates[0]][coordinates[1]] = unit;
  }
  removeUnit(unit) {
    const [x, y] = unit.coordinates;
    this.data[x][y] = null;
  }
}
