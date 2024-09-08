import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import Header from '../../layout/Header';
import {useGoTrash} from '../../contexts/gotrashContext';
import NoGroupView from './NoGroupView';
import GroupView from './GroupView';
import {useQuery} from '@tanstack/react-query';
import LoaderKit from 'react-native-loader-kit';
import {COLORS} from '../../constants/theme';

type GroupScreenProps = StackScreenProps<RootStackParamList, 'Group'>;

const GroupScreen = ({navigation}: GroupScreenProps) => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  const {user, getGroup} = useGoTrash();
  const {data, isLoading} = useQuery({
    queryKey: ['group', user?.id, user?.group?.id],
    queryFn: getGroup,
  });

  if (isLoading) {
    return (
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
    );
  }

  return (
    <View style={{backgroundColor: colors.card, flex: 1}}>
      <Header
        title="Group"
        leftIcon={'back'}
        rightIcon2={data ? 'Add' : undefined}
        rightChildren={!data ? <View style={{width: 60}}></View> : <></>}
      />
      {data ? <GroupView group={data} /> : <NoGroupView />}
    </View>
  );
};

export default GroupScreen;
