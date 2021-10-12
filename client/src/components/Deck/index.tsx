import Box from '@mui/material/Box';
import { ReactElement } from 'react';

import { Card } from 'components/Card';

interface DeckProps {
  cards: string[];
}

export function Deck({ cards }: DeckProps): ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {cards.map((card) => (
        <Card key={card}>{card}</Card>
      ))}
    </Box>
  );
}
