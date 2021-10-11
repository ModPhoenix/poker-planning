import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';

import { User } from 'types';
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from 'utils';

export interface AuthContextValues {
  user: User | null;
  login?: (user: User) => void;
  logout?: () => void;
}

const initialAuthContext = {
  user: null,
};

export const AuthContext = createContext<AuthContextValues>(initialAuthContext);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props): ReactElement {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUserFromLocalStorage());
  }, []);

  const handleLogin = useCallback((user: User) => {
    setUserToLocalStorage(user);
    setUser(user);
  }, []);

  const handleLogout = useCallback(() => {
    removeUserFromLocalStorage();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

type UseAuthReturn = AuthContextValues;

export function useAuth(): UseAuthReturn {
  return useContext(AuthContext);
}
