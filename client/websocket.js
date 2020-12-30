export default (game) => {
  const ws = new WebSocket(`ws://${process.env.HOST}:${process.env.PORT}`);
  ws.onopen = (e) => {
    ws.send(JSON.stringify({ readyState: JSON.stringify(e.target.readyState) }));
  }
  
  ws.onmessage = (e) => {
    try {
      const data = JSON.parse(e.data);
      if (data.game) {
        game.update(data.game);
      }
    } catch (err) {
      console.error(`Error receiving message: ${err}`);
    }
  }
}
