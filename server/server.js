const port = 3456;
const path = require('path');
const express = require('express');
const app = express();
const game = require('./game/game.js')();
const bodyParser = require('body-parser');

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(bodyParser.json({ urlencoded: true }));
app.use('/explorer', express.static(path.resolve(__dirname, './explorer')));

// Send game data from value in memory
app.get('/load', async (_req, res) => {
  const { board, mover } = game;
  res.send({
    board: board.data,
    factions: game.factionsWithoutCircularReference(),
    turn: game.turn,
    mover: game.unitWithoutCircularReference(mover),
    combat: game.combatWithoutCircularReference()
  });
});

// Send game data from last save on disk
app.get('/loadSaved', async (_req, res) => {
  let loadedGame = await game.load();
  if (loadedGame) {
    res.send(loadedGame);
  } else {
    res.status(400).send(`Error saving game: ${loaded}`);
  }
});

// Save game to disk
app.post('/save', (_req, res) => {
  let saved = game.save();
  if (saved) {
    res.sendStatus(200);
  } else {
    res.status(400).send(`Error saving game: ${saved}`);
  }
});

app.post('/setMover', (req, res) => {
  try {
    const { mover, coordinates } = req.body;
    game.setMover(mover, coordinates);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/moveMoverTo', (req, res) => {
  try {
    const { coordinates } = req.body;
    game.moveMoverTo(coordinates);
    res.sendStatus(200);
  } catch (err) {
    console.error(`Error moving unit ${err}`);
    res.status(500).send(err);
  }
});

app.post('/selectAttacker', (req, res) => {
  const { attacker, attackType } = req.body;
  if (attacker && attackType) {
    game.setAttacker(attacker.id, attackType);
    res.sendStatus(200);
  } else {
    res.status(400).send('Invalid request body; need attacker and attack type');
  }
});

app.post('/resetAttack', (_req, res) => {
  game.resetCombat();
  res.sendStatus(200);
});

// Increment turn
app.get('/nextTurn', (_req, res) => {
  let err = game.nextTurn();
  if (err) {
    res.status(500).send(err);
  } else {
    res.sendStatus(200);
  }
});

app.post('/doCombat', (req, res) => {
  const { defender } = req.body;
  game.combat.defender = game.getUnitById(defender.id);
  game.doCombat();
  game.board.update([game.combat.attacker]);
  if (game.attackerFactionHasNoMoves()) {
    game.nextTurn();
  }
  game.resetCombat();
  res.sendStatus(200);
});

app.listen(port, () => {
  console.debug(`Dragon's Gate server bound to port ${port}`);
});
