const path = require('path');
const webpackConfig = require('./webpack.config.js');

module.exports = {
  components: 'src/components/**/*.jsx',
  styleguideDir: './public/styleguide',
  sections: [
    {
      name: 'Atoms',
      components: 'src/components/atoms/**/*.jsx',
    },
    {
      name: 'Molecules',
      components: 'src/components/molecules/**/*.jsx',
    },
    {
      name: 'Organisms',
      components: 'src/components/organisms/**/*.jsx',
    },
    {
      name: 'Layout',
      components: 'src/components/layout/**/*.jsx',
    },
  ],
  webpackConfig: Object.assign({}, webpackConfig, {
    resolve: {
      alias: {
        // Registed the styleguide wrapper
        'rsg-components/Wrapper': path.join(__dirname, 'src/styleguide/Wrapper'),
      },
    },
  }),
};
