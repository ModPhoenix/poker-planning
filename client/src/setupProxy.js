// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

const REACT_APP_GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT;

if (!REACT_APP_GRAPHQL_ENDPOINT) {
  throw Error('expected environment variable: REACT_APP_GRAPHQL_ENDPOINT');
}

module.exports = function (app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: REACT_APP_GRAPHQL_ENDPOINT,
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/graphql': '/',
      },
    }),
  );
};
