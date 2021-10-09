export const USER_KEY = 'user';

export const GRAPHQL_ENDPOINT = process.env
  .REACT_APP_GRAPHQL_ENDPOINT as string;

if (!GRAPHQL_ENDPOINT) {
  throw Error('Expected environment variable: REACT_APP_GRAPHQL_ENDPOINT');
}

export const GRAPHQL_WS_ENDPOINT = process.env
  .REACT_APP_GRAPHQL_WS_ENDPOINT as string;

if (!GRAPHQL_WS_ENDPOINT) {
  throw Error('Expected environment variable: REACT_APP_GRAPHQL_WS_ENDPOINT');
}
