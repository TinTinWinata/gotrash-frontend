import {createContext, useContext} from 'react';
import {Device, State} from 'react-native-ble-plx';

type BleContext = {
  state: State | null;
  device: Device | null;
};

export const bleContext = createContext<BleContext>({} as BleContext);

export default function useBle() {
  return useContext(bleContext);
}
