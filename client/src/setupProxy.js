const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Remplacez ceci par l'URL de votre backend
      changeOrigin: true,
    })
  );
};