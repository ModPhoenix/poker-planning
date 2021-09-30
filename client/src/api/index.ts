export * from './operations.generated';

import { ApolloClient, InMemoryCache } from '@apollo/client';

import { GRAPHQL_ENDPOINT } from 'settings';

export const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});
