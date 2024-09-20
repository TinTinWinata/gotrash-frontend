import LottieView from 'lottie-react-native';
import React from 'react';
import {Text, View} from 'react-native';
import Button from '../../components/Button/Button';
import {COLORS, FONTS} from '../../constants/theme';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {useNavigation} from '@react-navigation/native';

export default function NoGroupView() {
  const navigation = useNavigation<any>();
  return (
    <View
      style={[
        GlobalStyleSheet.container,
        {paddingHorizontal: 30, flex: 1, flexDirection: 'column'},
      ]}>
      <View style={{width: '100%', height: 450}}>
        <LottieView
          source={require('../../assets/lotties/group.json')}
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '70%',
            marginHorizontal: 'auto',
          }}
          autoPlay
          loop
        />
      </View>
      <Text
        style={{
          ...FONTS.fontSemiBold,
          fontSize: 22,
          textAlign: 'center',
          color: COLORS.text,
          marginHorizontal: 40,
          flexGrow: 1,
        }}>
        Ups! Sepertinya Anda tidak memiliki Group
      </Text>
      <Button
        style={{marginBottom: 20}}
        title="Buat Group Baru"
        onPress={() => {
          navigation.navigate('AddGroup');
        }}
      />
    </View>
  );
}
