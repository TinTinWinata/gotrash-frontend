import React, {useState} from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Header from '../../layout/Header';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {IMAGES} from '../../constants/Images';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {COLORS, FONTS} from '../../constants/theme';
import useLoader from '../../contexts/loaderContext';
import LoaderKit from 'react-native-loader-kit';
import {formatNumber} from '../../utils/stringUtils';
import Cardstyle5 from '../../components/Card/Cardstyle5';
import {Controller, useForm} from 'react-hook-form';
import {Group} from '../../types/group';
import {useGoTrash} from '../../contexts/gotrashContext';
import {useQuery} from '@tanstack/react-query';

const AddGroup = () => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  const {setIsLoading, successLoading} = useLoader();
  const form = useForm<Group>();
  const {createGroup, getRewards} = useGoTrash();
  const {data: rewardData, isLoading: isLoadingReward} = useQuery({
    queryKey: ['rewards'],
    queryFn: getRewards,
  });
  const navigation = useNavigation();
  const [isFocused, setisFocused] = useState(false);
  const [isFocused3, setisFocused3] = useState(false);

  const handleCreateGroup = async () => {
    setIsLoading(true);
    try {
      const response = await createGroup(form.getValues());
      if (response.status === 201) {
        navigation.goBack();
        await successLoading(
          'Grup telah dibuat! Ajak teman-teman Anda ke dalam grup!',
        );
      }
    } catch (err) {
      console.log('[Error]', JSON.stringify(err));
    }
    setIsLoading(false);
  };

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <Header title="Buat Group" leftIcon="back" titleRight />
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
              Detail Group
            </Text>
          </View>
          <View style={{marginBottom: 15, marginTop: 10}}>
            <Controller
              name="groupName"
              control={form.control}
              rules={{required: true}}
              render={({field}) => (
                <Input
                  onFocus={() => setisFocused(true)}
                  onBlur={() => {
                    field.onBlur();
                    setisFocused(false);
                  }}
                  onChangeText={field.onChange}
                  value={field.value}
                  isFocused={isFocused}
                  backround={colors.card}
                  style={{borderRadius: 48}}
                  inputicon
                  placeholder="Nama Group"
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
          {/* <View style={{marginBottom: 15}}>
            <Input
              onFocus={() => setisFocused3(true)}
              onBlur={() => setisFocused3(false)}
              isFocused={isFocused3}
              onChangeText={value => console.log(value)}
              backround={colors.card}
              style={{borderRadius: 48}}
              inputicon
              placeholder="Lokasi Group"
              icon={
                <Image
                  source={IMAGES.Pinduotone}
                  style={[styles.icon, {tintColor: colors.title}]}
                />
              }
            />
          </View> */}
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
              Pilih Reward Target
            </Text>
          </View>
          {isLoadingReward ? (
            <LoaderKit
              style={{
                marginVertical: 30,
                width: 75,
                height: 75,
                margin: 'auto',
              }}
              name={'LineScaleParty'}
              color={COLORS.primary}
            />
          ) : (
            rewardData?.map((data, index) => (
              <Cardstyle5
                key={index}
                brand="GoTrash"
                image={data.imageUrl}
                price={formatNumber(data.coin)}
                title={data.name}
                isChecked={form.watch('rewardId') === data.id}
                onPressChoose={() => {
                  form.setValue('rewardId', data.id || '');
                  form.trigger('rewardId');
                }}
              />
            ))
          )}
        </View>
      </ScrollView>
      <View style={[GlobalStyleSheet.container]}>
        <Button
          title="Buat Group"
          color={COLORS.primary}
          text={COLORS.card}
          onPress={form.handleSubmit(handleCreateGroup)}
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

export default AddGroup;
