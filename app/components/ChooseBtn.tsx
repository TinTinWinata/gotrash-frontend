import React from 'react';
import {Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../constants/theme';

type ChooseBtnProps = {
  isChecked: boolean;
  onPress: () => void;
};

const ChooseBtn = ({isChecked, onPress}: ChooseBtnProps) => {
  return (
    <Pressable
      accessible={true}
      accessibilityLabel="Like Btn"
      accessibilityHint="Like this item"
      onPress={() => (onPress ? onPress() : '')}
      style={{
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FontAwesome
        size={22}
        color={isChecked ? COLORS.primary : '#81BAA6'}
        name="check"
      />
    </Pressable>
  );
};

export default ChooseBtn;
