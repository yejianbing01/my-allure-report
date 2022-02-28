// const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const {
  override,
  removeModuleScopePlugin,
  addWebpackPlugin,
  addBabelPresets,
  // addBabelPlugin,
  // addExternalBabelPlugins,
} = require("customize-cra");

module.exports = override(
  removeModuleScopePlugin(),
  addWebpackPlugin(
    new Dotenv({
      path: path.resolve(__dirname, `.env.${process.env.REACT_APP_ENV}`),
    })
  ),
  addBabelPresets("@babel/preset-react", "@babel/preset-env")
  // addExternalBabelPlugins("@babel/preset-react")
);
