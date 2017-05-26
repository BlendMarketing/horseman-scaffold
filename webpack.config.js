/**
 * This file represents the basic configuration that we will run to get our
 * bundle generated. It doesn't do anything by itself, but instead, returns a
 * function that takes an option parameter.
 *
 * Any changes/additions to this configuration should come in through the option
 * paramater.
 */
const path = require('path');

module.exports = {
  cache: true,
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, 'src/index.js'),
    ],
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '[name]-[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.webpack.js', '.js', '.json', '.jsx'],
    modules: [
      'node_modules',
    ],
  },
  plugins: [],
  output: {
    path: path.join(__dirname, 'public/bundle'),
    publicPath: 'http://webpack:8080/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
  },
  devServer: {
    publicPath: '/',
    public: 'webpack:8080',
    host: 'webpack',
    port: 8080,
    watchOptions: {
      poll: 1000,
    },
  },
};
