const port = 3456;
const path = require('path');
const express = require('express');
const app = express();
const game = require('./game/game.js')();
const bodyParser = require('body-parser');

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(bodyParser.json({ urlencoded: true }));

// Send game data from value in memory
app.get('/start', async (_req, res) => {
  let newGame = {
    factions: game.factions,
    turn: game.turn
  };
  res.send(newGame);
});

// Send game data from last save on disk
app.get('/load', async (_req, res) => {
  let loaded = await game.load();
  if (loaded) {
    res.send(loaded);
  } else {
    res.status(400).send(`Error saving game: ${loaded}`);
  }
});

app.post('/selectAttacker', (req, res) => {
  const { attacker, attackType } = req.body;
  console.log(attacker);
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

app.post('/save', (_req, res) => {
  let saved = game.save();
  if (saved) {
    res.sendStatus(200);
  } else {
    res.status(400).send(`Error saving game: ${saved}`);
  }
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
  const { body } = req;
  const { attackerId, defenderId, attackType } = body;
  const attacker = game.getUnitById(attackerId);
  const defender = game.getUnitById(defenderId);
  game.doCombat(attacker, defender, attackType);
  // game.save(); // or leave this up to client to request
  res.sendStatus(200);
});

app.listen(port, () => {
  console.debug(`Dragon's Gate server bound to port ${port}`);
});
