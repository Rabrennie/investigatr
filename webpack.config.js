const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'investigatr.js',
    path: path.resolve(__dirname, 'dist')
  },
};