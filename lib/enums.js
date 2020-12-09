const attackTypes = {
  RANGED: 'ranged',
  MELEE: 'melee'
};

const combatantTypes = {
  ATTACKER: 'attacker',
  DEFENDER: 'defender'
};

const unitStatuses = {
  HEALTHY: 'healthy',
  IMMOBILIZED: 'immobilized',
  POISONED: 'poisoned',
  DAMNED: 'damned',
  DECEASED: 'deceased'
};

const statusHierarchy = [
  unitStatuses.HEALTHY,
  unitStatuses.IMMOBILIZED,
  unitStatuses.POISONED,
  unitStatuses.DAMNED
];

const factionNames = {
  EMPIRE: 'Empire',
  PROTECTORS: 'Protectors',
  GUARDIANS: 'Guardians'
};

module.exports = {
  attackTypes,
  combatantTypes,
  unitStatuses,
  statusHierarchy,
  factionNames
};
