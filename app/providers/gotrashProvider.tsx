import axios, {AxiosInstance} from 'axios';
import {ChildrenProps} from '../types/children-only';
import goTrashContext from '../contexts/gotrashContext.tsx';
import {useEffect, useState} from 'react';
import {BackendResponse} from '../types/backend-response';
import {User} from '../types/user';
import React from 'react';
import {Group} from '../types/group';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Reward} from '../types/reward';
import {convertObjectToFormData} from '../utils/objectUtils.ts';
import {RewardCategory} from '../types/reward-category';
import {REWARDS_CATEGORY_DATA} from '../constants/reward.tsx';
import {Image} from 'react-native';
import {sleep} from '../utils/otherUtils.ts';
import useLoader from '../contexts/loaderContext.tsx';
import {Trashbin} from '../types/trashbin';
import {Address} from '../types/address';
import {Order} from '../types/order';

function createAxiosInstance(token: string | null): AxiosInstance {
  return axios.create({
    baseURL: 'https://gotrash.site/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
}

let api = createAxiosInstance(null);

export default function GoTrashProvider({children}: ChildrenProps) {
  const [user, setUser] = useState<User>();
  const navigation = useNavigation<any>();
  const {setIsLoading} = useLoader();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [choosedReward, setChoosedReward] = useState<Reward>();

  async function fetchUser() {
    let userData = await AsyncStorage.getItem('user');
    if (userData) {
      const userObject = JSON.parse(userData) as User;
      const response = await api.get<BackendResponse<User>>(
        '/user/' + userObject.id,
      );
      if (response && response.data?.data) {
        setUser(response.data.data);
      }
    }
  }

  async function fetchAddress() {
    const addressData = await AsyncStorage.getItem('addresses');
    if (addressData) {
      setAddresses(JSON.parse(addressData));
    }
  }

  async function fetchOrders() {
    const orderData = await AsyncStorage.getItem('orders');
    if (orderData) {
      setOrders(JSON.parse(orderData));
    }
  }

  function addAddress(address: Address) {
    const newAddresses = [...addresses, address];
    setAddresses(newAddresses);
    AsyncStorage.setItem('addresses', JSON.stringify(newAddresses));
  }

  function addOrder(reward: Reward) {
    const order: Order = {...reward, status: 'ongoing'};
    const newOrders = [...orders, order];
    setOrders(newOrders);
    AsyncStorage.setItem('orders', JSON.stringify(newOrders));
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetchUser();
      await fetchAddress();
      await fetchOrders();
      navigation.navigate('DrawerNavigation', {screen: 'Home'});
      setIsLoading(false);
    })();
  }, []);

  function removeAddress(idx: number) {
    const newAddresses = [...addresses];
    newAddresses.splice(idx, 1);
    setAddresses(newAddresses);
    AsyncStorage.setItem('addresses', JSON.stringify(newAddresses));
  }

  async function createGroup(group: Group): Promise<BackendResponse<Group>> {
    if (!user) {
      throw new Error('User not found!');
    }
    group.adminId = user.id;
    const response = await api.post<BackendResponse<Group>>(
      '/group/add',
      group,
    );
    if (response.data.status === 201) {
      await fetchUser();
    }
    return response.data;
  }

  async function getRewards(): Promise<Reward[]> {
    const response = await api.get<BackendResponse<Reward[]>>('/rewards');
    return response.data.data;
  }

  async function getTrashbins(): Promise<Trashbin[]> {
    const response = await api.get<BackendResponse<Trashbin[]>>('/trashbins');
    return response.data.data;
  }

  async function getRewardById(id: string): Promise<Reward> {
    const response = await api.get<BackendResponse<Reward>>('/reward/' + id);
    return response.data.data;
  }
  async function getTrashbinById(id: string): Promise<Trashbin> {
    const response = await api.get<BackendResponse<Trashbin>>(
      '/trashbin/' + id,
    );
    return response.data.data;
  }

  async function seedRewardAndCategory(): Promise<void> {
    try {
      if (!user) {
        throw new Error('User not found!');
      }
      for (const category of REWARDS_CATEGORY_DATA) {
        // Create Category

        if (typeof category.imageUrl === 'string') {
          continue;
        }
        const resolvedImage = Image.resolveAssetSource(category.imageUrl);
        // Need to change to public URL
        resolvedImage.uri = resolvedImage.uri.replace(
          'http://localhost:8081',
          'https://ab30-180-242-68-237.ngrok-free.app',
        );
        const fileExtension = resolvedImage.uri.split('?')[0].split('.').pop();
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('file', {
          name: category.name.split(' ').join('_') + '.' + fileExtension,
          type: 'images/' + fileExtension,
          uri: resolvedImage.uri,
        });

        const response = await axios.post<BackendResponse<RewardCategory>>(
          'https://gotrash.site/api/reward-category/add',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (response.status === 200) {
          // Create Reward
          for (const reward of category.rewards) {
            reward.rewardCategoryId = response.data.data.id!;
            await createReward(reward);
            await sleep(1000);
          }
          // response.data.data;
        }
        console.log('Succesfully Created Category');
      }
    } catch (err) {
      console.log(`[Error Seeding] : ${JSON.stringify(err)}`);
      return;
    }
  }

  async function createReward(
    reward: Reward,
  ): Promise<BackendResponse<Reward> | null> {
    if (!user) {
      throw new Error('User not found!');
    }
    if (typeof reward.imageUrl === 'string') {
      return null;
    }
    const resolvedImage = Image.resolveAssetSource(reward.imageUrl);
    // Need to change to public URL
    resolvedImage.uri = resolvedImage.uri.replace(
      'http://localhost:8081',
      'https://ab30-180-242-68-237.ngrok-free.app',
    );
    const fileExtension = resolvedImage.uri.split('?')[0].split('.').pop();
    const formData = convertObjectToFormData(reward);
    formData.append('file', {
      name: reward.name.split(' ').join('_') + '.' + fileExtension,
      type: 'images/' + fileExtension,
      uri: resolvedImage.uri,
    });
    const response = await axios.post(
      'https://gotrash.site/api/reward/add',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  }

  async function saveUser(newUser: User) {
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  }

  async function guestLogin(): Promise<User | null> {
    const response = await api.post<BackendResponse<User>>('/user/addGuest');
    if (response?.data?.data) {
      saveUser(response.data.data);
      // !TODO: If token already returned by aduy
      // setApi(createAxiosInstance(response.data.data.token));
      return response.data.data;
    }
    return null;
  }

  function logout() {}

  return (
    <goTrashContext.Provider
      value={{
        setChoosedReward,
        choosedReward,
        orders,
        addOrder,
        addAddress,
        addresses,
        getTrashbinById,
        getTrashbins,
        guestLogin,
        user,
        logout,
        createGroup,
        seedRewardAndCategory,
        getRewards,
        removeAddress,
        getRewardById,
      }}>
      {children}
    </goTrashContext.Provider>
  );
}
