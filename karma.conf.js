/* eslint-disable */

// karma.conf.js
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js")();

module.exports = function(config) {
  config.set({
    client: {
      args: parseTestPattern(process.argv),
    },
    failOnEmptyTestSuite: false,
    browsers: ["PhantomJS"],
    frameworks: ["mocha"],
    files: [
      {
        pattern: "./src/**/*.spec.js*",
        watched: true,
        included: false,
        served: false,
      },
      "node_modules/babel-polyfill/dist/polyfill.js",
      "src/testUtils/setup.js",
    ],
    preprocessors: {
      "src/testUtils/setup.js": ["webpack", "sourcemap"],
    },
    reporters: ["mocha"],
    webpack: Object.assign(webpackConfig, {
      externals: {},
    }),
    webpackMiddleware: {
      stats: "errors-only",
    },
    webpackServer: {
      noInfo: true,
    },
  });
};

function parseTestPattern(argv) {
  var found = false;
  var pattern = argv
    .map(function(v) {
      if (found) {
        return v;
      }
      if (v === "--") {
        found = true;
      }
    })
    .filter(function(a) {
      return a;
    })
    .join(" ");
  return pattern ? ["--grep", pattern] : [];
}
