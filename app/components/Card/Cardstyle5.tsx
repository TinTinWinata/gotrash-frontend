import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constants/theme';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {useTheme} from '@react-navigation/native';
import ChooseBtn from '../ChooseBtn';
import { getImageSource } from '../../utils/objectUtils';

type Props = {
  title: string;
  brand: string;
  price: string;
  image?: any;
  writeReview?: any;
  isChecked?: boolean;
  countnumber?: string;
  onPressChoose?: () => void;
};

const Cardstyle5 = ({
  title,
  image,
  price,
  onPressChoose,
  brand,
  isChecked = false,
}: Props) => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        backgroundColor: colors.card,
        padding: 15,
      }}>
      <View style={{width: '30%', alignItems: 'center'}}>
        <View
          style={{
            height: undefined,
            width: '100%',
            backgroundColor: COLORS.primary,
            borderRadius: 22,
            aspectRatio: 1 / 1,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
          <Image
            style={{height: undefined, width: '100%', aspectRatio: 1 / 1.2}}
            source={getImageSource(image)}
          />
        </View>
      </View>
      <View
        style={{
          width: '70%',
          paddingLeft: 15,
        }}>
        <View>
          <Text
            style={{
              ...FONTS.fontMedium,
              fontSize: 16,
              color: colors.title,
              paddingRight: 25,
            }}>
            {title}
          </Text>
          <Text
            style={{
              ...FONTS.fontRegular,
              fontSize: 12,
              color: '#6A6A6A',
              marginTop: 5,
            }}>
            {brand}
          </Text>
        </View>
        <View
          style={[
            GlobalStyleSheet.flex,
            {marginTop: 0, alignItems: 'flex-end'},
          ]}>
          <Text
            style={{...FONTS.fontSemiBold, fontSize: 18, color: colors.title}}>
            {price}
          </Text>
          <View style={{}}>
            <ChooseBtn
              onPress={() => onPressChoose && onPressChoose()}
              isChecked={isChecked}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Cardstyle5;
