import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { PageLayout } from 'components';

export function RoomPage(): ReactElement {
  return (
    <PageLayout>
      <Typography component="h1" variant="h1" gutterBottom>
        Room
      </Typography>
    </PageLayout>
  );
}
