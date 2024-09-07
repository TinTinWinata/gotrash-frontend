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

import {ChildrenProps} from '../types/children-only';
import bleContext from '../contexts/bleContext';
import SuccessModal from '../components/Modal/SuccessModal';

interface TrashResult {
  trashId: string;
  userId: string;
}

export default function BLEProvider({children}: ChildrenProps) {
  const [device, setDevice] = useState<Device | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const {user} = useGoTrash();
  const [value, setValue] = useState<TrashResult>();

  const loopDevice = async () => {
    if (!device || !user || !user.id) {
      return;
    }
    try {
      const services = await device.services();
      for (const service of services) {
        const characteristics = await service.characteristics();
        for (const characteristic of characteristics) {
          console.log('Characteristic: ', characteristic.uuid);
          if (characteristic.uuid === '00002a37-0000-1000-8000-00805f9b34fb') {
            const readValue = await device.readCharacteristicForService(
              service.uuid,
              characteristic.uuid,
            );
            if (readValue.value) {
              const stringValue = atob(readValue.value);
              // console.log('read value : ', readValue.value);
              // console.log('string value : ', stringValue);
              const [trashId, userId] = stringValue.split(',');
              if (trashId && userId) {
                setIsOpenModal(true);
                if (trashId !== value?.trashId && user.id === userId) {
                  setValue({trashId, userId});
                }
              }
            }
          }
        }
      }

      console.log('Data read from characteristic');
    } catch (err) {
      await device.discoverAllServicesAndCharacteristics();
      await device.connect();
      console.error('Error read data from characteristic: ', err);
    }
    try {
      await device.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        // @ts-expect-error ID can be integer not a string
        btoa(user.id.toString()),
      );
    } catch (err) {
      await device.discoverAllServicesAndCharacteristics();
      await device.connect();
      console.error('Error writing data to characteristic: ', err);
    }
  };

  const connectToDevice = async (dev: Device) => {
    try {
      if (!dev) {
        return;
      }
      const connectedDevice = await dev.connect();
      await connectedDevice.discoverAllServicesAndCharacteristics();
      console.log('Connected to Device!');
      setDevice(connectedDevice);
    } catch (error) {
      scanAndConnect();
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
      setTimeout(() => {
        scanAndConnect();
      }, 3000);
    }
  };

  // Every 4 seconds
  React.useEffect(() => {
    const id = setInterval(loopDevice, 3000);
    return () => {
      clearInterval(id);
    };
  }, [device]);

  React.useEffect(() => {
    requestPermissions();
    const subscription = manager.onStateChange((state: State) => {
      setDevice(null);
      if (state === State.PoweredOn) {
        scanAndConnect();
      }
    }, true);
    return () => subscription.remove();
  }, []);
  return (
    <bleContext.Provider value={{}}>
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
          <SuccessModal />
        </View>
      </Modal>
      {children}
    </bleContext.Provider>
  );
}
