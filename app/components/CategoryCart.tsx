import {View} from 'react-native';
import React from 'react';
import {GlobalStyleSheet} from '../constants/StyleSheet';
import Cardstyle4 from './Card/Cardstyle4';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Reward} from '../types/reward';
import {formatNumber} from '../utils/stringUtils';

type CategoryCart = {
  data: Reward[];
};

const CategoryCart = ({data}: CategoryCart) => {
  const navigation = useNavigation<any>();

  // const addItemToCart = (data: any) => {
  //   dispatch(addToCart(data));
  // };

  // const addItemToWishList = (data: any) => {
  //   dispatch(addTowishList(data));
  // };

  if (!data) {
    return <></>;
  }

  return (
    <View style={[GlobalStyleSheet.container, {padding: 0}]}>
      <View style={{}}>
        <View style={[GlobalStyleSheet.container, {paddingHorizontal: 30}]}>
          {data.map((reward: Reward, index: any) => {
            return (
              <View key={index} style={{marginBottom: 35}}>
                <Cardstyle4
                  brand="GoTrash"
                  product={true}
                  id={reward.id!}
                  image={reward.imageUrl}
                  onPress2={() =>
                    navigation.navigate('ProductsDetails', {id: reward.id!})
                  }
                  price={formatNumber(reward.coin)}
                  title={reward.name}
                  onPress={() =>
                    navigation.navigate('ProductsDetails', {id: reward.id!})
                  }
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default CategoryCart;
