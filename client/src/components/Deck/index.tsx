import Box from '@mui/material/Box';
import { ReactElement, useState } from 'react';
import { toast } from 'react-hot-toast';

import { usePickCardMutation } from 'api';
import { Card } from 'components/Card';
import { useAuth } from 'contexts';
import { UserCard } from 'types';
import { getPickedUserCard } from 'utils';

interface DeckProps {
  cards: string[];
  roomId: string;
  table: UserCard[] | undefined;
}

export function Deck({ cards, roomId, table }: DeckProps): ReactElement {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const { user } = useAuth();

  const [pickCardMutation] = usePickCardMutation({
    onError(error) {
      toast.error(`Pick card: ${error.message}`);
    },
  });

  const handleCardClick = (card: string) => () => {
    if (user) {
      pickCardMutation({
        variables: {
          userId: user.id,
          roomId,
          card,
        },
      }).then(() => {
        setSelectedCard(card);
      });
    }
  };

  const pickedCart = getPickedUserCard(user?.id, table);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      {cards.map((card) => (
        <Box
          key={card}
          sx={{
            marginBottom: pickedCart && selectedCard === card ? '20px' : 0,
          }}
        >
          <Card onClick={handleCardClick(card)}>{card}</Card>
        </Box>
      ))}
    </Box>
  );
}
