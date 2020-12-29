const path = require('path');
const chalk = require('chalk');
const express = require('express');
const http = require('http');

const PORT = 3456;
const app = express();
const server = http.createServer(app);

const game = require('./game/game')();
const bodyParser = require('body-parser');

/*
  WebSocket Server
*/

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.debug(chalk.yellowBright(`Initiated WebSocket connection`));
  ws.on('message', (message) => {
    try {
      const { readyState } = JSON.parse(message);
      console.debug(chalk.yellow(`Player readyState: ${readyState}`));
    } catch (err) {
      console.error(`Error receiving websocket message: ${err}`);
    }
  });
  ws.send(JSON.stringify({ game: game.withoutCircularReference() }));
});

wss.broadcastGameUpdate = () => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify({ game: game.withoutCircularReference() }));
  });
}

/*
  Express Server
*/

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(bodyParser.json({ urlencoded: true }));
app.use('/explorer', express.static(path.resolve(__dirname, './explorer')));

// Send game data from value in memory
app.get('/load', async (_req, res) => {
  try {
    res.send(game.withoutCircularReference());
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// Send game data from last save on disk
app.get('/loadSaved', async (_req, res) => {
  let loadedGame = await game.load();
  if (loadedGame.err) {
    console.error(`Error loading game: ${loadedGame.err}\nTrace:\n${loadedGame.err.stack}`);
    res.status(400).send({ message: `Error loading game: ${loadedGame.err}` });
  } else {
    console.debug(chalk.cyan('Loading game from persistent storage'));
    res.send(loadedGame.json);
  }
});

// Save game to disk
app.post('/save', async (_req, res) => {
  let saved = await game.save();
  if (saved) {
    console.debug(chalk.cyan('Saving game to persistent storage'));
    res.sendStatus(200);
  } else {
    res.status(400).send({ message: `Error saving game: ${saved}` });
  }
});

// Increment turn
app.get('/nextTurn', (_req, res) => {
  let err = game.turn.next();
  if (err) {
    wss.broadcastGameUpdate();
    res.status(500).send(err);
  } else {
    
    res.sendStatus(200);
  }
});

app.post('/setMover', (req, res) => {
  try {
    const { mover } = req.body;
    game.combat.reset();
    game.movement.setMover(mover);
    console.debug(chalk.cyan(`Setting mover id=${mover}`))
    wss.broadcastGameUpdate();
    res.sendStatus(200);
  } catch (err) {
    console.error(`Error setting mover: ${err.message}\nTrace:\n${err.stack}`);
    res.status(500).send({ message: err.message });
  }
});

app.post('/moveMoverTo', (req, res) => {
  try {
    const { coordinates } = req.body;
    game.moveMoverTo(coordinates);
    wss.broadcastGameUpdate();
    res.sendStatus(200);
  } catch (err) {
    console.error(`Error moving unit: ${err}`);
    res.status(500).send({ message: err });
  }
});

app.post('/selectAttacker', (req, res) => {
  try {
    const { attacker, attackType } = req.body;
    if (attacker && attackType) {
      game.setMover(null);
      game.combat.setAttacker(attacker.id, attackType);
      wss.broadcastGameUpdate();
      res.sendStatus(200);
    } else {
      res.status(400).send({ message: 'Invalid request body; need attacker and attack type' });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

app.post('/resetAttack', (_req, res) => {
  try {
    game.combat.reset();
    wss.broadcastGameUpdate();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

app.post('/doCombat', (req, res) => {
  try {
    const { defender } = req.body;
    game.combat.setDefender(defender.id);
    game.combat.doCombat();
    game.board.update([game.combat.attacker]);
    if (game.attackerFactionHasNoMoves()) {
      game.nextTurn();
    }
    game.resetCombat();
    wss.broadcastGameUpdate();
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
});

/*
  Start HTTP Server
*/

server.listen(PORT, () => {
  console.debug(chalk.yellowBright(`Dragon's Gate server available at to port ${server.address().port}`));
});
