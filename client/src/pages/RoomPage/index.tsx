import { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useJoinRoomMutation, useRoomSubscription } from 'api';
import { Deck, PageLayout } from 'components';
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
      <PageLayout>{room && <Deck cards={room.deck.cards} />}</PageLayout>
      <CreateUserDialog />
    </>
  );
}
