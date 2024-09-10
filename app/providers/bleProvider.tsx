/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  Modal,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {BleManager, Device, State} from 'react-native-ble-plx';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';

import {btoa} from 'react-native-quick-base64';
import {useGoTrash} from '../contexts/gotrashContext';

const manager = new BleManager();
const SERVICE_UUID = '180D';
const CHARACTERISTIC_UUID = '2A37';
const NOTIFICATION_UUID = '0000a102-0000-1000-8000-00805f9b34fb';

import {ChildrenProps} from '../types/children-only';
import {Trash} from '../types/trash';
import SuccessTrashModal from '../components/Modal/SuccessTrashModal';
import {bleContext} from '../contexts/bleContext';

interface TrashResult {
  trashId: string;
  userId: string;
}

export default function BLEProvider({children}: ChildrenProps) {
  const [device, setDevice] = useState<Device | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const {user, getTrashById} = useGoTrash();
  const [trash, setTrash] = useState<Trash>();
  const [value, setValue] = useState<TrashResult>();
  const [state, setState] = useState<State | null>(null);

  async function readNotification() {
    if (!device || !user || !user.id) {
      return;
    }
    try {
      const services = await device.services();
      for (const service of services) {
        const characteristics = await service.characteristics();
        for (const characteristic of characteristics) {
          if (characteristic.uuid === NOTIFICATION_UUID) {
            const readValue = await device.readCharacteristicForService(
              service.uuid,
              characteristic.uuid,
            );
            if (readValue.value) {
              const stringValue = atob(readValue.value);
              const [userId, trashId] = stringValue.split(',');
              if (trashId && userId) {
                if (
                  trashId !== value?.trashId &&
                  (user.id as number).toString() === userId
                ) {
                  const tr = await getTrashById(trashId);
                  if (tr) {
                    setIsOpenModal(true);
                    setTrash(tr);
                    setValue({trashId, userId});
                  }
                }
              }
            }
          }
        }
      }
      console.log('Data read from characteristic');
    } catch (err) {
      // await device.discoverAllServicesAndCharacteristics();
      // await device.connect();
      console.error('Error read data from characteristic: ', err);
    }
  }

  async function writeId() {
    if (!device || !user || !user.id) {
      return;
    }
    try {
      await device.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        // @ts-expect-error ID can be integer not a string
        btoa(user.id.toString()),
      );
      console.log('Data written to characteristic');
    } catch (err) {
      // await device.discoverAllServicesAndCharacteristics();
      // await device.connect();
      console.error('Error writing data to characteristic: ', err);
    }
  }

  const loopDevice = async () => {
    if (!device || !user || !user.id) {
      return;
    }
    await writeId();
    await readNotification();
  };

  const connectToDevice = async (dev: Device) => {
    try {
      if (!dev) {
        return;
      }
      const connectedDevice = await dev.connect();
      await connectedDevice.discoverAllServicesAndCharacteristics();
      console.log('Connected to Device! : ', connectedDevice.name);
      setDevice(connectedDevice);
    } catch (error) {
      // scanAndConnect();
      console.error('Connection error: ', error);
    }
  };

  // !TODO: Request Permission still not following the correct documentation
  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const apiLevel = await DeviceInfo.getApiLevel();
        if (apiLevel < 31) {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'Bluetooth Low Energy requires Location',
              buttonNeutral: 'Ask Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          // if (permission === 'granted') {
          //   scanAndConnect();
          // }
        } else {
          await requestMultiple([
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ]);

          // const isGranted =
          //   result['android.permission.BLUETOOTH_CONNECT'] ===
          //     PermissionsAndroid.RESULTS.GRANTED &&
          //   result['android.permission.BLUETOOTH_SCAN'] ===
          //     PermissionsAndroid.RESULTS.GRANTED &&
          //   result['android.permission.ACCESS_FINE_LOCATION'] ===
          //     PermissionsAndroid.RESULTS.GRANTED;
        }
      }
    } catch (error) {
      console.error('Permission request error: ', error);
    }
  };

  const scanAndConnect = () => {
    if (device) {
      return;
    }
    console.log('Start device scan ...');
    try {
      manager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error) {
          console.error('Scan error: ', JSON.stringify(error));
          return;
        }
        if (scannedDevice && scannedDevice.name === 'GoTrash') {
          manager.stopDeviceScan();
          connectToDevice(scannedDevice);
        }
      });
    } catch (err) {
      console.log('[Error Starting Device Scan] ', err);
    }
  };

  // Every 4 seconds
  React.useEffect(() => {
    const id = setInterval(loopDevice, 3000);
    return () => {
      clearInterval(id);
    };
  }, [device, user, value]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (state === State.PoweredOn) {
        scanAndConnect();
      }
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [state, user]);

  React.useEffect(() => {
    requestPermissions();
    // Development don't required this
    const subscription = manager.onStateChange((st: State) => {
      setDevice(null);
      setState(st);
    }, true);
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <bleContext.Provider value={{state, device}}>
      <Modal animationType="slide" transparent={true} visible={isOpenModal}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            position: 'relative',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsOpenModal(false)}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,.3)',
            }}
          />
          {trash && <SuccessTrashModal trash={trash} />}
        </View>
      </Modal>
      {children}
    </bleContext.Provider>
  );
}
