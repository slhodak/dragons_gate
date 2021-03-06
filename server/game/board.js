const chalk = require('chalk');
const { Unit } = require(`${process.env.PWD}/server/game/units`);
const { unitTypes } = require(`${process.env.PWD}/lib/enums`);

const boardDefaults = {
  dimensions: {
    height: 9,
    width: 9
  },
  unitLocations: {
    Guardians: {
      [unitTypes.RYU]: [5,3],
      [unitTypes.YOKAI]: [5,5],
      [unitTypes.SHINJA]: [4,4]
    },
    Protectors: {
      [unitTypes.YUMA]: [0,8],
      [unitTypes.KUSARIGAMA]: [0,7],
      [unitTypes.DAISHO]: [1,7],
      [unitTypes.SHURIKEN]: [1,8]
    },
    Empire: {
      [unitTypes.FLAG_BEARER]: [0,0],
      [unitTypes.ELITE_SOLDIER]: [[0,1],[0,2],[0,3],[1,0],[1,1],[1,2]]
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
  // Search board in outward clockwise spiral
  emptyCellFrom(coordinates, center) {
    let side = 0;
    // check central tiles in clockwise spiral from 4,3, return first empty cell
    while(true) {
      // Vector is magnitude & direction of current coordinates from center
      let vector = this.velocity(center, coordinates);
      let direction = this.clockwiseDirectionFromVector(vector);
      // Check all cells on a side for emptiness
      let distanceToCorner = this.distanceToCorner(vector);
      console.debug(`Searching for empty cell along side=${side} in direction=${direction} starting at vector=${vector} from center=${center} for distanceToCorner=${distanceToCorner}`);
      for (let i = 0; i < distanceToCorner + 1; i++) {
        console.debug(`Checking if coordinates=${coordinates} is empty`);
        if (!this.hasCellAt(coordinates)) {
          if (i < distanceToCorner) {
            this.moveInDirection(coordinates, direction);
          }
          continue;
        }
        if (this.isEmptyAt(coordinates)) {
          return coordinates;
        }
        // Don't move again at last cell on side
        if (i < distanceToCorner) {
          this.moveInDirection(coordinates, direction);
        }
      }
      side += 1;
      // every 4 sides, move one more tile
      if (side === 4) {
        // Move one more square
        this.moveInDirection(coordinates, direction);
        side = 0;
        if (Math.max(...vector.map(num => Math.abs(num))) > this.width) {
          return null;
        }
      }
    }
  }
  // Find magnitude and direction from A to B
  velocity(a, b) {
    return [ (b[0] - a[0]), (b[1] - a[1]) ];
  }
  // Find the correct direction to move based on which side of a spiral the given point is on
  clockwiseDirectionFromVector(vector) {
    if (Math.abs(vector[1]) > Math.abs(vector[0])) {
      if (vector[1] > 0) {
        // on top, go right
        return [1, 0];
      } else {
        // on bottom, go left
        return [-1, 0];
      }
    } else if (Math.abs(vector[0]) > Math.abs(vector[1])) {
      if (vector[0] > 0) {
        // on right, go down
        return [0, -1];
      } else {
        // on left, go up 
        return [0, 1];
      }
    } else if (vector[0] === vector[1]) {
      if (vector[0] > 0) {
        // top right, go down
        return [0, -1];
      } else {
        // bottom left, go up
        return [0, 1];
      }
    } else if (Math.abs(vector[0]) === Math.abs(vector[1])) {
      if (vector[0] > 0) {
        // bottom right, go left
        return [-1, 0];
      } else {
        // top left, go right
        return [1, 0];
      }
    }
  }
  // Provide vector from center point
  distanceToCorner(vector) {
    // When absolute values are equal
    if (Math.abs(vector[0]) === Math.abs(vector[1])) {
      return Math.abs(vector[0] * 2);
    }
    if (vector[0] === 0) {
      return Math.abs(vector[1]);
    }
    if (vector[1] === 0) {
      return Math.abs(vector[0]);
    }
    if (vector[0] > vector[1]) {
      return vector[0] - vector[1];
    }
    if (vector[1] > vector[0]) {
      return vector[1] - vector[0];
    }
  }
  // Move a coordinate pointer
  moveInDirection(coordinates, direction) {
    coordinates[0] += direction[0];
    coordinates[1] += direction[1];
  }
  // Rotate a 2d unit vector 90 degrees clockwise
  turnRight(_2DVector) {
    // flip and multiply the y value by -1
    const x = _2DVector[0];
    _2DVector[0] = _2DVector[1];
    _2DVector[1] = x === 0 ? 0 : x * -1;
  }
  hasCellAt(coordinates) {
    if (coordinates[0] < 0 ||
        coordinates[1] < 0 ||
        coordinates[0] >= this.width ||
        coordinates[1] >= this.height) {
      return false;
    } else {
      return true;
    }
  }
  isEmptyAt(coordinates) {
    const { data } = this;
    let cell = data[coordinates[0]][coordinates[1]];
    if (cell === null || cell === undefined) {
      return true;
    } else {
      return false;
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
