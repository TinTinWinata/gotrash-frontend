import LoaderKit from 'react-native-loader-kit';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  LayoutAnimation,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import Header from '../../layout/Header';
import {IMAGES} from '../../constants/Images';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SwipeBox from '../../components/SwipeBox';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {useQuery} from '@tanstack/react-query';
import {useGoTrash} from '../../contexts/gotrashContext';
import {COLORS, FONTS} from '../../constants/theme';
import {SwipeData} from '../../types/swipe-data';
import {Notification} from '../../types/notification';
import {formatDate} from '../../utils/dateUtils';
import OptionModal from '../../components/Modal/OptionModal';
import useLoader from '../../contexts/loaderContext';
import IonIcon from 'react-native-vector-icons/Ionicons';

const NotificationScreen = () => {
  const theme = useTheme();
  const {joinGroup, getNotifications, user, deleteNotification} = useGoTrash();
  const {colors}: {colors: any} = theme;
  const [touchStart, setTouchStart] = useState<Date>(new Date());
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<string>();
  const [selectedNotification, setSelectedNotification] = useState<string>();
  const {setIsLoading} = useLoader();
  const navigation = useNavigation<any>();
  const handleConfirmGroup = async () => {
    if (!selectedGroup) {
      return;
    }
    setIsLoading(true);
    await joinGroup(selectedGroup);
    if (selectedNotification) {
      await deleteNotification(selectedNotification);
    }
    setIsLoading(false);
    navigation.navigate('Group');
  };
  function convertToSwipeData(notification: Notification): SwipeData {
    return {
      date: formatDate(notification.createdAt),
      image: IMAGES.icLauncher,
      title: notification.title,
    };
  }

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: getNotifications,
  });
  const deleteItem = async (index: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    if (!data || !data[index]) {
      return;
    }
    const notification = data[index];
    await deleteNotification(notification.id);
    await refetch();
  };

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <Modal animationType="slide" transparent={true} visible={isOpenModal}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            position: 'relative',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsOpenModal(false)}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,.3)',
            }}
          />
          <OptionModal
            onConfirm={handleConfirmGroup}
            title="Want to join this group. You will be able to see all the members and their activities."
            close={setIsOpenModal}></OptionModal>
        </View>
      </Modal>

      <Header
        title={data ? `Notifications (${data?.length})` : 'Notifications'}
        leftIcon="back"
        rightChildren={<View style={{width: 45}} />}
      />
      {!isLoading && data?.length === 0 && (
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
          }}>
          <IonIcon
            name="notifications-off"
            size={100}
            color={'gray'}
            style={{opacity: 0.3}}
          />
          <Text
            style={{
              ...FONTS.fontSemiBold,
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 80,
            }}>
            Kamu tidak memiliki{'\n'}notifikasi!
          </Text>
        </View>
      )}
      {isLoading ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LoaderKit
            style={{width: 75, height: 75}}
            name={'BallPulse'}
            color={COLORS.primary}
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{paddingBottom: 50}}>
          <View
            style={[GlobalStyleSheet.container, {padding: 0, paddingTop: 15}]}>
            <GestureHandlerRootView style={{paddingHorizontal: 15}}>
              {data?.map((notification: Notification, index: any) => {
                const swipeData = convertToSwipeData(notification);
                return (
                  <View
                    onTouchStart={() => {
                      setTouchStart(new Date());
                    }}
                    onTouchEnd={() => {
                      const temp = new Date();
                      if (touchStart) {
                        const diff =
                          (temp.getTime() - touchStart.getTime()) / 1000;
                        if (diff < 0.3) {
                          // user intend to click not delete
                          setSelectedNotification(notification.id);
                          if (
                            notification.description.includes('INVITED_GROUP_')
                          ) {
                            const temp = notification.description.split('_');
                            const groupId = temp[temp.length - 1];
                            setSelectedGroup(groupId);
                            setIsOpenModal(true);
                          }
                        }
                      }
                    }}
                    style={{
                      marginBottom: 5,
                      marginHorizontal: -15,
                      paddingHorizontal: 15,
                    }}
                    key={index}>
                    <SwipeBox
                      // @ts-expect-error
                      data={swipeData}
                      colors={colors}
                      handleDelete={() => deleteItem(index)}
                    />
                  </View>
                );
              })}
            </GestureHandlerRootView>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default NotificationScreen;
