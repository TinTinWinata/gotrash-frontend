import {BackendData} from './backend-response';
import {Group} from './group';

export type User = {
  id: number;
  username: string;
  phoneNumber: string;
  password: string;
  email: string;
  imageUrl: string;
  coin: number;
  group: Group;
} & BackendData;
