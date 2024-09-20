import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';

class Notification {
  constructor() {
    request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
        // process the action
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }
  notification() {
    PushNotification.localNotification({
      channelId: 'gotrash-notification',
      title: 'GoTrash Coins',
      message: 'Berhasil membuang sampah, Reward-mu sudah masuk nih!',
      smallIcon: 'ic_stat_all_inclusive',
      largeIcon: 'ic_launcher',
      bigLargeIcon: 'ic_launcher',
      color: '#A1D5B1',
    });
  }
  // Need other permissions
  // scheduleNotification(date: Date) {
  //   PushNotification.localNotificationSchedule({
  //     channelId: 'gotrash-notification',
  //     title: 'Test',
  //     message: 'test',
  //     date,
  //   });
  // }
}

const notification = new Notification();
export default notification;
