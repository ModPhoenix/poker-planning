import { UserCard } from 'types';

export function getUserPickedCart(
  userId?: string,
  table?: UserCard[],
): string | undefined {
  const userCard = table?.find((userCard) => userCard.userId === userId);

  if (userCard) {
    return userCard.card;
  }

  return undefined;
}
