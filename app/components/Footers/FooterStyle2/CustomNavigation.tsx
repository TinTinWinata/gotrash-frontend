import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigationState, useTheme} from '@react-navigation/native';
import {SIZES, COLORS, FONTS} from '../../../constants/theme';
import {IMAGES} from '../../../constants/Images';
import {GlobalStyleSheet} from '../../../constants/StyleSheet';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';

const home = require('../../../assets/images/icons/home.png');
const profile = require('../../../assets/images/icons/user3.png');
const group = require('../../../assets/images/icons/send.png');
const map = require('../../../assets/images/icons/map.png');
const market = require('../../../assets/images/icons/producta.png');

const NO_NEED_EXTRA_GAP_SCREEN = new Set(['Location']);

const CustomNavigation = ({
  state,
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;

  const [tabWidth, setWidth] = useState(wp('100%'));

  const tabWD =
    tabWidth < SIZES.container ? (tabWidth - 20) / 5 : SIZES.container / 5;

  const circlePosition = useRef(new Animated.Value(0)).current;

  Dimensions.addEventListener('change', val => {
    setWidth(val.window.width);
  });

  useEffect(() => {
    Animated.spring(circlePosition, {
      toValue: state.index * tabWD,
      useNativeDriver: true,
    }).start();
  }, [state.index, tabWidth]);
  console.log(state.routeNames);

  return (
    <>
      {!NO_NEED_EXTRA_GAP_SCREEN.has(state.routeNames[state.index]) && (
        <View
          style={{
            height: 50,
            width: '100%',
          }}></View>
      )}
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          position: 'absolute',
          //width:'100%',
          width: 'auto',
          left: 10,
          right: 10,
          bottom: 10,
          borderRadius: 20,
          shadowColor: 'rgba(0,0,0,.6)',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
          //backgroundColor:'green'
          backgroundColor: theme.dark ? 'rgba(0,9,9,.6)' : colors.card,
        }}>
        <View
          style={[
            GlobalStyleSheet.container,
            {
              flexDirection: 'row',
              paddingHorizontal: 0,
              paddingTop: 0,
              paddingBottom: 0,
            },
          ]}>
          <Animated.View style={{transform: [{translateX: circlePosition}]}}>
            <View
              style={{
                width:
                  tabWidth < SIZES.container
                    ? tabWidth / 5
                    : SIZES.container / 5,
                position: 'absolute',
                //backgroundColor:'red',
                zIndex: 1,
                bottom: 10,
                left: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
                //width:(SIZES.width - 30) / 5,
              }}>
              {/* <View
                            style={{
                                height:65,
                                width:65,
                                borderRadius:0,
                                backgroundColor:'rgba(255,255,255,.1)',
                                position:'absolute',
                            }}
                        /> */}
              <View
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 45,
                  backgroundColor: theme.dark ? COLORS.white : COLORS.primary,
                }}
              />
            </View>
          </Animated.View>
          {state.routes.map((route: any, index: number) => (
            <Item
              key={index}
              route={route}
              index={index.toString()}
              state={state}
              navigation={navigation}
              descriptors={descriptors}
            />
          ))}
        </View>
      </View>
    </>
  );
};

type ItemProps = {
  index: string;
  route: any;
  state: any;
  navigation: any;
  descriptors: any;
};

function Item({index, route, state, navigation, descriptors}: ItemProps) {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;

  const {options} = descriptors[route.key];
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : route.name;

  const isFocused = state.index.toString() === index.toString();

  const iconTranslateY = useRef(new Animated.Value(0)).current;
  Animated.timing(iconTranslateY, {
    toValue: isFocused ? 0 : 0,
    duration: 200,
    useNativeDriver: true,
  }).start();

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate({name: route.name, merge: true});
    }
  };

  return (
    <View key={index} style={styles.tabItem}>
      <TouchableOpacity onPress={onPress} style={styles.tabLink}>
        <Animated.View
          style={{
            transform: [{translateY: iconTranslateY}],
          }}>
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              marginBottom: 5,
              marginLeft: 3,
              opacity: isFocused ? 1 : 0.6,
              tintColor: isFocused
                ? theme.dark
                  ? COLORS.title
                  : COLORS.white
                : colors.text,
            }}
            source={
              label === 'Home'
                ? home
                : label === 'Location'
                ? map
                : label === 'Store'
                ? market
                : label === 'Group'
                ? group
                : label === 'Profile'
                ? profile
                : IMAGES.Home
            }
          />
        </Animated.View>
        {!isFocused && (
          <Text style={[styles.navText, {color: '#454545', opacity: 0.5}]}>
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    borderTopWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  tabLink: {
    alignItems: 'center',
  },
  navText: {
    ...FONTS.fontXs,
    ...FONTS.fontMedium,
  },
});

export default CustomNavigation;
