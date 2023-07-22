let GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT as string;

if (!GRAPHQL_ENDPOINT) {
  throw Error('Expected environment variable: VITE_GRAPHQL_ENDPOINT');
}

let GRAPHQL_WS_ENDPOINT = import.meta.env.VITE_GRAPHQL_WS_ENDPOINT as string;

if (!GRAPHQL_WS_ENDPOINT) {
  throw Error('Expected environment variable: VITE_GRAPHQL_WS_ENDPOINT');
}

if (import.meta.env.PROD) {
  GRAPHQL_ENDPOINT = '/graphql/';
  GRAPHQL_WS_ENDPOINT = `ws://${document.location.host}/graphql/`;
}

console.log('GRAPHQL_ENDPOINT', GRAPHQL_ENDPOINT);
console.log('GRAPHQL_WS_ENDPOINT ', GRAPHQL_WS_ENDPOINT);

export { GRAPHQL_ENDPOINT, GRAPHQL_WS_ENDPOINT };
