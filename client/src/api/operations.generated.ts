import * as Types from '../types/types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UserFieldsFragment = { __typename?: 'User', id: string, username?: string | null | undefined };

export type DeckFieldsFragment = { __typename?: 'Deck', id: string, cards: Array<string> };

export type UserCardFieldsFragment = { __typename?: 'UserCard', id: string, userId: number, card: string };

export type GameFieldsFragment = { __typename?: 'Game', id: string, table: Array<{ __typename?: 'UserCard', id: string, userId: number, card: string }> };

export type CreateRoomMutationVariables = Types.Exact<{
  name?: Types.Maybe<Types.Scalars['String']>;
}>;


export type CreateRoomMutation = { __typename?: 'MutationRoot', createRoom: { __typename?: 'Room', id: string, name?: string | null | undefined, users: Array<{ __typename?: 'User', id: string, username?: string | null | undefined }>, deck: { __typename?: 'Deck', id: string, cards: Array<string> }, game: { __typename?: 'Game', id: string, table: Array<{ __typename?: 'UserCard', id: string, userId: number, card: string }> } } };

export type CreateUserMutationVariables = Types.Exact<{
  username: Types.Scalars['String'];
  roomId?: Types.Maybe<Types.Scalars['UUID']>;
}>;


export type CreateUserMutation = { __typename?: 'MutationRoot', createUser: { __typename?: 'User', id: string, username?: string | null | undefined } };

export type RoomSubscriptionVariables = Types.Exact<{
  roomId: Types.Scalars['UUID'];
}>;


export type RoomSubscription = { __typename?: 'SubscriptionRoot', room: { __typename?: 'Room', id: string, name?: string | null | undefined, users: Array<{ __typename?: 'User', id: string, username?: string | null | undefined }>, deck: { __typename?: 'Deck', id: string, cards: Array<string> }, game: { __typename?: 'Game', id: string, table: Array<{ __typename?: 'UserCard', id: string, userId: number, card: string }> } } };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  username
}
    `;
export const DeckFieldsFragmentDoc = gql`
    fragment DeckFields on Deck {
  id
  cards
}
    `;
export const UserCardFieldsFragmentDoc = gql`
    fragment UserCardFields on UserCard {
  id
  userId
  card
}
    `;
export const GameFieldsFragmentDoc = gql`
    fragment GameFields on Game {
  id
  table {
    ...UserCardFields
  }
}
    ${UserCardFieldsFragmentDoc}`;
export const CreateRoomDocument = gql`
    mutation CreateRoom($name: String) {
  createRoom(name: $name) {
    id
    name
    users {
      ...UserFields
    }
    deck {
      ...DeckFields
    }
    game {
      ...GameFields
    }
  }
}
    ${UserFieldsFragmentDoc}
${DeckFieldsFragmentDoc}
${GameFieldsFragmentDoc}`;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $roomId: UUID) {
  createUser(username: $username, roomId: $roomId) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const RoomDocument = gql`
    subscription Room($roomId: UUID!) {
  room(roomId: $roomId) {
    id
    name
    users {
      ...UserFields
    }
    deck {
      ...DeckFields
    }
    game {
      ...GameFields
    }
  }
}
    ${UserFieldsFragmentDoc}
${DeckFieldsFragmentDoc}
${GameFieldsFragmentDoc}`;

/**
 * __useRoomSubscription__
 *
 * To run a query within a React component, call `useRoomSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useRoomSubscription(baseOptions: Apollo.SubscriptionHookOptions<RoomSubscription, RoomSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RoomSubscription, RoomSubscriptionVariables>(RoomDocument, options);
      }
export type RoomSubscriptionHookResult = ReturnType<typeof useRoomSubscription>;
export type RoomSubscriptionResult = Apollo.SubscriptionResult<RoomSubscription>;