// Are these mocks? These are real factions
const { EliteSoldier } = require(`${process.env.PWD}/server/game/units.js`);
const { Empire, Protectors } = require(`${process.env.PWD}/server/game/factions.js`);

const mockEmpire = new Empire();
const mockProtectors = new Protectors();

module.exports = {
  mockEmpire,
  mockProtectors
};
