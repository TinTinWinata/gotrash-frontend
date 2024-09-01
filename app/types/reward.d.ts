import {ImageSourcePropType} from 'react-native';
import {BackendData} from './backend-response';

export type Reward = BackendData & {
  name: string;
  coin: number;
  description: string;
  imageUrl: ImageSourcePropType | string;
  rewardCategoryId: string;
};
