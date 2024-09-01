import React from 'react';
import {Reward} from './reward';
import {BackendData} from './backend-response';

export type RewardCategory = BackendData & {
  name: string;
  imageUrl: string;
  rewards: Reward[];
  icon?: React.ReactNode;
};
