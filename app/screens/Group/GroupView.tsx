import {Image, Text, View} from 'react-native';
import {Group} from '../../types/group';
import React from 'react';
import {COLORS, FONTS} from '../../constants/theme';
import {getImageSource} from '../../utils/objectUtils';
import * as Progress from 'react-native-progress';
import {formatNumber} from '../../utils/stringUtils';
import Divider from '../../components/Dividers/Divider';
import {IMAGES} from '../../constants/Images';

type GroupViewProps = {
  group: Group;
};

const CIRCLE_SIZE = 450;

export default function GroupView({group}: GroupViewProps) {
  return (
    <View>
      <View
        style={{
          height: CIRCLE_SIZE,
          width: CIRCLE_SIZE,
          backgroundColor: '#159c09',
          borderRadius: 999999,
          position: 'absolute',
          top: 0,
          transform: [
            {translateY: -CIRCLE_SIZE / 2},
            {translateX: -CIRCLE_SIZE / 2},
          ],
          left: '50%',
        }}
      />
      <View
        style={{
          shadowColor: 'rgba(4,118,78,.6)',
          shadowOffset: {
            width: 0,
            height: 4,
          },

          shadowOpacity: 0.34,
          shadowRadius: 18.27,
          elevation: 4,
          overflow: 'hidden',
          marginTop: 40,
          borderRadius: 10,
          backgroundColor: COLORS.primary,
          width: '75%',
          margin: 'auto',
        }}>
        <View
          style={{
            borderRadius: 10,
          }}>
          <Text
            style={{
              ...FONTS.fontSemiBold,
              textAlign: 'center',
              fontSize: 18,
              color: COLORS.white,
              paddingVertical: 7,
            }}>
            Reward Group
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#F8F9FE',
          }}>
          <Image
            style={{
              margin: 'auto',
              width: '100%',
              height: 150,
              borderRadius: 0,
              objectFit: 'cover',
            }}
            source={getImageSource(group.targetReward.imageUrl)}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: 'white',
          }}>
          <Text style={{...FONTS.fontBold, color: '#333333', fontSize: 18}}>
            {group.targetReward.name}
          </Text>
          <View style={{display: 'flex', flexDirection: 'column', gap: 5}}>
            <Text style={{...FONTS.fontSemiBold}}>
              {formatNumber(group.targetReward.coin)} coins
            </Text>
            <Progress.Bar
              color={'#34eb61'}
              width={null}
              height={8}
              borderRadius={99}
              unfilledColor={'#E8E9F1'}
              borderColor={'transparent'}
              progress={group.coins / group.targetReward.coin}
            />
            <Text
              style={{...FONTS.fontSemiBold, fontSize: 12, textAlign: 'right'}}>
              {group.coins} / {group.targetReward.coin}
            </Text>
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: 40, marginTop: 30}}>
        <Text
          style={{
            ...FONTS.fontSemiBold,
            fontSize: 26,
            textAlign: 'center',
            color: '#333333',
            marginHorizontal: 40,
            flexGrow: 1,
          }}>
          Leaderboard
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            marginTop: 20,
          }}>
          {group.members.map((members, index) => (
            <View
              key={index}
              style={{
                backgroundColor: COLORS.card,
                borderRadius: 18,
                width: '100%',
              }}>
              <View
                style={{
                  gap: 12,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <View style={{width: 20}}>
                  {index === 0 && (
                    <Image
                      style={{width: 22, height: 22}}
                      source={IMAGES.gold}
                    />
                  )}
                  {index === 1 && (
                    <Image
                      style={{width: 22, height: 22}}
                      source={IMAGES.silver}
                    />
                  )}
                  {index > 1 && (
                    <Text
                      style={{
                        ...FONTS.fontSemiBold,
                        color: COLORS.primary,
                        fontSize: 20,
                      }}>
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 700,
                  }}
                  source={{uri: members.imageUrl}}
                />
                <View style={{width: '65%'}}>
                  <Text
                    style={{
                      ...FONTS.fontSemiBold,
                      fontWeight: 700,
                      fontSize: 16,
                    }}>
                    {members.username}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.fontSemiBold,
                      fontWeight: 500,
                      fontSize: 13,
                      opacity: 0.6,
                    }}>
                    {members.email}
                  </Text>
                </View>
                <View style={{}}>
                  <Text style={{...FONTS.fontMedium}}>{members.rating} R</Text>
                </View>
              </View>
              <Divider dashed={true}></Divider>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
