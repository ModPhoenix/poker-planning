import { UserCard } from 'types';

export function getPickedUserCard(
  userId?: string,
  table?: UserCard[],
): UserCard | undefined {
  const userCard = table?.find((userCard) => userCard.userId === userId);

  if (userCard) {
    return userCard;
  }

  return undefined;
}
