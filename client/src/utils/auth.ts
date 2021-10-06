import { USER_KEY } from 'settings';
import { User } from 'types';

export function getUserFromLocalStorage(): User | null {
  const maybeUser = localStorage.getItem(USER_KEY);

  if (maybeUser) {
    const user: User = JSON.parse(maybeUser);

    return user;
  }

  return null;
}

export function setUserToLocalStorage(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeUserFromLocalStorage(): void {
  localStorage.removeItem(USER_KEY);
}
