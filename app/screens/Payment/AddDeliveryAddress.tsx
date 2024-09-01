import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Header from '../../layout/Header';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS, FONTS} from '../../constants/theme';
import Input from '../../components/Input/Input';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {IMAGES} from '../../constants/Images';
import {Controller, useForm} from 'react-hook-form';
import {Address} from '../../types/address';
import {useGoTrash} from '../../contexts/gotrashContext';

type AddDeliveryAddressScreenProps = StackScreenProps<
  RootStackParamList,
  'AddDeliveryAddress'
>;

const AddDeliveryAddress = ({navigation}: AddDeliveryAddressScreenProps) => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  const {addAddress} = useGoTrash();
  const productSizes = ['Home', 'Shop', 'Office'];

  const [activeSize, setActiveSize] = useState(productSizes[0]);

  const [isFocused, setisFocused] = useState(false);
  const [isFocused1, setisFocused1] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);

  const form = useForm<Address>({
    defaultValues: {
      title: 'Home Address',
    },
  });

  const handleSubmit = (e: Address) => {
    addAddress(e);
    navigation.goBack();
  };

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <Header
        title="Add Delivery Address"
        leftIcon="back"
        //titleLeft
        titleRight
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 20, padding: 15}}>
        <View
          style={[
            GlobalStyleSheet.container,
            {
              backgroundColor: theme.dark
                ? 'rgba(255,255,255,.1)'
                : colors.card,
              marginBottom: 10,
              borderRadius: 15,
            },
          ]}>
          <Text
            style={[
              styles.cardTitle,
              {color: colors.title, borderBottomColor: COLORS.inputborder},
            ]}>
            Contact Details
          </Text>
          <View style={styles.inputCard}>
            <Controller
              name="contactName"
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
                      style={[
                        styles.icon,
                        {tintColor: theme.dark ? COLORS.card : COLORS.title},
                      ]}
                    />
                  }
                />
              )}
            />
          </View>
          <Controller
            name="contactPhone"
            control={form.control}
            rules={{required: true}}
            render={({field}) => (
              <View style={{marginBottom: 5}}>
                <Input
                  onFocus={() => setisFocused1(true)}
                  onBlur={() => {
                    setisFocused1(false);
                    field.onBlur();
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
                      style={[
                        styles.icon,
                        {tintColor: theme.dark ? COLORS.card : COLORS.title},
                      ]}
                    />
                  }
                />
              </View>
            )}
          />
        </View>
        <View
          style={[
            GlobalStyleSheet.container,
            {
              backgroundColor: theme.dark
                ? 'rgba(255,255,255,.1)'
                : colors.card,
              marginBottom: 10,
              borderRadius: 15,
            },
          ]}>
          <Text
            style={[
              styles.cardTitle,
              {color: colors.title, borderBottomColor: COLORS.inputborder},
            ]}>
            Address
          </Text>
          <Controller
            name="text"
            control={form.control}
            rules={{required: true}}
            render={({field}) => (
              <View style={styles.inputCard}>
                <Input
                  onFocus={() => setisFocused2(true)}
                  onBlur={() => {
                    setisFocused2(false);
                    field.onBlur();
                  }}
                  isFocused={isFocused2}
                  onChangeText={field.onChange}
                  value={field.value}
                  backround={colors.card}
                  style={{borderRadius: 48}}
                  inputicon
                  placeholder="Address"
                  icon={
                    <Image
                      source={IMAGES.Pinduotone}
                      style={[
                        styles.icon,
                        {tintColor: theme.dark ? COLORS.card : COLORS.title},
                      ]}
                    />
                  }
                />
              </View>
            )}
          />
        </View>
        <View
          style={[
            GlobalStyleSheet.container,
            {
              backgroundColor: theme.dark
                ? 'rgba(255,255,255,.1)'
                : colors.card,
              borderRadius: 15,
            },
          ]}>
          <Text
            style={[
              styles.selectTitle,
              {color: colors.title, borderBottomColor: COLORS.inputborder},
            ]}>
            Save Address As
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 15,
              paddingBottom: 5,
            }}>
            {productSizes.map((data, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    setActiveSize(data);
                    form.setValue('title', `${data} Address`);
                  }}
                  key={index}
                  style={[
                    {
                      height: 48,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: colors.border,
                      marginHorizontal: 4,
                      backgroundColor: colors.card,
                    },
                    activeSize === data && {
                      backgroundColor: COLORS.primary,
                      borderColor: COLORS.primary,
                    },
                  ]}>
                  <Text
                    style={[
                      {...FONTS.fontRegular, fontSize: 13, color: colors.title},
                      activeSize === data && {color: COLORS.white},
                    ]}>
                    {data}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={[GlobalStyleSheet.container]}>
        <Button
          title="Save Address"
          color={COLORS.primary}
          text={COLORS.card}
          onPress={form.handleSubmit(handleSubmit)}
          style={{borderRadius: 48}}
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
  tracktitle: {
    ...FONTS.fontMedium,
    fontSize: 10,
    color: COLORS.title,
  },
  tracktitle2: {
    ...FONTS.fontMedium,
    fontSize: 13,
    color: COLORS.card,
  },
  cardTitle: {
    ...FONTS.fontRegular,
    fontSize: 16,
    color: COLORS.title,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputborder,
    borderStyle: 'dashed',
    marginHorizontal: -15,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  inputCard: {
    marginBottom: 15,
    marginTop: 15,
  },
  inputTitle: {
    ...FONTS.fontMedium,
    fontSize: 13,
    color: COLORS.title,
    marginBottom: 5,
  },
  selectTitle: {
    ...FONTS.fontRegular,
    fontSize: 14,
    color: COLORS.title,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputborder,
    borderStyle: 'dashed',
    marginHorizontal: -15,
    paddingHorizontal: 15,
    paddingBottom: 15,
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

export default AddDeliveryAddress;
