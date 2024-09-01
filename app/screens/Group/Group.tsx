import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import Header from '../../layout/Header';
import {useGoTrash} from '../../contexts/gotrashContext';
import NoGroupView from './NoGroupView';
import GroupView from './GroupView';

type GroupScreenProps = StackScreenProps<RootStackParamList, 'Group'>;

const GroupScreen = ({navigation}: GroupScreenProps) => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  const {user} = useGoTrash();

  return (
    <View style={{backgroundColor: colors.card, flex: 1}}>
      <Header title="Group" leftIcon={'back'} rightIcon2={'Edit'} />
      {user?.group ? <GroupView group={user.group} /> : <NoGroupView />}
    </View>
  );
};

export default GroupScreen;
