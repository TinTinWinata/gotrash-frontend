import {createContext, useContext} from 'react';
import {User} from '../types/user';
import {BackendResponse} from '../types/backend-response';
import {Group} from '../types/group';
import {Reward} from '../types/reward';
import {Trashbin} from '../types/trashbin';
import {Address} from '../types/address';
import {Order} from '../types/order';
import {Notification} from '../types/notification';
import {StreakTrash} from '../types/streak-trash';
import {Trash} from '../types/trash';

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
  getUsers(): Promise<User[]>;
  addGroupNotificationInvite(userIds: string[], group: Group): Promise<void>;
  updateUser(user: User): Promise<BackendResponse<User>>;
  addresses: Address[];
  orders: Order[];
  updateImage(imageUrl: string): Promise<BackendResponse<User>>;
  choosedReward: Reward | undefined;
  setChoosedReward: (reward: Reward) => void;
  addOrder(reward: Reward): void;
  removeAddress(idx: number): void;
  getGroup(): Promise<Group | null>;
  getNotifications(): Promise<Notification[]>;
  deleteNotification(id: string): Promise<void>;
  getStreakHistory(): Promise<StreakTrash[]>;
  joinGroup(groupId: string): Promise<Group>;
  getTrashById(id: string): Promise<Trash>;
  forceLogin(id: string): Promise<boolean>;
};

export const goTrashContext = createContext<GoTrashContext>(
  {} as GoTrashContext,
);

export function useGoTrash() {
  return useContext(goTrashContext);
}

export default goTrashContext;
