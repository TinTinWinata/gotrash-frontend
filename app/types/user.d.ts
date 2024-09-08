import {BackendData} from './backend-response';
import {Group} from './group';

export type User = {
  id: number;
  username: string;
  phoneNumber: string;
  password: string;
  finishedMission?: string[];
  email: string;
  imageUrl: string;
  coin: number;
  group: Group;
  rating: number;
} & BackendData;
