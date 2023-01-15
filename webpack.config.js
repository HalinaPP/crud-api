const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['./src/server.ts'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
  target: 'node',
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.ts']
  },
  module: {
    rules: [{ test: /\.([cm]?ts)$/, loader: 'ts-loader', exclude: /node_modules/ }],
  },
  plugins: [new ESLintPlugin()],
};
