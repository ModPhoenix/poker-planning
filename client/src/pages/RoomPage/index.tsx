import Box from '@mui/material/Box';
import { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useJoinRoomMutation, useRoomSubscription } from 'api';
import { Deck, PageLayout, Room } from 'components';
import { CreateUserDialog } from 'components/CreateUserDialog';
import { useAuth } from 'contexts';

export function RoomPage(): ReactElement {
  const params = useParams();
  const { user } = useAuth();

  const { data: subscriptionData } = useRoomSubscription({
    variables: { roomId: params.id || '' },
    skip: !params.id,
  });

  const [joinRoomMutation, { data: joinRoomData }] = useJoinRoomMutation();

  const room = subscriptionData?.room || joinRoomData?.joinRoom;

  useEffect(() => {
    if (params.id && user) {
      joinRoomMutation({
        variables: {
          roomId: params.id,
          user: { id: user.id, username: user.username },
        },
      });
    }
  }, [joinRoomMutation, params.id, user]);

  return (
    <>
      <PageLayout>
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
              <Deck cards={room.deck.cards} />
            </Box>
          </>
        )}
      </PageLayout>
      <CreateUserDialog />
    </>
  );
}
