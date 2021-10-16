import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { Card } from 'components/Card';

interface PlayerProps {
  username: string;
  card?: string;
}

export function Player({ username, card }: PlayerProps): ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card>{card || '😴'}</Card>
      <Typography component="span">{username}</Typography>
    </Box>
  );
}
