const path = require('path');
const webpackConfig = require('./webpack.config.js');

module.exports = {
  components: 'src/components/**/*.jsx',
  styleguideDir: './public/styleguide',
  webpackConfig: Object.assign({}, webpackConfig, {
    resolve: {
      alias: {
        // Registed the styleguide wrapper
        'rsg-components/Wrapper': path.join(__dirname, 'src/styleguide/Wrapper'),
      },
    },
  }),
};
