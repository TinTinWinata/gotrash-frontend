import {RouteProp, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Header from '../../layout/Header';
import {COLORS, FONTS} from '../../constants/theme';
import {IMAGES} from '../../constants/Images';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import Geolocation from 'react-native-geolocation-service';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useGoTrash} from '../../contexts/gotrashContext';
import {Trashbin} from '../../types/trashbin';

type TrackorderScreenProps = StackScreenProps<
  RootStackParamList,
  'Trackorder'
> & {
  route: RouteProp<RootStackParamList, 'Trackorder'>;
};

type Location = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const Trackorder = ({navigation, route}: TrackorderScreenProps) => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  const {id} = route.params;
  const {getTrashbinById} = useGoTrash();
  const [pickupLocation, setPickupLocation] = useState<Location>();
  const [dropLocation, setDropLocation] = useState<Location>();

  const [data, setData] = useState<Trashbin>();
  useEffect(() => {
    (async () => {
      if (id) {
        const trashbin = await getTrashbinById(id);
        if (trashbin) {
          setData(trashbin);
          setDropLocation({
            latitude: trashbin.latitude,
            longitude: trashbin.longitude,
            latitudeDelta: 0.75,
            longitudeDelta: 0.75,
          });
        }
        Geolocation.getCurrentPosition(
          position => {
            setPickupLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.75,
              longitudeDelta: 0.75,
            });
          },
          error => {
            console.log('Location error:', error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    })();
  }, [id]);

  if (!data || !pickupLocation || !dropLocation) {
    return <></>;
  }

  return (
    <View style={{backgroundColor: colors.backround, flex: 1}}>
      <Header
        title="Tracking Trash"
        leftIcon="back"
        titleRight
        //titleLeft
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={[GlobalStyleSheet.container, {padding: 0}]}>
          {Platform.OS === 'android' && (
            <View style={{}}>
              <View style={[styles.container, {}]}>
                <MapView
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={styles.map}
                  initialRegion={pickupLocation}>
                  <Marker coordinate={pickupLocation} />
                  <Marker coordinate={dropLocation} />
                </MapView>
                {/* <View
                  style={{
                    height: 84,
                    width: 141,
                    backgroundColor: COLORS.card,
                    borderRadius: 20,
                    padding: 20,
                    position: 'absolute',
                    top: '55%',
                    left: 170,
                  }}>
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      backgroundColor: COLORS.card,
                      position: 'absolute',
                      transform: [{rotate: '45deg'}],
                      top: -10,
                      left: 25,
                    }}
                  />
                  <Text
                    style={{
                      ...FONTS.fontLight,
                      fontSize: 12,
                      color: '#A1A1A1',
                    }}>
                    Estimated Time
                  </Text>
                  <Text
                    style={{
                      ...FONTS.fontSemiBold,
                      fontSize: 18,
                      color: COLORS.title,
                    }}>
                    5-10 min
                  </Text>
                </View> */}
              </View>
            </View>
          )}
        </View>
        <View style={[GlobalStyleSheet.container, styles.TrackCard]}>
          <View style={[GlobalStyleSheet.flex, {padding: 30}]}>
            {/* <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
              <Image
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                }}
                source={IMAGES.small6}
              />
              <View>
                <Text style={[styles.cardtitle, {color: COLORS.card}]}>
                  Mr. Shandy
                </Text>
                <Text
                  style={{
                    ...FONTS.fontRegular,
                    fontSize: 14,
                    color: COLORS.card,
                  }}>
                  ID 2445556
                </Text>
              </View>
            </View> */}
            {/* <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Call')}
                activeOpacity={0.8}
                style={styles.cardimage}>
                <Image style={[GlobalStyleSheet.image3]} source={IMAGES.call} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Singlechat')}
                activeOpacity={0.8}
                style={styles.cardimage}>
                <Image
                  style={[GlobalStyleSheet.image3, {tintColor: COLORS.card}]}
                  source={IMAGES.chat}
                />
              </TouchableOpacity>
            </View> */}
          </View>
          <View
            style={[
              GlobalStyleSheet.container,
              styles.TrackCard2,
              {
                backgroundColor: theme.dark ? colors.background : COLORS.card,
              },
            ]}>
            <View style={{alignItems: 'center', marginVertical: 10}}>
              <View
                style={{
                  height: 6,
                  width: 60,
                  borderRadius: 20,
                  backgroundColor: '#DDDDDD',
                }}
              />
            </View>
            <View style={[styles.flex, {marginTop: 20}]}>
              <View
                style={[
                  styles.cardcricle,
                  {
                    backgroundColor: '#D9EDE6',
                  },
                ]}>
                <Image
                  style={[GlobalStyleSheet.image3, {tintColor: COLORS.primary}]}
                  source={IMAGES.map}
                />
              </View>
              <View style={{paddingRight: 80}}>
                <Text style={[styles.cardtitle, {color: colors.title}]}>
                  {data.name}
                </Text>
                <Text style={[styles.cardsubtitle, {color: '#747475'}]}>
                  {data.address}
                </Text>
              </View>
            </View>
            <View style={[styles.trackLine, {borderColor: '#C4C4C4'}]} />
            <View style={[styles.flex, {marginTop: 30}]}>
              <View
                style={[
                  styles.cardcricle,
                  {
                    borderWidth: 1,
                    borderColor: '#CFCFCF',
                    backgroundColor: colors.card,
                  },
                ]}>
                <Image
                  style={[GlobalStyleSheet.image3, {tintColor: colors.title}]}
                  source={IMAGES.home}
                />
              </View>
              <View>
                <Text style={[styles.cardtitle, {color: colors.title}]}>
                  Your Location
                </Text>
                <Text style={[styles.cardsubtitle, {color: '#747475'}]}>
                  Location
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: undefined,
    width: '100%',
    aspectRatio: 1 / 1.2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  TrackCard: {
    flex: 1,
    padding: 0,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    marginTop: -40,
  },
  TrackCard2: {
    flex: 1,
    padding: 0,
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 30,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  cardtitle: {
    ...FONTS.fontMedium,
    fontSize: 16,
    color: COLORS.title,
  },
  cardsubtitle: {
    ...FONTS.fontRegular,
    fontSize: 12,
    color: COLORS.title,
  },
  cardimage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#1F9D71',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardcricle: {
    height: 57,
    width: 57,
    borderRadius: 60,
    backgroundColor: '#D9EDE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackLine: {
    height: 39,
    width: 2,
    position: 'absolute',
    left: 57,
    top: 87,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderStyle: 'dashed',
    zIndex: -1,
  },
});

export default Trackorder;
