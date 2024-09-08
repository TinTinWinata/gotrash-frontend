import LoaderKit from 'react-native-loader-kit';
import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import {useQuery} from '@tanstack/react-query';
import {useGoTrash} from '../../contexts/gotrashContext';
import {ScrollView} from 'react-native';
import Divider from '../../components/Dividers/Divider';
import ChooseBtn from '../../components/ChooseBtn';
import {User} from '../../types/user';
import Button from '../../components/Button/Button';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import useLoader from '../../contexts/loaderContext';
import {useNavigation} from '@react-navigation/native';
export default function AddUserToGroup() {
  const {getUsers, addGroupNotificationInvite, user} = useGoTrash();
  const {data: userData, isLoading: isLoadingUsers} = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  const {successLoading, setIsLoading} = useLoader();
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [choosed, setChoosed] = useState<Record<string, boolean>>({});
  const navigation = useNavigation<any>();
  const [searchedText, setSearchedText] = useState<string>('');
  const handleSubmit = async () => {
    const userIds = Object.keys(choosed);
    if (userIds.length <= 0 || !user || !user.group) {
      return;
    }
    setIsLoading(true);
    await addGroupNotificationInvite(userIds, user.group);
    setIsLoading(false);
    navigation.goBack();
    await successLoading(
      'User has been invited! Please ask them to check their notifications!',
    );
  };
  const handleChoose = (id: string) => {
    const temp = {...choosed};
    if (temp[id]) {
      delete temp[id];
    } else {
      temp[id] = true;
    }
    setChoosed(temp);
  };
  useEffect(() => {
    if (!userData) {
      return;
    }
    if (searchedText === '') {
      setFilteredData(userData);
    } else {
      setFilteredData(
        userData?.filter(
          data =>
            data.username?.toLowerCase().includes(searchedText.toLowerCase()) ||
            data.email?.toLowerCase().includes(searchedText.toLowerCase()),
        ),
      );
    }
  }, [searchedText, userData]);
  return (
    <View style={{backgroundColor: COLORS.card, flex: 1}}>
      <Header
        title="Invite User"
        leftIcon={'back'}
        rightChildren={<View style={{width: 60}} />}
      />
      <View
        style={{
          paddingHorizontal: 30,
          flex: 1,
        }}>
        <TextInput
          onChangeText={text => setSearchedText(text)}
          value={searchedText}
          placeholder="Cari teman-mu disini"
          style={[
            {
              ...FONTS.fontRegular,
              fontSize: 16,
              color: COLORS.title,
              height: 60,
              borderRadius: 61,
              paddingHorizontal: 40,
              paddingLeft: 30,
              borderWidth: 1,
              marginBottom: 20,
              borderColor: '#EBEBEB',
              backgroundColor: '#FAFAFA',
            },
          ]}
          placeholderTextColor={'#929292'}
        />
        <ScrollView
          style={{
            flex: 1,
          }}>
          {isLoadingUsers ? (
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
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                marginTop: 10,
              }}>
              {filteredData.map((data, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: COLORS.card,
                    borderRadius: 18,
                    width: '100%',
                  }}>
                  <View
                    style={{
                      gap: 12,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 700,
                      }}
                      source={{uri: data.imageUrl}}
                    />
                    <View style={{width: '65%'}}>
                      <Text
                        style={{
                          ...FONTS.fontSemiBold,
                          fontWeight: 700,
                          fontSize: 16,
                        }}>
                        {data.username}
                      </Text>
                      <Text
                        style={{
                          ...FONTS.fontSemiBold,
                          fontWeight: 500,
                          fontSize: 13,
                          opacity: 0.6,
                        }}>
                        {data.email}
                      </Text>
                    </View>
                    <View style={{}}>
                      <ChooseBtn
                        onPress={() => handleChoose(data.id)}
                        isChecked={choosed[data.id] ? true : false}
                      />
                    </View>
                  </View>
                  <Divider dashed={true}></Divider>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
        <View style={[GlobalStyleSheet.container]}>
          <Button
            onPress={handleSubmit}
            title="Invite User"
            color={COLORS.primary}
            text={COLORS.card}
            style={{borderRadius: 50}}
          />
        </View>
      </View>
    </View>
  );
}
