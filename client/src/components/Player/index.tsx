import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { Card } from 'components/Card';

interface PlayerProps {
  username: string;
  isCardPicked: boolean;
  isGameOver: boolean;
  card: string | null | undefined;
}

export function Player({
  username,
  isCardPicked,
  isGameOver,
  card,
}: PlayerProps): ReactElement {
  let cardSymbol;

  if (isCardPicked) {
    if (card) {
      cardSymbol = card;
    } else {
      cardSymbol = '✅';
    }
  } else {
    if (isGameOver) {
      cardSymbol = '😴';
    } else {
      cardSymbol = '🤔';
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card disableRipple disableElevation>
        {cardSymbol}
      </Card>
      <Typography component="span">{username}</Typography>
    </Box>
  );
}
