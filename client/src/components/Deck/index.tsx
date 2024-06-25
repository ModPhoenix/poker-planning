import Box from '@mui/material/Box';
import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { usePickCardMutation } from 'api';
import { Card } from 'components/Card';
import { useAuth } from 'contexts';
import { useKeyboardControls } from 'hooks';
import { UserCard } from 'types';
import { getPickedUserCard } from 'utils';

interface DeckProps {
  roomId: string;
  isGameOver: boolean;
  cards: string[];
  table: UserCard[] | undefined;
}

export function Deck({
  roomId,
  isGameOver,
  cards,
  table,
}: DeckProps): ReactElement {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const { user } = useAuth();
  const { cardsContainerRef } = useKeyboardControls();

  const [pickCardMutation] = usePickCardMutation({
    onError(error) {
      setSelectedCard(null);
      toast.error(`Pick card: ${error.message}`);
    },
  });

  useEffect(() => {
    const pickedCart = getPickedUserCard(user?.id, table);
    if (!pickedCart) {
      setSelectedCard(null);
    }
  }, [table, user?.id]);

  const handleCardClick = (card: string) => () => {
    if (user) {
      pickCardMutation({
        variables: {
          userId: user.id,
          roomId,
          card,
        },
      });

      setSelectedCard(card);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap', // Allows cards to wrap to the next line
        justifyContent: 'center', // Center the cards
        alignItems: 'flex-start', // Align cards to the top
        gap: '8px', // Add space between the cards
        maxWidth: '100%', // Ensure the container does not exceed the width of the viewport
        padding: '0 16px', // Add some padding to prevent cards from touching the edges
        boxSizing: 'border-box', // Include padding in the element's total width and height
      }}
      ref={cardsContainerRef}
    >
      {cards.map((card) => {
        const isCardPicked = selectedCard === card;
        return (
          <Box
            key={card}
            sx={{
              marginBottom: isCardPicked ? '12px' : 0,
              transition: 'margin-bottom 0.1s ease-in-out',
              flex: '0 1 100px', // Make each card take a minimum width of 100px and allow them to grow
            }}
          >
            <Card
              onClick={handleCardClick(card)}
              disabled={isGameOver}
              variant={isCardPicked ? 'contained' : 'outlined'}
              disableElevation
            >
              {card}
            </Card>
          </Box>
        );
      })}
    </Box>
  );
}