const express = require('express');
const app = express();
const path = require('path');
const port = 3456;

const game = require('../game/game.js')();
app.use(express.static(path.resolve(__dirname, '../public')));

app.post('save', (req, res) => {
  let saved = game.save();
  if (saved) {
    res.send(200);
  } else {
    res.status(400).send(`Error saving game: ${saved}`);
  }
  
});

app.listen(port, () => {
  game.save();
  console.debug(`Dragon's Gate server bound to port ${port}`);
});
