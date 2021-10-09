export * from './operations.generated';

import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { GRAPHQL_ENDPOINT, GRAPHQL_WS_ENDPOINT } from 'settings';

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const wsLink = new WebSocketLink({
  uri: GRAPHQL_WS_ENDPOINT,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
