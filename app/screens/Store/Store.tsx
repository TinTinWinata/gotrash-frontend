import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import Header from '../../layout/Header';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {SafeAreaView} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CategoryCart from '../../components/CategoryCart';
import {TabView, TabBar} from 'react-native-tab-view';
import {
  REWARDS_CATEGORY_DATA,
  REWARDS_CATEGORY_MAP,
} from '../../constants/reward';

type StoreScreenProps = StackScreenProps<RootStackParamList, 'Store'>;

type Route = {
  key: string;
  title: string;
};

const Store = ({route}: StoreScreenProps) => {
  const theme = useTheme();
  const {colors}: {colors: any} = theme;
  console.log(route.params);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = useState<Route[]>(
    REWARDS_CATEGORY_DATA.map(data => ({key: data.name, title: data.name})),
  );

  useEffect(() => {
    if (route?.params?.id) {
      const {id} = route.params;
      const rewardIndex = REWARDS_CATEGORY_DATA.findIndex(
        data => data.name === id,
      );
      if (rewardIndex !== -1) {
        setIndex(rewardIndex);
      }
    }
  }, [route.params]);

  const renderScene = ({route}: {route: Route}) => {
    const rewards = REWARDS_CATEGORY_MAP[route.key];
    return (
      <ScrollView
        contentContainerStyle={{paddingBottom: 20, marginTop: 10}}
        showsVerticalScrollIndicator={false}>
        <CategoryCart data={rewards} />
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.card, flex: 1}}>
      <Header
        title="Store"
        leftIcon="back"
        rightChildren={<View style={{width: 50}} />}
      />
      <View
        style={[
          GlobalStyleSheet.container,
          {
            padding: 0,
            paddingHorizontal: 30,
            paddingVertical: 15,
            backgroundColor: colors.card,
          },
        ]}>
        <View>
          <TextInput
            placeholder="Cari yang terbaik untuk kamu"
            style={[
              styles.TextInput,
              {color: COLORS.title, backgroundColor: '#FAFAFA'},
            ]}
            placeholderTextColor={'#929292'}
          />
          <View style={{position: 'absolute', top: 17, right: 20}}>
            <FeatherIcon name="search" size={24} color={'#C9C9C9'} />
          </View>
        </View>
      </View>
      <View style={[GlobalStyleSheet.container, {padding: 0, flex: 1}]}>
        <TabView
          style={{flexGrow: 1}}
          renderTabBar={props => (
            <TabBar
              pressOpacity={0}
              {...props}
              activeColor={COLORS.primary}
              indicatorStyle={{backgroundColor: COLORS.primary, height: 3}}
              labelStyle={[FONTS.fontMedium, {fontSize: 16, color: '#A5A5A5'}]}
              scrollEnabled={true}
              tabStyle={{width: 185}}
              style={{
                backgroundColor: colors.card,
                //borderBottomWidth: 1,
                //borderBottomColor:'#F0F0F0',
                paddingVertical: 0,
                paddingTop: 5,
              }}
            />
          )}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    ...FONTS.fontRegular,
    fontSize: 16,
    color: COLORS.title,
    height: 60,
    borderRadius: 61,
    paddingHorizontal: 40,
    paddingLeft: 30,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    backgroundColor: '#FAFAFA',
  },
});

export default Store;
