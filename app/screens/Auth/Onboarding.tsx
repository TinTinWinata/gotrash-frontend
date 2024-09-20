import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Animated,
  Platform,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import LottieView from 'lottie-react-native';

const DATA = [
  {
    title: 'Buka Aplikasi GoTrash',
    subtitle:
      'Mulailah dengan membuka aplikasi GoTrash untuk memulai perjalanan Anda menuju lingkungan yang lebih bersih dan dapatkan hadiah.',
  },
  {
    title: 'Aktifkan Bluetooth',
    subtitle:
      'Pastikan Bluetooth diaktifkan agar aplikasi dapat terhubung dengan tempat sampah terdekat yang dilengkapi teknologi kami.',
  },
  {
    title: 'Buang Sampah',
    subtitle:
      'Buang sampah Anda ke dalam tempat sampah yang telah ditentukan. Sistem kami akan mendeteksinya secara otomatis dan memberikan poin kepada Anda.',
  },
  {
    title: 'Dapatkan Hadiah',
    subtitle:
      'Kumpulkan poin setiap kali Anda membuang sampah dan tukarkan dengan hadiah. Jadikan perbedaan dan dapatkan penghargaan!',
  },
];

type OnboardingScreenProps = StackScreenProps<RootStackParamList, 'Onboarding'>;

const Onboarding = ({navigation}: OnboardingScreenProps) => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;

  const IndexLottie = [
    <LottieView
      source={require('../../assets/lotties/phone.json')}
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
    />,
    <LottieView
      source={require('../../assets/lotties/bluetooth.json')}
      style={{
        position: 'absolute',
        left: 7,
        bottom: -30,
        width: '100%',
        height: '70%',
        marginHorizontal: 'auto',
      }}
      autoPlay
      loop
    />,
    <LottieView
      source={require('../../assets/lotties/trash.json')}
      style={{
        position: 'absolute',
        left: -15,
        bottom: 0,
        width: '100%',
        height: '70%',
        marginHorizontal: 'auto',
      }}
      autoPlay
      loop
    />,
    <LottieView
      source={require('../../assets/lotties/coin.json')}
      style={{
        position: 'absolute',
        left: 0,
        bottom: -20,
        width: '100%',
        height: '70%',
        marginHorizontal: 'auto',
      }}
      autoPlay
      loop
    />,
  ];

  const scrollRef = useRef<any>();

  const scrollX = useRef(new Animated.Value(0)).current;

  const [sliderIndex, setSliderIndex] = useState<number>(1);

  const onScroll = (event: any) => {
    scrollX.setValue(event.nativeEvent.contentOffset.x);
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    setSliderIndex(Math.round(contentOffsetX / SIZES.width) + 1);
  };

  const [imageScale] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(imageScale, {
        toValue: 0, // Scale up to 0
        duration: 100, // Animation duration
        useNativeDriver: true, // Add this line for better performance
      }),
      Animated.timing(imageScale, {
        toValue: 1, // Scale back to 1
        duration: 300, // Animation duration
        useNativeDriver: true, // Add this line for better performance
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderIndex]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.card}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <View
            style={[
              GlobalStyleSheet.container,
              {
                marginTop: 80,
                padding: 0,
                flex: 1,
              },
            ]}>
            <Animated.View
              style={{
                position: 'relative',
                height: 430,
              }}>
              {IndexLottie[sliderIndex - 1]}
            </Animated.View>
          </View>
          <View
            style={[
              GlobalStyleSheet.container,
              {padding: 0, marginBottom: 55},
            ]}>
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              scrollEventThrottle={16}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}>
              {DATA.map((data: any, index) => (
                <View
                  style={[
                    styles.slideItem,
                    Platform.OS === 'ios' &&
                      {
                        // paddingBottom:35
                      },
                  ]}
                  key={index}>
                  <View style={{paddingHorizontal: 30}}>
                    <Text style={[styles.title1, {color: colors.title}]}>
                      {data.title}
                    </Text>
                    <Text style={[styles.title2, {color: colors.text}]}>
                      {data.subtitle}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View
              style={[
                styles.indicatorConatiner,
                Platform.OS === 'ios' && {
                  bottom: 0,
                },
              ]}
              pointerEvents="none">
              {DATA.map((x: any, i: any) => (
                <Indicator i={i} key={i} scrollValue={scrollX} />
              ))}
            </View>
          </View>
        </View>
        <View
          style={[
            GlobalStyleSheet.container,
            {padding: 0, paddingHorizontal: 30, paddingBottom: 30},
          ]}>
          <Button
            style={{borderRadius: 52}}
            title="Mulai Sekarang"
            onPress={() => navigation.navigate('WelCome')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

function Indicator({i, scrollValue}: any) {
  const theme = useTheme();

  const translateX = scrollValue.interpolate({
    inputRange: [
      -SIZES.width + i * SIZES.width,
      i * SIZES.width,
      SIZES.width + i * SIZES.width,
    ],
    outputRange: [-20, 0, 20],
  });
  return (
    <View
      style={[
        styles.indicator,
        {
          backgroundColor: theme.dark
            ? 'rgba(255,255,255,0.20)'
            : 'rgba(0, 0, 0, 0.20)',
          borderColor: theme.dark
            ? 'rgba(255,255,255,0.20)'
            : 'rgba(0, 0, 0, 0.20)',
        },
      ]}>
      <Animated.View
        style={[
          styles.activeIndicator,
          {transform: [{translateX}], backgroundColor: COLORS.primary},
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorConatiner: {
    alignSelf: 'center',
    flexDirection: 'row',
    top: 25,
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    overflow: 'hidden',
  },
  activeIndicator: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  slideItem: {
    width: SIZES.width,
    //paddingBottom: 10,
  },
  text: {
    ...FONTS.fontLight,
    fontSize: 14,
    color: COLORS.title,
    textDecorationLine: 'underline',
  },
  image2: {
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 0.6,
    //position:'absolute',
    left: 0,
    right: 0,
    top: 0,
    resizeMode: 'contain',
    //backgroundColor:COLORS.primary
    //bottom:0,
  },
  title1: {
    ...FONTS.fontSemiBold,
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.title,
    //paddingHorizontal:30
  },
  title2: {
    ...FONTS.fontRegular,
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.text,
    paddingHorizontal: 10,
    marginTop: 5,
  },
});

export default Onboarding;
