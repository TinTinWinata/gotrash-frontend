import React from 'react';
import {Image, Text, View} from 'react-native';
import {COLORS} from '../../constants/theme';
import {Trash} from '../../types/trash';
import {
  TRASH_CATEGORIES_IMAGE,
  TRASH_CATEGORIES_NAME,
} from '../../constants/trash';
import {formatDate} from '../../utils/dateUtils';

export default function TrashHistoryCard({trash}: {trash: Trash}) {
  return (
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
          uri: TRASH_CATEGORIES_IMAGE[trash.category],
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
            {TRASH_CATEGORIES_NAME[trash.category]}
          </Text>
          <Text style={{fontSize: 13}}>
            {trash.createdAt && formatDate(trash.createdAt)}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 15, color: COLORS.success}}>
            +{trash.coin} Coins
          </Text>
        </View>
      </View>
    </View>
  );
}
