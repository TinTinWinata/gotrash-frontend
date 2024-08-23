import {createContext, useContext} from 'react';
import {User} from '../types/user';

type GoTrashContext = {
  guestLogin: () => Promise<User | null>;
  user: User | undefined;
  logout: () => void;
};

export const goTrashContext = createContext<GoTrashContext>(
  {} as GoTrashContext,
);

export function useGoTrash() {
  return useContext(goTrashContext);
}

export default goTrashContext;
