let GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT as string;

if (!GRAPHQL_ENDPOINT) {
  throw Error('Expected environment variable: REACT_APP_GRAPHQL_ENDPOINT');
}

let GRAPHQL_WS_ENDPOINT = process.env.REACT_APP_GRAPHQL_WS_ENDPOINT as string;

if (!GRAPHQL_WS_ENDPOINT) {
  throw Error('Expected environment variable: REACT_APP_GRAPHQL_WS_ENDPOINT');
}

if (process.env.NODE_ENV !== 'production') {
  GRAPHQL_ENDPOINT = '/graphql/';
  GRAPHQL_WS_ENDPOINT = `ws://${document.location.host}/graphql/`;
}

export { GRAPHQL_ENDPOINT, GRAPHQL_WS_ENDPOINT };
