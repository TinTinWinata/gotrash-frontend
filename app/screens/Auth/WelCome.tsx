import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {COLORS, FONTS} from '../../constants/theme';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import SocialBtn from '../../components/Socials/SocialBtn';
import Divider from '../../components/Dividers/Divider';
import {useGoTrash} from '../../contexts/gotrashContext';
import useLoader from '../../contexts/loaderContext';
import LottieView from 'lottie-react-native';

type WelComeScreenProps = StackScreenProps<RootStackParamList, 'WelCome'>;

const WelCome = ({navigation}: WelComeScreenProps) => {
  const {guestLogin} = useGoTrash();
  const {setIsLoading} = useLoader();

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFE9'}}>
      {/* <Image style={styles.welcomeimage} source={IMAGES.welcome} /> */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={[
            GlobalStyleSheet.container,
            {padding: 0, marginTop: 60, flex: 1},
          ]}>
          {/* <Image
            style={{
              height: undefined,
              width: '100%',
              aspectRatio: 1 / 1,
              zIndex: 99,
            }}
            source={IMAGES.welcome2}
          /> */}
        </View>
        <View style={{position: 'relative', height: 400}}>
          <LottieView
            source={require('../../assets/lotties/login.json')}
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
        <View style={{backgroundColor: COLORS.primary}}>
          <View
            style={[
              GlobalStyleSheet.container,
              {paddingHorizontal: 35, paddingBottom: 50},
            ]}>
            {/* <Text style={[styles.title, {color: colors.title}]}>
              Login With Your Preferred Account
            </Text> */}
            {/* <View style={{marginBottom: 2}}>
              <SocialBtn
                text="Login with email"
                color={COLORS.primary}
                textcolor={COLORS.card}
                rounded
                icon={
                  <FontAwesome name="envelope" size={22} color={COLORS.card} />
                }
                border={COLORS.primary}
                onpress={() => navigation.navigate('SignIn')}
              />
            </View> */}
            <Divider
              dashed
              color={COLORS.white}
              style={{
                opacity: 0.75,
              }}
            />
            <View
              style={{
                marginBottom: 5,
                marginTop: 40,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}>
              {/* <SocialBtn
                onpress={async () => {
                  // setIsLoading(true);
                  // await guestLogin();
                  // setIsLoading(false);
                  navigation.navigate('SignIn');
                }}
                border={COLORS.white}
                color={COLORS.white}
                textcolor={COLORS.primary}
                text="Login"
                rounded
                // icon={<FontAwesome name="user" size={22} color={COLORS.card} />}
              /> */}
              <SocialBtn
                onpress={async () => {
                  setIsLoading(true);
                  await guestLogin();
                  setIsLoading(false);
                  navigation.navigate('DrawerNavigation', {
                    screen: 'Home',
                  });
                }}
                border={COLORS.white}
                color={COLORS.white}
                textcolor={COLORS.primary}
                text="Masuk Sebagai Guest"
                rounded
                // icon={<FontAwesome name="user" size={22} color={COLORS.card} />}
              />
              <Text
                onPress={() => navigation.navigate('Onboarding')}
                style={{
                  ...FONTS.fontSemiBold,
                  color: 'white',
                  textAlign: 'center',
                }}>
                Kembali ke Pengenalan
              </Text>
            </View>
            {/* <View>
              <SocialBtn
                text="Login with Google"
                color={COLORS.card}
                textcolor={COLORS.title}
                rounded
                icon={
                  <Image
                    source={IMAGES.google2}
                    style={{resizeMode: 'contain', height: 22, width: 22}}
                  />
                }
              />
            </View> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WelCome;
