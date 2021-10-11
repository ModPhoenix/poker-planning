import { ReactElement } from 'react';

interface DeckProps {
  cards: string[];
}

export function Deck({ cards }: DeckProps): ReactElement {
  return (
    <div>
      {cards.map((card) => (
        <div key={card}>{card}</div>
      ))}
    </div>
  );
}
