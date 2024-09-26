import { ReactElement } from "react";

import { Card } from "@/components/Card";

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
      cardSymbol = "✅";
    }
  } else {
    if (isGameOver) {
      cardSymbol = "😴";
    } else {
      cardSymbol = "🤔";
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Card>{cardSymbol}</Card>
      <span className="text-sm mb-1">{username}</span>
    </div>
  );
}
