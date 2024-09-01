import {BackendData} from './backend-response';

export type Trashbin = BackendData & {
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  imageName: string;
  imageUrl: string;
};
