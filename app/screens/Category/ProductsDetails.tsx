import {RouteProp, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {IMAGES} from '../../constants/Images';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import Button from '../../components/Button/Button';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {ScrollView} from 'react-native-gesture-handler';
import CheckoutItems from '../../components/CheckoutItems';
import FeatherIcon from 'react-native-vector-icons/Feather';

import RangeSlider from '../../components/RangeSlider';
import {useGoTrash} from '../../contexts/gotrashContext';
import {REWARDS_CATEGORY_DATA, REWARDS_MAP} from '../../constants/reward';
import {Reward} from '../../types/reward';
import {getImageSource} from '../../utils/objectUtils';

type ProductsDetailsScreenProps = StackScreenProps<
  RootStackParamList,
  'ProductsDetails'
> & {
  route: RouteProp<RootStackParamList, 'ProductsDetails'>;
};

const ProductsDetails = ({navigation, route}: ProductsDetailsScreenProps) => {
  const theme = useTheme();
  const {id} = route.params;
  const {colors}: {colors: any} = theme;
  const {getRewardById, setChoosedReward} = useGoTrash();
  const [reward, setReward] = useState<Reward>();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    (async () => {
      if (id) {
        if (REWARDS_MAP[id]) {
          setReward(REWARDS_MAP[id]);
        } else {
          const data = await getRewardById(id);
          setReward(data);
        }
      }
    })();
  }, [id]);

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.imagecard]}>
          {/* <Swiper showsPagination={false} loop={false}> */}
          <View>
            {getImageSource(reward?.imageUrl!) && (
              <Image
                style={{
                  borderRadius: 0,
                  height: '100%',
                  width: '100%',
                  // resizeMode: 'contain',
                }}
                source={getImageSource(reward?.imageUrl!)}
              />
            )}
          </View>
          {/* </Swiper> */}
          <View style={[styles.toparre]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.backbtn,
                {backgroundColor: 'rgba(246,246,246,.3)'},
              ]}>
              <FeatherIcon size={24} color={COLORS.card} name={'arrow-left'} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.bottomcard,
            {backgroundColor: theme.dark ? colors.background : colors.card},
          ]}>
          <View style={[GlobalStyleSheet.container, {paddingHorizontal: 30}]}>
            <View style={{alignItems: 'center', marginBottom: 20}}>
              <View
                style={{
                  height: 6,
                  width: 60,
                  borderRadius: 20,
                  backgroundColor: '#DDDDDD',
                }}
              />
            </View>
            <View style={[styles.rattingcard]}>
              <Text
                style={{
                  ...FONTS.fontSemiBold,
                  fontSize: 24,
                  color: COLORS.card,
                  lineHeight: 34,
                }}>
                5.0
              </Text>
            </View>
            <Text style={[styles.brandTitle, {color: colors.title}]}>
              {reward?.name}
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.dark ? 'rgba(255,255,255,.7)' : '#4E4E4E',
                  paddingVertical: 15,
                },
              ]}>
              {reward?.description}
            </Text>
            {reward?.isNeedSize ? (
              <View style={{marginTop: -40, marginBottom: 10}}>
                <RangeSlider />
              </View>
            ) : (
              <View style={{height: 20}} />
            )}
            <View style={[GlobalStyleSheet.flex, {paddingVertical: 15}]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Text
                    style={[
                      styles.subtitle2,
                      {fontSize: 14, color: colors.title},
                    ]}>
                    $
                  </Text>
                  <Text
                    style={[
                      styles.subtitle2,
                      {color: colors.title, lineHeight: 30},
                    ]}>
                    {reward?.coin! * quantity}
                  </Text>
                </View>
                <Text
                  style={{...FONTS.fontMedium, fontSize: 16, color: '#9A9A9A'}}>
                  coins
                </Text>
              </View>
              <View>
                <CheckoutItems
                  onChangeQuantity={i => {
                    setQuantity(i);
                  }}
                  productList={true}
                />
              </View>
            </View>
            {/* <Text
              style={{
                ...FONTS.fontLight,
                fontSize: 12,
                color: theme.dark ? 'rgba(255,255,255,.7)' : '#4E4E4E',
                marginTop: 5,
              }}>
              *)Dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore
            </Text> */}
          </View>
        </View>
      </ScrollView>
      <View style={[GlobalStyleSheet.container, {paddingTop: 0}]}>
        <Button
          onPress={() => {
            navigation.navigate('DeliveryAddress');
            setChoosedReward(reward!);
          }}
          title="Beli Sekarang"
          color={COLORS.primary}
          text={COLORS.card}
          style={{borderRadius: 50}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subCard: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.inputborder,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 5,
  },
  imagecard: {
    width: '100%',
    height: SIZES.height / 2,
    backgroundColor: COLORS.primary,
    paddingBottom: 30,
  },
  backbtn: {
    height: 45,
    width: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toparre: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomcard: {
    backgroundColor: COLORS.card,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -60,
  },
  rattingcard: {
    height: 64,
    width: 64,
    borderRadius: 50,
    backgroundColor: '#FF8730',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(255,135,48,.4)',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.34,
    shadowRadius: 31.27,
    elevation: 8,
    position: 'absolute',
    right: 40,
    top: -25,
  },
  subtitle: {
    ...FONTS.fontRegular,
    fontSize: 14,
    color: COLORS.title,
  },
  bottombtn: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    height: 65,
    borderRadius: 50,
    padding: 0,
  },
  brandTitle: {
    ...FONTS.fontMedium,
    fontSize: 20,
    color: COLORS.title,
  },
  subtitle2: {
    ...FONTS.fontSemiBold,
    fontSize: 24,
    color: COLORS.title,
  },
});

export default ProductsDetails;
