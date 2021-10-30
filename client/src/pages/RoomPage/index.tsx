import Box from '@mui/material/Box';
import { ReactElement, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { useJoinRoomMutation, useRoomSubscription } from 'api';
import { Deck, PageLayout, Room } from 'components';
import { CreateUserDialog } from 'components/CreateUserDialog';
import { useAuth } from 'contexts';
import { User } from 'types';

export function RoomPage(): ReactElement {
  const { roomId = '' } = useParams();
  const { user } = useAuth();
  const isJoinRoomCalledRef = useRef(false);

  const { data: subscriptionData, error: roomSubscriptionError } =
    useRoomSubscription({
      variables: { roomId },
    });

  useEffect(() => {
    if (roomSubscriptionError) {
      toast.error(`Room subscription: ${roomSubscriptionError.message}`);
    }
  }, [roomSubscriptionError]);

  const [joinRoomMutation, { data: joinRoomData }] = useJoinRoomMutation({
    onError: (error) => {
      toast.error(`Join room: ${error.message}`);
    },
  });

  useEffect(() => {
    if (user && !isJoinRoomCalledRef.current) {
      joinRoomMutation({
        variables: {
          roomId,
          user: {
            id: user.id,
            username: user.username,
          },
        },
      });

      isJoinRoomCalledRef.current = true;
    }
  }, [joinRoomMutation, roomId, user]);

  function handleJoinRoomMutation(user: User) {
    joinRoomMutation({
      variables: {
        roomId,
        user: { id: user.id, username: user.username },
      },
    });
  }

  const room = subscriptionData?.room || joinRoomData?.joinRoom;

  return (
    <>
      <PageLayout room={room} users={room?.users}>
        {room && (
          <>
            <Room room={room} />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 24,
                maxWidth: 900,
                margin: '0 auto',
              }}
            >
              <Deck
                roomId={roomId}
                isGameOver={room.isGameOver}
                cards={room.deck.cards}
                table={room.game.table}
              />
            </Box>
          </>
        )}
      </PageLayout>
      <CreateUserDialog handleJoinRoomMutation={handleJoinRoomMutation} />
    </>
  );
}
