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
  let newGame = game.factions;
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

app.post('/save', (_req, res) => {
  let saved = game.save();
  if (saved) {
    res.send(200);
  } else {
    res.status(400).send(`Error saving game: ${saved}`);
  }
});

app.post('/doCombat', (req, res) => {
  const { body } = req;
  const { attackerId, defenderId, type } = body;
  const attacker = game.getUnitById(attackerId);
  const defender = game.getUnitById(defenderId);
  game.doCombat(attacker, defender, type);
  // game.save(); // or leave this up to client to request
  res.sendStatus(200);
});

app.listen(port, () => {
  console.debug(`Dragon's Gate server bound to port ${port}`);
});
