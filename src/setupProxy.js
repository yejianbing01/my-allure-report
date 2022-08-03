// 官方给的用例 用createProxyMiddleware
const { createProxyMiddleware } = require("http-proxy-middleware");
const { serviceURL } = require("../config/serviceUrl");

/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/MBT", {
      target: serviceURL,
      changeOrigin: true,
      pathRewrite: {
        "^": "",
      },
    })
  );
};
