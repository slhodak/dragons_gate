const express = require('express');
const app = express();
const path = require('path');
const port = 3456;

const game = require('../game/game.js')();
app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(port, () => {
  game.save();
  console.debug(`Dragon's Gate server bound to port ${port}`);
});
