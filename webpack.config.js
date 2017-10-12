/* eslint-disable func-names */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function(env = { dev: true }) {
  const entry = {
    app: [path.join(__dirname, "src/index.js")],
  };

  /**
   * If we are in development mode add the hot loader patch for react into the
   * entrypoint
   */
  if (env.dev) {
    entry.app.unshift("react-hot-loader/patch");
  }

  const basePlugins = [
    new HtmlWebpackPlugin({
      /**
       * In dev we want webpack-dev-server to serve up this file normally.
       * in production we need to generated into public for nginx
       */
      filename: env.dev
        ? "index.html"
        : path.join(__dirname, "public/index.html"),
      inject: false,
      template: require("html-webpack-template"),
      appMountId: "root",
      mobile: true,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
      },
    }),
  ];

  /**
   * Plugins intended for production use only
   */
  const prodPlugins = [
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ];

  const config = {
    entry,
    cache: true,
    devtool: env.production ? "source-map" : "eval",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: "raw-loader",
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                hash: "sha512",
                digest: "hex",
                name: "[name]-[hash].[ext]",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".webpack.js", ".js", ".json", ".jsx"],
      modules: ["node_modules", path.resolve(__dirname, "src")],
    },
    plugins: env.dev ? basePlugins : basePlugins.concat(prodPlugins),
    output: {
      path: path.join(__dirname, "public/bundle"),
      publicPath: env.production ? "/bundle/" : "/",
      filename: "[hash].js",
      sourceMapFilename: "[file].map",
    },
  };

  /**
   * Add the dev server configuration if we are in dev mode
   */
  if (env.dev) {
    config.devServer = {
      publicPath: "/",
      host: "0.0.0.0",
      disableHostCheck: true,
      historyApiFallback: true,
      port: 80,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      watchOptions: {
        poll: 1000,
      },
    };
  }

  return config;
};
