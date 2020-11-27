// require('../config.js')();
const path = require('path');
process.env.PROJECT_ROOT = path.resolve(__dirname);
console.log("ROOT  " + process.env.PROJECT_ROOT);