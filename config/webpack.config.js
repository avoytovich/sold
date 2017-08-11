const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/app.js',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['build'])
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve('./', 'build')
  }
};
