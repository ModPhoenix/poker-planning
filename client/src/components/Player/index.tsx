import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { Card } from 'components/Card';

interface PlayerProps {
  username: string;
  isCardPicked: boolean;
  card: string | undefined;
}

export function Player({
  username,
  isCardPicked,
  card,
}: PlayerProps): ReactElement {
  let cardSymbol;

  if (isCardPicked) {
    if (card) {
      cardSymbol = card;
    } else {
      cardSymbol = '👌';
    }
  } else {
    cardSymbol = '😴';
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card>{cardSymbol}</Card>
      <Typography component="span">{username}</Typography>
    </Box>
  );
}
