const ws = new WebSocket('ws://localhost:3456');

ws.onopen = (e) => {
  ws.send('Hi from the client');
}

ws.onmessage = (e) => {
  console.log(e.data);
}

export default ws;
