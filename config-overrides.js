// const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const {
  override,
  removeModuleScopePlugin,
  addWebpackPlugin,
  addBabelPresets,
  fixBabelImports,
  addLessLoader,
  adjustStyleLoaders,
  // addBabelPlugin,
  // addExternalBabelPlugins,
} = require("customize-cra");

module.exports = override(
  removeModuleScopePlugin(),
  addWebpackPlugin(
    new Dotenv({
      path: path.resolve(__dirname, process.env.REACT_APP_ENV ? `.env.${process.env.REACT_APP_ENV}` : ".env"),
    })
  ),
  addBabelPresets("@babel/preset-react", "@babel/preset-env"),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      // modifyVars: { "@primary-color": "#C0312C" },
    },
  }),
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  })
  // addExternalBabelPlugins("@babel/preset-react")
);
