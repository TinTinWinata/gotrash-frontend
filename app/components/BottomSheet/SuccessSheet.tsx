import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {COLORS, FONTS} from '../../constants/theme';

type SuccessSheetProps = {
  text?: string;
};

const SuccessSheet = ({text = ''}: SuccessSheetProps) => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;

  return (
    <View
      style={{
        alignItems: 'center',
        paddingHorizontal: 0,
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : colors.card,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 80,
            width: 80,
            opacity: 0.2,
            backgroundColor: COLORS.success,
            borderRadius: 80,
          }}
        />
        <View
          style={{
            height: 65,
            width: 65,
            backgroundColor: COLORS.success,
            borderRadius: 65,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <FeatherIcon size={32} color={COLORS.white} name="check"/> */}
          <FeatherIcon size={32} color={COLORS.white} name="check" />
        </View>
      </View>
      <Text
        style={{
          ...FONTS.h4,
          color: colors.title,
          marginBottom: 0,
          marginTop: 2,
        }}>
        Selamat!
      </Text>
      <Text
        style={{
          ...FONTS.font,
          color: colors.text,
          textAlign: 'center',
          width: '70%',
        }}>
        {text}
      </Text>
    </View>
  );
};

export default SuccessSheet;
