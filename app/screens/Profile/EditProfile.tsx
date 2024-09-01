import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Header from '../../layout/Header';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {IMAGES} from '../../constants/Images';
import Input from '../../components/Input/Input';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../../components/Button/Button';
import {COLORS, FONTS} from '../../constants/theme';
import {useGoTrash} from '../../contexts/gotrashContext';
import {Controller, useForm} from 'react-hook-form';
import {User} from '../../types/user';
import useLoader from '../../contexts/loaderContext';

const EditProfile = () => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  const {user, updateImage} = useGoTrash();

  const navigation = useNavigation<any>();

  const [isFocused, setisFocused] = useState(false);
  const [isFocused1, setisFocused1] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [isFocused3, setisFocused3] = useState(false);
  const form = useForm<User>({
    defaultValues: user,
  });
  const {updateUser} = useGoTrash();
  const {setIsLoading} = useLoader();
  const [imageUrl, setImageUrl] = useState(user?.imageUrl || '');

  const handleSubmit = async (e: User) => {
    setIsLoading(true);
    await updateUser(e);
    setIsLoading(false);
    navigation.navigate('Profile');
  };

  const handleImageSelect = () => {
    if (Platform.OS == 'android') {
      try {
        ImagePicker.openPicker({
          width: 200,
          height: 200,
          cropping: true,
        }).then(async (image: {path: React.SetStateAction<string>}) => {
          console.log(image.path);
          setIsLoading(true);
          setImageUrl(image.path);
          await updateImage(image.path.toString());
          setIsLoading(false);
          navigation.navigate('Profile');
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <Header title="Edit Profile" leftIcon="back" titleRight />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 15,
          marginBottom: 50,
        }}>
        <View
          style={[
            GlobalStyleSheet.container,
            {
              backgroundColor: theme.dark
                ? 'rgba(255,255,255,.1)'
                : colors.card,
              marginTop: 10,
              borderRadius: 15,
            },
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            <View style={{}}>
              <View style={styles.imageborder}>
                <Image
                  style={{height: 82, width: 82, borderRadius: 50}}
                  source={imageUrl ? {uri: imageUrl} : IMAGES.small6}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleImageSelect}
                style={[
                  styles.WriteIconBackground,
                  {backgroundColor: colors.card},
                ]}>
                <View style={styles.WriteIcon}>
                  <Image
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: 'contain',
                      tintColor: COLORS.card,
                    }}
                    source={IMAGES.write}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={[FONTS.fontMedium, {fontSize: 19, color: colors.title}]}>
                {user?.username}
              </Text>
              <Text
                style={[FONTS.fontRegular, {fontSize: 12, color: colors.text}]}>
                {user?.email}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            GlobalStyleSheet.container,
            {
              backgroundColor: theme.dark
                ? 'rgba(255,255,255,.1)'
                : colors.card,
              marginTop: 10,
              paddingVertical: 10,
              borderRadius: 15,
            },
          ]}>
          <View
            style={[
              styles.cardBackground,
              {borderBottomColor: COLORS.inputborder, borderStyle: 'dashed'},
            ]}>
            <Text
              style={{...FONTS.fontRegular, fontSize: 14, color: colors.title}}>
              Personal Information
            </Text>
          </View>
          <View style={{marginBottom: 15, marginTop: 10}}>
            <Controller
              name="username"
              control={form.control}
              rules={{required: true}}
              render={({field}) => (
                <Input
                  onFocus={() => setisFocused(true)}
                  onBlur={() => {
                    setisFocused(false);
                    field.onBlur();
                  }}
                  onChangeText={field.onChange}
                  value={field.value}
                  isFocused={isFocused}
                  backround={colors.card}
                  style={{borderRadius: 48}}
                  inputicon
                  placeholder="Full Name"
                  icon={
                    <Image
                      source={IMAGES.user2}
                      style={[styles.icon, {tintColor: colors.title}]}
                    />
                  }
                />
              )}
            />
          </View>
          <Controller
            name="phoneNumber"
            control={form.control}
            rules={{required: true}}
            render={({field}) => (
              <View style={{marginBottom: 15}}>
                <Input
                  onFocus={() => setisFocused1(true)}
                  onBlur={() => {
                    field.onBlur();
                    setisFocused1(false);
                  }}
                  onChangeText={field.onChange}
                  value={field.value}
                  isFocused={isFocused1}
                  backround={colors.card}
                  style={{borderRadius: 48}}
                  keyboardType={'number-pad'}
                  inputicon
                  placeholder="Mobile No."
                  icon={
                    <Image
                      source={IMAGES.Phoneduotone}
                      style={[styles.icon, {tintColor: colors.title}]}
                    />
                  }
                />
              </View>
            )}
          />
          <View style={{marginBottom: 15}}>
            <Controller
              name="email"
              control={form.control}
              rules={{required: true}}
              render={({field}) => (
                <Input
                  onFocus={() => setisFocused2(true)}
                  onBlur={() => {
                    field.onBlur();
                    setisFocused2(false);
                  }}
                  onChangeText={field.onChange}
                  value={field.value}
                  isFocused={isFocused2}
                  backround={colors.card}
                  style={{borderRadius: 48}}
                  inputicon
                  placeholder="Email Address "
                  icon={
                    <Image
                      source={IMAGES.email2}
                      style={[styles.icon, {tintColor: colors.title}]}
                    />
                  }
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View style={[GlobalStyleSheet.container]}>
        <Button
          title="Update Profile"
          color={COLORS.primary}
          text={COLORS.card}
          onPress={form.handleSubmit(handleSubmit)}
          style={{borderRadius: 50}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
  },
  cardBackground: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
    marginHorizontal: -15,
    paddingHorizontal: 15,
    paddingBottom: 15,
    marginBottom: 10,
  },
  imageborder: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    height: 90,
    width: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  WriteIconBackground: {
    height: 42,
    width: 42,
    borderRadius: 40,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 60,
  },
  WriteIcon: {
    height: 36,
    width: 36,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  InputTitle: {
    ...FONTS.fontMedium,
    fontSize: 13,
    color: COLORS.title,
    marginBottom: 5,
  },
  bottomBtn: {
    height: 75,
    width: '100%',
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

export default EditProfile;
