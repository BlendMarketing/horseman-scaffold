# Horseman Scaffold

The current base state of a horseman application.

## Installation

1. Clone this directory into a new project directory
2. `yarn install`
3. `yarn build` To start the webpack dev-server

## Notes
This scaffolding is platform independent. You will need to modify it to suit
the platform you are targeting.

Things to check

* `webpack.production.js` Ensure the HTML output is correctly pointing to your
  root html template.
* Your default html file loads the `http://webpack:8080/app.bundle.js` file.
