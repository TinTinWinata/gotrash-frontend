import React, {useMemo} from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import Header from '../../layout/Header';
import {COLORS, FONTS} from '../../constants/theme';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import Divider from '../../components/Dividers/Divider';
import {IMAGES} from '../../constants/Images';
import BadgeLight from '../../components/Badge/BadgeLight';
import {MISSION_LIST} from '../../constants/mission';
import {Mission} from '../../types/mission';
import {ProgressBar} from 'react-native-paper';
import {useGoTrash} from '../../contexts/gotrashContext';

type MissionScreenProps = StackScreenProps<RootStackParamList, 'Mission'>;

const MissionScreen = ({}: MissionScreenProps) => {
  const {user} = useGoTrash();
  const {unfinishedMissions, finishedMissions} = useMemo(() => {
    const unfinished: Mission[] = [];
    const finished: Mission[] = [];
    MISSION_LIST.forEach(mission => {
      if (user?.finishedMission?.includes(mission.id)) {
        finished.push(mission);
      } else {
        unfinished.push(mission);
      }
    });
    return {unfinishedMissions: unfinished, finishedMissions: finished};
  }, [user]);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header title="Mission" leftIcon="back" titleRight />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingHorizontal: 30,
            paddingTop: 20,
          }}>
          {unfinishedMissions.length > 0 && (
            <>
              <View style={{alignSelf: 'flex-start'}}>
                <BadgeLight color={COLORS.danger} title="Not Done" />
              </View>
              <Divider dashed={true} />
              <View style={{display: 'flex', flexDirection: 'column', gap: 25}}>
                {unfinishedMissions.map((mission, index) => (
                  <MissionCard
                    key={index}
                    finished={false}
                    mission={mission}
                    index={index}
                  />
                ))}
              </View>
            </>
          )}
          {finishedMissions.length > 0 && (
            <>
              <View style={{alignSelf: 'flex-start', marginTop: 40}}>
                <BadgeLight title="Completed" />
              </View>
              <Divider dashed={true} />
              <View style={{display: 'flex', flexDirection: 'column', gap: 25}}>
                {finishedMissions.map((mission, index) => (
                  <MissionCard
                    key={index}
                    finished
                    mission={mission}
                    index={index}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <View style={[GlobalStyleSheet.container, {}]}>
        <View
          style={{
            margin: 10,
            padding: 20,
            borderRadius: 15,
            backgroundColor: 'rgba(217, 217, 217, 0.51)',
          }}>
          <Text style={{...FONTS.fontSemiBold, fontSize: 20}}>
            Mission Progress
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <View style={{width: '85%'}}>
              <ProgressBar
                progress={finishedMissions.length / MISSION_LIST.length}
                color={COLORS.primary}
              />
            </View>
            <Text style={{...FONTS.fontSemiBold, fontSize: 15}}>
              {finishedMissions.length} / {MISSION_LIST.length}
            </Text>
          </View>
          <Text style={{...FONTS.fontMedium, fontSize: 12, color: '#A0A0A0'}}>
            Finish all the mission and get special rewards from us!
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MissionScreen;

interface MissionCardProps {
  mission: Mission;
  index: number;
  finished: boolean;
}

function MissionCard({mission, index, finished}: MissionCardProps) {
  return (
    <View
      key={mission.id}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
      }}>
      <View
        style={{
          backgroundColor: finished
            ? 'rgba(63, 255, 120, 0.29)'
            : 'rgba(255,106,106,0.15)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 50,
          borderRadius: 5,
          height: 50,
        }}>
        <Text
          style={{
            ...FONTS.fontMedium,
            fontSize: 25,
            marginTop: 5,
            color: finished ? '#25DA1B' : '#F85050',
          }}>
          {index + 1}
        </Text>
      </View>
      <View style={{width: '50%'}}>
        <Text
          style={{
            ...FONTS.fontSemiBold,
            fontSize: 15,
            color: '#323232',
          }}>
          {mission.name}
        </Text>
        <Text style={{...FONTS.fontSemiBold, fontSize: 12, opacity: 0.5}}>
          {mission.smallDescription}
        </Text>
      </View>
      <View
        style={{
          height: '100%',
          width: 1,
          backgroundColor: 'rgba(0,0,0,0.05)',
        }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
        }}>
        <Image source={IMAGES.coin} />
        <Text
          style={{
            ...FONTS.fontMedium,
            color: '#FF8800',
            fontSize: 11,
          }}>
          {mission.reward}
        </Text>
      </View>
    </View>
  );
}
