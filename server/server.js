const port = 3456;
const path = require('path');
const express = require('express');
const app = express();
const game = require('../game/game.js')();

app.use(express.static(path.resolve(__dirname, '../public')));

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

app.listen(port, () => {
  console.debug(`Dragon's Gate server bound to port ${port}`);
});
