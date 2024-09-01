import {BlurView} from '@react-native-community/blur';
import {createRef, useRef, useState} from 'react';
import {ChildrenProps} from '../types/children-only';
import {loaderContext} from '../contexts/loaderContext.tsx';
import React from 'react';
import {View} from 'react-native';
import {COLORS} from '../constants/theme.tsx';
import LoaderKit from 'react-native-loader-kit';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useTheme} from '@react-navigation/native';
import SuccessSheet from '../components/BottomSheet/SuccessSheet.tsx';

export default function LoaderProvider({children}: ChildrenProps) {
  const [isLoading, setLoader] = useState<boolean>(false);
  const {colors}: {colors: any} = useTheme();
  const sheetRef = useRef<any>();
  const [sheetText, setSheetText] = useState<string>('');

  async function successLoading(text: string) {
    console.log('Sheet ref : ', sheetRef.current);
    await sheetRef.current?.open();
    setSheetText(text);
  }

  return (
    <loaderContext.Provider
      value={{isLoading, setIsLoading: setLoader, successLoading}}>
      <RBSheet
        ref={sheetRef}
        closeOnPressBack={true}
        closeOnPressMask={true}
        height={210}
        openDuration={100}
        customStyles={{
          container: {
            backgroundColor: colors.cardBg,
          },
          draggableIcon: {
            marginTop: 10,
            marginBottom: 5,
            height: 5,
            width: 80,
            backgroundColor: colors.border,
          },
        }}>
        <SuccessSheet text={sheetText} />
      </RBSheet>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(255,255,255,0.6)',
          zIndex: 999,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: isLoading ? 'flex' : 'none',
        }}>
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.2,
          }}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <LoaderKit
          style={{width: 75, height: 75}}
          name={'BallPulse'}
          color={COLORS.primary}
        />
      </View>
      {children}
    </loaderContext.Provider>
  );
}
