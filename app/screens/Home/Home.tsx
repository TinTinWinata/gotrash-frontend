import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {IMAGES} from '../../constants/Images';
import {COLORS, FONTS} from '../../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {addTowishList} from '../../redux/reducer/wishListReducer';
import ImageSwiper from '../../components/ImageSwiper';
import Cardstyle4 from '../../components/Card/Cardstyle4';
import {useGoTrash} from '../../contexts/gotrashContext';
import {convertToPascalCase, formatNumber} from '../../utils/stringUtils';
import YourTrashHistory from './YourTrashHistory';
import {
  REWARDS_CATEGORY_DATA,
  TOP_REWARDS_CATEGORY_DATA,
} from '../../constants/reward';
import {Reward} from '../../types/reward';
import {RewardCategory} from '../../types/reward-category';

export const Home = () => {
  const navigation = useNavigation<any>();

  const {user} = useGoTrash();
  const dispatch = useDispatch();

  const theme = useTheme();
  const {colors}: {colors: any} = theme;

  const addItemToWishList = (data: any) => {
    dispatch(addTowishList(data));
  };

  return (
    <View style={{backgroundColor: colors.card, flex: 1}}>
      <View style={{}}>
        <View
          style={[
            GlobalStyleSheet.container,
            {paddingHorizontal: 30, padding: 0, paddingTop: 30},
          ]}>
          <View style={[GlobalStyleSheet.flex]}>
            <View>
              <Text
                style={{
                  ...FONTS.fontRegular,
                  fontSize: 14,
                  color: colors.title,
                }}>
                Welcome
              </Text>
              <Text
                style={{
                  ...FONTS.fontSemiBold,
                  fontSize: 24,
                  color: colors.title,
                }}>
                {user ? convertToPascalCase(user?.username) : ''}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 178, 6, 0.22)',
                  borderRadius: 99,
                  marginRight: 3,
                  paddingHorizontal: 13,
                  paddingVertical: 3,
                  gap: 5,
                }}>
                <Image
                  style={{
                    height: 25,
                    objectFit: 'contain',
                    width: 18.5,
                  }}
                  source={IMAGES.fire}
                />
                <Text
                  style={{
                    ...FONTS.fontSemiBold,
                    marginTop: 5,
                    color: '#FF9500',
                    fontSize: 16,
                  }}>
                  24
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Notification')}
                activeOpacity={0.5}
                style={[GlobalStyleSheet.background3, {}]}>
                <Image
                  style={[
                    GlobalStyleSheet.image3,
                    {tintColor: theme.dark ? COLORS.card : '#5F5F5F'},
                  ]}
                  source={IMAGES.Notification}
                />
                <View
                  style={[
                    styles.notifactioncricle,
                    {
                      backgroundColor: colors.card,
                    },
                  ]}>
                  <View
                    style={{
                      height: 13,
                      width: 13,
                      borderRadius: 13,
                      backgroundColor: COLORS.primary,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                // @ts-ignore
                onPress={() => navigation.openDrawer()}
                style={[GlobalStyleSheet.background3, {}]}>
                <Image
                  style={[
                    GlobalStyleSheet.image3,
                    {tintColor: theme.dark ? COLORS.card : '#5F5F5F'},
                  ]}
                  source={IMAGES.grid6}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            GlobalStyleSheet.container,
            {padding: 0, paddingHorizontal: 30, paddingTop: 15},
          ]}>
          <View
            style={{
              height: 50,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 60,
              borderWidth: 1,
              flexDirection: 'row',
              gap: 10,
              paddingLeft: 20,
              borderColor: '#EBEBEB',
              backgroundColor: '#FAFAFA',
            }}>
            <FontAwesome name="dollar" size={16} color={COLORS.primary} />
            <Text style={[styles.TextInput, {marginTop: 4.5}]}>
              {user?.coin} Coins
            </Text>
            <View
              style={{
                position: 'absolute',
                top: 12,
                right: 20,
                borderRadius: 50,
                padding: 5,
                backgroundColor: COLORS.primary,
              }}>
              <FontAwesome
                name="shopping-cart"
                size={16}
                color={COLORS.white}
              />
              {/* <FeatherIcon name="search" size={24} color={'#C9C9C9'} /> */}
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={[GlobalStyleSheet.container, {padding: 0}]}>
            <ImageSwiper data={TOP_REWARDS_CATEGORY_DATA} />
          </View>
        </View>

        <View
          style={[
            GlobalStyleSheet.container,
            {paddingHorizontal: 0, paddingTop: 0},
          ]}>
          <View style={[GlobalStyleSheet.flex, {paddingHorizontal: 30}]}>
            <Text
              style={[
                styles.brandsubtitle3,
                {fontSize: 18, color: colors.title},
              ]}>
              Reward Category
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: -15,
              paddingHorizontal: 15,
              paddingTop: 25,
            }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                  marginRight: 10,
                  marginBottom: 20,
                }}>
                {REWARDS_CATEGORY_DATA.map((data: RewardCategory, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate('Store');
                      }}
                      key={index}
                      style={[
                        styles.arrivaldata,
                        {
                          backgroundColor: theme.dark
                            ? colors.background
                            : colors.card,
                          borderColor: '#EFEFEF',
                          shadowColor: 'rgba(4,118,78,.6)',
                        },
                      ]}>
                      <View
                        style={[
                          GlobalStyleSheet.flexcenter,
                          {gap: 20, justifyContent: 'flex-start'},
                        ]}>
                        <Text style={{color: COLORS.primary}}>{data.icon}</Text>
                        <View>
                          <Text
                            style={{
                              ...FONTS.fontMedium,
                              fontSize: 16,
                              color: colors.title,
                            }}>
                            {data.name}
                          </Text>
                          <Text
                            style={{
                              ...FONTS.fontRegular,
                              fontSize: 14,
                              color: COLORS.primary,
                            }}>
                            {data.rewards.length} items available
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
        <YourTrashHistory />
        <View
          style={[
            GlobalStyleSheet.container,
            {paddingHorizontal: 0, paddingTop: 25, paddingBottom: 10},
          ]}>
          <View style={[GlobalStyleSheet.flex, {paddingHorizontal: 30}]}>
            <Text
              style={[
                styles.brandsubtitle3,
                {fontSize: 18, color: colors.title},
              ]}>
              Featured Items
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.brandsubtitle3,
                  {fontSize: 16, color: COLORS.primary},
                ]}>
                More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[GlobalStyleSheet.container, {paddingHorizontal: 30}]}>
          {REWARDS_CATEGORY_DATA[0].rewards.map((data: Reward, index: any) => {
            return (
              <View key={index} style={{marginBottom: 40}}>
                <Cardstyle4
                  brand="GoTrash"
                  product={true}
                  id={data.id || ''}
                  image={data.imageUrl}
                  onPress2={() =>
                    navigation.navigate('ProductsDetails', {id: data.id!})
                  }
                  price={formatNumber(data.coin)}
                  title={data.name}
                  onPress={() =>
                    navigation.navigate('ProductsDetails', {id: data.id!})
                  }
                  onPress5={() => addItemToWishList(data)}
                />
              </View>
            );
          })}
          {/* !DO NOT USE THIS BUTTON IN PRODUCTION! */}
          {/* <Button
            style={{marginBottom: 20}}
            title="Seed Reward and Category"
            onPress={async () => {
              setIsLoading(true);
              await seedRewardAndCategory();
              setIsLoading(false);
            }}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  notifactioncricle: {
    height: 16,
    width: 16,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 2,
    right: 2,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  TextInput: {
    ...FONTS.fontRegular,
    fontSize: 16,
    color: COLORS.title,
  },
  brandsubtitle2: {
    ...FONTS.fontSemiBold,
    fontSize: 12,
    color: COLORS.card,
  },
  brandsubtitle3: {
    ...FONTS.fontMedium,
    fontSize: 12,
    color: COLORS.title,
  },
  title1: {
    ...FONTS.fontBold,
    fontSize: 28,
    color: COLORS.title,
  },
  title2: {
    ...FONTS.fontRegular,
    fontSize: 12,
    color: COLORS.title,
  },
  title3: {
    ...FONTS.fontSemiBold,
    fontSize: 24,
    color: '#8ABE12',
    //textAlign:'right'
  },
  colorCard: {},
  colorCardTitle: {
    ...FONTS.fontMedium,
    fontSize: 12,
    color: COLORS.title,
    lineHeight: 20,
    textAlign: 'center',
  },
  arrivaldata: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    width: 199,
    paddingHorizontal: 10,
    paddingLeft: 25,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: 'rgba(4,118,78,.6)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.34,
    shadowRadius: 18.27,
    elevation: 4,
  },
});

export default Home;
