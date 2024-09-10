import {BackendData} from './backend-response';
import {Group} from './group';
import {Trash} from './trash';

export type User = {
  id: number;
  username: string;
  phoneNumber: string;
  password: string;
  trashHistory: Trash[];
  currentStreak: number;
  finishedMission?: string[];
  email: string;
  imageUrl: string;
  coin: number;
  group: Group;
  rating: number;
} & BackendData;
