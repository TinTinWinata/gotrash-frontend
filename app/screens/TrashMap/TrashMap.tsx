import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Text} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import {COLORS} from '../../constants/theme';

const TrashMap = () => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;

  // Default location of Jakarlta
  const [latitude, setLatitude] = useState<number>(-6.2088);
  const [longitude, setLongitude] = useState<number>(106);
  const navigation = useNavigation();
  const [locationFetched, setLocationFetched] = useState(false);

  const getLocation = () => {
    if (!Geolocation) {
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        console.log('Position : ', position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocationFetched(true);
      },
      error => {
        console.log('Location error:', error);
        setLocationFetched(true); // Still set to true to render map with default coordinates
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
  }, []);

  const handleMarkerPress = () => {
    // @ts-ignore
    navigation.navigate('Trackorder');
  };

  return (
    <View style={{backgroundColor: colors.background}}>
      {/* <Header title="Trash Map" leftIcon="back" rightIcon1={'search'} /> */}
      <MapView
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        style={{height: '100%', width: '100%'}}>
        <Marker
          coordinate={{latitude: -6.2017585, longitude: 106.6298194}}
          onPress={handleMarkerPress}
          // title="Bina Nusantara University"
          // description="Go Trash"
        >
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
      </MapView>
    </View>
  );
};

export default TrashMap;
