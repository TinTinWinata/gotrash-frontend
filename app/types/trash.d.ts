import {BackendData} from './backend-response';

export type Trash = {
  category: number;
  description: string;
  rating: string;
  coin: string;
} & BackendData;
