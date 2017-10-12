const path = require("path");
const annotationResolver = require("react-docgen-annotation-resolver").default;
const defaultResolver = require("react-docgen").resolver
  .findAllExportedComponentDefinitions;
const webpackConfig = require("./webpack.config.js")();

module.exports = {
  styleguideDir: "./public/styleguide",
  resolver: (ast, recast) => {
    const annotatedComponents = annotationResolver(ast, recast);
    const defaultComponents = defaultResolver(ast, recast);
    return annotatedComponents.concat(defaultComponents);
  },
  components: "src/components/**/*.{js,jsx}",
  sections: [
    {
      name: "Atoms",
      components: "src/components/atoms/**/*.jsx",
    },
    {
      name: "Molecules",
      components: "src/components/molecules/**/*.jsx",
    },
    {
      name: "Organisms",
      components: "src/components/organisms/**/*.jsx",
    },
    {
      name: "Layouts",
      components: "src/components/layouts/**/*.jsx",
    },
    {
      name: "Templates",
      components: "src/components/templates/**/*.jsx",
    },
  ],
  webpackConfig: Object.assign({}, webpackConfig, {
    resolve: {
      alias: {
        // Registed the styleguide wrapper
        "rsg-components/Wrapper": path.join(
          __dirname,
          "src/styleguide/Wrapper",
        ),
      },
      modules: ["node_modules", path.resolve(__dirname, "src")],
    },
  }),
};
