export * from './operations.generated';

import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

import { GRAPHQL_ENDPOINT, GRAPHQL_WS_ENDPOINT } from 'settings';

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: GRAPHQL_WS_ENDPOINT,
  }),
);

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
