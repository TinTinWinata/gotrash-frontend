import React from 'react';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';
import {useTheme} from 'react-native-paper';

export default function YourTrashHistory() {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  return (
    <View
      style={[
        GlobalStyleSheet.container,
        {paddingHorizontal: 0, paddingTop: 0},
      ]}>
      <View style={[GlobalStyleSheet.flex, {paddingHorizontal: 30}]}>
        <Text
          style={[styles.brandsubtitle3, {fontSize: 18, color: COLORS.black}]}>
          Your Trash History
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: -15,
          paddingHorizontal: 45,
          paddingTop: 25,
        }}>
        {/* Component */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: COLORS.card,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 18,
            borderWidth: 1,
            borderColor: '#EFEFEF',
            shadowColor: 'rgba(4,118,78,.6)',
            overflow: 'hidden',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            gap: 15,
            shadowOpacity: 0.34,
            shadowRadius: 18.27,
            elevation: 4,
          }}>
          <Image
            source={{
              uri: 'https://bernardlab.com/wp-content/uploads/2021/01/plastic-bottles.png',
            }}
            style={{
              height: 70,
              width: 80,
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <View style={{flex: 1, gap: 2}}>
              <Text style={{fontWeight: 500, color: COLORS.text, fontSize: 18}}>
                Plastic
              </Text>
              <Text style={{fontSize: 13}}>Today</Text>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 15, color: COLORS.success}}>
                +5 Coins
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  brandsubtitle3: {
    ...FONTS.fontMedium,
    fontSize: 12,
    color: COLORS.title,
  },
});
