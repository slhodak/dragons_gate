var path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/components/App.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.app.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
