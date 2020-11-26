const express = require('express');
const app = express();
const path = require('path');
const port = 3456;

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(port, () => {
  `Dragon's Gate server bound to port ${port}`;
});
