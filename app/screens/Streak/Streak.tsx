import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import Header from '../../layout/Header';
import {COLORS, FONTS} from '../../constants/theme';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import LoaderKit from 'react-native-loader-kit';
import {useGoTrash} from '../../contexts/gotrashContext';
import {useQuery} from '@tanstack/react-query';
import {formatDate} from '../../utils/dateUtils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TrashHistoryCard from '../../components/Card/TrashHistoryCard';
import Divider from '../../components/Dividers/Divider';

type StreakScreenProps = StackScreenProps<RootStackParamList, 'Streak'>;

const StreakScreen = ({}: StreakScreenProps) => {
  const {user, getStreakHistory} = useGoTrash();
  const {data, isLoading} = useQuery({
    queryKey: ['streakHistory', user?.id, user?.currentStreak],
    queryFn: getStreakHistory,
  });
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header title="Riwayat Streak" leftIcon="back" titleRight />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingHorizontal: 30,
            paddingTop: 20,
          }}>
          {!isLoading && data?.length === 0 && (
            <View
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 20,
              }}>
              <FontAwesome5
                name="fire"
                size={100}
                color={'gray'}
                style={{opacity: 0.3}}
              />
              <Text
                style={{
                  ...FONTS.fontSemiBold,
                  fontSize: 20,
                  textAlign: 'center',
                  marginBottom: 50,
                }}>
                Kamu belum memiliki {'\n'}streak!
              </Text>
            </View>
          )}
          {isLoading ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LoaderKit
                style={{width: 75, height: 75}}
                name={'BallPulse'}
                color={COLORS.primary}
              />
            </View>
          ) : (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                marginTop: 10,
              }}>
              {data?.map((streak, index) => (
                <View key={index}>
                  <Text style={{...FONTS.fontSemiBold, fontSize: 15}}>
                    {formatDate(streak.startDate)} -{' '}
                    {formatDate(streak.endDate)}
                  </Text>
                  <Divider dashed={true} />
                  <View>
                    {streak.trashHistory.map((trash, trashIndex) => (
                      <TrashHistoryCard trash={trash} key={trashIndex} />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      {/* <View style={[GlobalStyleSheet.container, {}]}>
        <View
          style={{
            margin: 10,
            padding: 20,
            borderRadius: 15,
            backgroundColor: 'rgba(217, 217, 217, 0.51)',
          }}>
          <Text style={{...FONTS.fontSemiBold, fontSize: 20}}>
            Streak Progress
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <View style={{width: '85%'}}></View>
            <Text style={{...FONTS.fontSemiBold, fontSize: 15}}></Text>
          </View>
          <Text style={{...FONTS.fontMedium, fontSize: 12, color: '#A0A0A0'}}>
            Finish all the mission and get special rewards from us!
          </Text>
        </View>
      </View> */}
    </View>
  );
};

export default StreakScreen;
