import {BackendData} from './backend-response';

export type User = BackendData & {
  id: number;
  username: string;
  password: string;
  email: string;
  profileImage: string;
  coin: number;
};
