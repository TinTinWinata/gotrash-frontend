import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Text} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import {COLORS} from '../../constants/theme';
import {useGoTrash} from '../../contexts/gotrashContext';
import {useQuery} from '@tanstack/react-query';
import {Trashbin} from '../../types/trashbin';

const TrashMap = () => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  const {getTrashbins} = useGoTrash();

  // Default location of Jakarta
  const [latitude, setLatitude] = useState<number>(-6.1983457);
  const [longitude, setLongitude] = useState<number>(106.7772286);
  const navigation = useNavigation();
  // // @ts-expect-error not used location fetched
  // const [locationFetched, setLocationFetched] = useState(false);
  const {data, isLoading} = useQuery({
    queryKey: ['trashBins'],
    queryFn: getTrashbins,
  });

  const getLocation = () => {
    if (!Geolocation) {
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        console.log('Location error:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          getLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getLocation();
    }
  };

  useEffect(() => {
    requestLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMarkerPress = (current: Trashbin) => {
    // @ts-ignore
    navigation.navigate('Trackorder', {id: current.id});
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <View style={{backgroundColor: colors.background}}>
      {/* <Header title="Trash Map" leftIcon="back" rightIcon1={'search'} /> */}
      <MapView
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.55,
          longitudeDelta: 0.55,
        }}
        provider={PROVIDER_GOOGLE}
        style={{
          height: '100%',
          width: '100%',
        }}>
        {data?.map((trashbin, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: trashbin.latitude,
              longitude: trashbin.longitude,
            }}
            onPress={() => handleMarkerPress(trashbin)}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight,
                padding: 2.5,
                borderWidth: 1.5,
                borderColor: COLORS.primary,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                }}>
                🗑️
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default TrashMap;
