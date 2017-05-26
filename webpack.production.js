/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');
var defaultConfig = require('./webpack.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  cache: true,
  entry: {
    app: [
      path.join(__dirname, 'src/index.js'),
    ],
  },
  devtool: 'source-map',
  module: {
    rules: defaultConfig.module.rules,
  },
  resolve: defaultConfig.resolve,
  plugins: defaultConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      filename: path.join(__dirname, 'public/index.html'),
      inject: 'body',
    }),
  ]),
  output: {
    path: path.join(__dirname, 'public/bundle'),
    publicPath: '/bundle/',
    filename: '[name].[hash].js',
    sourceMapFilename: '[file].map',
  },
};
