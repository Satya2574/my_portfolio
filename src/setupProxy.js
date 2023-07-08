const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://uatnetpro.sisbl.com/APIS/mypfv1/mypf/Data",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
