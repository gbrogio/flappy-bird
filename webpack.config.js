const path = require('path');

module.exports = {
  entry: ['./src/App.ts'],
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: `bundle.min.js`,
    path: path.resolve(__dirname, './public'),
  },
};
