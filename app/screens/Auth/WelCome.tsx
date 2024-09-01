import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {useTheme} from '@react-navigation/native';
import {IMAGES} from '../../constants/Images';
import {COLORS, FONTS} from '../../constants/theme';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import SocialBtn from '../../components/Socials/SocialBtn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Divider from '../../components/Dividers/Divider';
import {useGoTrash} from '../../contexts/gotrashContext';
import useLoader from '../../contexts/loaderContext';
import {ColorProperties} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import LottieView from 'lottie-react-native';

type WelComeScreenProps = StackScreenProps<RootStackParamList, 'WelCome'>;

const WelCome = ({navigation}: WelComeScreenProps) => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
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
            <View style={{marginBottom: 5, marginTop: 40}}>
              <SocialBtn
                onpress={async () => {
                  setIsLoading(true);
                  await guestLogin();
                  setIsLoading(false);
                  navigation.navigate('DrawerNavigation', {screen: 'Home'});
                }}
                border={COLORS.white}
                color={COLORS.white}
                textcolor={COLORS.primary}
                text="Login as Guest"
                rounded
                // icon={<FontAwesome name="user" size={22} color={COLORS.card} />}
              />
              <Text
                onPress={() => navigation.navigate('Onboarding')}
                style={{
                  ...FONTS.fontSemiBold,
                  color: 'white',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                Back to Onboarding
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

const styles = StyleSheet.create({
  welcomeimage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    ...FONTS.fontSemiBold,
    fontSize: 24,
    color: COLORS.title,
    textAlign: 'center',
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
});

export default WelCome;
