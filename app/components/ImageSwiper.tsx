import React, {useState} from 'react';
import {
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {COLORS, FONTS} from '../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {Reward} from '../types/reward';
import {formatNumber} from '../utils/stringUtils';

const ImageSwiper = ({data}: {data: Reward[]}) => {
  const [newData] = useState([
    //{ key: 'space-left' },
    ...data,
    //{ key: 'space-right' },
  ]);

  const {width} = useWindowDimensions();
  const SIZE = width * 0.5;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);

  const onScroll = (event: {nativeEvent: {contentOffset: {x: number}}}) => {
    x.value = event.nativeEvent.contentOffset.x;
  };

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      snapToInterval={SIZE}
      decelerationRate="fast"
      onScroll={onScroll}
      contentContainerStyle={{
        paddingTop: 80,
        paddingBottom: 50,
      }}>
      {newData.map((item, index) => (
        <Item
          SIZE={SIZE}
          SPACER={SPACER}
          x={x}
          item={item}
          index={index}
          key={index}
        />
      ))}
    </Animated.ScrollView>
  );
};

export default ImageSwiper;

type ItemProps = {
  item: Reward;
  index: number;
  x: SharedValue<number>;
  SIZE: number;
  SPACER: number;
};

function Item({x, item, index, SIZE, SPACER}: ItemProps) {
  const navigation = useNavigation<any>();
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 1) * SIZE, (index - 2) * SIZE, index * SIZE],
      [0.8, 0.7, 0.9],
    );
    return {
      transform: [{scale}],
    };
  });

  if (!item.imageUrl) {
    return <View style={{width: SPACER}} key={index} />;
  }

  return (
    <View key={index} style={{width: SIZE}}>
      <Animated.View style={[style]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {}}
          style={{
            height: 222,
            width: 206,
            backgroundColor: '#28a83d',
            borderRadius: 31,
            shadowColor: '#025135',
            shadowOffset: {
              width: 0,
              height: 15,
            },
            shadowOpacity: 0.34,
            shadowRadius: 31.27,
            elevation: 8,
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{
                height: 160,
                width: 210,
                resizeMode: 'contain',
                marginTop: -60,
                paddingBottom: 0,
              }}
              source={
                typeof item.imageUrl === 'string'
                  ? {uri: item.imageUrl}
                  : item.imageUrl
              }
            />
          </View>
          <View
            style={{
              paddingHorizontal: 25,
              paddingTop: 20,
            }}>
            <Text
              style={{
                ...FONTS.fontSemiBold,
                fontSize: 16,
                color: COLORS.card,
              }}>
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                gap: 5,
                marginTop: 10,
              }}>
              <Text
                style={{
                  ...FONTS.fontSemiBold,
                  fontSize: 24,
                  color: COLORS.card,
                  lineHeight: 32,
                }}>
                {formatNumber(item.coin)}
              </Text>
              <Text
                style={{
                  ...FONTS.fontSemiBold,
                  fontSize: 12,
                  color: COLORS.card,
                }}>
                Coins
              </Text>
              {/* <Text
                      style={{
                        ...FONTS.fontMedium,
                        fontSize: 16,
                        color: '#6CAE97',
                        textDecorationLine: 'line-through',
                      }}>
                      {item.coin}
                    </Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
