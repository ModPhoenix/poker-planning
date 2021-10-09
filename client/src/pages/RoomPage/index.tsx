import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { useRoomSubscription } from 'api';
import { PageLayout } from 'components';
import { CreateUserDialog } from 'components/CreateUserDialog';

export function RoomPage(): ReactElement {
  const params = useParams();

  const { loading, data, error } = useRoomSubscription({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    variables: { roomId: params.id! },
  });

  console.log('loading :>> ', loading);
  console.log('data :>> ', data);
  console.log('error :>> ', error);

  return (
    <>
      <PageLayout>
        <Typography component="h1" variant="h1" gutterBottom>
          Room
        </Typography>
      </PageLayout>
      <CreateUserDialog />
    </>
  );
}
