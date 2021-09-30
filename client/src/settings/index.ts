export const GRAPHQL_ENDPOINT = process.env
  .REACT_APP_GRAPHQL_ENDPOINT as string;

if (!GRAPHQL_ENDPOINT) {
  throw Error('Expected environment variable: REACT_APP_GRAPHQL_ENDPOINT');
}
