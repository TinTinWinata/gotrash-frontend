import {createContext, useContext} from 'react';
import {User} from '../types/user';
import {BackendResponse} from '../types/backend-response';
import {Group} from '../types/group';
import {Reward} from '../types/reward';
import {Trashbin} from '../types/trashbin';
import {Address} from '../types/address';
import {Order} from '../types/order';

type GoTrashContext = {
  guestLogin: () => Promise<User | null>;
  user: User | undefined;
  logout: () => void;
  createGroup(group: Group): Promise<BackendResponse<Group>>;
  getRewards: () => Promise<Reward[]>;
  seedRewardAndCategory(): Promise<void>;
  getTrashbins(): Promise<Trashbin[]>;
  getTrashbinById(id: string): Promise<Trashbin>;
  getRewardById(id: string): Promise<Reward>;
  addAddress(address: Address): void;
  updateUser(user: User): Promise<BackendResponse<User>>;
  addresses: Address[];
  orders: Order[];
  updateImage(imageUrl: string): Promise<BackendResponse<User>>;
  choosedReward: Reward | undefined;
  setChoosedReward: (reward: Reward) => void;
  addOrder(reward: Reward): void;
  removeAddress(idx: number): void;
};

export const goTrashContext = createContext<GoTrashContext>(
  {} as GoTrashContext,
);

export function useGoTrash() {
  return useContext(goTrashContext);
}

export default goTrashContext;
