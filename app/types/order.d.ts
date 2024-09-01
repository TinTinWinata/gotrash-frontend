import {Reward} from './reward';

export interface Order extends Reward {
  status: 'ongoing' | 'completed';
}
