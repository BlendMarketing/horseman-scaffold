const path = require('path');
const annotationResolver = require('react-docgen-annotation-resolver').default;
const defaultResolver = require('react-docgen').resolver.findAllExportedComponentDefinitions;
const webpackConfig = require('./webpack.config.js')();

module.exports = {
  resolver: function (ast, recast) {
    annotatedComponents = annotationResolver(ast, recast);
    defaultComponents = defaultResolver(ast, recast);
    return annotatedComponents.concat(defaultComponents);
  },
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
      components: 'src/components/layouts/**/*.jsx',
    },
  ],
  webpackConfig: Object.assign({}, webpackConfig, {
    resolve: {
      alias: {
        // Registed the styleguide wrapper
        'rsg-components/Wrapper': path.join(__dirname, 'src/styleguide/Wrapper'),
      },
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src'),
      ],
    },
  }),
};
