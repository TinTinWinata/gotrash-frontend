import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Text} from 'react-native-paper';

const TrashMap = () => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;

  const handleMarkerPress = () => {
    console.log('Called!');
  };

  console.log('Rendering ..');

  return (
    <View style={{backgroundColor: colors.background}}>
      {/* <Header title="Trash Map" leftIcon="back" rightIcon1={'search'} /> */}
      <MapView style={{height: '100%', width: '100%'}}>
        <Marker
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          onPress={handleMarkerPress}
          title="Custom Marker"
          description="This is a custom marker">
          <View
            style={{
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 5,
              borderColor: 'black',
              borderWidth: 1,
            }}>
            <Text>📍</Text>
          </View>
        </Marker>
      </MapView>
    </View>
  );
};

export default TrashMap;
