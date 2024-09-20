import React from 'react';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';
import {useGoTrash} from '../../contexts/gotrashContext';
import TrashHistoryCard from '../../components/Card/TrashHistoryCard';

export default function YourTrashHistory() {
  const {user} = useGoTrash();
  return (
    <View
      style={[
        GlobalStyleSheet.container,
        {paddingHorizontal: 0, paddingTop: 0},
      ]}>
      <View style={[GlobalStyleSheet.flex, {paddingHorizontal: 30}]}>
        <Text
          style={[styles.brandsubtitle3, {fontSize: 18, color: COLORS.black}]}>
          Riwayat Sampah
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: -15,
          paddingHorizontal: 45,
          paddingTop: 25,
        }}>
        {/* Component */}
        {user?.trashHistory.map((trash, index) => (
          <TrashHistoryCard key={index} trash={trash} />
        ))}
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
