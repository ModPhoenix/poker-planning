import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { Card } from 'components/Card';

interface PlayerProps {
  username: string;
}

export function Player({ username }: PlayerProps): ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card>1</Card>
      <Typography component="span">{username}</Typography>
    </Box>
  );
}
