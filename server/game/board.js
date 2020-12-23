const chalk = require('chalk');
const { Unit } = require(`${process.env.PWD}/server/game/units`);

const boardDefaults = {
  dimensions: {
    height: 9,
    width: 9
  },
  unitLocations: {
    Guardians: {
      Ryu: [5,3],
      Yokai: [5,5],
      Shinja: [4,4]
    },
    Protectors: {
      Yuma: [0,8],
      Kusarigama: [0,7],
      Daisho: [1,7],
      Shuriken: [1,8]
    },
    Empire: {
      "Flag-Bearer": [0,0],
      "Elite Soldier": [[0,1],[0,2],[0,3],[1,0],[1,1],[1,2]]
    }
  }
};

module.exports = class Board {
  constructor(factions, initialBoard = true) {
    this.height = boardDefaults.dimensions.height; // Tied to unit default placement
    this.width = boardDefaults.dimensions.height;
    console.debug(chalk.cyan(`Creating board of height=${this.height} width=${this.width} initialBoard=${initialBoard}`));
    this.data = [];
    for (let i = 0; i < this.height; i++) {
      this.data.push(new Array(this.width));
    }
    // Place units on board
    if (initialBoard) {
      factions.forEach(faction => {
        this.addFaction(faction);
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
  // Place faction units at default locations
  addFaction(faction) {
    const { name, units } = faction;
    console.debug(chalk.cyan('Placing units from faction ') + chalk.yellow(name) + chalk.cyan(' at default locations'));
    const factionDefaultLocations = boardDefaults.unitLocations[name];
    for (let i = 0; i < units.length; i++ ) {
      console.debug(units[i].name);
      const coordinates = factionDefaultLocations[units[i].name];
      if (coordinates[0] instanceof Array) {
        const unitType = units[i].name;
        let j = 0;
        while(units[i].name === unitType) {
          this.addUnit(units[i], coordinates[j]);
          i++;
          j++;
        }
        i -= 1; // Go back one spot because while not true now
      } else {
        this.addUnit(units[i], coordinates);
      }
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
  // Remove circular references on units
  // See Unit#withoutCircularReference
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
