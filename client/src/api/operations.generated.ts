import * as Types from '../types/types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UserFragmentFragment = { __typename?: 'User', id: string, username: string };

export type DeckFragmentFragment = { __typename?: 'Deck', id: string, cards: Array<string> };

export type UserCardFragmentFragment = { __typename?: 'UserCard', userId: string, card: string };

export type GameFragmentFragment = { __typename?: 'Game', id: string, table: Array<{ __typename?: 'UserCard', userId: string, card: string }> };

export type RoomFragmentFragment = { __typename?: 'Room', id: string, name?: string | null | undefined, users: Array<{ __typename?: 'User', id: string, username: string }>, deck: { __typename?: 'Deck', id: string, cards: Array<string> }, game: { __typename?: 'Game', id: string, table: Array<{ __typename?: 'UserCard', userId: string, card: string }> } };

export type CreateRoomMutationVariables = Types.Exact<{
  name?: Types.Maybe<Types.Scalars['String']>;
}>;


export type CreateRoomMutation = { __typename?: 'MutationRoot', createRoom: { __typename?: 'Room', id: string, name?: string | null | undefined, users: Array<{ __typename?: 'User', id: string, username: string }>, deck: { __typename?: 'Deck', id: string, cards: Array<string> }, game: { __typename?: 'Game', id: string, table: Array<{ __typename?: 'UserCard', userId: string, card: string }> } } };

export type CreateUserMutationVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'MutationRoot', createUser: { __typename?: 'User', id: string, username: string } };

export type JoinRoomMutationVariables = Types.Exact<{
  roomId: Types.Scalars['UUID'];
  user: Types.UserInput;
}>;


export type JoinRoomMutation = { __typename?: 'MutationRoot', joinRoom?: { __typename?: 'Room', id: string, name?: string | null | undefined, users: Array<{ __typename?: 'User', id: string, username: string }>, deck: { __typename?: 'Deck', id: string, cards: Array<string> }, game: { __typename?: 'Game', id: string, table: Array<{ __typename?: 'UserCard', userId: string, card: string }> } } | null | undefined };

export type PickCardMutationVariables = Types.Exact<{
  userId: Types.Scalars['UUID'];
  roomId: Types.Scalars['UUID'];
  card: Types.Scalars['String'];
}>;


export type PickCardMutation = { __typename?: 'MutationRoot', pickCard: { __typename?: 'Room', id: string, name?: string | null | undefined, users: Array<{ __typename?: 'User', id: string, username: string }>, deck: { __typename?: 'Deck', id: string, cards: Array<string> }, game: { __typename?: 'Game', id: string, table: Array<{ __typename?: 'UserCard', userId: string, card: string }> } } };

export type RoomSubscriptionVariables = Types.Exact<{
  roomId: Types.Scalars['UUID'];
}>;


export type RoomSubscription = { __typename?: 'SubscriptionRoot', room: { __typename?: 'Room', id: string, name?: string | null | undefined, users: Array<{ __typename?: 'User', id: string, username: string }>, deck: { __typename?: 'Deck', id: string, cards: Array<string> }, game: { __typename?: 'Game', id: string, table: Array<{ __typename?: 'UserCard', userId: string, card: string }> } } };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
}
    `;
export const DeckFragmentFragmentDoc = gql`
    fragment DeckFragment on Deck {
  id
  cards
}
    `;
export const UserCardFragmentFragmentDoc = gql`
    fragment UserCardFragment on UserCard {
  userId
  card
}
    `;
export const GameFragmentFragmentDoc = gql`
    fragment GameFragment on Game {
  id
  table {
    ...UserCardFragment
  }
}
    ${UserCardFragmentFragmentDoc}`;
export const RoomFragmentFragmentDoc = gql`
    fragment RoomFragment on Room {
  id
  name
  users {
    ...UserFragment
  }
  deck {
    ...DeckFragment
  }
  game {
    ...GameFragment
  }
}
    ${UserFragmentFragmentDoc}
${DeckFragmentFragmentDoc}
${GameFragmentFragmentDoc}`;
export const CreateRoomDocument = gql`
    mutation CreateRoom($name: String) {
  createRoom(name: $name) {
    ...RoomFragment
  }
}
    ${RoomFragmentFragmentDoc}`;
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
    mutation CreateUser($username: String!) {
  createUser(username: $username) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
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
export const JoinRoomDocument = gql`
    mutation JoinRoom($roomId: UUID!, $user: UserInput!) {
  joinRoom(roomId: $roomId, user: $user) {
    ...RoomFragment
  }
}
    ${RoomFragmentFragmentDoc}`;
export type JoinRoomMutationFn = Apollo.MutationFunction<JoinRoomMutation, JoinRoomMutationVariables>;

/**
 * __useJoinRoomMutation__
 *
 * To run a mutation, you first call `useJoinRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinRoomMutation, { data, loading, error }] = useJoinRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useJoinRoomMutation(baseOptions?: Apollo.MutationHookOptions<JoinRoomMutation, JoinRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinRoomMutation, JoinRoomMutationVariables>(JoinRoomDocument, options);
      }
export type JoinRoomMutationHookResult = ReturnType<typeof useJoinRoomMutation>;
export type JoinRoomMutationResult = Apollo.MutationResult<JoinRoomMutation>;
export type JoinRoomMutationOptions = Apollo.BaseMutationOptions<JoinRoomMutation, JoinRoomMutationVariables>;
export const PickCardDocument = gql`
    mutation PickCard($userId: UUID!, $roomId: UUID!, $card: String!) {
  pickCard(userId: $userId, roomId: $roomId, card: $card) {
    ...RoomFragment
  }
}
    ${RoomFragmentFragmentDoc}`;
export type PickCardMutationFn = Apollo.MutationFunction<PickCardMutation, PickCardMutationVariables>;

/**
 * __usePickCardMutation__
 *
 * To run a mutation, you first call `usePickCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePickCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pickCardMutation, { data, loading, error }] = usePickCardMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      roomId: // value for 'roomId'
 *      card: // value for 'card'
 *   },
 * });
 */
export function usePickCardMutation(baseOptions?: Apollo.MutationHookOptions<PickCardMutation, PickCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PickCardMutation, PickCardMutationVariables>(PickCardDocument, options);
      }
export type PickCardMutationHookResult = ReturnType<typeof usePickCardMutation>;
export type PickCardMutationResult = Apollo.MutationResult<PickCardMutation>;
export type PickCardMutationOptions = Apollo.BaseMutationOptions<PickCardMutation, PickCardMutationVariables>;
export const RoomDocument = gql`
    subscription Room($roomId: UUID!) {
  room(roomId: $roomId) {
    ...RoomFragment
  }
}
    ${RoomFragmentFragmentDoc}`;

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