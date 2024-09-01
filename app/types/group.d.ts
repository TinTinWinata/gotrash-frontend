import {BackendData} from './backend-response';
import {Reward} from './reward';

export type Group = BackendData & {
  coins: number;
  targetReward: Reward;
  members: GroupMember[];
  groupName: string;
  rewardId: string;
  adminId: number;
};

export type GroupMember = {
  id: number;
  username: string;
  password: string;
  email: string;
  imageName: string;
  imageUrl: string;
  coin: number;
  trashHistory: Array<any>;
  groupId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
};
