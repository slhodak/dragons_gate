const port = 3456;
const path = require('path');
const express = require('express');
const app = express();
const game = require('./game/game.js')();
const bodyParser = require('body-parser');

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(bodyParser.json({ urlencoded: true }));

// Send game data from value in memory
app.get('/load', async (_req, res) => {
  res.send({
    factions: game.factions,
    turn: game.turn,
    combat: game.combat
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

app.post('/selectAttacker', (req, res) => {
  const { attacker, attackType } = req.body;
  if (attacker && attackType) {
    const attackerInstance = game.getUnitById(attacker.id);
    game.combat = {
      attacker: attackerInstance,
      attackType: attackType
    };
    res.status(200).send(game.combat);
  } else {
    res.status(400).send('Invalid request body; need attacker and attack type');
  }
});

app.post('/resetAttack', (_req, res) => {
  game.combat = {
    attacker: null,
    attackType: null
  };
  res.status(200).send(game.combat);
});

// Increment turn
app.post('/nextTurn', (_req, res) => {
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
  game.resetCombat();
  res.sendStatus(200);
});

app.listen(port, () => {
  console.debug(`Dragon's Gate server bound to port ${port}`);
});
