const attackTypes = {
  RANGED: 'ranged',
  MELEE: 'melee'
};

const combatantTypes = {
  ATTACKER: 'attacker',
  DEFENDER: 'defender'
};

const unitTypes = {
  ELITE_SOLDIER: 'Elite Soldier',
  FLAG_BEARER: 'Flag-Bearer',
  YUMA: 'Yuma',
  DAISHO: 'Daisho',
  SHURIKEN: 'Shuriken',
  KUSARIGAMA: 'Kusarigama',
  RYU: 'Ryu',
  YOKAI: 'Yokai',
  SHINJA: 'Shinja'
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
  unitTypes,
  unitStatuses,
  statusHierarchy,
  factionNames
};
