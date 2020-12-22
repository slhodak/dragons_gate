const chalk = require('chalk');
const { factionNames } = require(`${process.env.PWD}/lib/enums`);
const { Unit } = require(`${process.env.PWD}/server/game/units`);

const boardSides = {
  TOP: 'top',
  RIGHT: 'right',
  LEFT: 'left',
  BOTTOM: 'bottom'
};

module.exports = class Board {
  constructor(height, width, factions, initialBoard = true) {
    console.debug(chalk.cyan(`Creating board of height=${height} width=${width} initialBoard=${initialBoard}`));
    this.height = height;
    this.width = width;
    this.data = [];
    for (let i = 0; i < height; i++) {
      this.data.push(new Array(width));
    }

    // Place faction units on separate walls
    if (initialBoard) {
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
    } else {
      factions.forEach(faction => {
        console.debug(chalk.cyan('Placing units from faction ') + chalk.yellow(faction.name));
        faction.units.forEach(unit => this.addUnit(unit, unit.coordinates));
      });
    }
  }
  // For each unit, update cell data
  // This is for combat, effects, step-replenishment, etc, but not movement
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
        this.addUnit(unit, [row, i]);
      });
    } else {
      faction.units.forEach((unit, i) => {
        this.addUnit(unit, [i, column]);
      });
    }
  }
  moveUnit(unit, coordinates) {
    this.removeUnit(unit.coordinates);
    this.addUnit(unit, coordinates);
  }
  addUnit(unit, coordinates) {
    console.debug(`Adding ${unit.name} to board at ${coordinates}`);
    this.data[coordinates[0]][coordinates[1]] = unit;
    unit.coordinates = coordinates;
  }
  removeUnit(coordinates) {
    this.data[coordinates[0]][coordinates[1]] = null;
  }
  withoutCircularReference() {
    return this.data.map(row => {
      return row.map(cell => {
        if (cell instanceof Unit) {
          return cell.withoutCircularReference();
        }
      });
    });
  }
}
