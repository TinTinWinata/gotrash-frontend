/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
  State,
} from 'react-native-ble-plx';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';

import {atob, btoa} from 'react-native-quick-base64';

const manager = new BleManager();
const SERVICE_UUID = '180D';
const CHARACTERISTIC_UUID = '2A37';

export default function useBLE() {
  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    const id = setInterval(loopDevice, 3000);
    return () => {
      clearInterval(id);
    };
  }, [device]);

  const loopDevice = async () => {
    if (!device) {
      return;
    }
    try {
      console.log('Trying to writing characteristics...');
      const data = '1';
      await device.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        btoa(data),
      );
      console.log('Data written to characteristic');
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
      console.error('Connection error: ', error);
    }
  };

  // !TODO: Request Permission still not following the correct documentation
  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const apiLevel = await DeviceInfo.getApiLevel();

        if (apiLevel < 31) {
          const permission = await PermissionsAndroid.request(
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
          const result = await requestMultiple([
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ]);

          const isGranted =
            result['android.permission.BLUETOOTH_CONNECT'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            result['android.permission.BLUETOOTH_SCAN'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            result['android.permission.ACCESS_FINE_LOCATION'] ===
              PermissionsAndroid.RESULTS.GRANTED;
        }
      }
    } catch (error) {
      console.error('Permission request error: ', error);
    }
  };

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.error('Scan error: ', error);
        return;
      }
      if (scannedDevice) {
        if (scannedDevice.name === 'GoTrash') {
          manager.stopDeviceScan();
          connectToDevice(scannedDevice);
        }
      }
    });
  };
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermissions();
    }
    const subscription = manager.onStateChange((state: State) => {
      setDevice(null);
      if (state === State.PoweredOn) {
        scanAndConnect();
      }
    }, true);

    return () => subscription.remove();
  }, []);
}
