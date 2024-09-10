import {Trash} from './trash';

export type StreakTrash = {
  startDate: string;
  endDate: string;
  trashHistory: Trash[];
};
